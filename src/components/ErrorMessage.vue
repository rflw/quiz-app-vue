<script setup lang="ts">
import { HOME } from '@/types/routes';
import { ref, Ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';

// force is used to avoid NavigationFailureType.duplicated, see https://router.vuejs.org/api/enums/NavigationFailureType.html#duplicated 
const tryAgainRoute: Ref<RouteLocationRaw> = ref({ name: HOME, force: true });
</script>

<template>
  <p class="error-message">
    Something went wrong.<br>We're working on it.
    <RouterLink :to="tryAgainRoute">Try again</RouterLink>
  </p>
</template>
