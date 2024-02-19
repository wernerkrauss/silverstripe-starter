<?php

namespace Netwerkstatt\Site\Admin;

use EdgarIndustries\ElementalMap\Model\MapMarker;
use SilverStripe\Admin\ModelAdmin;

/**
 * Class \Netwerkstatt\Site\Admin\MapAdmin
 *
 */
class MapAdmin extends ModelAdmin
{
    /**
     * @config
     */
    private static $managed_models = [
        MapMarker::class
    ];

    /**
     * @config
     */
    private static $url_segment = 'maps';

    /**
     * @config
     */
    private static $menu_title = 'Locations';
}
