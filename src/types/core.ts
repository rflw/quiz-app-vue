import { Ref } from "vue";

// global app
export interface FetchState<T> {
  readonly data: NullableRef<T>,
  readonly error: UnknownRef,
  readonly isFetching: BooleanRef
}

// base
export type Nullable<T> = T | null;

// reactive
export type BooleanRef = Ref<boolean>;
export type NumberRef = Ref<number>;
export type NullableRef<T> = Ref<T | null>;
export type UnknownRef = Ref<unknown>;
