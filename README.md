# Silverstripe Starter

Configure ddev:
```bash
ddev config --projectname test
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


TODO: Update to SS5
TODO: Image Block
TODO: ssslug module for SS5 (map marker)
TODO: map element and mapbox field for backend
TODO: Silverstripe Piwik SS5