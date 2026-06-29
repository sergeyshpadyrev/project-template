export type Primitive = bigint | boolean | null | number | string | undefined;

export type Reference<T, P extends string = ''> = { _path: P; _type: T };

export type ReferenceExtractor<T, P extends string = ''> = T extends Primitive
  ? Reference<T, P>
  : Reference<T, P> & {
      [K in keyof T]: ReferenceExtractor<
        T[K],
        P extends '' ? Extract<K, string> : `${P}.${Extract<K, string>}`
      >;
    };
