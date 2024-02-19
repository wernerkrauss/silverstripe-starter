<?php

namespace Netwerkstatt\Site\Extension;

use SilverStripe\ORM\DataExtension;
use SilverStripe\Security\Permission;
use SilverStripe\Security\PermissionProvider;

/**
 * Class \Netwerkstatt\Site\Extension\CMSPermissions
 *
 * @property \EdgarIndustries\ElementalMap\Model\MapMarker|\Netwerkstatt\Site\Extension\CMSPermissions $owner
 */
class CMSPermissions extends DataExtension implements PermissionProvider
{

    /**
     * Return a map of permission codes to add to the dropdown shown in the Security section of the CMS.
     * array(
     *   'VIEW_SITE' => 'View the site',
     * );
     */
    public function providePermissions(): array
    {
        return [
            'CMS_MANAGE_ITEM' => ['name' => 'Items bearbeiten', 'category' => _t('SilverStripe\Security\Permission.CONTENT_CATEGORY', 'Content permissions')],
            'CMS_DELETE_ITEM' => ['name' => 'Items löschen', 'category' => _t('SilverStripe\Security\Permission.CONTENT_CATEGORY', 'Content permissions')]
        ];
    }

    public function canCreate($member = null): bool
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member) ||
            Permission::check('CMS_MANAGE_ITEM', 'any', $member);
    }

    public function canView($member = null): bool
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member) ||
            Permission::check('CMS_MANAGE_ITEM', 'any', $member);
    }

    public function canEdit($member = null): bool
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member) ||
            Permission::check('CMS_MANAGE_ITEM', 'any', $member);
    }

    public function canDelete($member = null): bool
    {
        return Permission::check('CMS_ACCESS_CMSMain', 'any', $member) ||
            Permission::check('CMS_DELETE_ITEM', 'any', $member);
    }
}
