# Botble Docs

[docs.botble.com](http://docs.botble.com)

## Installation

- `git clone https://github.com/botble/docs.git`
- `cp .env.example .env`
- `composer install`
- `php artisan key:generate`
- `npm install`
- `npm run dev` / `npm run prod`

## Update Docs

- `php artisan docs:update`
- `php artisan docs:update <doc>`
- `php artisan docs:update <doc> <version>`

## Configure Docs

See [docs.yml](packages/docs/docs.yml).
