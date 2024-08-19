import { defineStore, storeToRefs } from "pinia";
import { computed, ComputedRef } from "vue";
import { useUserAnswersStore } from "./useUserAnswers";
import { useTriviaStore } from "./useTrivia";

type TotalScoreRatioRaw = {
  correctAnswers: number,
  allAnswers: number
};

export const useAppStore = defineStore('appStore', () => {
  const userAnswersStore = useUserAnswersStore();
  const triviaStore = useTriviaStore();

  const { allQuestionsCount } = storeToRefs(triviaStore);
  const { allAnswers, allAnswersCount } = storeToRefs(userAnswersStore);

  const isQuizCompleted: ComputedRef<boolean> = computed(() => allQuestionsCount.value === allAnswersCount.value);

  const correctAnswersCount: ComputedRef<number> = computed(() => allAnswers.value.filter(answer => answer.isCorrect).length);

  const totalScoreRatio: ComputedRef<TotalScoreRatioRaw> = computed(() => ({
    correctAnswers: correctAnswersCount.value,
    allAnswers: allAnswersCount.value
  }));

  const totalScoreRatioPercent: ComputedRef<number> = computed(() => (correctAnswersCount.value / allAnswersCount.value) * 100 );

  return {
    totalScoreRatio,
    isQuizCompleted,
    totalScoreRatioPercent
  }
});
