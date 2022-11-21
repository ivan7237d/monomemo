# UMemo

A memoization utility.

## Installation

```bash
$ npm install umemo
# or
$ yarn add umemo
# or
$ pnpm add umemo
```

## Memoizing results of functions that take a single argument

```ts
// foo(1) will return 2, and add key 1, value 2 to the map, to be used for
// future invocations.
const foo = memoize((a: number) => a + 1, new Map());

// Typechecking error, because a WeakMap cannot have numbers as keys.
const foo = memoize((a: number) => a + 1, new WeakMap());

// Objects on the other hand are fine. In this case we are able to use WeakMap
// to help prevent memory leaks.
const foo = memoize(({ a }: { a: number }) => a + 1, new WeakMap());
```

## Memoizing results of functions that take multiple arguments

```ts
const undecorated = (x: number, y: { a: number }) => x + y.a;
// We use WeakMap in the outer call so that the Maps created in the inner call
// would be garbage-collected as soon as `{ a: number }` objects are no longer
// referenced.
const decorated = memoize(
  (y: { a: number }) => memoize((x: number) => undecorated(x, y), new Map()),
  new WeakMap()
);
const withRestoredSignature = (x: number, y: { a: number }) => decorated(y)(x);
```

---

[Contributing guidelines](https://github.com/ivan7237d/umemo/blob/master/.github/CONTRIBUTING.md)
