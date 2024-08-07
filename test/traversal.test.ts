import { traverse, type Visitor } from "../lib/traversal";
import { describe, expect, it } from "bun:test";
import sinon from "sinon";

// Mock Parser.SyntaxNode
class MockSyntaxNode {
  type: string;
  children: MockSyntaxNode[];

  constructor(type: string, children: MockSyntaxNode[] = []) {
    this.type = type;
    this.children = children;
  }

  walk() {
    return {
      currentNode: this,
    };
  }
}

describe("traverse", () => {
  it("should call enter and leave methods of the visitor", () => {
    const enterSpy = sinon.spy();
    const leaveSpy = sinon.spy();

    const visitor: Visitor = {
      "nodeType": {
        enter: enterSpy,
        leave: leaveSpy,
      },
    };

    const tree = new MockSyntaxNode("nodeType");

    traverse(tree as any, visitor);

    expect(enterSpy.calledOnce).toBe(true);
    expect(leaveSpy.calledOnce).toBe(true);
  });

  it("should handle nodes without specific visitors", () => {
    const enterSpy = sinon.spy();
    const leaveSpy = sinon.spy();

    const visitor: Visitor = {
      "nodeType": {
        enter: enterSpy,
        leave: leaveSpy,
      },
    };

    const tree = new MockSyntaxNode("otherNodeType");

    traverse(tree as any, visitor);

    expect(enterSpy.called).toBe(false);
    expect(leaveSpy.called).toBe(false);
  });

  it("should handle nested nodes", () => {
    const enterSpy = sinon.spy();
    const leaveSpy = sinon.spy();

    const visitor: Visitor = {
      "nodeType": {
        enter: enterSpy,
        leave: leaveSpy,
      },
    };

    const childNode = new MockSyntaxNode("nodeType");
    const tree = new MockSyntaxNode("nodeType", [childNode]);

    traverse(tree as any, visitor);

    expect(enterSpy.calledTwice).toBe(true);
    expect(leaveSpy.calledTwice).toBe(true);
  });
});
