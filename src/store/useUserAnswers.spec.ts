import { describe, test, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia';
import { useUserAnswersStore } from '@/store/useUserAnswers';
import { useTriviaStore } from '@/store/useTrivia';
import { Questions } from '@/mocks/trivia';

describe('User\'s answers', () => {
  global.fetch = vi.fn().mockResolvedValue(createFetchResponse(Questions));

  function createFetchResponse(data: unknown) {
    return { json: () => new Promise((resolve) => resolve(data)) }
  }

  interface LocalTestContext {
    triviaStore: ReturnType<typeof useTriviaStore>
  }

  beforeEach<LocalTestContext>(async (context) => {
    setActivePinia(createPinia())

    const triviaStore = useTriviaStore();
    context.triviaStore = triviaStore;
  });

  test('Set single answer', () =>  {
    const userAnswersStore = useUserAnswersStore();
    expect(userAnswersStore.allAnswersCount).toBe(0);

    userAnswersStore.setAnswer({ answer: 'bar', isCorrect: false });

    expect(userAnswersStore.allAnswersCount).toBe(1);
  });

  test('Set multiple answers without updating `currentQuestionIndex`', () =>  {
    const userAnswersStore = useUserAnswersStore();

    userAnswersStore.setAnswer({ answer: 'foo', isCorrect: false });
    userAnswersStore.setAnswer({ answer: 'bar', isCorrect: true })

    expect(userAnswersStore.allAnswersCount).toBe(1);
  });

  test.todo<LocalTestContext>('Set multiple answers with updating `currentQuestionIndex`', async ({ triviaStore }) =>  {
    // Test to implement...
  });
});
