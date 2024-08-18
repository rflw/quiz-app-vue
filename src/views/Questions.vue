<script setup lang="ts">
import Question from '@/components/Question.vue';
import QuestionNavigation from '@/components/QuestionNavigation.vue';
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
  {{ props.questionIndex }}
  <Question />
  <QuestionNavigation />
</template>
