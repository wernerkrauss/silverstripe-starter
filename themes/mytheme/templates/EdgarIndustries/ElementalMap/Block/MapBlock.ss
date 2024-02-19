<div class="edgarindustries__elementalmap__block__content <% if $Style %>$CssStyle<% end_if %>">
    <% if $ShowMap %>
        <div id="elemental-map-{$ID}" class="z-40 w-full h-auto aspect-cinema"></div>
    <% end_if %>
    <% if $ShowMarkers %>
        <section class="mt-16">
            <div class="text-base w-full mx-auto leading-6 color-black items-stretch">
                <% loop $Markers.Sort('Sort') %>
                <div class="px-2 lg:px-0 my-16 w-full flex flex-col group md:flex-row">
                    <% if $PhotoGalleryImages.count %>
                        <div class="swiper w-full lg:w-3/5 object-cover max-h-96 lg:group-odd:order-last">

                            <div class="swiper-wrapper">
                                <% loop $PhotoGalleryImages %>
                                    <a href="$Image.DesktopImage.FitMax(2400,2400).URL"
                                       class="glightbox swiper-slide object-cover" data-gallery="gallery">
                                        <img src="$Image.DesktopImage.FocusFill(800,600).URL" class="object-cover"/>
                                    </a>
                                <% end_loop %>
                            </div>
                            <% if $PhotoGalleryImages.Count > 1 %>
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            <% end_if %>

                        </div>
                    <% end_if %>
                    <div class="mb-10 lg:mb-0 mt-8 <% if $Top.Style != 'justmarkerscentered' %> lg:-mt-20<% end_if %> <% if $PhotoGalleryImages.count %> lg:w-2/5<% end_if %> lg:group-odd:order-first text-center  my-auto">
                       <% if $Title %>
                            <h3 class="text-primary-500 text-4xl mb-8 font-dosis">$Title</h3><% end_if %>
                        <% if $Content %>
                            <div class="px-16 text-black text-lg mb-8 font-assistant">$Content</div><% end_if %>
                    </div>
                </div>
                <% end_loop %>
            </div>
        </section>
    <% end_if %>
</div>

<% if $ShowMap %>
    <% require css('edgarindustries/silverstripe-elemental-map:client/leaflet.css') %>
    <% require javascript('edgarindustries/silverstripe-elemental-map:client/leaflet.js') %>

    <script>
        var map{$ID} = L.map('elemental-map-{$ID}').setView([{$DefaultLatitude}, {$DefaultLongitude}], {$DefaultZoom});

        L.tileLayer('{$TileUrl.RAW}', {$LeafletParams.RAW}).addTo(map{$ID});

            <% if $Markers %>
                <% loop $Markers %>
                var map{$Up.ID}marker{$ID} = L.marker([{$Latitude}, {$Longitude}]).addTo(map{$Up.ID});

                    <% if $PopupContent %>
                    map{$Up.ID}marker{$ID}.bindPopup(`{$PopupContent}`);
                    <% end_if %>
                <% end_loop %>
            <% end_if %>
    </script>
<% end_if %>
