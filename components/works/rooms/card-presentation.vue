<template>
  <div
    class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
  >
    <div class="p-5">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ room.name }}
        </h3>
        <div class="flex items-center gap-2">
          <button
            @click="emit('edit-room', room)"
            class="text-gray-500 hover:text-blue-600"
          >
            <Icon name="tabler:edit" size="1.2rem" />
          </button>
          <button
            @click="emit('delete-room', room)"
            class="text-gray-500 hover:text-red-600"
          >
            <Icon name="tabler:trash" size="1.2rem" />
          </button>
        </div>
      </div>

      <p class="text-sm text-gray-500 mb-3">
        {{ room.description || "Sem descrição" }}
      </p>

      <!-- Progresso do cômodo -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-gray-500">Progresso</span>
          <span class="text-xs font-medium text-gray-700"
            >{{ room.progress }}%</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full"
            :style="{ width: `${room.progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Elementos do cômodo em resumo -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-medium text-gray-500"
          >Total de elementos</span
        >
        <span class="text-xs font-medium text-gray-700">
          {{ room.elements.length }}
        </span>
      </div>

      <!-- Elementos por tipo -->
      <div v-if="room.elements.length > 0" class="flex flex-wrap gap-2 mb-4">
        <div
          v-for="(count, category) in countElementsByType(room.elements)"
          :key="category"
          class="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md text-xs"
        >
          <Icon
            :name="getElementIcon(category)"
            size="0.875rem"
            class="text-gray-600"
          />
          <span>{{ count }} {{ category }}</span>
        </div>
      </div>

      <!-- Botão para ver detalhes -->
      <SharedTButton
        title="Ver Elementos"
        size="sm"
        class="w-full mt-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        @click="emit('expand-room', room)"
      />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["edit-room", "delete-room", "expand-room"]);
const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
  countElementsByType: {
    type: Function,
    required: true,
  },
  getElementIcon: {
    type: Function,
    required: true,
  },
});
</script>

<style></style>
