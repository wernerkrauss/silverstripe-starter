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

⚠️ Please note, **you also need to rename the paths to your theme in**
* ./ddev/config.yml (post-start-hook command)
* app/config/theme.yml (ssviewer and vitehelper settings)

This starter uses vite and tailwindcss for frontend. Vite comes with a dev server and hot reloading; start it with:

```bash
cd themes/mytheme
ddev yarn run dev
```

The vite dev server needs the current server name set in a ENV variable:

```dotenv
VITE_DEV_SERVER_URL="https://starter-ddev.ddev.site:5173/"
```

## Useful ddev Commands
### Build Database
```bash
ddev sake db:build -f
```

### Run Silverstripe Tasks
To get a list of tasks run
```bash
ddev sake tasks
```

To get infos about a task run e.g.

```bash
ddev sake tasks:i18nTextCollectorTask -h
```

## Developer Tools

### Composer
Install all packages locally
```bash
ddev composer install
```

### SS Shell
[SS Shell](https://github.com/pstaender/ssshell) is a tool to tinker around in CLI, based on [PsyShell](https://psysh.org/). You can open the shell using

```bash
 ddev php vendor/bin/ssshell 
```
Or the even shorter version:
```bash
 ddev tinker 
```

You can get DataObjects like in any code (e.g. `Page::get()->byID(42)`), run methods on objects, etc.

Inside ssshell you can run `help` to see a list of available commands.

### PHP Code Sniffer

Code Sniffer is a tool to detect violations of a defined coding standard (mostly PSR-12)

See phpcs.xml.dist for the ruleset used.

Detect violations

```bash
ddev composer run lint
```

or
```bash
ddev lint
```

Fix most violations automatically
```bash
ddev composer run fix
```

or the shortcut
```bash
ddev fix
```

### PHPStan
PHP Static Code Analyzer is a tool to detect bugs in your code without running it. It can be used to detect type errors, dead code, and other issues.

Don't be too much annoyed by the errors. Rector can fix a lot of them automatically.

A level of 4 should be doable.

```bash
ddev composer run phpstan
```

or
```bash
ddev stan
```

### Rector
Rector is a tool to refactor code automatically. It can be used to upgrade code to a newer version of Silverstripe or PHP.

See rector.php for rules and configuration.

```bash 
ddev composer run rector-dry #dry run
ddev composer run rector
```

or
```bash
ddev rector --dry-run #dry-run
ddev rector 
```

For the first time run it's recommended to refactor rule by rule. Run rector-dry to see which rules would be applied, then let rector change the code.


[//]: # (## Populate fixtures:)

[//]: # (```bash)

[//]: # (ddev sake dev/tasks/PopulateTask)

[//]: # (```)


## TODO
1. [ ] ssslug module for SS6 (map marker)
2. [ ] map element and mapbox field for backend
3. [ ] Silverstripe Piwik SS6
4. [ ] Address Extension for SiteConfig - show in Address.ss
5. [ ] Adress/Contact Element
6. [ ] implement ssshell and document usage
7. [ ] cookieconsent default settings

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
