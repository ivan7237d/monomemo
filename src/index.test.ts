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

test("cache as WeakMap typechecks", () => {
  memoize(([from]: [number]) => from, new WeakMap());
});
