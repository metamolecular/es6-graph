const depthFirst = (graph) => {
  const result = [ ];
  const edges = new Map();

  const descend = (node, last=undefined) => {
    if (last === undefined) {
      result.push([ node ]);
      edges.set(node, new Set());
    } else {
      result.push([ last, node, graph.weight(last, node) ]);
      edges.set(node, new Set([ last ]));
      edges.get(last).add(node);
    }

    for (const neighbor of graph.neighbors(node)) {
      if (edges.has(neighbor)) {
        if (!edges.get(neighbor).has(node)) {
          edges.get(neighbor).add(node);
          edges.get(node).add(neighbor);
          result.push([ node, neighbor, graph.weight(node, neighbor) ]);
        }
      } else {
        descend(neighbor, node);
      }
    }
  };

  if (!graph.isEmpty()) {
    descend(Array.from(graph.nodes())[0]);
  }

  return result;
};

export default depthFirst