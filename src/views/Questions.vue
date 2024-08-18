<script setup lang="ts">
import Question from '@/components/Question.vue';
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
  About ... Quotes
  <br>
  {{ props.questionIndex }}
  <Question />
</template>
