import { generateHCL, parseHCL } from "../lib/parse";
import { describe, expect, it } from "bun:test";

describe("parseHCL", () => {
  it("should correctly parse HCL code", async () => {
    const code = 'variable "image_id" { default = "ami-123456" }';
    const tree = await parseHCL(code);
    // expect(tree).toBeInstanceOf(Parser.Tree);
    expect(tree.rootNode.type).toBe("config_file");
  });
});

describe("generateHCL", () => {
  it("should generate a string representation of the parsed tree", async () => {
    const code = 'variable "image_id" { default = "ami-123456" }';
    const tree = await parseHCL(code);
    const generatedHCL = generateHCL(tree);
    expect(generatedHCL).toContain("variable");
    expect(generatedHCL).toContain("image_id");
    expect(generatedHCL).toContain("default");
    expect(generatedHCL).toContain("ami-123456");
  });
});
