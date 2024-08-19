<script setup lang="ts">
import { useAppStore } from '@/store/useApp';
import { storeToRefs } from 'pinia';
import BarChart from '@/components/BarChart.vue';
import type { BarChartData } from '@/types/chart';
import { ref, Ref } from 'vue';

const appStore = useAppStore();
const { totalScoreRatioPercent, totalScoreRatio } = storeToRefs(appStore);
const options = { responsive: true };

// TODO: update by real data
const chartData: Ref<BarChartData> = ref({
  labels: [ 'January', 'February', 'March' ],
  datasets: [
    { label: 'tes', data: [40, 20, 12] },
    { label: 'foo', data: [20, 50, 100] }
    ]
});
</script>

<template>
  Results view
  <br>
  totalScoreRatio: {{ totalScoreRatioPercent }}%
  <br>
  correct answers: {{ totalScoreRatio.correctAnswers }}
  <br>
  all answers: {{ totalScoreRatio.allAnswers }}

  <BarChart :options="options" :data="chartData"/>
</template>
