import { defineStore } from 'pinia';
import { computed, ComputedRef, Ref, ref } from 'vue';
import { API_URL } from '@/config/trivia';
import { ResponseData, Questions, QuestionEntity, QuestionIndex } from '@/types/trivia';

export const FIRST_QUESTION_INDEX = 0;

export const useTriviaStore = defineStore('trivia', () => {
  const questions: Ref<Questions> = ref([]);
  const currentQuestionIndex: Ref<QuestionIndex> = ref(FIRST_QUESTION_INDEX);

  const allQuestionsCount: ComputedRef<number> = computed(() => questions.value.length);
  const hasQuestions: ComputedRef<boolean> = computed(() => Boolean(allQuestionsCount.value));

  const currentQuestion: ComputedRef<QuestionEntity> = computed(() => questions.value[currentQuestionIndex.value]);

  async function initState(): Promise<void> {
    if (hasQuestions.value) {
      return;
    }

    try {
      const apiData = await fetchQuestions() as ResponseData;
      setQuestions(apiData?.results);
    } catch(error) {
      console.error(error);
    }
  }

  function setQuestions(newQuestions?: Questions): void {
    questions.value = newQuestions ?? [];
  }

  function setNextQuestionIndex(): void {
    if (!hasQuestions.value) {
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex.value + 1)
  }

  function setCurrentQuestionIndex(index: number): void {
    currentQuestionIndex.value = index;
  }

  return {
    questions,
    currentQuestionIndex,
    currentQuestion,
    allQuestionsCount,
    initState,
    nextQuestion: setNextQuestionIndex,
    setCurrentQuestionIndex
  };
});

export async function fetchQuestions(): Promise<ResponseData | Error> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    return Promise.reject(new Error('Error'));
  }

  return response.json();
}
