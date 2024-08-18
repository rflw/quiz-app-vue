<script setup lang="ts">
import { onBeforeRouteUpdate } from 'vue-router';
import Question from '@/components/Question.vue';
import { useTriviaStore } from '@/store/useTrivia';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  id: number
}>();

// same as beforeRouteUpdate option but with no access to `this`
onBeforeRouteUpdate(async (to, from) => {
  console.log('onBeforeRouteUpdate', to.params, from.params);
  const triviaStore = useTriviaStore();
  const { currentQuestionIndex } = storeToRefs(triviaStore);

  // TOOD: use setNextQuestionIndex
  currentQuestionIndex.value = Number(to.params.id);
  
  // only fetch the user if the id changed as maybe only the query or the hash changed
  // if (to.params.id !== from.params.id) {
  //   userData.value = await fetchUser(to.params.id)
  // }
})
</script>

<template>
  About ... Quotes
  <br>
  {{ props.id }}
  <Question />
</template>
