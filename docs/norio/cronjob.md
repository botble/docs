# Setup cronjob

Command:

```bash
* * * * * /usr/local/bin/php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1
```

Check our Cronjob set up instruction in Admin -> Platform administration -> Cronjob.

## For cPanel hosting

For setting up a cron job in cPanel, watch this video tutorial:

<iframe width="100%" height="400" src="https://www.youtube.com/embed/t5mjWGegE-g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## For Hostinger.com

::: warning
Hostinger's cron field does not run the command through a shell, so `>> /dev/null 2>&1` is passed to Laravel as
arguments and the job fails with `No arguments expected for "schedule:run" command, got ">>"`.

On Hostinger, enter the command **without** the redirection:

```bash
/usr/local/bin/php /path-to-your-project/artisan schedule:run
```

Hostinger captures the output itself (visible via the **View Output** button), so the redirection is not needed.
:::

* Go to Dashboard -> Advanced -> Cron Jobs

![Image](../cms/images/cronjob-setup-on-hostinger.png)

If you have more than 1 domain on Hostinger, you need to select the domain you want to set up the cron job.

![Image](../cms/images/cronjob-setup-on-hostinger-multiple-domains.png)

* Verify your cronjob is running or not.

![Image](../cms/images/cronjob-verify.png)
