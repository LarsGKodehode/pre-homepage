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
  containsFirst(data) {};

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
    if (this.#children.length === 0) {return size}; // no children
    for (let child of this.#children) {
      size += child.getSize();
    };
    return size;
  };

  containsFirst(data) {

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
console.log(`===========================================`);

// first child
ancestor.addChild(new TreeNode("child 01"));
ancestor.addChild(new TreeNode("child 02"));
// tests
console.log(`--- Testing child node 01 ---`);
console.log(ancestor.children);
console.log(ancestor.children[0]);
console.log(`===========================================`);

// grandchildren
const child01 = ancestor.children[0];
child01.addChild(new TreeNode("grandchild 01"));
child01.addChild(new TreeNode("grandchild 02"));
const grandchild01 = child01.children[0];
// tests
console.log(`--- Testing grandchildren ---`);
console.log(ancestor);
console.log(ancestor.children);
console.log(grandchild01.data);
console.log(`===========================================`);

// test size
console.log(`--- Testing sizeOf ---`);
console.log(ancestor.getSize());
console.log(`===========================================`);

// test containsFirst
console.log(`--- Testing containsFirst ---`);
console.log(ancestor.containsFirst("grandchild"));
console.log(`===========================================`);

// test containsEvery
console.log(`--- Testing containsEvery ---`);
// console.log(ancestor.containsFirst("grandchild"));
console.log(`===========================================`);

// remove children
console.log(`--- Testing clear children ---`);
console.log(ancestor.children);
ancestor.removeAllChildren();
console.log(ancestor.children);
console.log(`===========================================`);