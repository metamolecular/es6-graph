const createClasslessGraphBuilder = () => {
  const map = new Map();
  const edges = [ ];

  const graph = {
    edges: () => edges.values(),
    hasEdge: (source, target) => map.get(source).has(target),
    hasNode: (node) => map.has(node),
    isEmpty: () => map.size === 0,
    neighbors: (node) => map.get(node).keys(),
    nodes: () => map.keys(),
    order: () => map.size,
    size: () => edges.length,
    toSpec: () => ({
      nodes: Array.from(map.keys()), edges: Array.from(edges)
    }),
    weight: (source, target) => map.get(source).get(target)
  };

  return {
    addNode: (node) => map.set(node, new Map()),
    addEdge: (source, target, weight) => {
      map.get(source).set(target, weight);
      map.get(target).set(source, weight);
      edges.push([ source, target, weight ]);
    },
    graph: () => graph
  };
};

export default createClasslessGraphBuilder