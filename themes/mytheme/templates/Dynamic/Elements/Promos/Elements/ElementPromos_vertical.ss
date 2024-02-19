<div class="px-2 lg:px-0 my-10">
    <% if $ShowTitle %>
        <h2 class="text-primary-500 text-4xl mb-8">$Title</h2>
    <% end_if %>
    <% if $Content %>
        $Content
    <% end_if %>
    <% if $PromoList %>
        <div class="text-base w-full mx-auto leading-6 color-black flex-col lg:flex-row items-stretch">
            <% loop $PromoList %>
                <div class="px-2 lg:px-0 my-16 w-full flex flex-col group md:flex-row">
                    <% if $Image %>
                        <div class="swiper w-full lg:w-3/5 object-cover max-h-96 lg:group-odd:order-last">
                            <div class="swiper-wrapper">
                                <a href="$Image.URL" class="glightbox " data-gallery="gallery-$ID">
                                    <img src="$Image.FocusFill(800,600).URL" class="w-full object-cover"
                                         alt="<% if $Image.Title %>$Image.Title.ATT<% else %>$Title.ATT<% end_if %>">
                                </a>
<%--                                <a href="$Image.URL" class="glightbox swiper-slide" data-gallery="gallery-$ID">--%>
<%--                                    <img src="$Image.FocusFill(800,600).URL" class="w-full object-cover"--%>
<%--                                         alt="<% if $Image.Title %>$Image.Title.ATT<% else %>$Title.ATT<% end_if %>">--%>
<%--                                </a>--%>
                            </div>
                            <% if $PhotoGalleryImages.Count > 1 %>
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            <% end_if %>
                        </div>
                    <% end_if %>

                    <div class="mb-10 lg:mb-0 mt-8 lg:mt-0 lg:w-2/5 lg:group-odd:order-first text-center my-auto">
                        <% if $Title && $ShowTitle %>
                            <h3 class="text-primary-500 text-4xl mb-8 font-dosis">$Title</h3><% end_if %>
                        <% if $Content %>
                            <div class="px-16 text-black text-lg mb-8 font-assistant">$Content</div><% end_if %>
                        <% if $ElementLink %>
                            <p class="mb-8 uppercase tracking-widest font-dosis inline rounded-full py-4 text-white px-8 bg-primary-500 hover:bg-red-500 transition-colors duration-300">$ElementLink</p><% end_if %>
                    </div>
                </div>
            <% end_loop %>
        </div>
    <% end_if %>
</div>
