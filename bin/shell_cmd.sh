#!/bin/bash

set -euo pipefail
cd "$(dirname "$0")/.."

# CRITICAL: ecommerce-saas must NEVER be added to this array. That product has hand-written
# documentation in docs/ecommerce-saas/, and adding it here would destroy it by syncing
# over generic docs from the cms folder.
projects=("cms" "flex-home" "lara-mag" "miranda" "stories" "jobcy" "farmart" "transp" "gerow" "hasa" "shopwise" "martfury" "wowy" "nest" "ninico" "shofy" "athena" "homzen" "zelio" "carento" "travlla" "infinia" "isak" "qore" "orisa" "amerce" "velura" "auxero" "jobzilla" "restoria" "norio" "snapcart")

function sync_doc_files() {
  files_to_sync=(
    "installation-command-line.md"
    "installation-requirements.md"
    "installation-using-docker.md"
    "installation-web-interface.md"
    "ssl.md"
    "cronjob.md"
    "upgrade.md"
    "usage-analytics.md"
    "usage-email.md"
    "usage-media-bunnycdn.md"
    "usage-media-s3.md"
    "usage-media-wasabi.md"
    "usage-multi-language.md"
    "plugin-translation.md"
    "usage-newsletter.md"
    "api.md"
    "plugin-backup.md"
    "usage-social-login.md"
    "usage-custom-css-js.md"
    "license.md"
  )

  # Images referenced by synced docs that need to be copied along
  images_to_sync=(
    "backup-list.png"
    "social-login-settings.png"
  )

  ecommerce_files=("invoice-template.md" "usage-currencies.md" "usage-location.md")
  ecommerce_projects=("hasa" "shopwise" "martfury" "wowy" "nest" "ninico" "shofy" "orisa" "snapcart")

  # Validate every source before replacing any destination file.
  for source in "${files_to_sync[@]}"; do
    [ -f "./docs/cms/$source" ] || { echo "Missing sync source: docs/cms/$source" >&2; exit 1; }
  done
  for source in "${images_to_sync[@]}"; do
    [ -f "./docs/cms/images/$source" ] || { echo "Missing sync source: docs/cms/images/$source" >&2; exit 1; }
  done
  [ -f ./docs/cms/theme-development/theme-rename.md ] || { echo "Missing theme-rename source" >&2; exit 1; }
  for source in "${ecommerce_files[@]}"; do
    [ -f "./docs/farmart/$source" ] || { echo "Missing sync source: docs/farmart/$source" >&2; exit 1; }
  done

  for i in "${projects[@]}"; do
    if [ "$i" = "cms" ]; then
      continue
    fi

    mkdir -p ./docs/"$i"/images

    for j in "${files_to_sync[@]}"; do
      cp ./docs/cms/"$j" ./docs/"$i"/"$j"
    done

    for img in "${images_to_sync[@]}"; do
      cp ./docs/cms/images/"$img" ./docs/"$i"/images/"$img"
    done

    cp ./docs/cms/theme-development/theme-rename.md ./docs/"$i"/theme-rename.md
  done

    for i in "${ecommerce_projects[@]}"; do
      for j in "${ecommerce_files[@]}"; do
          cp ./docs/farmart/"$j" ./docs/"$i"/"$j"
      done
    done
}

sync_doc_files
