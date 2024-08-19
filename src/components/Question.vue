<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTriviaStore } from '@/store/useTrivia';
import { computed, ComputedRef } from 'vue';
import { QuestionEntity } from '@/types/trivia';
import { useUserAnswersStore } from '@/store/useUserAnswers';

const triviaStore = useTriviaStore();
const userAnswersStore = useUserAnswersStore();
const { currentQuestion } = storeToRefs(triviaStore);
const { currentAnswer: userAnswer } = storeToRefs(userAnswersStore);

// TODO: move to appStore?
function shuffleAnswers({ correct_answer, incorrect_answers }: QuestionEntity ): string[] {
  const totalPossibleAnswersCount = incorrect_answers.length + 1; // +1 adds correct answer to incorrect answers
  const randomIndex = Math.floor(Math.random() * totalPossibleAnswersCount);

  return [
    ...incorrect_answers.slice(0, randomIndex),
    correct_answer,
    ...incorrect_answers.slice(randomIndex)
  ];
}

const allAnswers: ComputedRef<string[]> = computed(() => shuffleAnswers(currentQuestion.value));

function onAnswerClick(currentAnswer: string, ): void {
  userAnswersStore.setAnswer({
    answer: currentAnswer,
    isCorrect: currentQuestion.value.correct_answer === currentAnswer,
  });
}

function isCorrectAnswer(currentAnswer: string): boolean {
  return userAnswer.value.answer === currentAnswer;
}
</script>

<template>
  <Transition name="fade" appear mode="out-in" :key="currentQuestion">
    <div v-if="currentQuestion" class="question-container">
      <p class="question" v-html="currentQuestion.question" />
      <button
        v-for="(answer, index) in allAnswers"
        :key="index"
        type="button"
        v-html="answer"
        class="button"
        :class="{'is-active': isCorrectAnswer(answer)}"
        @click="onAnswerClick(answer)"
      />
    </div>
  </Transition>
</template>