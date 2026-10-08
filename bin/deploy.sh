#!/bin/bash
# Build docs locally and ship the static output to docs.botble.com (vps-2).
#
# Why not build on the server: vps-2 has ~3.6 GB RAM and also hosts license.botble.com;
# a VitePress build of 1500+ pages exhausts it and takes every site down (2026-10-07).
# Why releases + symlink swap: VitePress empties dist/ before building, so serving dist/
# directly made the whole site 404 for the full build, and forever if the build died.
#
# Layout on the server:
#   /home/nginx/domains/docs.botble.com/releases/<timestamp>/   static output, one per deploy
#   /home/nginx/domains/docs.botble.com/public -> releases/<timestamp>   (nginx root)
#
# Usage: bin/deploy.sh            build + upload + switch
#        bin/deploy.sh --no-build upload the existing docs/.vitepress/dist as is
#        bin/deploy.sh --rollback point public at the previous release
#
# SSH: uses your key if the server accepts it, otherwise the macOS keychain item
# "botble-vps-ssh" through sshpass.

set -euo pipefail

HOST="root@108.160.138.161"
PORT=2504
SITE="/home/nginx/domains/docs.botble.com"
KEEP=3
DIST="docs/.vitepress/dist"

cd "$(dirname "$0")/.."

SSH_OPTS=(-p "$PORT" -o ConnectTimeout=15 -o LogLevel=ERROR -o StrictHostKeyChecking=accept-new)
if ssh "${SSH_OPTS[@]}" -o BatchMode=yes "$HOST" true 2>/dev/null; then
  SSH=(ssh "${SSH_OPTS[@]}")
else
  command -v sshpass >/dev/null || { echo "sshpass missing: brew install sshpass" >&2; exit 1; }
  SSHPASS=$(security find-generic-password -s botble-vps-ssh -w) || { echo "keychain item botble-vps-ssh not found" >&2; exit 1; }
  export SSHPASS
  SSH=(sshpass -e ssh "${SSH_OPTS[@]}")
fi
remote() { "${SSH[@]}" "$HOST" "$@"; }

if [ "${1:-}" = "--rollback" ]; then
  remote "set -e; cd $SITE
    cur=\$(readlink public); prev=\$(ls -1d releases/*/ | sed 's#/\$##' | grep -vx \"\$cur\" | tail -1)
    [ -n \"\$prev\" ] || { echo 'no previous release'; exit 1; }
    ln -sfn \"\$prev\" public.tmp && mv -Tf public.tmp public && echo \"public -> \$prev\""
  exit 0
fi

if [ "${1:-}" != "--no-build" ]; then
  # Deploy exactly what is on origin/master, nothing uncommitted.
  git fetch -q origin master
  if [ -n "$(git status --porcelain --untracked-files=no)" ] || [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/master)" ]; then
    echo "Working tree must be clean and at origin/master (git pull / commit first)." >&2
    exit 1
  fi
  npm run docs:build
fi

[ -f "$DIST/index.html" ] && [ -f "$DIST/ecommerce-saas/index.html" ] || { echo "Build output looks incomplete, aborting." >&2; exit 1; }

REL="releases/$(date +%Y%m%d-%H%M%S)"
echo "==> Uploading to $SITE/$REL"
# Seed the new release as hardlinks to the live one, so unchanged files cost nothing and rsync
# only has to write what changed. This used to be rsync's --link-dest, but macOS ships openrsync,
# which lists the flag and does not implement it: three docs releases sat on the server as three
# full copies, 2.1 GB where they should have been about 0.8 GB, with zero multiply-linked files.
remote "set -e; cd $SITE; mkdir -p releases
  prev=\$(readlink public 2>/dev/null || true)
  if [ -n \"\$prev\" ] && [ -d \"\$prev\" ]; then cp -al \"\$prev\" \"$REL\"; else mkdir -p \"$REL\"; fi"

RSYNC_SSH="${SSH[*]}"
# No --chown: openrsync lacks it. Ownership is fixed remotely below.
rsync -az --delete -e "$RSYNC_SSH" "$DIST/" "$HOST:$SITE/$REL/"

echo "==> Switching public -> $REL"
remote "set -e; cd $SITE
  test -f $REL/index.html
  chown -R nginx:nginx $REL && chmod -R g+rX $REL
  ln -sfn $REL public.tmp && chown -h root:nginx public.tmp && mv -Tf public.tmp public
  ls -1d releases/*/ | sed 's#/\$##' | head -n -$KEEP | grep -vx \"\$(readlink public)\" | xargs -r rm -rf"

code=$(curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0 (Macintosh) Chrome/130.0' https://docs.botble.com/ecommerce-saas/ || true)
echo "==> Live check https://docs.botble.com/ecommerce-saas/ -> HTTP $code"
