<template>
  <button
    class="w-auto rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
    :class="[props.class, props.variant, sizeClass]"
    :disabled="props.disabled || props.loading"
    @click="emit('click')"
  >
    <slot>
      <span class="font-semibold">{{ props.title }}</span>
    </slot>

    <SharedTSpinner
      v-if="props.loading"
      :size="spinnerSize.size"
      :border="spinnerSize.border"
    />
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "outlined"].includes(value), //"tonal"
  },
  size: {
    type: String,
    default: "regular",
    validator: (value) =>
      ["regular", "small", "x-small", "large", "x-large"].includes(value),
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

const sizeClass = computed(() => {
  switch (props.size) {
    case "small":
      return "text-sm px-4 py-2";
    case "x-small":
      return "text-xs px-3 py-1";
    case "large":
      return "text-lg px-8 py-4";
    case "x-large":
      return "text-xl px-10 py-5";
    default:
      return "text-base px-6 py-3";
  }
});

const spinnerSize = computed(() => {
  switch (props.size) {
    case "small":
      return {
        border: 1,
        size: 2,
      };
    case "x-small":
      return {
        border: 1,
        size: 2,
      };
    case "large":
      return {
        border: 2,
        size: 5,
      };
    case "x-large":
      return {
        border: 2,
        size: 6,
      };
    default:
      return {
        border: 2,
        size: 4,
      };
  }
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
