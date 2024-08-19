import { defineStore, storeToRefs } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue";
import { useTriviaStore } from "./useTrivia";

type AnswerEntity = {
  answer: string,
  isCorrect: boolean
};

export const useUserAnswersStore = defineStore('userAnswers', () => {
  const triviaStore = useTriviaStore();
  const { currentQuestionIndex } = storeToRefs(triviaStore);

  const allAnswers: Ref<AnswerEntity[]> = ref([]);
  const allAnswersCount: ComputedRef<number> = computed(() => allAnswers.value.filter(value => value).length);
  const currentAnswer: ComputedRef<AnswerEntity> = computed(() => allAnswers.value[currentQuestionIndex.value] ?? {answer: '', isCorrect: false});

  function setAnswer(answer: AnswerEntity): void {
    allAnswers.value[currentQuestionIndex.value] = answer;
  }

  function init(): void {
    allAnswers.value = [];
  }

  return {
    allAnswers,
    allAnswersCount,
    currentAnswer,
    init,
    setAnswer
  }
});
