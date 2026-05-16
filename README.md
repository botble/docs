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
