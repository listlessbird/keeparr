type MapValue<T> = T extends Map<any, infer V> ? V : never
