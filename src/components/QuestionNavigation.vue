<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { storeToRefs } from 'pinia';
import * as routeNames from '@/types/routes';
import { FIRST_QUESTION_INDEX, useTriviaStore } from '@/store/useTrivia';
import { useAppStore } from '@/store/useApp';

const triviaStore = useTriviaStore();
const appStore = useAppStore();
const { currentQuestionIndex, allQuestionsCount } = storeToRefs(triviaStore);
const { isQuizCompleted } = storeToRefs(appStore);

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

    <div class="finish-button-container">
      <RouterLink
        class="button is-primary finish"
        :class="{'is-disabled': !isQuizCompleted}"
        :to="{ name: routeNames.RESULTS }"
      >
        Finish
      </RouterLink>
      <small class="unlock-note">Answer every question and you will unlock the button.</small>
    </div>
  </div>
</template>

<style scoped>
.step-links {
  display: flex;
  gap: 4em;
  justify-content: center;
}
.finish-button-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
}
.unlock-note {
  margin-top: 1em;
}
</style>
