import Parser from "web-tree-sitter";

export async function parseHCL(code: string) {
  await Parser.init();
  const parser = new Parser();
  const HCL = await Parser.Language.load(
    `${__dirname}/../tree-sitter-hcl.wasm`,
  );
  parser.setLanguage(HCL);
  const tree = parser.parse(code);
  return tree;
}

export function generateHCL(tree: Parser.Tree) {
  return tree.rootNode.text;
}
