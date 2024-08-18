import { ref } from "vue"
import type { NullableRef, UnknownRef, BooleanRef, FetchState } from '@/types/core';

// TOOD: remove this file?

export function useFetch<T>(url: string): FetchState<T> {
  const data: NullableRef<T> = ref(null);
  const error: UnknownRef = ref(null);
  const isFetching: BooleanRef = ref(true);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        Promise.reject(response);
        return
      }

      return response.json();
    })
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))
    .finally(() => isFetching.value = false)

  return { data, error, isFetching };
}
