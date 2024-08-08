#!/usr/bin/env node

/**
 * Bundles dependencies from node_modules into a single file, to be used in the browser.
 */
import assert from "node:assert";
import path from "node:path";
import process from "node:process";
import { parseArgs } from "node:util";

import esbuild from "esbuild";

const ROOT = path.resolve(new URL("../", import.meta.url).pathname);
const ROOT_FOLDER_NAME = "mind-expander";

export function exitWithError(originalError, customErrorMsg) {
  console.error(customErrorMsg);
  console.error(originalError);
  process.exit(1);
}

let customErrorMsg = null;
try {
  customErrorMsg = "\n\nERROR: this script must be run from the root dir.\n\n";
  assert.strictEqual(path.basename(process.cwd()), ROOT_FOLDER_NAME);

  customErrorMsg = "\n\nERROR: this script is in the incorrect folder.\n\n";
  assert.strictEqual(path.basename(ROOT), ROOT_FOLDER_NAME);
} catch (e) {
  exitWithError(e, customErrorMsg);
}

const ENTRY_POINT = path.resolve(ROOT, "src/deps-declared.js");
const OUTFILE = path.resolve(ROOT, "src/deps-bundled.mjs");

const COMMON_OPTIONS = {
  entryPoints: [ENTRY_POINT],
  bundle: true,
  outfile: OUTFILE,
  platform: "browser",
  format: "esm",
};

const COMMON_DEV_OPTIONS = {
  ...COMMON_OPTIONS,
  sourcemap: true,
};

const COMMON_PROD_OPTIONS = {
  ...COMMON_OPTIONS,
  minify: true,
};

async function watch() {
  console.log('Starting "watch" mode...');
  console.log("Press Ctrl+C to stop.");

  let context = await esbuild.context({
    ...COMMON_DEV_OPTIONS,
    plugins: [
      {
        name: "add-console-separator",
        setup(build) {
          build.onStart(() => {
            console.log("----------------------------------------------------");
          });
        },
      },
    ],
  });

  process.on("SIGINT", async () => {
    console.log("Cleaning up...");
    await context.dispose();
    console.log("Done. Bye!");
    process.exit(0);
  });

  await context.watch();
}

async function dev() {
  console.log('Running "dev" mode...');
  await esbuild.build(COMMON_DEV_OPTIONS);
  console.log("Done.");
}

async function prod() {
  console.log('Running "prod" mode...');
  await esbuild.build(COMMON_PROD_OPTIONS);
  console.log("Done.");
}

function main() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      mode: {
        type: "string",
        default: watch.name,
        short: "m",
        description: "Which mode to run the script in.",
      },
    },
  });

  switch (values.mode) {
    case watch.name:
      watch();
      break;

    case dev.name:
      dev();
      break;

    case prod.name:
      prod();
      break;

    default:
      console.error(`Invalid mode: ${values.mode}`);
      process.exit(1);
  }
}

main();
