<template>
  <button
    class="w-auto px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
    :class="[props.class, props.variant]" :disabled="props.disabled || props.loading">
    <slot>
      <span class="font-semibold">{{ props.title }}</span>
    </slot>

    <SharedTSpinner v-if="props.loading" size="4" border="2" />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "outlined"].includes(value), //"tonal"
  },
  type: {
    type: String,
    default: "default",
  },
  class: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="postcss">
.primary {
  background: #182643;
  color: #fff;
}

.primary:hover {
  background: #1f3258;
  color: #fff;
}

.primary:focus {
  background: #1f3258;
  color: #fff;
}

.primary:active {
  background: #222;
  color: #fff;
}

.outlined {
  background: transparent;
  color: #182643;
  border: 2px solid #182643;
}
</style>
