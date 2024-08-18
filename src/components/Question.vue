<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTriviaStore } from '@/store/useTrivia';
import { computed, ComputedRef, toRefs } from 'vue';

const triviaStore = useTriviaStore();
const { currentQuestion } = storeToRefs(triviaStore);
const { question, correct_answer, incorrect_answers } = toRefs(currentQuestion.value);

// TODO: randomize
const combinedAnswers: ComputedRef<string[]> = computed(() => ([correct_answer.value, ...incorrect_answers.value]))
</script>

<template>
  <template v-if="currentQuestion">
    <p>{{ question }}</p>
    <p>{{ currentQuestion.difficulty }}</p>
    <button v-for="(answer, index) in combinedAnswers" :key="index" v-text="answer" />
  </template>
</template>