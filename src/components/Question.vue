<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTriviaStore } from '@/store/useTrivia';
import { computed, ComputedRef } from 'vue';
import { QuestionEntity } from '@/types/trivia';

const triviaStore = useTriviaStore();
const { currentQuestion } = storeToRefs(triviaStore);

function shuffleAnswers({ correct_answer, incorrect_answers }: QuestionEntity ): string[] {
  const totalAnswersCount = incorrect_answers.length + 1; // +1 adds correct answer to incorrect answers
  const randomIndex = Math.floor(Math.random() * totalAnswersCount);

  return [
    ...incorrect_answers.slice(0, randomIndex),
    correct_answer,
    ...incorrect_answers.slice(randomIndex)
  ];
}

const allAnswers: ComputedRef<string[]> = computed(() => shuffleAnswers(currentQuestion.value));
</script>

<template>
  <div v-if="currentQuestion" class="question-container">
    <p class="question">{{ currentQuestion.question }}</p>
    <p class="">{{ currentQuestion.difficulty }}</p>
    <button v-for="(answer, index) in allAnswers" :key="index" v-text="answer" class="button" />
  </div>
</template>