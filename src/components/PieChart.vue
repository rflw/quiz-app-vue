<script setup lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Colors, ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, ChartData } from 'chart.js';

// TODO: review registers
ChartJS.register(Colors, ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

type Props = {
  data: ChartData<'pie'>,
  options: Partial<{ responsive: boolean }>
};

const props = defineProps<Props>();
</script>

<template>
  <Pie :options="props.options" :data="props.data" />
</template>
