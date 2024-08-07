# HCL Visitor

## Quick Start

```bash
npm install hcl-visitor
```

```javascript
import { parseHCL, traverse } from "hcl-visitor";

const hcl = `
variable "region" {
  type = string
  default = "us-west-1"
}
`;

const ast = await parseHCL(hcl);
const node = ast.walk().currentNode;
traverse(node, {
  attribute: (node) => {
    console.log(node);
  },
});
```

## Versioning

v1.1.0

https://github.com/tree-sitter-grammars/tree-sitter-hcl
