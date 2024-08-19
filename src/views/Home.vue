<script setup lang="ts">
import * as routeNames from '@/types/routes';
import { useTriviaStore } from '@/store/useTrivia';

// TODO: change name
const startRoute = {
  name: routeNames.QUESTIONS,
  params: { id: useTriviaStore().currentQuestionIndex }
};
</script>

<template>
  <div>
    <h1 class="title">Quiz Game</h1>
    <RouterLink class="button" :to="startRoute">Start Quiz</RouterLink>
  </div>
</template>
