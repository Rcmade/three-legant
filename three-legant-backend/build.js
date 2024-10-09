const { build } = require("esbuild");

build({
  entryPoints: ["src/index.ts"], // Your entry point
  bundle: true, // Bundle all dependencies
  minify: true, // Minify the output for production
  sourcemap: false, // Set to 'true' if you want source maps for debugging
  platform: "node", // Target Node.js environment
  target: "es2020", // Set the JavaScript target to ES2020
  outfile: "dist/index.js", // Output file location
  tsconfig: "tsconfig.json", // Path to your tsconfig.json file
  external: ["hono"], // Externalize dependencies if necessary (helps reduce size)
}).catch(() => process.exit(1));
