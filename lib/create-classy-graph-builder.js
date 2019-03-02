const createClassyGraphBuilder = () => {
  return new GraphBuilder();
};

const GraphBuilder = class {
  constructor () {
    this._map = new Map();
    this._edges = [ ];
    this._graph = new Graph(this._map, this._edges);
  }

  addNode (node) {
    this._map.set(node, new Map());
  }

  addEdge (source, target, weight) {
    this._map.get(source).set(target, weight);
    this._map.get(target).set(source, weight);
    this._edges.push([ source, target, weight ]);
  }

  graph () {
    return this._graph;
  }
};

const Graph = class {
  constructor (map, edges) {
    this._map = map;
    this._edges = edges;
  }

  edges () {
    return this._edges.values();
  }

  hasEdge (source, target) {
    return this._map.get(source).has(target);
  }

  hasNode (node) {
    return this._map.has(node);
  }

  isEmpty () {
    return this._map.size === 0;
  }

  neighbors (node) {
    return this._map.get(node).keys();
  }

  nodes () {
    return this._map.keys();
  }

  order () {
    return this._map.size;
  }

  size () {
    return this._edges.length;
  }

  toSpec () {
    return {
      nodes: Array.from(this._map.keys()),
      edges: Array.from(this._edges)
    };
  }

  weight (source, target) {
    return this._map.get(source).get(target);
  }
};

export default createClassyGraphBuilder