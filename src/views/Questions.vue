<script setup lang="ts">
import Question from '@/components/Question.vue';
import QuestionNavigation from '@/components/QuestionNavigation.vue';
import QuestionsProgress from '@/components/QuestionsProgress.vue';
import { useTriviaStore } from '@/store/useTrivia';
import { watch } from 'vue';

const props = defineProps<{
  questionIndex: number
}>();

const triviaStore = useTriviaStore();

watch(
  () => props.questionIndex,
  (questionIndex) => triviaStore.setCurrentQuestionIndex(questionIndex),
  { immediate: true }
);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div class="question-view">
      <QuestionsProgress />
      <Question />
      <QuestionNavigation />
    </div>
  </Transition>
</template>

<style scoped>
.question-view {
  justify-content: space-between;
  align-items: stretch;
  flex: 1 1 100vh;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 0 auto;
}
.navigation {
  margin-top: 2.5em;
}
</style>
