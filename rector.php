<?php

declare(strict_types=1);

use DNADesign\Elemental\Models\BaseElement;
use Netwerkstatt\SilverstripeRector\Rector\DataObject\EnsureTableNameIsSetRector;
use Netwerkstatt\SilverstripeRector\Rector\Injector\UseCreateRector;
use Netwerkstatt\SilverstripeRector\Rector\Misc\AddConfigPropertiesRector;
use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\Config\RectorConfig;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Set\ValueObject\SetList;
use SilverStripe\Admin\ModelAdmin;
use SilverStripe\ORM\DataObject;

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
        LevelSetList::UP_TO_PHP_81,
        SetList::CODE_QUALITY,
        SetList::CODING_STYLE
    ]);

    //Silverstripe rules
    $rectorConfig->rule(EnsureTableNameIsSetRector::class);
    $rectorConfig->rule(UseCreateRector::class);

    $rectorConfig->ruleWithConfiguration(
        AddConfigPropertiesRector::class,
        [
            ModelAdmin::class => [
                'menu_title',
                'menu_icon_class'
            ],
            DataObject::class => [
                'owns',
                'translate',
                'defaults'
            ],
            \SilverStripe\Admin\LeftAndMain::class => [
              'url_segment'
            ],
            BaseElement::class => [
                'icon',
                'inline_editable'
            ],
            \SilverStripe\ORM\DataExtension::class => [
                'db',
                'has_one',
                'belongs_to',
                'has_many',
                'many_many',
                'many_many_extraFields',
                'belongs_many_many',
                'default_sort',
                'cascade_deletes',
                'cascade_duplicates',
                'searchable_fields',
                'summary_fields',
                'casting',
                'singular_name',
                'plural_name',
                'owns',
                'translate',
                'defaults'
            ],
            \SilverStripe\Core\Extension::class => [
                'allowed_actions',
                'url_handlers'
            ],
        ]
    );
};
