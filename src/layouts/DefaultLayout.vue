<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
import { computed, ComputedRef, ref, Ref } from 'vue';
import { isNavigationFailure, useRouter } from 'vue-router';

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
  <div>
    <router-view v-slot="{ Component }">
      <transition appear name="fade" mode="out-in">
        <LoadingIndicator v-if="showLoadingIndicator" />
        <ErrorMessage v-else-if="isLoadingError" />
        <component v-else :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
