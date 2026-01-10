export interface Dictionary<T> {
  [key: string]: T;
}

/**
 * Recursively makes all properties of T readonly.
 * Handles arrays, functions, and nested objects.
 */
export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- Function is intentional here for generic type handling
    T extends Function
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Intentional interface extension for recursive readonly type
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
