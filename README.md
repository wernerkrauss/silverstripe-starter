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
ddev vite dev
```

### Frontend Workflows (Vite & Prettier)

Optimized DDEV commands are available for frontend development, utilizing Node.js within the container. 

**Note:** These commands automatically detect the active theme from the Silverstripe configuration (`SSViewer.themes`). They will ignore special themes like `$public` or `$default` and use the first custom theme folder found in `./themes/`.

* **Start Vite Dev Server:**
  ```bash
  ddev vite dev
  ```
* **Create Production Build:**
  ```bash
  ddev vite build
  ```
* **Check Code Formatting:**
  ```bash
  ddev prettier check
  ```
* **Automatically Fix Code Formatting:**
  ```bash
  ddev prettier write
  ```

Formatting covers JavaScript, CSS/SCSS, and Silverstripe templates (`.ss`).

The vite dev server needs the current server name set in a ENV variable:

```dotenv
VITE_DEV_SERVER_URL="https://starter-ddev.ddev.site:5173/"
```

## Useful ddev Commands
### Build Database
```bash
ddev sake db:build -f
```
or 
```bash
 ddev build 
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

This command also runs `prettier check` to verify frontend formatting.

Fix most violations automatically
```bash
ddev composer run fix
```

or the shortcut
```bash
ddev fix
```

This command also runs `prettier write` to format frontend assets.

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


### Prettier
Prettier is a JavaScript tool for code formatting. It's configured in the base theme to format SS templates. 
It's recommended to use it for all JavaScript and CSS files. It's also used to format SS templates in the base theme. See also the configuration file `themes/mytheme/.prettierrc`.

```bash
ddev prettier check #dry-run
ddev prettier write #change files
```

### Jack
Jack is a tool for checking and lifting composer dependencies. It's configured to check for outdated dependencies and lifter to update them automatically.

```bash
ddev jack breakpoint #check for outdated packages
ddev jack open-versions #allow newer, non breaking major versions
ddev jack raise-to-installed #update versions to the latest installed versions
```

### CI
This starter template comes with a CI tool, that includes all the relevant tools for continuous integration:
- PHPUnit: unit tests
- PHPCS: code sniffer and linting for PHP code
- Prettier: code formatting for JavaScript, CSS and Silverstripe templates
- Rector: code update for PHP
- PHPStan: static analysis tool for PHP code
- Jack: composer updated checker and lifter


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

## PHPStorm integration
### DDEV Plugin

### Node.js + PhpStorm + DDEV Setup (Windows + WSL2)

A compact guide to quickly set up project-specific Node.js using nvm, PhpStorm, and DDEV.

---

#### 1. WSL Project Location

- Open project in WSL, **not C:\**
- Example path:  
#### 2. Install nvm in WSL 
```bash 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash source ~/.bashrc 
``` 
#### 3. Install Project Node Version 
```bash 
# Check DDEV Node version 
ddev ssh node -v 
# Install same version in WSL 
nvm install <version> 
nvm use <version> 
# Optional: create .nvmrc for project 
echo "<version>" > .nvmrc 
nvm use 
``` 
#### 4. PhpStorm Node Setup 
- `File → Settings → Languages & Frameworks → JavaScript Runtime` 
- **Add WSL Node interpreter** 
- Distribution: `Ubuntu` 
- - Node path: `/home/<user>/.nvm/versions/node/v<version>/bin/node`
- Package manager is auto-detected. 

#### 5. ESLint / Prettier (Optional) - ESLint: 
 Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint ` 
- Node interpreter: WSL Node 
- ESLint package: `themes/<mytheme>/node_modules/eslint` 
- Prettier: `Settings → Languages & Frameworks → JavaScript → Prettier `
  - Node interpreter: WSL Node 
  - Prettier package: `themes/<mytheme>/node_modules/prettier`

#### 6. Run Configurations 
- Use *WSL Node* as runtime 
- Package manager: *Custom → ddev npm*
- Commands execute like: 
  - `bash ddev npm run dev`
#### 7. DDEV Config Sync 
```yaml 
# .ddev/config.yaml 
nodejs_version: "22" 
``` 
- Keep `.nvmrc` same as DDEV version.

#### 8. Quick Test 
```bash 
which node 
node -v 
ddev npm -v 
``` 
- PhpStorm Run Script → should execute via `ddev npm run <script>`. 
### ✅ Notes 
- Always open projects from **WSL**, not Windows paths. 
- nvm manages Node for IDE; DDEV handles container builds.
- `.nvmrc` ensures consistent Node across environments.
- Avoids conflicts with local Windows Node versions.