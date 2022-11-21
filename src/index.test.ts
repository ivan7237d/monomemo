import memoize from ".";

test("cache as Map", () => {
  const project = jest.fn((value) => value + 1);
  const cache = new Map();
  const decorated = memoize(project, cache);
  expect(decorated(1)).toEqual(2);
  expect(project.mock.calls).toMatchInlineSnapshot(`
    [
      [
        1,
      ],
    ]
  `);
  expect(cache).toMatchInlineSnapshot(`
    Map {
      1 => 2,
    }
  `);

  project.mockClear();
  expect(decorated(1)).toEqual(2);
  expect(project.mock.calls).toMatchInlineSnapshot(`[]`);
  expect(cache).toMatchInlineSnapshot(`
      Map {
        1 => 2,
      }
  `);

  project.mockClear();
  expect(decorated(2)).toEqual(3);
  expect(project.mock.calls).toMatchInlineSnapshot(`
    [
      [
        2,
      ],
    ]
  `);
  expect(cache).toMatchInlineSnapshot(`
    Map {
      1 => 2,
      2 => 3,
    }
  `);
});

test("cache as Map types", () => {
  // $ExpectType (from: number) => number
  memoize((from: number) => from, new Map());
});

test("cache as WeakMap types", () => {
  // @ts-expect-error
  memoize((from: number) => from, new WeakMap());

  // $ExpectType (from: [number]) => number
  memoize(([from]: [number]) => from, new WeakMap());
});
