<ul $AttributesHTML>
	<% loop $Options %>
		<li class="$Class inline-block mr-4">
			<input id="$ID" class="radio form-radio" name="$Name" type="radio" value="$Value"<% if $isChecked %> checked<% end_if %><% if $isDisabled %> disabled<% end_if %> <% if $Up.Required %>required<% end_if %> />
			<label for="$ID">$Title</label>
		</li>
	<% end_loop %>
</ul>
