<template>
  <div class="h-full max-h-full p-8 overflow-auto bg-[#fff] rounded wrapper">
    <section class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1
            class="text-4xl font-black bg-gradient-to-r from-teal-600 to-blue-700 text-transparent bg-clip-text background-clip: text;">
            Obras</h1>
          <span class="text-sm text-gray-500">Gerenciamento de obras e projetos</span>
        </div>
        <div class="flex gap-3">
          <div class="bg-blue-50 rounded-lg p-3 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Total de obras</div>
            <div class="text-xl font-bold text-blue-700">{{ items.length || 0 }}</div>
          </div>
          <div class="bg-yellow-50 rounded-lg p-3 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Em andamento</div>
            <div class="text-xl font-bold text-yellow-600">{{ inProgressWorks }}</div>
          </div>
          <div class="bg-green-50 rounded-lg p-3 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Concluídas</div>
            <div class="text-xl font-bold text-green-600">{{ completedWorks }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div class="flex flex-wrap items-center gap-4">
        <SharedTInput placeholder="Buscar obra..." class="flex-1" icon="tabler:search" />
        <SharedTSelect placeholder="Status" class="w-50" :options="statusOptions" v-model="selectedStatus" />
        <SharedTSelect placeholder="Cliente" class="w-50" :options="clientOptions" v-model="selectedClient" />
        <SharedTButton title="Nova Obra" class="w-auto bg-teal-600 hover:bg-teal-700" icon="tabler:plus"
          @click="openNewWorkModal" />
      </div>
    </section>

    <!-- Visualização das obras -->
    <section>
      <div class="flex justify-end mb-4">
        <div class="bg-gray-100 rounded-lg p-1 inline-flex">
          <button class="px-3 py-1 rounded-md flex items-center gap-1"
            :class="{ 'bg-white shadow-sm': viewMode === 'table' }" @click="viewMode = 'table'">
            <Icon name="tabler:table" size="1rem" />
            <span class="text-sm">Tabela</span>
          </button>

          <button class="px-3 py-1 rounded-md flex items-center gap-1"
            :class="{ 'bg-white shadow-sm': viewMode === 'cards' }" @click="viewMode = 'cards'">
            <Icon name="tabler:cards" size="1rem" />
            <span class="text-sm">Cards</span>
          </button>
        </div>
      </div>

      <div v-if="viewMode === 'table' && items.length > 0">
        <SharedTTable :columns="columnsTable" :rows="items"
          class="shadow-sm border border-gray-100 rounded-lg overflow-hidden" hover-effect></SharedTTable>
      </div>


      <div v-else-if="viewMode === 'cards' && items.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in items" :key="item.id"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow transition-shadow">

          <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="font-bold text-lg text-blue-800 truncate">
              {{ item.name }}
            </h3>
            <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(item.status)">
              {{ item.status }}
            </span>
          </div>


          <div class="p-4 space-y-3">
            <!-- Cliente -->
            <div class="flex items-start">
              <Icon name="tabler:user" class="text-gray-500 mt-0.5 mr-2" />
              <div>
                <div class="text-xs text-gray-500">Cliente</div>
                <div class="text-sm">{{ item.client }}</div>
              </div>
            </div>

            <!-- Endereço -->
            <div class="flex items-start">
              <Icon name="tabler:map-pin" class="text-gray-500 mt-0.5 mr-2" />
              <div>
                <div class="text-xs text-gray-500">Local</div>
                <div class="text-sm">{{ item.address }}</div>
              </div>
            </div>

            <!-- Prazo -->
            <div class="flex items-start">
              <Icon name="tabler:calendar" class="text-gray-500 mt-0.5 mr-2" />
              <div>
                <div class="text-xs text-gray-500">Prazo</div>
                <div class="text-sm">{{ item.deadline }}</div>
              </div>
            </div>

            <!-- Progresso -->
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-gray-500">Progresso</span>
                <span class="font-medium">{{ item.progress }}%</span>
              </div>
              <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full" :style="{ width: item.progress + '%' }" :class="getProgressClass(item.progress)">
                </div>
              </div>
            </div>
          </div>

          <!-- Rodapé do card com botões de ação -->
          <div class="px-4 py-3 bg-gray-50 flex justify-between">
            <button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
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
      </div>

      <!-- Estado vazio -->
      <div v-if="items.length === 0"
        class="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <Icon name="tabler:building-warehouse" class="text-gray-400 mx-auto mb-4" size="4rem" />
        <h3 class="text-xl font-bold text-gray-700">Nenhuma obra cadastrada</h3>
        <p class="text-gray-500 mb-4">Comece adicionando um novo projeto ao sistema</p>
        <SharedTButton title="Adicionar primeira obra" class="w-auto bg-teal-600 hover:bg-teal-700 mx-auto"
          icon="tabler:plus" @click="openNewWorkModal" />
      </div>
    </section>

    <SharedTModal v-model="showNewWorkModal" title="Nova Obra" @close="closeNewWorkModal" width="max-w-3xl">
      <div class="space-y-4 mt-4">
        <!-- Grid de 2 colunas para o formulário -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome da obra</label>
            <SharedTInput v-model="newWork.name" placeholder="Nome do projeto" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <SharedTSelect v-model="newWork.client" :options="clientOptions" placeholder="Selecione um cliente" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <SharedTInput v-model="newWork.address" placeholder="Endereço completo da obra" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <SharedTSelect v-model="newWork.status" :options="statusOptions" placeholder="Status do projeto" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data de início</label>
            <SharedTInput v-model="newWork.startDate" placeholder="DD/MM/AAAA" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prazo final</label>
            <SharedTInput v-model="newWork.deadline" placeholder="DD/MM/AAAA" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea v-model="newWork.description"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows="3" placeholder="Descrição da obra e detalhes adicionais..."></textarea>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <SharedTButton variant="outlined" title="Cancelar" class="w-auto bg-gray-200 hover:bg-gray-300 text-gray-800"
            @click="closeNewWorkModal" />
          <SharedTButton title="Criar Obra" class="w-auto bg-teal-600 hover:bg-teal-700" @click="saveNewWork" />
        </div>
      </div>
    </SharedTModal>
  </div>
</template>

<script setup>
const columnsTable = [
  {
    key: "name",
    label: "Nome da Obra",
    thClass: "w-40",
    tdClass: "font-medium text-blue-800",
  },
  {
    key: "client",
    label: "Cliente",
    thClass: "w-40",
    tdClass: "text-gray-800",
  },
  {
    key: "address",
    label: "Endereço",
    thClass: "w-40",
    tdClass: "text-gray-600",
  },
  {
    key: "status",
    label: "Status",
    thClass: "w-30",
    tdClass: "",
    formatter: (value) => {
      const statusClasses = {
        'Em andamento': 'bg-yellow-100 text-yellow-800',
        'Concluído': 'bg-green-100 text-green-800',
        'Planejamento': 'bg-blue-100 text-blue-800',
        'Cancelado': 'bg-red-100 text-red-800'
      };
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${statusClasses[value] || ''}">${value}</span>`;
    }
  },
  {
    key: "deadline",
    label: "Prazo",
    thClass: "w-30",
    tdClass: "",
  },
  {
    key: "progress",
    label: "Progresso",
    thClass: "w-30",
    tdClass: "",
    formatter: (value) => {
      const progressClass = getProgressClass(value);
      return `
        <div class="w-full flex items-center gap-2">
          <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="${progressClass}" style="width: ${value}%; height: 100%"></div>
          </div>
          <span class="text-xs font-medium">${value}%</span>
        </div>
      `;
    }
  },
  {
    key: "actions",
    label: "Ações",
    thClass: "w-20",
    tdClass: "text-center",
    formatter: () => {
      return `
        <div class="flex justify-center gap-1">
          <button class="p-1 text-blue-600 hover:text-blue-800">
            <Icon name="tabler:eye" size="1.2rem" />
          </button>
          <button class="p-1 text-green-600 hover:text-green-800">
            <Icon name="tabler:edit" size="1.2rem" />
          </button>
          <button class="p-1 text-red-600 hover:text-red-800">
            <Icon name="tabler:trash" size="1.2rem" />
          </button>
        </div>
      `;
    }
  },
];

// Dados de exemplo
const items = ref([
  {
    id: 1,
    name: 'Edifício Residencial Aurora',
    client: 'Construtora Silva',
    address: 'Av. Principal, 1500',
    status: 'Em andamento',
    deadline: '15/12/2025',
    progress: 65
  },
  {
    id: 2,
    name: 'Reforma Shopping Center',
    client: 'Shopping Plaza',
    address: 'Rua Comercial, 450',
    status: 'Planejamento',
    deadline: '30/03/2026',
    progress: 10
  },
  {
    id: 3,
    name: 'Casa de Praia Oceano',
    client: 'João Pereira',
    address: 'Alameda das Ondas, 78',
    status: 'Concluído',
    deadline: '01/07/2025',
    progress: 100
  },
  {
    id: 4,
    name: 'Condomínio Parque Verde',
    client: 'Construtora Silva',
    address: 'Rua dos Ipês, 350',
    status: 'Em andamento',
    deadline: '22/05/2026',
    progress: 35
  }
]);

// Opções para filtros
const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'Em andamento', label: 'Em andamento' },
  { value: 'Concluído', label: 'Concluído' },
  { value: 'Planejamento', label: 'Planejamento' },
  { value: 'Cancelado', label: 'Cancelado' }
];

const clientOptions = [
  { value: '', label: 'Todos os clientes' },
  { value: 'Construtora Silva', label: 'Construtora Silva' },
  { value: 'Shopping Plaza', label: 'Shopping Plaza' },
  { value: 'João Pereira', label: 'João Pereira' }
];

// Estado dos filtros
const selectedStatus = ref('');
const selectedClient = ref('');
const viewMode = ref('table'); // 'table' ou 'cards'

// Estatísticas
const completedWorks = computed(() => {
  return items.value.filter(item => item.status === 'Concluído').length;
});

const inProgressWorks = computed(() => {
  return items.value.filter(item => item.status === 'Em andamento').length;
});

// Estado do modal
const showNewWorkModal = ref(false);

const newWork = ref({
  name: '',
  client: '',
  address: '',
  status: 'Planejamento',
  startDate: '',
  deadline: '',
  description: '',
  progress: 0
});

// Funções para gerenciar o modal
const openNewWorkModal = () => {
  showNewWorkModal.value = true;
};

const closeNewWorkModal = () => {
  showNewWorkModal.value = false;
  // Resetar o formulário
  newWork.value = {
    name: '',
    client: '',
    address: '',
    status: 'Planejamento',
    startDate: '',
    deadline: '',
    description: '',
    progress: 0
  };
};

const saveNewWork = () => {
  // Simular salvar uma nova obra
  const id = items.value.length + 1;
  items.value.push({
    id,
    ...newWork.value
  });
  closeNewWorkModal();
};

// Função auxiliar para classes de status
const getStatusClass = (status) => {
  const classes = {
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Planejamento': 'bg-blue-100 text-blue-800',
    'Cancelado': 'bg-red-100 text-red-800'
  };
  return classes[status] || '';
};

// Função auxiliar para classes de progresso
const getProgressClass = (progress) => {
  if (progress >= 100) return 'bg-green-500';
  if (progress >= 75) return 'bg-green-400';
  if (progress >= 50) return 'bg-yellow-500';
  if (progress >= 25) return 'bg-yellow-400';
  return 'bg-blue-400';
};
</script>

<style scoped lang="postcss">
.wrapper {
  &::-webkit-scrollbar {
    width: 0px;
  }


}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.hover-effect tr:hover td {
  background-color: rgba(59, 130, 246, 0.05);
}

/* Gradiente para o título */
.bg-gradient-to-r {
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>