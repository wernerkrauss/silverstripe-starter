# Netwerkstatt Silverstripe Starter

## Configure ddev:
```bash
ddev config --project-name test
```

## Start ddev, install packages:

ddev runs composer install, dev/build and frontend install and build on startup.

```bash
ddev start
```
If you want to run it manually, you can run:
```bash
ddev composer install
ddev yarn --cwd=themes/mytheme  
ddev yarn --cwd=themes/mytheme build 
```
## Frontend settings

You can rename the theme to your own theme name. 

Please note, you also need to rename the paths to your theme in
* ./ddev/config.yml (post-start-hook command)
* app/config/theme.yml (ssviewer and vitehelper settings)

This starter uses vite and tailwindcss for frontend. Vite comes with a dev server and hot reloading; start it with:

```bash
cd themes/mytheme
yarn run dev
```

The vite dev server needs the current server name set in a ENV variable:

```dotenv
VITE_DEV_SERVER_URL="https://starter-ddev.ddev.site:5173/"
```

## Populate fixtures:
```bash
ddev sake dev/tasks/PopulateTask
```


TODO: ~~Image Block~~
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

Add the deploy key to your github or gitlab repository


### install composer

```bash

ssh user@yourserver

software install composer

```

### configure deploy.php

vendor/bin/dep deploy:setup

* configure webroot
* create database on the server
* create .env in /releases/ 
* add SSL certificate
* switch https redirect on


### live deploy

```bash
vendor/bin/dep deploy
```
or
```bash
ddev composer deploy
```
