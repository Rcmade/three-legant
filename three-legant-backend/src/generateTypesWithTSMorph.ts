import { Project } from "ts-morph";
import * as fs from "fs";
import path from "path";

// Initialize ts-morph project and point to your tsconfig.json for proper type resolution
const project = new Project({
  tsConfigFilePath: "./tsconfig.json",
});

// Load the source file
const sourceFile = project.addSourceFileAtPath("./src/rpc.ts");

// Get all type aliases and interfaces from the source file
const typeAliases = sourceFile.getTypeAliases();
const interfaces = sourceFile.getInterfaces();

// Start building the output string for apiResponse.d.ts
let output = `import { ZodParsedType } from "zod";\n\n`;

// Helper function to normalize import paths to avoid absolute paths
const normalizeImportPaths = (resolvedType: string) => {
  return resolvedType.replace(/["'][^"']*["']/g, (match) => {
    if (match.includes("rpc")) {
      // Replace absolute paths containing 'rpc' with a relative path
      return '"./rpc"';
    }
    if (match.includes("zod")) {
      // Replace zod paths with an import from zod
      return '"zod"';
    }
    return match;
  });
};

// Iterate over all type aliases and resolve their full type definitions
typeAliases.forEach((typeAlias) => {
  const resolvedType = typeAlias.getType().getText(typeAlias);
  const typeName = typeAlias.getName();
  const normalizedType = normalizeImportPaths(resolvedType);
  output += `export type ${typeName} = ${normalizedType};\n\n\n\n`;
});

// Iterate over all interfaces and resolve their full definitions
interfaces.forEach((interfaceDecl) => {
  const interfaceText = interfaceDecl.getText();
  output += `${interfaceText}\n\n\n\n`;
});

// Define the output directory for apiResponse.d.ts
const outputDirectory = path.join(
  __dirname,
  "../../three-legant-frontend/src/types/apiResponse.d.ts"
);

// Write the final output to apiResponse.d.ts
fs.writeFileSync(outputDirectory, output, "utf8");

console.log(
  "apiResponse.d.ts has been created with all the types dynamically!"
);
