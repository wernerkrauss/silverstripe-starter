<header class="w-full bg-white border-b-4 border-solid border-primary-500">
    <section class="flex relative w-full max-w-6xl mx-auto py-2">
        <% include Navigation %>
        <div class="secondary-nav absolute bg-gray-300 xl:bg-white xl:top-0 right-1 flex pl-4 rounded-b-3xl">
            <div class="flex items-center text-sm uppercase tracking-normal">
                <div class="flex mr-5 cursor-pointer" id="header-address-toggle">
                    <%--                    <span class="text-xs xl:text-sm max-xl:drop-shadow-white"><img--%>
                    <%--                        src="$resourceURL('themes/mytheme/images/email-action-unread-1.svg')" alt="E-Mail"--%>
                    <%--                        class="h-4 xl:h-5 mr-3"></span>--%>
                    <span class="text-xs xl:text-sm max-xl:drop-shadow-white"><img
                            src="<%-- $resourceURL('themes/mytheme/images/phone-2.svg') --%>" alt="E-Mail"
                            class="h-4 xl:h-5 mr-1"></span>
                    <%--                    <span class="text-xs xl:text-sm max-xl:drop-shadow-white"><img--%>
                    <%--                        src="$resourceURL('themes/mytheme/images/maps-pin-1.svg')" alt="E-Mail"--%>
                    <%--                        class="h-4 xl:h-5 mr-3"></span>--%>
                    <span><%t Header.Contact 'Contact' %></span>
                </div>
                <div class="flex mr-3 md:mr-5">
                    <a class="text-xs xl:text-sm max-xl:drop-shadow-white" href="$LocaleInformation('de_DE').Link"><img
                            src="<%-- $resourceURL('themes/mytheme/images/flag_de.svg')--%>" alt="Flagge Deutschland"
                            class="h-4 xl:h-6 mr-3"></a>
                    <a class="text-xs xl:text-sm max-xl:drop-shadow-white hidden md:block"
                       href="$LocaleInformation('de_DE').Link">Deutsch</a>
                </div>

                <div class="flex mr-5">
                    <a class="text-xs xl:text-sm max-xl:drop-shadow-white" href="$LocaleInformation('en_GB').Link"><img
                            src="<%--$resourceURL('themes/mytheme/images/flag_en.svg')--%>" alt="Flag Britain"
                            class="h-4 xl:h-6 mr-3"></a>
                    <a class="text-xs xl:text-sm max-xl:drop-shadow-white hidden md:block"
                       href="$LocaleInformation('en_GB').Link">English</a>
                </div>
            </div>

        </div>
    </section>
    <% include Address %>
</header>
<script>
    // Grab HTML Elements
    const toggle = document.querySelector("#header-address-toggle");
    const address = document.querySelector("#header-address");
    const addressClose = document.querySelector("#header-address-close");

    // Add Event Listeners
    toggle.addEventListener("click", () => {
        let isHidden = address.classList.contains("hidden");
        address.classList.remove("hidden");
        address.classList.toggle("opacity-100");
        if (!isHidden) {
            window.setTimeout(() => {
                address.classList.add("hidden");
            }, 500);
        }

    });
    addressClose.addEventListener("click", () => {
        let isHidden = address.classList.contains("hidden");
        address.classList.remove("hidden");
        address.classList.toggle("opacity-100");
        if (!isHidden) {
            window.setTimeout(() => {
                address.classList.add("hidden");
            }, 500);
        }
    });
</script>
