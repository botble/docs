# Virtual host

- [Windows (Ampps)](#windows-ampps)
- [Windows (Xampp)](#windows)
- [Linux or OSX](#linux_osx)

<a name="windows-ampps"></a>
## Windows (Ampps)
**We recommend to use Ampps (https://www.ampps.com) instead of Xampp to create develop environment. With Ampps, you can easy to add/manage virtual domain like cms.local.**

Please see video: https://www.youtube.com/watch?v=F1CaiR3L9FQ
<a name="windows"></a>
## Windows (Xampp)

**- Add domain in your hosts file. Go to `Windows/system32/drivers/etc/hosts`**

```bash
127.0.0.1 your-domain.local
```

**- Then go to `<xampp installation folder>/apache/config/extra/httpd-vhosts.conf`**

```bash
#your-domain.local
<VirtualHost *:80>
  ServerName your-domain.local
  DocumentRoot "**your-project-folder/public**"
  <Directory "**your-project-folder/public**">
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

**- Example:**

```bash
#cms.local
<VirtualHost *:80>
  ServerName cms.local
  DocumentRoot "D:\Projects\botble\public"
  <Directory "D:\Projects\botble\public">
    AllowOverride All
    Require all granted
  </Directory>
</VirtualHost>
```

**- After that, restart apache.**

Well done! Now, you can access the project by go to `http://your-domain.local`

<a name="linux_osx"></a>
## Linux or OSX

> {info} Please use this package to easy create Virtualhost: https://github.com/RoverWire/virtualhost