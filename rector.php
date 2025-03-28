<?php

declare(strict_types=1);

use Netwerkstatt\SilverstripeRector\Rector\DataObject\EnsureTableNameIsSetRector;
use Netwerkstatt\SilverstripeRector\Rector\Injector\UseCreateRector;
use Netwerkstatt\SilverstripeRector\Rector\Misc\AddConfigPropertiesRector;
use Netwerkstatt\SilverstripeRector\Set\SilverstripeLevelSetList;
use Netwerkstatt\SilverstripeRector\Set\SilverstripeSetList;
use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Set\ValueObject\SetList;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__ . '/app/_config.php',
        __DIR__ . '/app/src',
    ]);
    $rectorConfig->autoloadPaths([
    ]);
//    $rectorConfig->bootstrapFiles([
//        __DIR__ . '/vendor/stevie-mayhew/silverstripe-svg/code/SVGTemplate.php'
//    ]);


//    // register a single rule
    $rectorConfig->rule(InlineConstructorDefaultToPropertyRector::class);
//
//    // define sets of rules
    $rectorConfig->sets([
        LevelSetList::UP_TO_PHP_83,
        SetList::CODE_QUALITY,
        SetList::CODING_STYLE,
        SilverstripeSetList::CODE_STYLE,
        SilverstripeLevelSetList::UP_TO_SS_6_0
    ]);

    //Silverstripe rules
    $rectorConfig->rule(EnsureTableNameIsSetRector::class);
    $rectorConfig->rule(UseCreateRector::class);

// example how to configure rector for custom  @config properties
    $rectorConfig->ruleWithConfiguration(\Rector\Renaming\Rector\Name\RenameClassRector::class, [
        'SilverStripe\ORM\DataExtension' => 'SilverStripe\Core\Extension',
        'SilverStripe\View\ArrayData' => 'SilverStripe\Model\ArrayData',
    ]);

//    $rectorConfig->ruleWithConfiguration(
//        AddConfigPropertiesRector::class,
//        [
//            \SilverStripe\Admin\LeftAndMain::class => [
//              'url_segment'
//            ],
//         ]
//    );
};
