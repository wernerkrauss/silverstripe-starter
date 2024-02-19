<div class="px-2 lg:px-0 my-10">
    <% if $ShowTitle %>
        <h2 class="text-primary-500 text-4xl mb-8">$Title</h2>
    <% end_if %>
    <% if $Content %>
        $Content
    <% end_if %>
    <% if $PromoList %>
        <div class="font-light text-base leading-6 color-black flex flex-col lg:flex-row items-stretch">
            <% loop $PromoList %>
                <% if $ElementLink %><a href="{$ElementLink.LinkURL}"{$ElementLink.TargetAttr}<% else %><div<% end_if %> class="mx-2 my-4 lg:my-0 <% if $Size == 'wide' %>lg:w-2/4 text-center <%-- lg:text-left --%> order-first lg:order-none <% else %>lg:w-1/4 text-center<% end_if %> flex flex-col grow shrink-0 group lg:first:ml-0 lg:last:mr-0"> <!-- Option im Modell vorsehen -->
                    <% if $Image &&  $Size == 'wide' %>
                        <img src="$Image.FocusFill(801,432).URL" class="h-96 w-full object-cover" lt="<% if $Image.Title %>$Image.Title.ATT<% else %>$Title.ATT<% end_if %>">
                    <% else_if $Image %>
                        <img src="$Image.FocusFill(477,432).URL" class="h-96 w-full object-cover" lt="<% if $Image.Title %>$Image.Title.ATT<% else %>$Title.ATT<% end_if %>">
                    <% end_if %>

                <div class="bg-primary-500 p-6 flex flex-grow items-center justify-center flex-col lg:flex-row <%-- if $Size == 'wide' %>justify-between<% end_if --%>">
                        <div class="h-full <%-- if $Size == 'wide' %> mr-4<% end_if --%>">
                            <% if $Title && $ShowTitle %>
                                <h3 class="text-white text-2xl font-medium font-dosis">$Title</h3><% end_if %>
                            <% if $Content %>
                                <div class="text-white font-dosis">$Content</div><% end_if %>
                        </div>
<%--                        <% if $ElementLink %><p class="<% if $Size == 'wide' %><% else %>hidden<% end_if %> flex-shrink-0 uppercase tracking-widest font-dosis inline rounded-full mt-8 lg:mt-0 px-8 py-4 text-primary-500 bg-white hover:bg-blue-500 hover:text-white transition-colors duration-300">--%>
<%--                            $ElementLink.Title--%>
<%--                        </p><% end_if %>--%>
                    </div>
                <% if $ElementLink %></a><% else %></div><% end_if %>
            <% end_loop %>
        </div>
    <% end_if %>
</div>
