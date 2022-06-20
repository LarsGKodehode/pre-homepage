class TreeNode {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.#children = [];
  };
  
  #data;
  #parent;
  #children;

  addChild(node) {};
  removeAllChildren() {};
  getSize() {};
  matchAny(data) {};
  matchEvery(data) {};

  set data(data) {
    this.#data = data;
  };
  get data() {
    return this.#data;
  };

  set parent(node) {
    this.#parent = node;
  };
  get parent() {
    return this.#parent;
  };

  set children(node) {
    if (node instanceof TreeNode) {
      this.#children[this.#children.length] = node;
    };
  };
  get children() {
    return this.#children;
  };

  addChild(node) {
    node.parent = this;
    this.children = node;
  };

  removeAllChildren() {
    this.#children = [];
  };

  getSize() {
    let size = 1; // counts this node
    if (this.children.length === 0) {return size}; // no children
    for (const child of this.children) {
      size += child.getSize();
    };
    return size;
  };

  // traversal pattern, Depth First
  matchAny(data) {
    if (this.data === data) {return this};
    if (this.children.length !== 0) { // dive deeper
      for (const child of this.children) {
        let newMatch = child.matchAny(data);
        if (newMatch) {return newMatch};
      };
    };
    return false;
  };

  // traversal pattern, Depth First
  matchEvery(data) {
    let matches = [];
    if (this.data === data) {matches.push(this)};
    if (this.children.length !== 0) { // dive deeper
      for (const child of this.children) {
        matches.push(child.matchEvery(data));
      };
    };

    if (matches.length !== 0) {return matches}
  };
};



// ============================================
//  --------- Testing functionality ----------
// ============================================

// root node
const ancestor = new TreeNode("ancestor node");
ancestor.children = ["injected"];
// tests
console.log(`--- Testing root node ---`);
console.log(ancestor);
console.log(ancestor.data);
console.log(ancestor.parent);
console.log(ancestor.children);
console.log(`================================\n\n`);

// first child
ancestor.addChild(new TreeNode("child 01"));
ancestor.addChild(new TreeNode("child 02"));
// tests
console.log(`--- Testing child node ---`);
console.log(ancestor.children);
console.log(ancestor.children[0]);
console.log(`================================\n\n`);

// grandchildren
const child01 = ancestor.children[0];
child01.addChild(new TreeNode("grandchild 01"));
child01.addChild(new TreeNode("grandchild 02"));
child01.addChild(new TreeNode("grandchild 02"));
const grandchild01 = child01.children[0];
// tests
console.log(`--- Testing grandchildren ---`);
console.log(ancestor);
console.log(ancestor.children);
console.log(grandchild01.data);
console.log(`================================\n\n`);

// test size
console.log(`--- Testing sizeOf ---`);
console.log(ancestor.getSize());
console.log(`================================\n\n`);

// test matchAny
console.log(`--- Testing matchAny ---`);
console.log(ancestor.matchAny("ancestor node"));
console.log(ancestor.matchAny("grandchild 02"));
console.log(ancestor.matchAny("this should return false"));
console.log(`================================\n\n`);

// test matchEvery
console.log(`--- Testing matchEvery ---`);
console.log(ancestor.matchEvery("ancestor node"));
console.log(ancestor.matchEvery("grandchild 02"));
console.log(ancestor.matchEvery("this does not exist"));
console.log(`================================\n\n`);

// remove children
console.log(`--- Testing clear children ---`);
console.log(ancestor.children);
ancestor.removeAllChildren();
console.log(ancestor.children);
console.log(`================================\n\n`);