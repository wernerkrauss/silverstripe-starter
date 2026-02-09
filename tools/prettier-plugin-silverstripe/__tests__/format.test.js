const prettier = require("prettier");
const path = require("path");
const plugin = require("../index.js");

const format = async (code) => {
  const options = {
    parser: "silverstripe",
    plugins: [path.join(__dirname, "../index.js")],
  };

  return await prettier.format(code, options);
};

describe("Silverstripe Prettier Plugin", () => {
  test("it should preserve simple variables", async () => {
    const input = `<div>$Title</div>`;
    const output = await format(input);
    expect(output.trim()).toBe(`<div>$Title</div>`);
  });

  test("it should preserve complex variables", async () => {
    const input = `<div>{$Complex.Property(Arg)}</div>`;
    const output = await format(input);
    expect(output.trim()).toBe(`<div>{$Complex.Property(Arg)}</div>`);
  });

  test("it should not break logic in attributes", async () => {
    const input = `<div class="field <% if $Error %>error<% end_if %>">$Field</div>`;
    const output = await format(input);
    expect(output).toContain('class="field <% if $Error %>error<% end_if %>"');
  });

  test("it should handle translation tags", async () => {
    const input = `<span><% _t('Entity.Key', 'Default') %></span>`;
    const output = await format(input);
    expect(output.trim()).toBe(
      `<span><% _t('Entity.Key', 'Default') %></span>`,
    );
  });

  test("it should handle nested logic", async () => {
    const input = `<div><% if $Foo %>$Bar<% else %>$Baz<% end_if %></div>`;
    const output = await format(input);
    expect(output.trim()).toBe(
      `<div><% if $Foo %>$Bar<% else %>$Baz<% end_if %></div>`,
    );
  });

  test("it should handle dynamic tags with identical opening and closing", async () => {
    const input = `<$Tag class="foo">$Content</$Tag>`;
    const output = await format(input);
    expect(output.trim()).toBe(`<$Tag class="foo">$Content</$Tag>`);
  });

  test("it should handle HeadingLevel variables", async () => {
    const input = `<h$HeadingLevel>$Title</h$HeadingLevel>`;
    const output = await format(input);
    expect(output.trim()).toBe(`<h$HeadingLevel>$Title</h$HeadingLevel>`);
  });

  test("it should handle complex HeaderField case", async () => {
    const input = `<h$HeadingLevel $AttributesHTML>$Title</h$HeadingLevel>`;
    const output = await format(input);
    expect(output.trim()).toContain(
      `<h$HeadingLevel $AttributesHTML>$Title</h$HeadingLevel>`,
    );
  });

  test("it should handle CompositeField_holder case", async () => {
    const input = `<$Tag class="field composite $extraClass" $AttributesHTML>\n<% if $Legend %><legend>$Legend</legend><% end_if %> $Field\n</$Tag>`;
    const output = await format(input);
    // Prettier might format the output with newlines and indentation
    expect(output).toContain(`</$Tag>`);
    expect(output).toContain(`<$Tag`);
  });
});
