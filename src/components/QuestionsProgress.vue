<script setup lang="ts">
import { useTriviaStore } from '@/store/useTrivia';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const triviaStore = useTriviaStore();
const { currentQuestionIndex, allQuestionsCount } = storeToRefs(triviaStore);

const questionNumber = computed(() => currentQuestionIndex.value + 1); // +1 because first array index is 0
</script>

<template>
<div class="progress">
  <span class="current">{{ questionNumber }}</span>
  /
  <span class="total">{{ allQuestionsCount }}</span>
</div>
</template>

<style scoped>
.current {
  font-weight: 700;
}
</style>
