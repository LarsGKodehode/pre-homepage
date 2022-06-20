class GenericGraphNode {
  constructor(data) {
    this.data = data;
    this.edges = [];
  };

  #data;
  #edges = [];

  set data(data) {
    this.#data = data;
  };
  get data() {
    return this.#data;
  };

  set edges(edge) {
    this.edges.push(edge);
  };
  get edges() {
    return this.#edges;
  }
};






// =======================================
//  -------------- Testing --------------
// =======================================

// initial setup
const graph = new GenericGraphNode(1);

console.log(" -------- test 01 --------");
console.log(graph);
console.log(graph.data);
console.log(graph.edges);
console.log("==========================");

console.log(" -------- test 02 --------");

console.log();
console.log("==========================");