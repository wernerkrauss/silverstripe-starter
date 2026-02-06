#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

async function run() {
  const args = process.argv.slice(2);
  const isWrite = args.includes("--write");
  const glob = require("glob");
  const patterns = args.filter(arg => !arg.startsWith("--"));
  
  // Try to find the project root and theme path to load Tailwind plugin if available
  const projectRoot = process.cwd();
  let tailwindPluginPath = null;
  let prettierPath = "prettier"; // Default to global/npx
  
  // Also check themes/mytheme/node_modules if we can guess the theme
  const themeMatch = patterns.find(p => p.includes("themes/"));
  let themeNodeModules = null;
  if (themeMatch) {
      const parts = themeMatch.split(/[\\\/]/);
      const themesIndex = parts.indexOf('themes');
      if (themesIndex !== -1 && parts.length > themesIndex + 1) {
          const themeName = parts[themesIndex + 1];
          themeNodeModules = path.join(projectRoot, "themes", themeName, "node_modules");
          
          // Try to load prettier from theme's node_modules
          const themePrettier = path.join(themeNodeModules, "prettier", "index.js");
          if (fs.existsSync(themePrettier)) {
              prettierPath = themePrettier;
          }
      }
  }

  const { format, resolveConfig } = require(prettierPath);
  const ssPlugin = require("./index.js");

  const searchPaths = [
    path.join(projectRoot, "node_modules", "prettier-plugin-tailwindcss", "dist", "index.mjs"),
    path.join(projectRoot, "node_modules", "prettier-plugin-tailwindcss", "lib", "index.js"),
    path.join(projectRoot, "node_modules", "prettier-plugin-tailwindcss", "index.js"),
  ];
  
  if (themeNodeModules) {
      const themeTailwind = path.join(themeNodeModules, "prettier-plugin-tailwindcss");
      searchPaths.push(path.join(themeTailwind, "dist", "index.mjs"));
      searchPaths.push(path.join(themeTailwind, "lib", "index.js"));
      searchPaths.push(path.join(themeTailwind, "index.js"));
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
      
      const options = {
        ...config,
        parser: "silverstripe",
        plugins: [
          path.join(__dirname, "index.js"),
        ],
      };
      
      // If we found tailwind plugin, add it to the plugins list
      if (tailwindPluginPath) {
          options.plugins.push(tailwindPluginPath);
      }
      
      // Ensure Tailwind processes .ss files by treating them as HTML
      options.filepath = filePath.replace(/\.ss$/, ".html");
      
      // Also ensure the tailwind config path is correct relative to the file
      if (themeNodeModules) {
          const themeDir = path.dirname(themeNodeModules);
          options.tailwindConfig = path.join(themeDir, "tailwind.config.js");
      }

      const formatted = await format(content, options);
      
      // Since prettier format returns the final string, and our plugin now 
      // uses the preprocess hack, we might still need to unmask if we want to 
      // be 100% sure, but wait, the plugin's preprocess is called inside format.
      // We still need the unmasking because the plugin doesn't have a post-format hook.
      const finalOutput = ssPlugin.__postProcess(formatted);

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
