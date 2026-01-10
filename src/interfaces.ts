export interface Dictionary<T> {
  [key: string]: T;
}

/**
 * Input type for parseInt-based conversions.
 * Values that can be meaningfully parsed to integers.
 */
export type Parseable = string | number;

/**
 * Input type for toString conversions.
 * Values that can be meaningfully converted to strings.
 */
export type Stringable =
  | string
  | number
  | boolean
  | null
  | undefined
  | { toString(): string };

/**
 * Represents a value that can be null or undefined.
 */
export type Nullable<T> = T | null | undefined;

/**
 * Primitive JavaScript types.
 */
export type Primitive = string | number | boolean | null | undefined;

/**
 * A non-empty array with at least one element.
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Valid JSON primitive values.
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * Valid JSON values (recursive).
 */
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

/**
 * JSON array type.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Intentional interface extension for recursive JSON type
export interface JsonArray extends Array<JsonValue> {}

/**
 * JSON object type.
 */
export interface JsonObject {
  [key: string]: JsonValue;
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

/**
 * Expands intersection types for better IDE display.
 * Converts { a: string } & { b: number } to { a: string; b: number }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Omit that enforces K exists in T (stricter than built-in Omit).
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Makes specific properties required.
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Makes specific properties optional.
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
