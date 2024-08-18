<script setup lang="ts">
import { HOME } from '@/types/routes';
import { computed, ComputedRef, ref, Ref } from 'vue';
import { isNavigationFailure, RouteLocationRaw, useRouter } from 'vue-router';

enum LOADING_STATE {
  DONE,
  IN_PROGRESS,
  ERROR
}

const router = useRouter();
const currentState: Ref<LOADING_STATE> = ref(LOADING_STATE.DONE);
const isLoadingInProgress: ComputedRef<boolean> = computed(() => currentState.value === LOADING_STATE.IN_PROGRESS);
const isLoadingError: ComputedRef<boolean> = computed(() => currentState.value === LOADING_STATE.ERROR);
const isTheSameRouteName: Ref<boolean> = ref(false);
const showLoadingIndicator: ComputedRef<boolean> = computed(() => isLoadingInProgress.value && !isTheSameRouteName.value);

// force is used to avoid NavigationFailureType.duplicated, see https://router.vuejs.org/api/enums/NavigationFailureType.html#duplicated 
const tryAgainRoute: Ref<RouteLocationRaw> = ref({ name: HOME, force: true });

router.beforeEach(async (to, from) => {
  setCurrentState(LOADING_STATE.IN_PROGRESS);
  isTheSameRouteName.value = to.name === from.name;
});

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    setCurrentState(LOADING_STATE.ERROR);
    return;
  }

  setCurrentState(LOADING_STATE.DONE);
});

function setCurrentState(state: LOADING_STATE): void {
  currentState.value = state;
}
</script>

<template>
  <!-- TODO: use loader component -->
  <p v-if="showLoadingIndicator">loading...</p>
  <p v-else-if="isLoadingError">
    <!-- TODO: use error message component -->
    Ooops... Something went wrong.<br>We're working on it.
    <RouterLink :to="tryAgainRoute">Try again</RouterLink>
  </p>

  <div v-else>
    <RouterView />
  </div>
</template>