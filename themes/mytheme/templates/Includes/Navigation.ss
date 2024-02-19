<div class="flex w-full lg:max-w-1/3 xl:w-40 shrink-0 xl:mr-8">
    <a href="$LocalalisedHomeLink" class="mx-auto xl:mx-0">
        <img class="h-28 md:h-32 xl:h-40" src="$resourceURL('themes/mytheme/images/logo.svg')"
             alt="Logo">
    </a>
</div>

<nav class="w-0 lg:w-full px-16 flex">

	<ul class="hidden xl:flex justify-between items-center w-full ">
	<% loop $Menu(1) %>
		<li class="flex flex-col content-right tracking-widest
">
            <a href="$Link" class="text-gray-700 hover:text-primary-500 transition-colors duration-300 <% if $IsSection %>text-primary-500 border-b-2 border-solid border-primary-500 <% end_if %> text-lg uppercase">$MenuTitle</a>
        </li>
	<% end_loop %>
	</ul>

    <div class="absolute top-6 left-6 xl:hidden flex items-center">
        <button class="mobile-menu-button outline-none flex flex-col" aria-label="Mobile Menu">
            <div class="line-1 block w-10 h-1 bg-primary-500 mb-2 transition-all"></div>
            <div class="line-2 block w-10 h-1 bg-primary-500 mb-2 transition-all"></div>
            <div class="line-3 block w-10 h-1 bg-primary-500 transition-all"></div>
        </button>
    </div>

    <div class="mobile-menu pointer-events-none opacity-0 absolute w-full z-50 w-full transition-all h-screen max-h-0 py-2 top-[143px] bg-gray-300 w-full left-0 right-0 xl:hidden">
        <ul class="">
            <% loop $Menu(1) %>
                <li class="ml-10 p-2">
                    <a href="$Link" class="inline py-1 text-gray-700 hover:text-primary-500 <% if $IsSection %>text-primary-500 border-b-2 border-solid border-primary-500 <% end_if %> text-lg uppercase">$MenuTitle</a>
                </li>
            <% end_loop %>
        </ul>
    </div>
</nav>

<script>
	// Grab HTML Elements
	const btn = document.querySelector("button.mobile-menu-button");
	const menu = document.querySelector(".mobile-menu");

	// Add Event Listeners
	btn.addEventListener("click", () => {
	    menu.classList.toggle("opacity-100");
        menu.classList.toggle("max-h-0");
        menu.classList.toggle("max-h-screen");
        menu.classList.toggle("pointer-events-auto");

        btn.querySelector(".line-1").classList.toggle("rotate-45");
        btn.querySelector(".line-1").classList.toggle("translate-y-3");

        btn.querySelector(".line-2").classList.toggle("opacity-0");

        btn.querySelector(".line-3").classList.toggle("-rotate-45");
        btn.querySelector(".line-3").classList.toggle("-translate-y-3");
	});
</script>
