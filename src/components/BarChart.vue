<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Colors, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import type { BarChartData } from '@/types/chart';

ChartJS.register(Colors, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type Props = {
  data: BarChartData,
  options: Partial<{ responsive: boolean }>
};

const props = defineProps<Props>();
</script>

<template>
  <Bar :options="props.options" :data="props.data" />
</template>
