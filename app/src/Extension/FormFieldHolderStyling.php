<?php

namespace Netwerkstatt\Site\Extension;

use SilverStripe\Core\Convert;
use SilverStripe\Core\Extension;

/**
 * Class \PGX\Shop\Extension\FormFieldHolderStyling
 *
 * @property \SilverStripe\Forms\FormField|\Netwerkstatt\Site\Extension\FormFieldHolderStyling $owner
 */
class FormFieldHolderStyling extends Extension
{
    /**
     * @var array
     */
    protected $holderClasses = [];

    public function addHolderClass($class)
    {
        $classes = preg_split('#\s+#', (string) $class);

        foreach ($classes as $class) {
            $this->holderClasses[$this->getOwnerID()][$class] = $class;
        }

        return $this->owner;
    }

    public function getHolderClasses(): string
    {
        if (!array_key_exists($this->getOwnerID(), $this->holderClasses)) {
            return 'w-full';
        }

        return implode(' ', $this->holderClasses[$this->getOwnerID()]);
    }

    public function getOwnerID()
    {
        return Convert::raw2htmlid($this->owner->getName());
    }
}
