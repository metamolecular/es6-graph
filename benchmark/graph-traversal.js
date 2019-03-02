import { Suite } from 'benchmark';

import createClassyGraphBuilder from '../lib/create-classy-graph-builder.js';
import createClasslessGraphBuilder from '../lib/create-classless-graph-builder.js';
import k from '../lib/k.js';
import depthFirst from '../lib/depth-first';

const suite = new Suite;
const classy = createClassyGraphBuilder();
const classless = createClasslessGraphBuilder();

k(20, classy);
k(20, classless);

suite.add('classy', function() {
  return depthFirst(classy.graph());
})
.add('classless', function() {
  return depthFirst(classless.graph());
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });