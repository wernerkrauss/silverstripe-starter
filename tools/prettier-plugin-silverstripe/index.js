const { parsers: htmlParsers, printers: htmlPrinters } = require("prettier/plugins/html");

const MASK_PREFIX = "ssm";
const MASK_SUFFIX = "m";
// Improved regex: 
// 1. Comments <%-- --%>
// 2. Tags <% %>
// 3. Variables with curly braces {$Var}
// 4. Variables $Var (not immediately following < or </)
const SS_TAG_REGEX = /<%--.*?--%>|<%.*?%>|\{\$.*?\}|\$[\w.]+(?:\(.*?\))?/gs;

function mask(text) {
  const masks = [];
  const maskMap = new Map();

  const maskedText = text.replace(SS_TAG_REGEX, (match, offset, fullText) => {
    const before = fullText.slice(0, offset);
    const isTagName = match.startsWith("$") &&
      (before.endsWith("<") || before.endsWith("</") || before.endsWith("<h") || before.endsWith("</h"));

    if (maskMap.has(match)) {
      const existing = maskMap.get(match);
      // We only reuse tag name placeholders if it was already used as a tag name
      // and vice versa for standard placeholders. 
      // Actually, let's keep it simple: if it's the same expression, use the same placeholder.
      // BUT: tag name placeholders 'ssvXv' must be used for tag names.
      // If the same variable is used both as a tag name and as content, we might need two masks
      // or just always use ssvXv if it's a variable? 
      // HTML parser is fine with ssvXv in content too.
      if (isTagName === existing.isTagName) {
        return existing.placeholder;
      }
    }

    let placeholder;
    if (isTagName) {
      placeholder = `ssv${masks.length}v`;
    } else {
      placeholder = `${MASK_PREFIX}${masks.length}${MASK_SUFFIX}`;
    }

    masks.push(match);
    maskMap.set(match, { placeholder, isTagName });
    return placeholder;
  });
  return { maskedText, masks };
}

function unmask(text, masks) {
  if (!masks) return text;
  return text.replace(new RegExp(`${MASK_PREFIX}(\\d+)${MASK_SUFFIX}|ssv(\\d+)v`, "g"), (match, index1, index2) => {
    const index = index1 !== undefined ? index1 : index2;
    return masks[parseInt(index, 10)];
  });
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
      ...htmlParsers.html,
      preprocess: (text, options) => {
        const { maskedText, masks } = mask(text);
        // Using a global or a more stable way to store masks for tests if options doesn't work
        options.ss_masks = masks;
        global.__ss_masks = masks; 
        return maskedText;
      },
    },
    // Override html parser to use our masking
    html: {
      ...htmlParsers.html,
      preprocess: (text, options) => {
        const { maskedText, masks } = mask(text);
        options.ss_masks = masks;
        global.__ss_masks = masks;
        return maskedText;
      },
    }
  },
  printers: {
    "html-ast": {
      ...htmlPrinters["html-ast"],
      print: (path, options, print) => {
        const result = htmlPrinters["html-ast"].print(path, options, print);
        // This is a hack because Prettier doesn't easily allow post-processing the final string 
        // in the printer without overriding the whole thing.
        // But for our tests, we need a way to unmask.
        return result;
      }
    }
  }
};

// Helper for tests and CLI to unmask the final string
function postProcess(text, options) {
  const masks = (options && options.ss_masks) || global.__ss_masks;
  if (masks) {
    return unmask(text, masks);
  }
  return text;
}

module.exports = silverstripePlugin;
module.exports.__unmask = unmask;
module.exports.__postProcess = postProcess;
