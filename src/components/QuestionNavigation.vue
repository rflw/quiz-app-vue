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
        class="previous"
        v-if="!isFirstQuestionIndex"
        :to="{ name: routeNames.QUESTIONS, params: { id: previousQuestionIndex } }"
      >
        Previous Question
      </RouterLink>
      
      <RouterLink
        class="next"
        v-if="!isLastQuestionIndex"
        :to="{ name: routeNames.QUESTIONS, params: { id: nextQuestionIndex } }"
      >
        Next Question
      </RouterLink>
    </div>

    <div class="row is-finish" v-if="isQuizCompleted">
      <Transition appear name="fade">
        <RouterLink
          class="button is-primary finish"
          :to="{ name: routeNames.RESULTS }"
        >
          See results
        </RouterLink>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.step-links {
  display: flex;
  margin-bottom: 5vh;
}
.next {
  margin-left: auto;
}
.row.is-finish {
  margin-top: 1em;
  text-align: center;
}
.button.finish {
  display: inline-block;
}
</style>
