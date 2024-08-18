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
  <RouterLink :to="startRoute">Start</RouterLink>
</template>
