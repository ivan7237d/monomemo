interface MapLike<K, V> {
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
}

/**
 * Decorates a unary function so that its result is memoized. The cached values
 * are stored in a Map-like object provided as the second argument (a Map,
 * a WeakMap, or a custom object).
 */
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
