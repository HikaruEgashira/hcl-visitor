import { parseHCL, traverse } from "hcl-visitor";

async function main() {
    const hcl = `
    variable "region" {
        type = string
        default = "us-west-1"
    }
    `;

    const ast = await parseHCL(hcl);
    const node = ast.walk().currentNode;
    traverse(node, {
        attribute: (n) => {
            console.log(n);
        },
    });
}

main();
