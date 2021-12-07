export const hasOwnProperty = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string | number | symbol, any>,
  K extends string | number | symbol
>(
  obj: T,
  property: K
): obj is T & Record<K, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, property);

export const isBrowser = typeof window !== "undefined";
export const isWindow = (x: unknown): x is Window => x instanceof Window;
export const isRef = <T>(x: unknown): x is React.RefObject<T> =>
  Object.prototype.hasOwnProperty.call(x || {}, "current");
