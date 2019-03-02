const k = (size, builder) => {
  for (let i = 0; i < size; i++) {
    builder.addNode(i);
  }

  const graph = builder.graph();

  for (let source of graph.nodes()) {
    for (let target of graph.nodes()) {
      if (source === target) {
        break;
      }

      builder.addEdge(source, target);
    }
  }
};

export default k