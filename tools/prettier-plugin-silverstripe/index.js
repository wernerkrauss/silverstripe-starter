const prettier = require("prettier");

const MASK_PREFIX = "ssmask";
const MASK_SUFFIX = "ksams";
const SS_TAG_REGEX = /<%--.*?--%>|<%.*?%>|\{\$.*?\}|\$[\w.]+(?:\(.*?\))?/gs;

function mask(text) {
  const masks = [];
  const maskMap = new Map();

  const maskedText = text.replace(SS_TAG_REGEX, (match) => {
    if (maskMap.has(match)) {
      return maskMap.get(match);
    }

    // Variables starting with $ are masked as ssv...v
    // which is valid as both tag name and content in Prettier's HTML parser.
    const placeholder = match.startsWith("$")
      ? `ssv${masks.length}v`
      : `${MASK_PREFIX}${masks.length}${MASK_SUFFIX}`;

    masks.push(match);
    maskMap.set(match, placeholder);
    return placeholder;
  });

  // Load plugins for internal call
  const internalPlugins = [];
  try {
    // Check if tailwind is installed in the project
    const tailwindPath = require.resolve("prettier-plugin-tailwindcss", {
      paths: [process.cwd()],
    });
    internalPlugins.push(tailwindPath);
  } catch (e) {
    // Tailwind not found, that's fine
  }

  return { maskedText, masks, internalPlugins };
}

function unmask(text, masks) {
  if (!masks) return text;
  return text.replace(
    new RegExp(`${MASK_PREFIX}(\\d+)${MASK_SUFFIX}|ssv(\\d+)v`, "g"),
    (match, index1, index2) => {
      const index = index1 !== undefined ? index1 : index2;
      return masks[parseInt(index, 10)];
    },
  );
}

const silverstripePlugin = {
  languages: [
    {
      name: "Silverstripe",
      parsers: ["silverstripe"],
      extensions: [".ss"],
      vscodeLanguageIds: ["silverstripe"],
    },
  ],
  parsers: {
    silverstripe: {
      parse: async (text, options) => {
        const { maskedText, masks, internalPlugins } = mask(text);

        // Call prettier.format internally
        const formatted = await prettier.format(maskedText, {
          ...options,
          parser: "html",
          plugins: internalPlugins,
        });

        const unmasked = unmask(formatted, masks);

        return {
          type: "silverstripe-ast",
          body: unmasked,
        };
      },
      astFormat: "silverstripe-printer",
      locStart: () => 0,
      locEnd: (node) => (node.body ? node.body.length : 0),
    },
  },
  printers: {
    "silverstripe-printer": {
      print: (path) => path.node.body,
    },
  },
};

module.exports = silverstripePlugin;
module.exports.__unmask = unmask;
module.exports.mask = mask;
