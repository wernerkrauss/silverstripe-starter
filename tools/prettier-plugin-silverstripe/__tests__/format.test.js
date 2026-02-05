const prettier = require("prettier");
const path = require("path");
const plugin = require("../index.js");

const format = async (code) => {
  const options = {
    parser: "silverstripe",
    plugins: [path.join(__dirname, "../index.js")],
  };
  const formattedMasked = await prettier.format(code, options);
  
  // The plugin masks during preprocess. We use the helper to unmask the result.
  // We need to pass the masks that were stored in options during preprocess
  return plugin.__postProcess(formattedMasked, options);
};

describe("Silverstripe Prettier Plugin", () => {
  test("it should preserve simple variables", async () => {
    const input = `<div>$Title</div>`;
    const output = await format(input);
    expect(output).toBe(`<div>$Title</div>\n`);
  });

  test("it should preserve complex variables", async () => {
    const input = `<div>{$Complex.Property(Arg)}</div>`;
    const output = await format(input);
    expect(output).toBe(`<div>{$Complex.Property(Arg)}</div>\n`);
  });

  test("it should not break logic in attributes", async () => {
    const input = `<div class="field <% if $Error %>error<% end_if %>">$Field</div>`;
    const output = await format(input);
    expect(output).toContain('class="field <% if $Error %>error<% end_if %>"');
  });

  test("it should handle translation tags", async () => {
    const input = `<span><% _t('Entity.Key', 'Default') %></span>`;
    const output = await format(input);
    expect(output).toBe(`<span><% _t('Entity.Key', 'Default') %></span>\n`);
  });

  test("it should handle nested logic", async () => {
    const input = `<div><% if $Foo %>$Bar<% else %>$Baz<% end_if %></div>`;
    const output = await format(input);
    expect(output).toBe(`<div><% if $Foo %>$Bar<% else %>$Baz<% end_if %></div>\n`);
  });

  test("it should handle dynamic tags with identical opening and closing", async () => {
    const input = `<$Tag class="foo">$Content</$Tag>`;
    const output = await format(input);
    // Prettier HTML parser should be able to parse this if $Tag is replaced by the same placeholder
    expect(output).toBe(`<$Tag class="foo">$Content</$Tag>\n`);
  });
});
