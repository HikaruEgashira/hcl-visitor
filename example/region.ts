import type Parser from "web-tree-sitter";
import { parseHCL, traverse } from "hcl-visitor";

async function getDefaultRegion(node: Parser.SyntaxNode): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    traverse(node, {
      block: (node) => {
        // variable "region" {
        // ^----------------
        if (
          node.child(0)?.type === "identifier" &&
          node.child(0)?.text === "variable" &&
          node.child(1)?.type === "string_lit" &&
          node.child(1)?.text === '"region"'
        ) {
          traverse(node, {
            attribute: (node) => {
              // default = "xxx"
              // ^------
              if (node.child(0)?.text === "default") {
                resolve(node.child(2)?.text!);
              }
            },
          });
        }
      },
    });

    reject("No default value found");
  });
}

const ast = await parseHCL(`
  variable "region" {
    type = string
    default = "us-west-2"
  }
`);

const node = ast.walk().currentNode;
const defaultValue = await getDefaultRegion(node);
console.log(defaultValue);
// Output: us-west-2
