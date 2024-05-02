<?php

namespace Deployer;

require 'recipe/composer.php';
require 'recipe/silverstripe.php';

$user = '';
$php_cli = 'php81';
$git_repository = '';
$hostname = '';
$hostIp = '';

set('repository', $git_repository);


host($hostname)
    ->set('hostname', $hostIp)
    ->set('port', 222)
    ->set('remote_user',$user)
    ->set('forward_agent', true)
    ->set('ssh_multiplexing',false)
    ->set('http_user', $user)
    ->set('bin/composer', $php_cli . ' -d allow_url_fopen=On ~/.linuxbrew/bin/composer')
    ->set('stage','live')
    ->set('deploy_path', '/usr/www/users/' . $user); // Define the base path to deploy your project to.


// env('timezone', 'DE');
// env('branch', ''); // Branch to deploy.
set('default_stage', 'live');

set('bin/php', $php_cli);

set('repository', $git_repository);
set('keep_releases', 5);

// Silverstripe shared dirs
set('shared_dirs', [
    'public/assets'
]);

desc('create silverstripe-cache');
task('silverstripe:cachedir', function () {
    run('mkdir -p {{release_path}}/silverstripe-cache');
}
);

desc('set PHP Version to 8.1 in test domain');
task('silverstripe:php81', function() {
    run('sed -i \'1s/^/FcgidWrapper "home\/httpd\/cgi-bin\/php81-fcgi-starter.fcgi" .php  \n\n/\' {{release_path}}/public/.htaccess');
});

//add task cachedir to the task list
after('deploy:update_code', 'silverstripe:cachedir');
after('silverstripe:buildflush', 'silverstripe:php81');


// If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

after('deploy', 'deploy:success');
