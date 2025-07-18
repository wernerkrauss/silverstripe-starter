<?php

namespace Netwerkstatt\Site\Extension;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;

/**
 * Class \Netwerkstatt\Site\Extension\DisableMenuLink
 *
 * @property \gorriecoe\Menu\Models\MenuLink|\Netwerkstatt\Site\Extension\DisableMenuLink $owner
 * @property bool $Enabled
 */
class DisableMenuLink extends Extension
{
    /**
     * @config
     */
    private static array $db = [
        'Enabled' => 'Boolean'
    ];

    /**
     * @config
     */
    private static array $defaults = [
        'Enabled' => 1
    ];

    /**
     * @config
     */
    private static array $summary_fields = [
        'Enabled'
    ];


    public function updateCMSFields(FieldList $fields): void
    {
        $fields->insertAfter('Title', CheckboxField::create('Enabled', 'Aktiv'));
    }
}
