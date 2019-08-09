# Introduction
- [Requirement](#requirement)
- [Installation](#installation)
- [Note](#note)

<a name="requirement"></a>
## Requirement

**We recommend to use Ampps (https://www.ampps.com) instead of Xampp to create develop environment. With Ampps, you can easy to add/manage virtual domain like cms.local https://www.youtube.com/watch?v=F1CaiR3L9FQ**

- Apache, nginx, or another compatible web server.
- PHP >= 7.1.3 >> Higher
- MySQL Database server
- PDO PHP Extension
- OpenSSL PHP Extension
- Mbstring PHP Extension
- Exif PHP Extension
- Fileinfo Extension
- XML PHP Extension
- Ctype PHP Extension
- JSON PHP Extension
- Tokenizer PHP Extension
- Module Re_write server
- PHP_CURL Module Enable

>  {warning} On this project, I use the latest Laravel version (currently 5.8). Please go to [Laravel documentation page](https://laravel.com/docs) for more information.

<a name="installation"></a>
## Installation

* Run `composer install` to download vendor packages

* Create `.env` file from `.env-example` and update your configuration

* Run `php artisan migrate` to create database structure

* Run `php artisan cms:user:create` to create admin user

* Run `php artisan vendor:publish --tag=cms-public --force`

* Run `php artisan cms:theme:assets:publish ripple`

* Run `php artisan storage:link`

* Run the first test with command `php artisan serve`. Open `http://localhost:8000`, you should see home page of Botble CMS


**If you need sample data, you can import it from `database.sql`**

**Botble should run on a virtual host. Create a virtual host like cms.local to run Botble CMS. Follow these steps to see how to config virtual host: [Setup virtual host](/cms/3.5/virtualhost).** 

<a name="note"></a>
## Note

This site can only be run at domain name, not folder link.

On your localhost, setting virtual host. Something like `http://cms.local` is okay.

Cannot use as `http://localhost/cms/...`.

Please remove `public` in your domain also, you can point your domain to `public` folder

or use `.httaccess` (https://stackoverflow.com/questions/23837933/how-can-i-remove-public-index-php-in-the-url-generated-laravel)

Follow these steps to see how to config virtual host: [Setup virtual host](/cms/3.5/virtualhost).

Well done! Now, you can login to the dashboard by access to your_domain_site/admin.

    Username: botble
    Password: 159357

Enjoy!
