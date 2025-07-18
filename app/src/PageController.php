<?php

namespace {

    use Override;
    use Page;
    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\CMS\Model\SiteTree;
    use SilverStripe\i18n\i18n;

    /**
     * Class \PageController
     *
     * @property Page $dataRecord
     * @method Page data()
     * @mixin Page
     */
    class PageController extends ContentController
    {
        /**
         * An array of actions that can be accessed via a request. Each array element should be an action name, and the
         * permissions or conditions required to allow the user to access it.
         *
         * <code>
         * [
         *     'action', // anyone can access this action
         *     'action' => true, // same as above
         *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
         *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
         * ];
         * </code>
         *
         * @var array
         * @config
         */
        private static $allowed_actions = [];

        #[Override]
        protected function init()
        {
            parent::init();
            // You can include any CSS or JS required by your project here.
            // See: https://docs.silverstripe.org/en/developer_guides/templates/requirements/
        }

        public function getLocalalisedHomeLink(): string
        {
            $home = SiteTree::get()
                ->filter(['URLSegment' => 'home'])
                ->first();

            return $home->LocaleInformation(i18n::get_locale())->getLink();
        }
    }
}
