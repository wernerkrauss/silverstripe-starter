<div class="content-element__content<% if $Style %> $StyleVariant<% end_if %> py-12">
    <% if $ShowTitle %>
        <div class="flex w-full">
            <div class="bg-primary-500 h-0.5 lg:h-1 grow mt-10 md:mt-12 lg:mt-16"></div>
            <h1 class="text-primary-500 text-3xl md:text-4xl lg:text-6xl text-center uppercase font-dosis my-6 lg:my-8 px-4 md:px-6 lg:px-8 max-w-sm md:max-w-xl lg:max-w-3xl grow-0 shrink">$Title</h1>
            <div class="bg-primary-500 h-0.5 lg:h-1 grow mt-10 md:mt-12 lg:mt-16"></div>
        </div>
    <% end_if %>
    <div class="prose lg:prose-xl text-center max-w-4xl mx-auto px-10 md:px-0">
        $HTML
    </div>
</div>
