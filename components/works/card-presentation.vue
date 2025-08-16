<template>
  <div
    v-for="item in items"
    :key="item.id"
    class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow transition-shadow"
  >
    <div class="p-4 border-b border-gray-100 flex justify-between items-center">
      <h3 class="font-bold text-lg text-blue-800 truncate">
        {{ item?.name }}
      </h3>
      <span
        class="px-2 py-1 rounded-full text-xs font-medium"
        :class="workStatus[item.status].color"
      >
        {{ workStatus[item.status].label }}
      </span>
    </div>

    <div class="p-4 space-y-3">
      <!-- Cliente -->
      <div class="flex items-start">
        <Icon name="tabler:user" class="text-gray-500 mt-0.5 mr-2" />
        <div>
          <div class="text-xs text-gray-500">Cliente</div>
          <div class="text-sm">{{ item?.client?.name || "N/A" }}</div>
        </div>
      </div>

      <!-- Endereço -->
      <div class="flex items-start">
        <Icon name="tabler:map-pin" class="text-gray-500 mt-0.5 mr-2" />
        <div>
          <div class="text-xs text-gray-500">Local</div>
          <div class="text-sm">{{ item?.address || "N/A" }}</div>
        </div>
      </div>

      <!-- Prazo -->
      <div class="flex items-start">
        <Icon name="tabler:calendar" class="text-gray-500 mt-0.5 mr-2" />
        <div>
          <div class="text-xs text-gray-500">Prazo</div>
          <div class="text-sm">{{ formatDate(item?.endDate) }}</div>
        </div>
      </div>

      <!-- Progresso -->
      <div>
        <div class="flex justify-between text-xs mb-1">
          <span class="text-gray-500">Progresso</span>
          <span class="font-medium">{{ item.progress || 0 }}%</span>
        </div>
        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full"
            :style="{ width: item?.progress + '%' }"
            :class="getProgressClass(item?.progress || 0)"
          ></div>
        </div>
      </div>
    </div>

    <!-- Rodapé do card com botões de ação -->
    <div class="px-4 py-3 bg-gray-50 flex justify-between">
      <button
        class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
        @click="router.push('/works/' + item.id)"
      >
        <Icon name="tabler:eye" size="1rem" />
        <span>Ver detalhes</span>
      </button>
      <div class="flex gap-2">
        <button class="p-1 text-blue-600 hover:text-blue-800">
          <Icon name="tabler:edit" />
        </button>
        <button class="p-1 text-red-600 hover:text-red-800">
          <Icon name="tabler:trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const workStatus = {
  0: {
    label: "A Iniciar",
    color: "bg-blue-100 text-blue-800",
  },
  1: {
    label: "Em Andamento",
    color: "bg-yellow-100 text-yellow-800",
  },
  2: {
    label: "Pausado",
    color: "bg-red-100 text-red-800",
  },
  3: {
    label: "Concluído",
    color: "bg-green-100 text-green-800",
  },
};

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
}

// Função auxiliar para classes de progresso
const getProgressClass = (progress) => {
  if (progress >= 100) return "bg-green-500";
  if (progress >= 75) return "bg-green-400";
  if (progress >= 50) return "bg-yellow-500";
  if (progress >= 25) return "bg-yellow-400";
  return "bg-blue-400";
};
</script>

<style></style>
