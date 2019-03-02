import { Suite } from 'benchmark';

import createClassyGraphBuilder from '../lib/create-classy-graph-builder.js';
import createClasslessGraphBuilder from '../lib/create-classless-graph-builder.js';
import k from '../lib/k.js';

const suite = new Suite;

suite.add('classy', function() {
  const builder = createClassyGraphBuilder();

  k(20, builder);

  return builder.graph();

  // return depthFirst(builder.graph());
})
.add('classless', function() {
  const builder = createClasslessGraphBuilder();

  k(20, builder);

  return builder.graph();

  // return depthFirst(builder.graph());
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });