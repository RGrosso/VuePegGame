<template>
  <div class="summary-column">
    <p class="summary-header">{{ header }}</p>
    <p class="summary-value"><slot /></p>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue";

const { header } = defineProps<{
  header: string,
}>();
defineSlots<{
  default: () => VNode,
}>();
</script>

<style scoped>
.summary-column {
  color: var(--cl-white);
  border-left: 1px solid var(--clr-surface-a50);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  line-height: 1;
}

.summary-header {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.summary-value {
  font-size: 3rem;
  margin-bottom: 0;
}
</style>
