<div class="content-element__content<% if $Style %> $StyleVariant<% end_if %> max-w-5xl mx-auto my-16">
    <% if $ShowTitle %>
        <h2 class="text-primary-500 text-center font-bold text-3xl mb-8">$Title</h2>
    <% end_if %>
    <div class="prose lg:prose-xl max-w-none">
        $HTML
    </div>
</div>
