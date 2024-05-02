# Silverstripe Starter

Configure ddev:
```bash
ddev config --project-name test
```

Start ddev, install packages:
```bash
ddev start
ddev composer install
ddev yarn --cwd=themes/mytheme install 
ddev yarn --cwd=themes/mytheme build 
```

You can rename the theme to your own theme name. 

Populate fixtures:
```bash
ddev sake dev/tasks/PopulateTask
```


TODO: Image Block
TODO: ssslug module for SS5 (map marker)
TODO: map element and mapbox field for backend
TODO: Silverstripe Piwik SS5
TODO: Address Extension for SiteConfig - show in Address.ss
TODO: Adress/Contact Element

## Deploy to hetzner
### copy ssh key
```bash
ssh-copy-id user@yourserver
```

Deploy Key zu github/gitlab repo hinzufügen


### install composer

```bash

ssh user@yourserver

software install composer

```

### deploy.php anpassen

vendor/bin/dep deploy:setup

* Webroot anpassen
* DB anlegen
* .env in /releases/ anlegen
* SSL Zertifikat anlegen
* HTTPS Weiterleitung einschalten


### live deploy

```bash
vendor/bin/dep deploy
```
oder
```bash
ddev composer deploy
```
