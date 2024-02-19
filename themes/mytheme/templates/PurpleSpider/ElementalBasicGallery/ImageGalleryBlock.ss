<div class="px-2 lg:px-0 my-10">
    <% if $Title && $ShowTitle %>
        <h2 class="text-primary-500 text-4xl mb-8 text-center">$Title</h2>
    <% end_if %>
    <% if $PhotoGalleryImages %>
        <div class="swiper w-full max-w-[1200px]">
            <div class="swiper-wrapper">
                <% loop $PhotoGalleryImages %>
                    <a href="$Image.DesktopImage.FitMax(2400,2400).URL" class="glightbox swiper-slide object-cover" data-gallery="gallery-{$Up.ID}">

<%--                        <% with $Image.setHTMLClass('aspect-auto lg:aspect-cinema object-center object-cover flex').setImgHTMLClass('object-cover w-full h-full') %>--%>
<%--                            $Me--%>
<%--                        <% end_with %>--%>
                        <img src="$Image.DesktopImage.FocusFill(1200,600).URL" class="object-cover"/>
                    </a>
                <% end_loop %>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    <% end_if %>
</div>
