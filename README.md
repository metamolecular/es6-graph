# ES6 Graph

This project compares and contrasts two ES6 object creation models:

```js
// functional aka "classless" or broadly "factory"
const createFoo = (spec) => {
  const { value } = spec;

  return {
    add: (number) => number + value
  };
};

const foo = createFoo({ value: 42 });

foo.add(1); // => 43
```

```js
// "pseudoclassical" or broadly "prototypal"
const Foo = class {
  constructor (value) {
    this._value = value;
  }

  add (number) {
    return number + this._value;
  }
};

const foo = new Foo(42);

foo.add(1); // => 43
```

The functional style (`createFoo`) offers considerable advantages around code structure and stability. The pseudoclassical style (`new Foo()`) has been reported to offer performance advantages. How do these two styles of object creation stack up against each other in practice?

This project aims to answer the question with a small (but realistic) graph manipulation library.

# Node

```bash
# install dependencies
npm install

# run tests
npm test

# run benchmarks
node --require reify benchmark/graph-creation.js
node --require reify benchmark/graph-traversal.js
```

# Use Chrome's Profiler

```bash
# start server, required for ES modules in browser
npm run serve

# browse to localhost:8080/html/classless.html
# browse to localhost:8080/html/classy.html
```



