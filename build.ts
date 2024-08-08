import * as esbuild from "esbuild";
import { $ } from "bun";

const distBasePath = `${import.meta.dir ?? "."}/dist`;

await Promise.all([
  Bun.build({
    entrypoints: ["index.ts"],
    outdir: `${distBasePath}/import`,
    target: "node",
    format: "esm",
    splitting: true,
    // minify: true,
    naming: "[dir]/[name].m[ext]",
  })
    .then(console.info)
    .catch(console.error),

  esbuild
    .build({
      entryPoints: ["index.ts"],
      bundle: true,
      //   minify: true,
      outdir: `${distBasePath}/require`,
      platform: "node",
      format: "cjs",
      target: "esnext",
      outExtension: { ".js": ".cjs" },
      absWorkingDir: import.meta.dir,
    })
    .then(console.info)
    .catch(console.error),
]);

await $`cp tree-sitter-hcl.wasm ${distBasePath}`;
await $`cp node_modules/web-tree-sitter/tree-sitter.wasm ${distBasePath}/require`;
