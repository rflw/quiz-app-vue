<script setup lang="ts">
import { useAppStore } from '@/store/useApp';
import { storeToRefs } from 'pinia';
import PieChart from '@/components/PieChart.vue';
import { computed, ComputedRef, ref, Ref } from 'vue';
import type { ChartData } from 'chart.js';
import { HOME } from '@/types/routes';

const appStore = useAppStore();
const { totalScoreRatioPercent, totalScoreRatio } = storeToRefs(appStore);
const options = { responsive: true };
const incorrectAnswers: ComputedRef<number> = computed(() => totalScoreRatio.value.allAnswers - totalScoreRatio.value.correctAnswers);

const chartData: Ref<ChartData<'pie'>> = ref({
  labels: [ 'Correct answers', 'Incorrect answers' ],
  datasets: [{
    data: [
      totalScoreRatio.value.correctAnswers,
      incorrectAnswers.value
    ]
  }]
});
</script>

<template>
  <div class="results-view">
    <h1>Results</h1>

    <RouterLink class="button" :to="{name: HOME}">Restart</RouterLink>
  
    <p class="total-score-ratio">
      Total score ratio: {{ totalScoreRatioPercent }}%
    </p>
  
    <div class="chart-container">
      <PieChart :options="options" :data="chartData">
        Chart couldn't be loaded.
      </PieChart>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  max-height: 50vh;
  display: flex;
  justify-content: center;
}
.total-score-ratio {
  margin-top: 1em;
  font-weight: 700;
}
</style>