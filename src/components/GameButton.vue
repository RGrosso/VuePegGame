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
  font-size: 16px;
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
  background: #6366f1;
  color: #fff;
 }
.btn-outline {
  background: transparent;
  color: #6366f1;
  margin-top: 4px;
}
</style>
