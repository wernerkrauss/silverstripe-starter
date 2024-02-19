<div class="content-element__content<% if $Style %> $StyleVariant<% end_if %> mx-auto text-center my-16">
    <% if $ShowTitle %>
        <h2 class="text-primary-500 font-bold text-3xl mb-8">$Title</h2>
    <% end_if %>
    <div class="prose lg:prose-xl mx-auto">
        $HTML
    </div>
</div>
