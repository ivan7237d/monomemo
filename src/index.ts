export interface MapLike<Key, Value> {
  get: (key: Key) => Value | undefined;
  has: (key: Key) => boolean;
  set: (key: Key, value: Value) => unknown;
}

/**
 * Decorates a unary function so that its result is memoized. The cached values
 * are stored in a Map-like object provided as the second argument (a Map,
 * a WeakMap, or a custom object).
 */
// We use `Cache extends` to prevent TS from inferring `To` as `any`.
export default <From, To, Cache extends MapLike<From, To>>(
    project: (from: From) => To,
    cache: Cache
  ): ((from: From) => To) =>
  (from: From): To =>
    cache.has(from)
      ? cache.get(from)!
      : (() => {
          const to = project(from);
          cache.set(from, to);
          return to;
        })();
