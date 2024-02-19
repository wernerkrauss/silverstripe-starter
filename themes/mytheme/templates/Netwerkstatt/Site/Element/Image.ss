<div
    class="object-center <% if $First && $Size == 'full'%>aspect-auto md:aspect-cinema lg:aspect-extra-wide overflow-hidden border-y-4 border-solid border-primary-500 flex items-center<% else %><% end_if %>">
    <% if $Image %>
        <% with $Image.setHTMLClass('aspect-auto lg:aspect-cinema object-none object-center w-full') %>
            $Me
        <% end_with %>
    <% end_if %>
</div>
