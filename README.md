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

## Usage

- GitHub Actions

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2
  - name: Setup Node.js
    uses: actions/setup-node@v2
    with:
      node-version: "14"
  - name: Install Dependencies
    run: npm install
  - name: Run Tests
    run: npm test
```

## Versioning

v1.1.0

https://github.com/tree-sitter-grammars/tree-sitter-hcl
