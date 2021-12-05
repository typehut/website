export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: unknown[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export const isNotNull = <T>(x: T | null): x is T => {
  return x !== null;
};
