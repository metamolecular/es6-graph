import { expect } from 'chai';

import depthFirst from '../lib/depth-first';
import createClasslessGraphBuilder from '../lib/create-classless-graph-builder';

describe('depthFirst', () => {
  let builder;

  beforeEach(() => {
    builder = createClasslessGraphBuilder();
  });

  it('traverses empty graph', () => {
    const graph = builder.graph();

    expect(depthFirst(graph)).to.eql([ ]);
  });

  it('traverses P1', () => {
    builder.addNode(0);
    
    const graph = builder.graph();

    expect(depthFirst(graph)).to.eql([
      [ 0 ]
    ]);
  });

  it('traverses P2', () => {
    builder.addNode(0);
    builder.addNode(1);
    builder.addEdge(0, 1, 'a');

    const graph = builder.graph();

    expect(depthFirst(graph)).to.eql([
      [ 0 ], [ 0, 1, 'a' ]
    ]);
  });

  it('traverses P3', () => {
    builder.addNode(0);
    builder.addNode(1);
    builder.addNode(2);
    builder.addEdge(0, 1, 'a');
    builder.addEdge(1, 2, 'b');

    const graph = builder.graph();

    expect(depthFirst(graph)).to.eql([
      [ 0 ], [ 0, 1, 'a' ], [ 1, 2, 'b' ]
    ]);
  });

  it('traverses C3', () => {
    builder.addNode(0);
    builder.addNode(1);
    builder.addNode(2);
    builder.addEdge(0, 1, 'a');
    builder.addEdge(1, 2, 'b');
    builder.addEdge(2, 0, 'c');

    const graph = builder.graph();

    expect(depthFirst(graph)).to.eql([
      [ 0 ], [ 0, 1, 'a' ], [ 1, 2, 'b' ], [ 2, 0, 'c' ]
    ]);
  });

  it('traverses claw (K1,3)', () => {
    builder.addNode(0);
    builder.addNode(1);
    builder.addNode(2);
    builder.addNode(3);
    builder.addEdge(0, 1, 'a');
    builder.addEdge(1, 2, 'b');
    builder.addEdge(1, 3, 'c');

    const graph = builder.graph();

    expect(depthFirst(graph)).to.eql([
      [ 0 ], [ 0, 1, 'a' ], [ 1, 2, 'b' ], [ 1, 3, 'c' ]
    ]);
  });

  it('traverses K5', () => {
    for (let i = 0; i < 5; i++) {
      builder.addNode(i);
    }

    const graph = builder.graph();
    const letters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j' ];

    for (let source of graph.nodes()) {
      for (let target of graph.nodes()) {
        if (source === target) {
          break;
        } else {
          builder.addEdge(source, target, letters.shift());
        }
      }
    }

    expect(depthFirst(graph)).to.eql([
      [ 0 ],
      [ 0, 1, 'a' ],
      [ 1, 2, 'c' ],
      [ 2, 0, 'b' ], [ 2, 3, 'f' ],
      [ 3, 0, 'd' ], [ 3, 1, 'e' ], [ 3, 4, 'j' ],
      [ 4, 0, 'g' ], [ 4, 1, 'h' ], [ 4, 2, 'i' ]
    ]);
  });
});