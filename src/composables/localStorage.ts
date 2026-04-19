import { computed, ref } from "vue";

/**
 * Basic composable for using localStorage without worrying about JSON parsing/stringifying.
 */
export function useLocalStorage<T extends object>(key: string, initialValue: T) {
  const storedValue = localStorage.getItem(key);
  const data = ref<T>(storedValue ? JSON.parse(storedValue) : initialValue);

  const value = computed({
    get: () => data.value,
    set: (newValue) => {
      data.value = newValue;
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });

  return value;
}
