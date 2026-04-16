<template>
  <button
    class="btn"
    :class="{
      'btn-main': variant === 'primary',
      'btn-outline': variant === 'primary-outlined',
    }"
  >
    <slot/>
  </button>
</template>

<script setup lang="ts">
import type { VNode } from "vue";

const {
  variant = "primary",
} = defineProps<{
  variant?: "primary" | "primary-outlined"
}>();

defineSlots<{
  default: () => VNode,
}>();
</script>

<style scoped>
.btn {
  display: block;
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 14px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.1s;
}
.btn:active {
  transform: scale(0.96);
}
.btn-main {
  background: var(--clr-primary);
  color: var(--white);
 }
.btn-outline {
  background: transparent;
  color: var(--clr-primary);
  margin-top: 4px;
}
</style>
