<?php

namespace Netwerkstatt\Site\Element;

use SilverStripe\Core\Validation\ValidationException;
use Override;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\Image as SSImage;
use DNADesign\Elemental\Models\BaseElement;
use SilverStripe\Forms\FieldList;
use SilverStripe\GraphQL\Schema\Exception\SchemaBuilderException;
use SilverStripe\ORM\FieldType\DBField;

class Image extends BaseElement
{
    /**
     * @var string
     * @config
     */
    private static string $icon = 'font-icon-block-file';

    /**
     * @return string
     * @config
     */
    private static string $singular_name = 'Image';

    /**
     * @return string
     * @config
     */
    private static string $plural_name = 'Images';

    /**
     * @var string
     * @config
     */
    private static string $table_name = 'ElementImage';

    /**
     * @var string[]
     * @config
     */
    private static array $db = [
        'Caption' => 'Varchar(255)'
    ];

    /**
     * @var array
     * @config
     */
    private static array $has_one = [
        'Image' => SSImage::class,
    ];

    /**
     * @var array
     * @config
     */
    private static array $owns = [
        'Image',
    ];

    /**
     * @var bool
     * @config
     */
    private static bool $inline_editable = false;

    #[Override]
    public function getCMSFields(): FieldList
    {
        $this->beforeUpdateCMSFields(function (FieldList $fields): void {
            $imageField = $fields->fieldByName('Root.Main.Image')
                ?->setFolderName('Uploads/ElementImage')
                ?->setAllowedFileCategories('image');
            if ($imageField instanceof UploadField) {
                $imageField->setAllowedMaxFileNumber(1);
            }
        });

        return parent::getCMSFields();
    }


    #[Override]
    public function getSummary(): string
    {
        if ($this->Image()->exists()) {
            $summary = implode(' - ', [$this->Image()->Name, $this->Caption]);
            return DBField::create_field('HTMLText', $summary)->Summary(20);
        }

        return parent::getSummary();
    }

    #[Override]
    protected function provideBlockSchema(): array
    {
        $blockSchema = [];
        try {
            $blockSchema = parent::provideBlockSchema();
        } catch (SchemaBuilderException|ValidationException) {
        }

        $blockSchema['content'] = $this->getSummary();

        return $blockSchema;
    }

    #[Override]
    public function getType(): string
    {
        return _t(self::class . '.BlockType', 'Image');
    }
}
