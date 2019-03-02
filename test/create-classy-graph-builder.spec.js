import { expect } from 'chai';

import createClassyGraphBuilder from '../lib/create-classy-graph-builder';

describe('createClassyGraphBuilder', () => {
  let builder;

  beforeEach(() => {
    builder = createClassyGraphBuilder();
  });

  describe('#addNode', () => {
    it('adds node', () => {
      builder.addNode(0);

      expect(Array.from(builder.graph().nodes())).to.eql([ 0 ]);
    });
  });

  describe('#addEdge', () => {
    it('adds weight between source/target members', () => {
      builder.addNode(0);
      builder.addNode(1);
      builder.addEdge(0, 1, 'foo');

      expect(builder.graph().weight(0, 1)).to.equal('foo');
    });

    it('adds weight between target/source members', () => {
      builder.addNode(0);
      builder.addNode(1);
      builder.addEdge(0, 1, 'foo');

      expect(builder.graph().weight(1, 0)).to.equal('foo');
    });
  });

  describe('#graph', () => {
    describe('#isEmpty', () => {
      it('returns true given empty', () => {
        expect(builder.graph().isEmpty()).to.be.true;
      });

      it('returns false given a node', () => {
        builder.addNode(0);

        expect(builder.graph().isEmpty()).to.be.false;
      });
    });

    describe('#size', () => {
      it('returns 0 given no edges', () => {
          expect(builder.graph().size()).to.equal(0);
      });

      it('returns 1 given one edge', () => {
        builder.addNode(0);
        builder.addNode(1);
        builder.addEdge(0, 1);

        expect(builder.graph().size()).to.equal(1);
      });
    });

    describe('#nodes', () => {
      it('returns a node iterator', () => {
        builder.addNode(0);
        builder.addNode(1);
        
        expect(Array.from(builder.graph().nodes())).to.eql([ 0, 1 ]);
      });
    });

    describe('#neighbors', () => {
      it('returns a node iterator given two neighbors', () => {
        builder.addNode(0);
        builder.addNode(1);
        builder.addNode(2);
        builder.addEdge(0, 1);
        builder.addEdge(1, 2);

        const neighbors = Array.from(builder.graph().neighbors(1));

        expect(Array.from(neighbors)).to.eql([ 0, 2 ]);
      });
    });

    describe('#hasNode', () => {
      it('returns false given non-member', () => {
        expect(builder.graph().hasNode(0)).to.be.false;
      });

      it('returns true given member', () => {
        builder.addNode(0);

        expect(builder.graph().hasNode(0)).to.be.true;
      });
    });

    describe('#edges', () => {
      it('returns an edge iterator', () => {
        builder.addNode(0);
        builder.addNode(1);
        builder.addEdge(0, 1, 'a');

        const graph = builder.graph();
        const nodes = Array.from(graph.nodes());

        expect(Array.from(graph.edges())).to.eql([
          [ nodes[0], nodes[1], 'a' ]
        ]);
      });  
    });

    describe('#hasEdge', () => {
      it('returns false given no edge', () => {
        builder.addNode(0);
        builder.addNode(1);

        expect(builder.graph().hasEdge(0, 1)).to.be.false;
      });

      it('returns true given edge', () => {
        builder.addNode(0);
        builder.addNode(1);
        builder.addEdge(0, 1);

        expect(builder.graph().hasEdge(0, 1)).to.be.true;
      });

      it('retruns true given reverse edge', () => {
        builder.addNode(0);
        builder.addNode(1);
        builder.addEdge(0, 1);

        expect(builder.graph().hasEdge(1, 0)).to.be.true;
      });
    });

    describe('#weight', () => {
      it('returns undefined given no weight', () => {
        builder.addNode(0);
        builder.addNode(1);
        builder.addEdge(0, 1);

        expect(builder.graph().weight(0, 1)).to.be.undefined;
      });

      it('returns weight given one was added', () => {
        builder.addNode(0);
        builder.addNode(1);
        builder.addEdge(0, 1, 'a');

        expect(builder.graph().weight(0, 1)).to.equal('a');
      });
    });

    describe('#toSpec', () => {
      it('returns an empty specification given empty', () => {
        expect(builder.graph().toSpec()).to.eql({
          nodes: [ ], edges: [ ]
        });
      });
    });
  });
});