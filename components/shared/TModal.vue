<script setup>
const props = defineProps({
  modelValue: Boolean,
  showCloseButton: Boolean,
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "max-w-md",
    validator: (value) =>
      [
        "max-w-md",
        "max-w-lg",
        "max-w-3xl",
        "max-w-4xl",
        "max-w-5xl",
        "max-w-6xl",
        "max-w-7xl",
        "w-full",
      ].includes(value),
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const zIndex = ref(100);

const getNextZIndex = () => {
  if (typeof window !== "undefined") {
    if (!window.__modalZIndex) window.__modalZIndex = 100;
    window.__modalZIndex += 2;
    return window.__modalZIndex;
  }
  return 100;
};

const closeModal = () => {
  emit("update:modelValue", false);
};

const handleKeydown = (event) => {
  if (event.key === "Escape") closeModal();
};

const modalClasses = computed(
  () =>
    `bg-white rounded-xl shadow-lg p-6 sm:p-7 w-[90dvw] sm:w-auto ${props.width} transition-all transform animate-fade-in`
);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      zIndex.value = getNextZIndex();
      document.addEventListener("keydown", handleKeydown);
    } else {
      document.removeEventListener("keydown", handleKeydown);
    }
  }
);

onMounted(() => {
  if (props.modelValue) {
    zIndex.value = getNextZIndex();
    document.addEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all duration-300"
      :style="{ zIndex }"
      @click.self="closeModal"
    >
      <div :class="modalClasses">
        <button
          v-if="showCloseButton"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          @click="closeModal"
        >
          ✖
        </button>

        <section>
          <div class="mb-2">
            <slot name="title">
              <h1 class="font-bold">{{ props.title }}</h1>
            </slot>

            <slot name="description">
              <span class="p-text-secondary block font-thin">
                {{ props.description }}
              </span>
            </slot>
          </div>

          <div class="overflow-y-auto max-h-[calc(80vh-6rem)] custom-scrollbar">
            <slot />
          </div>

          <div>
            <slot name="footer"> </slot>
          </div>
        </section>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    scale: 0.95;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    scale: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.custom-scrollbar {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #cbd5e1 #f1f5f9; /* Firefox: thumb and track color */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>
