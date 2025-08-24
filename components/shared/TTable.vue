<template>
  <div class="relative w-full">
    <div
      class="overflow-hidden overflow-x-auto rounded-xl border border-[#d4dce2] bg-gray-50 w-full bg-white shadow-sm min-w-full"
      :class="{ 'max-h-[500px] overflow-y-auto': maxHeight }"
    >
      <table class="w-full table-auto min-w-full">
        <thead class="sticky top-0 z-10">
          <tr class="bg-slate-50">
            <th
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-4 py-3 text-left text-[#0d151c] text-sm font-medium leading-normal whitespace-nowrap',
                col.thClass,
              ]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="props.loading">
            <td :colspan="columns?.length" class="py-8 text-center">
              <slot name="loading">
                <span class="flex justify-center items-center gap-2 w-full">
                  <SharedTSpinner size="6" border="2" />
                  <span class="text-[#5c748a] text-base">Carregando...</span>
                </span>
              </slot>
            </td>
          </tr>
          <tr v-else-if="!rows.length">
            <td :colspan="columns.length" class="py-8 text-center text-[#5c748a]">
              <slot name="empty">
                Nenhum dado encontrado.
              </slot>
            </td>
          </tr>
          <tr
            v-else
            v-for="(row, rowIdx) in rows"
            :key="rowIdx"
            class="border-t border-t-[#cedce8] hover:bg-gray-50"
            :class="{ 'cursor-pointer': rowClickable }"
            @click="rowClickable ? $emit('row-click', row) : null"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-4 py-2 text-sm font-normal leading-normal',
                col.tdClass,
              ]"
            >
              <slot
                :name="`cell-${col.key}`"
                :row="row"
                :value="row[col.key]"
                :column="col"
              >
                {{ row[col.key] ?? "-" }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  maxHeight: {
    type: Boolean,
    default: false,
  },
  rowClickable: {
    type: Boolean,
    default: false,
  },
  hoverEffect: {
    type: Boolean,
    default: false,
  }
});

defineEmits(['row-click']);
</script>

<style scoped>
/* Assegura que o cabeçalho permanece visível durante a rolagem */
thead {
  background-color: #f8fafc; /* bg-slate-50 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Adiciona uma linha de sombra na parte inferior do cabeçalho quando está fixo */
.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Previne quebra de texto em células que não devem quebrar */
.whitespace-nowrap {
  white-space: nowrap;
}

/* Estilo para a rolagem */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Efeito de hover condicional */
tr.hover\:bg-gray-50:hover {
  background-color: rgba(243, 244, 246, 0.8);
}
</style>