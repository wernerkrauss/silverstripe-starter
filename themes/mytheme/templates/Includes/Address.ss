<div id="header-address"
    class="hidden opacity-0 absolute bg-white border-solid border-2 border-primary-500 rounded p-6 shadow-lg top-12 left-[50%] translate-x-[-50%] z-50 transition-opacity">
    <div id="header-address-close" class="absolute -top-3 -right-3 bg-white border-solid border-2 border-primary-500 rounded-full w-6 h-6 text-primary-500 text-center leading-4 font-bold">x</div>
    <div class="mx-auto w-md  leading-6"
         itemtype="http://schema.org/Hotel" itemscope="">
        <div class="flex no-wrap">
            <span itemprop="name" class="text-primary-500 text-xl md:text-2xl">NAME</span>
            <span itemprop="starRating" itemscope itemtype="http://schema.org/Rating" class="w-20">
    				<span itemprop="author" itemscope itemtype="http://schema.org/Organization">
     					<span itemprop="name" class="hidden">WKO</span>
					</span>
				</span>
        </div>
        <br>
         <div itemtype="http://schema.org/PostalAddress" itemscope="" itemprop="address">
            		<span itemprop="streetAddress">STR</span>,
					<span class="no-wrap">
						<span itemprop="postalCode">PLZ</span>
						<span itemprop="addressLocality">ORT</span>,
						<span itemprop="addressCountry">Austria</span>
					</span>
				<br>
            <div class="mt-2"><img src="<%-- $resourceURL('themes/mytheme/images/phone-2.svg') --%>" alt="E-Mail" class="h-4 mr-1 inline">
					<a itemprop="telephone" class="text-primary-500"
                       href="tel:+43xxxx" content="+43 xxx xxxx">
						  +43 XXX XXXX</a></div>



                <div class="mt-2"><img src="<%--$resourceURL('themes/mytheme/images/email-action-unread-1.svg')--%>" alt="E-Mail"
                     class="h-4 mr-1 inline">
                	<a itemprop="email" href="mailto:office@netwerkstatt.at"
                       class="text-primary-500">office@netwerkstatt.at</a></div>
				</div>

        <span itemtype="http://schema.org/GeoCoordinates" itemscope="" itemprop="geo">
					<meta content="47.56" itemprop="latitude">
			  		<meta content="13.64" itemprop="longitude">
    			</span>
    </div>
</div>
