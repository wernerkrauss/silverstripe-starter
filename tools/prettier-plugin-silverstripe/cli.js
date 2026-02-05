#!/usr/bin/env node
const { format, resolveConfig } = require("prettier");
const fs = require("fs");
const path = require("path");
const ssPlugin = require("./index.js");

const MASK_PREFIX = "ssm";
const MASK_SUFFIX = "m";

async function run() {
  const args = process.argv.slice(2);
  const isWrite = args.includes("--write");
  const glob = require("glob");
  const patterns = args.filter(arg => !arg.startsWith("--"));
  
  // Try to find the project root and theme path to load Tailwind plugin if available
  const projectRoot = process.cwd();
  let tailwindPluginPath = null;
  
  // We assume we are running from project root, and the theme might be in themes/*
  // Search for prettier-plugin-tailwindcss in the theme's node_modules or project's node_modules
  const searchPaths = [
    path.join(projectRoot, "node_modules", "prettier-plugin-tailwindcss", "dist", "index.mjs"),
    path.join(projectRoot, "node_modules", "prettier-plugin-tailwindcss", "lib", "index.js"),
    path.join(projectRoot, "node_modules", "prettier-plugin-tailwindcss", "index.js"),
  ];
  
  // Also check themes/mytheme/node_modules if we can guess the theme
  const themeMatch = patterns.find(p => p.includes("themes/"));
  if (themeMatch) {
      const parts = themeMatch.split(/[\\\/]/);
      const themesIndex = parts.indexOf('themes');
      if (themesIndex !== -1 && parts.length > themesIndex + 1) {
          const themeName = parts[themesIndex + 1];
          const themeNodeModules = path.join(projectRoot, "themes", themeName, "node_modules", "prettier-plugin-tailwindcss");
          searchPaths.push(path.join(themeNodeModules, "dist", "index.mjs"));
          searchPaths.push(path.join(themeNodeModules, "lib", "index.js"));
          searchPaths.push(path.join(themeNodeModules, "index.js"));
      }
  }

  for (const p of searchPaths) {
      if (fs.existsSync(p)) {
          tailwindPluginPath = p;
          break;
      }
  }

  let files = [];
  for (const pattern of patterns) {
    files = files.concat(glob.sync(pattern));
  }

  let hasChanges = false;
  let errorCount = 0;
  let formattedCount = 0;

  for (const file of files) {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, "utf8");
    
    try {
      const config = await resolveConfig(filePath);
      const masks = [];
      const maskMap = new Map();
      const maskedText = content.replace(/<%--.*?--%>|<%.*?%>|\{\$.*?\}|\$[\w.]+(?:\(.*?\))?/gs, (match, offset, fullText) => {
        // Special case: if it's a variable and we're inside a tag name position
        // e.g. <$Var> or </$Var> or <h$Level>
        const before = fullText.slice(0, offset);
        const isTagName = match.startsWith("$") && 
          (before.endsWith("<") || before.endsWith("</") || before.endsWith("<h") || before.endsWith("</h"));
        
        if (maskMap.has(match)) {
          const existing = maskMap.get(match);
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

      const options = {
        ...config,
        parser: "html", // Temporarily tell Prettier it's HTML
        plugins: [
          path.join(__dirname, "index.js"),
          ...(tailwindPluginPath ? [tailwindPluginPath] : [])
        ],
        // Ensure tailwind config path is absolute and relative to the config file (or current workdir)
        ...(config && config.tailwindConfig ? { 
          tailwindConfig: path.resolve(projectRoot, "themes", "mytheme", config.tailwindConfig) 
        } : {}),
      };

      const formattedMasked = await format(maskedText, options);
      
      const finalOutput = ssPlugin.__unmask(formattedMasked, masks);

      if (isWrite) {
        if (content !== finalOutput) {
          fs.writeFileSync(filePath, finalOutput);
          console.log(`[fixed] ${file}`);
          formattedCount++;
        }
      } else {
        if (content !== finalOutput) {
          console.error(`[warn] ${file}`);
          hasChanges = true;
        }
      }
    } catch (e) {
      console.error(`[error] ${file}: ${e.message.split('\n')[0]}`);
      errorCount++;
    }
  }

  if (isWrite) {
    console.log(`\nDone! Fixed ${formattedCount} files. ${errorCount} files had syntax errors and were skipped.`);
  } else {
    if (hasChanges) {
      console.error("\nCode style issues found in the above files. Run 'ddev prettier write' to fix.");
    }
    if (errorCount > 0) {
      console.error(`${errorCount} files could not be parsed due to complex Silverstripe/HTML mixing.`);
    }
    
    if (!hasChanges && errorCount === 0) {
      console.log("All matched files use Prettier code style!");
    } else if (hasChanges) {
      process.exit(1);
    }
  }
}

run();
