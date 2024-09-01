# HCL Visitor

HCL Visitor is a library for traversing HashiCorp Configuration Language (HCL) ASTs.

## Features

- parseHCL: Parse HCL string to AST
- generateHCL: Generate HCL string from AST
- traverse: Traverse AST nodes

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
    uses: actions/checkout@v4
  - name: Setup HCL Visitor
    run: npm i hcl-visitor
    shell: bash
  - name: Run Script
    uses: actions/github-script@v7
    with:
      script: |
        const { parseHCL, traverse } = require("hcl-visitor");
        # Your script here
```

## Versioning

v1.1.0

https://github.com/tree-sitter-grammars/tree-sitter-hcl

# 日本語版 HCL Visitorについて

HCL VisitorはHashiCorp Configuration Language (HCL) ASTをトラバースするためのライブラリです。

## 機能

- parseHCL: HCL文字列をASTにパース
- generateHCL: ASTからHCL文字列を生成
- traverse: ASTノードをトラバース

## クイックスタート

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

## 実用的な使い方

- GitHub Actions

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Setup HCL Visitor
    run: npm i hcl-visitor
    shell: bash
  - name: Run Script
    uses: actions/github-script@v7
    with:
      script: |
        const { parseHCL, traverse } = require("hcl-visitor");
        # ここにスクリプトを記述
```
