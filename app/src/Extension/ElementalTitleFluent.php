<?php

namespace Netwerkstatt\Site\Extension;

use DNADesign\Elemental\Forms\TextCheckboxGroupField;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\FieldList;
use TractorCow\Fluent\Extension\FluentExtension;

/**
 * Class \Netwerkstatt\Site\Extension\ElementalTitleFluent
 *
 * @property \DNADesign\Elemental\Models\BaseElement|\Dynamic\BaseObject\Model\BaseElementObject|\Netwerkstatt\Site\Extension\ElementalTitleFluent $owner
 */
class ElementalTitleFluent extends Extension
{
    public function updateCMSFields(FieldList $fields): void
    {
        if (!$this->getOwner()->hasExtension(FluentExtension::class)) {
            return;
        }

        $titleField = $fields->fieldByName('Root.Main.Title');

        if ($titleField instanceof TextCheckboxGroupField) {
            $this->getOwner()->updateFluentCMSField($titleField);
        }
    }
}
