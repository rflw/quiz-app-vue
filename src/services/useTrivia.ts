import { useFetch } from '@/composables/useFetch';
import { RESPONSE_CODE } from '@/types/trivia';
import { ResponseData } from '@/types/trivia';
import { FetchState } from '@/types/core';
import { API_URL } from '@/config/trivia';
import { Ref, watch } from 'vue';

// TODO: change name of this file to trivia.ts, it's no longer composable, just plain service

export async function fetchQuestions(): Promise<ResponseData | Error> {
    const response = await fetch(API_URL);
  
    if (!response.ok) {
      return Promise.reject(new Error('Error'));
    }
  
    return response.json();
}
