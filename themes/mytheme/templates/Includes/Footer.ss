<footer class="site-footer w-full bg-blue-500 py-16 mt-auto grow-0 self-end">
    <div class="container max-w-6xl mx-auto bg-green-500">
        <nav>
            <% cached $CurrentReadingMode, $CurrentUser.ID, $Locale, $MenuLink.max('LastEdited') %>
            <ul class="text-white flex flex-wrap lg:flex-nowrap  leading-8 lg:gap-4 justify-between mx-4 lg:mx-0">

                <% loop $MenuSet('footer') %>
                    <li class="w-1/2 lg:w-full mb-8 lg:mb-0">
                        <% if $Enabled && $LinkURL %>
                            <a href="{$LinkURL}"{$TargetAttr} class="$Class uppercase text-lg">
                                {$Title}
                            </a>
                            <% if $Children %>
                                <ul class="mt-2">
                                    <% loop $Children %>
                                        <% if $Enabled && $LinkURL %>
                                        <li>
                                            <a href="{$LinkURL}"{$TargetAttr}{$ClassAttr}>
                                                {$Title}
                                            </a>
                                        </li>
                                        <% end_if %>
                                    <% end_loop %>
                                </ul>
                            <% end_if %>
                        <% end_if %>
                    </li>
                <% end_loop %>
                <li>
                    <% if $SiteConfig.CookieIsActive %>
                        <span onClick="klaro.show();return false;" class="cursor-pointer"><%t Kraftausdruck\KlaroCookie.MODALLINK "Cookie settings" %></span><% end_if %>
                </li>
            </ul>
            <% end_cached %>
        </nav>

        <div></div>

        <div>

            <%-- Newsletter and Social Icons --%>
        </div>

    </div>
</footer>
