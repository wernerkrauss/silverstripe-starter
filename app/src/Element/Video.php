<?php

namespace Netwerkstatt\Site\Element;

use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Forms\FieldList;
use SilverStripe\GraphQL\Schema\Exception\SchemaBuilderException;
use SilverStripe\ORM\ValidationException;

/**
 * Class \Netwerkstatt\Site\Element\Video
 *
 */
class Video extends BaseElement
{
    /**
     * @var string
     * @config
     */
    private static $icon = 'font-icon-fast-forward';

    /**
     * @return string
     * @config
     */
    private static $singular_name = 'Video';

    /**
     * @return string
     * @config
     */
    private static $plural_name = 'Videos';

    /**
     * @var string
     * @config
     */
    private static $table_name = 'ElementVideo';

    /**
     * @var string[]
     * @config
     */
    private static $db = [
    ];

    /**
     * @var array
     * @config
     */
    private static $has_one = [
    ];

    /**
     * @var array
     * @config
     */
    private static $owns = [
    ];

    /*
     * @config
     */
    /**
     * @config
     */
    private static $inline_editable = false;

    #[\Override]
    public function getCMSFields(): FieldList
    {
        $this->beforeUpdateCMSFields(static function (FieldList $fields) {
        });

        return parent::getCMSFields();
    }


    #[\Override]
    public function getSummary(): string
    {
        return 'Video';
    }

    #[\Override]
    protected function provideBlockSchema(): array
    {
        $blockSchema = [];
        try {
            $blockSchema = parent::provideBlockSchema();
        } catch (SchemaBuilderException|\SilverStripe\Core\Validation\ValidationException) {
        }

        $blockSchema['content'] = $this->getSummary();

        return $blockSchema;
    }

    #[\Override]
    public function getType(): string
    {
        return _t(self::class . '.BlockType', 'Video');
    }
}
