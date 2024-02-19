<% if $ShowElement %>
    <div class="element $SimpleClassName.LowerCase<% if $StyleVariant %> $StyleVariant<% end_if %><% if $ExtraClass %> $ExtraClass<% end_if %> w-full<% if $Size == 'default' %> max-w-6xl mx-auto<% end_if %> lg:scroll-mt-56" id="$Anchor">
        <%--    Size: $Size--%>
        $Element
    </div>
<% end_if %>
