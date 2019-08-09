# Mail

- [Send mail](#send_mail)
- [Email template](#email_template)

<a name="send_mail"></a>
## Send mail

```php
EmailHandler::send(string $content, string $title, ['name' => string $reciever_name, 'to' => string $reciever_email]);
```

Ex:

```php
EmailHandler::send('Hello there', 'Test email', ['name' => 'Sang Nguyen', 'to' => 'sangit7b@gmail.com']);
```
    
Email content with parameters: `core/acl/src/Http/Controllers/AuthController.php:151`

```php
$data = [
    'user' => $user->username,
    'token' => $reminder->code,
    'name' => $user->getFullName(),
    'email' => $user->email,
];

EmailHandler::send(
    view('acl::emails.reminder', $data)->render(), 
    trans('acl::auth.email.invite.title'),
    ['name' => $user->getFullName(), 'to' => $user->email]
);
```
    
<a name="email_template"></a>
## Email template

The email template is located in `core/base/resources/views/system/email.blade.php`

![Email template](https://lh3.googleusercontent.com/fmPrvfxFNT_3BmjKLyrWpxDGdO8qhVOKiNmj7jllWj-uIwpq6AyCagkf1_AFsTetp68Edi00cRnZyfaaEuCnpyTr1eymGGjBkrR5fuIyID32M0SLsaa5KG4vnZNMVhynbEqPiB2v9rbOrS-plAXBE1mn1dzlfabajNey93fp8z13UoKVZEnp3Mrm5tLJY1vK01IHIAbPyZevkMifK1u0-Qr8ORgu1TFJ0c_EMuYSPpzi8g1IePJuANgUpy_4vFdUr8G0LAx3XqXe0XXbHVWBLAVBJ4B1vEJGmSHf4mL_vR7W9ualcyjdJUXmAdt8RheQLvdu3IjkDQp_867D18vheY0k5C1-O3ttE4iV8Jr8PGx4YLgO3ktPKW14CFZYuKggogEpErM0sYPiX7F0msZz8aUNlVru6iuEybiFKl_lOE2JW4IhREcnwKSFtZlmkG5uJ6aQMyuGihi-9gMZZo8p9ACagy2HqFh2D0fYGz29JwJ9eYlxFNPNypcWZM3_0mQ6EdhboJLWtJmZiB9sstorKTx0fPORdQm6euIZyvlgscJt0VHmJMuZ6oQQpX-lEKwkQ2-9u0CN9EUnZK8v7fEiYLVRaCPdOU6TSjWZ9Mck4ELHfYutN8KZ=w2560-h1670-no)

To use custom email template:

```php
EmailHandler::setEmailTemplate(string $path_to_view);
```
    
Ex: Default email template setting

```php
EmailHandler::setEmailTemplate('bases::system.email'); // config('cms.email_template')
```