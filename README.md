# Botble Documentation

## Requirements

- Node.js ≥ 20 (see `.nvmrc`)
- npm (canonical lockfile is `package-lock.json`)

## Setup

```bash
git clone https://github.com/botble/docs.git

npm install

npm run docs:dev
```

`npm run docs:dev` and `npm run docs:build` automatically run `bin/shell_cmd.sh` first
to sync shared CMS docs into each theme.

## Deploy

```bash
bin/deploy.sh             # build locally, upload to docs.botble.com, switch atomically
bin/deploy.sh --rollback  # point the site back at the previous release
```

Never build on the server: it has too little RAM and the build takes every site on it down.
