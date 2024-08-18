import { defineStore, storeToRefs } from "pinia";
import { computed, ComputedRef, ref, Ref } from "vue";
import { useTriviaStore } from "./useTrivia";
import { QuestionIndex } from "@/types/trivia";

type AnswerEntity = {
  questionIndex: QuestionIndex,
  answer: string,
  isCorrect: boolean
};

export const useUserAnswersStore = defineStore('userAnswers', () => {
  const triviaStore = useTriviaStore();
  const { currentQuestionIndex } = storeToRefs(triviaStore);

  const allAnswers: Ref<AnswerEntity[]> = ref([]);
  const allAnswersCount: ComputedRef<number> = computed(() => allAnswers.value.length);
  const currentAnswerId: ComputedRef<AnswerEntity> = computed(() => allAnswers.value[currentQuestionIndex.value]);

  function setAnswer(answer: AnswerEntity): void {
    allAnswers.value[currentQuestionIndex.value] = answer;
  }

  return {
    allAnswers,
    allAnswersCount,
    currentAnswerId,
    setAnswer
  }
});
