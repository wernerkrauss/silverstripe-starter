<?php

namespace Netwerkstatt\Site\Forms;

use SilverStripe\Forms\GridField\GridField_ActionMenu;
use SilverStripe\Forms\GridField\GridFieldDetailForm;
use Symbiote\GridFieldExtensions\GridFieldOrderableRows;

if (!class_exists('\SilverStripe\Lumberjack\Forms\GridFieldConfig_Lumberjack')) {
    return;
}

class GridFieldConfig_Lumberjack extends \SilverStripe\Lumberjack\Forms\GridFieldConfig_Lumberjack
{
    public function __construct($itemsPerPage = null)
    {
        parent::__construct($itemsPerPage);

        //sorting
        $this->addComponent(GridFieldOrderableRows::create('Sort'));

        //extrafields (left/right/new)
        $this->addComponent(GridField_ActionMenu::create());
        $this->addComponent(GridFieldDetailForm::create(null, true, false));
    }
}
