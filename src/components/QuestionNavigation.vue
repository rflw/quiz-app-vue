<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import * as routeNames from '@/types/routes';
import { FIRST_QUESTION_INDEX, useTriviaStore } from '@/store/useTrivia';

const triviaStore = useTriviaStore();
const { currentQuestionIndex, allQuestionsCount } = storeToRefs(triviaStore);

const isFirstQuestionIndex: ComputedRef<boolean> = computed(() => currentQuestionIndex.value === FIRST_QUESTION_INDEX);
const isLastQuestionIndex: ComputedRef<boolean> = computed(() => currentQuestionIndex.value >= (allQuestionsCount.value - 1));
const nextQuestionIndex: ComputedRef<number> = computed(() => currentQuestionIndex.value + 1);
const previousQuestionIndex: ComputedRef<number> = computed(() => currentQuestionIndex.value - 1);
</script>

<template>
  <div class="navigation">
    <div class="step-links">
      <RouterLink
        v-if="!isFirstQuestionIndex"
        :to="{ name: routeNames.QUESTIONS, params: { id: previousQuestionIndex } }"
      >
        Previous Question
      </RouterLink>
      
      <RouterLink
        v-if="!isLastQuestionIndex"
        :to="{ name: routeNames.QUESTIONS, params: { id: nextQuestionIndex } }"
      >
        Next Question
      </RouterLink>
    </div>

    <RouterLink class="finish" v-if="isLastQuestionIndex" :to="{ name: routeNames.RESULTS }">Finish</RouterLink>
  </div>
</template>

<style scoped>
.step-links {
  display: flex;
  gap: 4em;
  justify-content: center;
}

.finish {
  position: fixed;
  bottom: 10vh;
  transform: translateX(-50%);
}
</style>
