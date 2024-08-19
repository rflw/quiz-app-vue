<script setup lang="ts">
import * as routeNames from '@/types/routes';
import { FIRST_QUESTION_INDEX } from '@/store/useTrivia';

const startRoute = {
  name: routeNames.QUESTIONS,
  params: { id: FIRST_QUESTION_INDEX }
};
</script>

<template>
  <div>
    <h1 class="title">Quiz Game</h1>
    <RouterLink class="button" :to="startRoute">Start Quiz</RouterLink>
  </div>
</template>
