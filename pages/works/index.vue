<template>
  <div class="h-full max-h-full p-8 overflow-auto bg-[#fff] rounded wrapper">
    <section class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1
            class="text-4xl font-black bg-gradient-to-r from-teal-600 to-blue-700 text-transparent bg-clip-text background-clip: text;"
          >
            Obras
          </h1>
          <span class="text-sm text-gray-500"
            >Gerenciamento de obras e projetos</span
          >
        </div>
        <div class="flex gap-3">
          <div class="bg-blue-50 rounded-lg p-3 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Total de obras</div>
            <div class="text-xl font-bold text-blue-700">
              {{ items.length || 0 }}
            </div>
          </div>
          <div class="bg-yellow-50 rounded-lg p-3 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Em andamento</div>
            <div class="text-xl font-bold text-yellow-600">
              {{ inProgressWorks }}
            </div>
          </div>
          <div class="bg-green-50 rounded-lg p-3 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Concluídas</div>
            <div class="text-xl font-bold text-green-600">
              {{ completedWorks }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div class="flex flex-wrap items-center gap-4">
        <SharedTInput
          placeholder="Buscar obra..."
          class="flex-1"
          icon="tabler:search"
        />
        <SharedTSelect
          placeholder="Status"
          class="w-50"
          :options="statusOptions"
          v-model="selectedStatus"
        />
        <SharedTSelect
          placeholder="Cliente"
          class="w-50"
          :options="clientOptions"
          v-model="selectedClient"
        />
        <SharedTButton
          title="Nova Obra"
          class="w-auto bg-teal-600 hover:bg-teal-700"
          icon="tabler:plus"
          @click="openNewWorkModal"
        />
      </div>
    </section>

    <!-- Visualização das obras -->
    <section>
      <div class="flex justify-end mb-4">
        <!-- Tipo de visualização: -->
        <div class="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            class="px-3 py-1 rounded-md flex items-center gap-1"
            :class="{ 'bg-white shadow-sm': viewMode === 'table' }"
            @click="viewMode = 'table'"
          >
            <Icon name="tabler:table" size="1rem" />
            <span class="text-sm">Tabela</span>
          </button>

          <button
            class="px-3 py-1 rounded-md flex items-center gap-1"
            :class="{ 'bg-white shadow-sm': viewMode === 'cards' }"
            @click="viewMode = 'cards'"
          >
            <Icon name="tabler:cards" size="1rem" />
            <span class="text-sm">Cards</span>
          </button>
        </div>
      </div>

      <div v-if="viewMode === 'table' && works.length > 0">
        <SharedTTable
          :columns="columnsTable"
          :rows="works"
          :loading="loadingGetWorks"
          class="shadow-sm border border-gray-100 rounded-lg overflow-hidden"
          hover-effect
        >
          <template #cell-client="{ row }">
            <span class="text-gray-500">{{ row?.client?.name || "N/A" }}</span>
          </template>

          <template #cell-status="{ row }">
            <span
              :class="[
                `${
                  workStatus[row.status].color
                } px-2 py-1 rounded-md text-xs inline-block`,
              ]"
            >
              {{ workStatus[row.status].label }}
            </span>
          </template>

          <template #cell-endDate="{ row }">
            <span class="text-gray-500">{{ formatDate(row.endDate) }}</span>
          </template>

          <template #cell-actions="{ row }">
            <div class="flex items-center gap-3">
              <Icon
                name="tabler:eye"
                size="1.2rem"
                class="text-blue-600 hover:text-blue-800 cursor-pointer"
                @click="router.push('/works/' + row.id)"
              />

              <Icon
                name="tabler:edit"
                size="1.2rem"
                class="text-blue-600 hover:text-blue-800 cursor-pointer"
                @click="editWork(row)"
              />

              <Icon
                name="tabler:trash"
                size="1.2rem"
                class="text-red-600 hover:text-red-800 cursor-pointer"
                @click="setWorkToDelete(row)"
              />
            </div>
          </template>
        </SharedTTable>
      </div>

      <div
        v-else-if="viewMode === 'cards' && items.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <WorksCardPresentation :items="works" />
      </div>

      <!-- Estado vazio -->
      <div
        v-if="items.length === 0"
        class="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
      >
        <Icon
          name="tabler:building-warehouse"
          class="text-gray-400 mx-auto mb-4"
          size="4rem"
        />
        <h3 class="text-xl font-bold text-gray-700">Nenhuma obra cadastrada</h3>
        <p class="text-gray-500 mb-4">
          Comece adicionando um novo projeto ao sistema
        </p>
        <SharedTButton
          title="Adicionar primeira obra"
          class="w-auto bg-teal-600 hover:bg-teal-700 mx-auto"
          icon="tabler:plus"
          @click="openNewWorkModal"
        />
      </div>
    </section>

    <SharedTModal
      v-model="showNewWorkModal"
      title="Nova Obra"
      @close="closeNewWorkModal"
      width="max-w-3xl"
    >
      <div class="space-y-4 mt-4">
        <!-- Grid de 2 colunas para o formulário -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Nome da obra</label
            >
            <SharedTInput
              v-model="newWork.name"
              placeholder="Nome do projeto"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Cliente</label
            >
            <SharedTSelect
              v-model="newWork.clientId"
              :options="clients"
              placeholder="Selecione um cliente"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Endereço</label
            >
            <SharedTInput
              v-model="newWork.address"
              placeholder="Endereço completo da obra"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Status</label
            >
            <SharedTSelect
              v-model="newWork.status"
              :options="statusOptions"
              placeholder="Status do projeto"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Data de início</label
            >
            <SharedTInput
              v-model="newWork.startDate"
              type="date"
              placeholder="DD/MM/AAAA"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Prazo final</label
            >
            <SharedTInput
              v-model="newWork.deadline"
              type="date"
              placeholder="DD/MM/AAAA"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Descrição</label
          >
          <textarea
            v-model="newWork.description"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows="3"
            placeholder="Descrição da obra e detalhes adicionais..."
          ></textarea>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <SharedTButton
            variant="outlined"
            title="Cancelar"
            size="small"
            class="w-auto bg-gray-200 hover:bg-gray-300 text-gray-800"
            @click="closeNewWorkModal"
          />
          <SharedTButton
            title="Criar Obra"
            size="small"
            class="w-auto bg-teal-600 hover:bg-teal-700"
            :loading="loadingAddNewWork"
            @click="saveNewWork"
          />
        </div>
      </div>
    </SharedTModal>

    <SharedTModal
      v-model="deleteWorkModal"
      title="Remover obra"
      width="max-w-3xl"
      @close="
        deleteWorkModal.value = false;
        workToDelete.value = null;
      "
    >
      <div class="space-y-4 mt-4">
        <p>Tem certeza que deseja remover a obra "{{ workToDelete?.name }}"?</p>
        <p class="text-sm text-gray-500">Esta ação não pode ser desfeita.</p>

        <div class="flex items-center justify-end gap-2">
          <SharedTButton
            title="Cancelar"
            variant="outlined"
            size="small"
            @click="closeDeleteWorkModal"
          />
          <SharedTButton
            title="Remover"
            size="small"
            :loading="deleteWorkLoading"
            @click="deleteWork"
          />
        </div>
      </div>
    </SharedTModal>
  </div>
</template>

<script setup>
const http = useApi();
const router = useRouter();
const toast = useToast();

const works = ref([]);
const clients = ref([]);

const loadingGetWorks = ref(false);
const deleteWorkModal = ref(false);
const workToDelete = ref(null);
const deleteWorkLoading = ref(false);
const loadingAddNewWork = ref(false);

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
        "Em andamento": "bg-yellow-100 text-yellow-800",
        Concluído: "bg-green-100 text-green-800",
        Planejamento: "bg-blue-100 text-blue-800",
        Cancelado: "bg-red-100 text-red-800",
      };
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${
        statusClasses[value] || ""
      }">${value}</span>`;
    },
  },
  {
    key: "endDate",
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
    },
  },
  {
    key: "actions",
    label: "Ações",
    thClass: "w-20",
    tdClass: "text-center",
  },
];

// Dados de exemplo
const items = ref([
  {
    id: 1,
    name: "Edifício Residencial Aurora",
    client: "Construtora Silva",
    address: "Av. Principal, 1500",
    status: "Em andamento",
    deadline: "15/12/2025",
    progress: 65,
  },
  {
    id: 2,
    name: "Reforma Shopping Center",
    client: "Shopping Plaza",
    address: "Rua Comercial, 450",
    status: "Planejamento",
    deadline: "30/03/2026",
    progress: 10,
  },
  {
    id: 3,
    name: "Casa de Praia Oceano",
    client: "João Pereira",
    address: "Alameda das Ondas, 78",
    status: "Concluído",
    deadline: "01/07/2025",
    progress: 100,
  },
  {
    id: 4,
    name: "Condomínio Parque Verde",
    client: "Construtora Silva",
    address: "Rua dos Ipês, 350",
    status: "Em andamento",
    deadline: "22/05/2026",
    progress: 35,
  },
]);

// Opções para filtros
const statusOptions = [
  { value: "", label: "Todos os status" },
  { value: 0, label: "A iniciar" },
  { value: 1, label: "Em progresso" },
  { value: 2, label: "Pausado" },
  { value: 3, label: "Completo" },
];

const clientOptions = [
  { value: "", label: "Todos os clientes" },
  { value: "Construtora Silva", label: "Construtora Silva" },
  { value: "Shopping Plaza", label: "Shopping Plaza" },
  { value: "João Pereira", label: "João Pereira" },
];

// Estado dos filtros
const selectedStatus = ref("");
const selectedClient = ref("");
const viewMode = ref("table"); // 'table' ou 'cards'

// Estatísticas
const completedWorks = computed(() => {
  return items.value.filter((item) => item.status === "Concluído").length;
});

const inProgressWorks = computed(() => {
  return items.value.filter((item) => item.status === "Em andamento").length;
});

// Estado do modal
const showNewWorkModal = ref(false);

const newWork = ref({
  name: "",
  client: "",
  address: "",
  status: "Planejamento",
  startDate: "",
  deadline: "",
  description: "",
  progress: 0,
});

// Funções para gerenciar o modal
const openNewWorkModal = () => {
  showNewWorkModal.value = true;
};

const closeNewWorkModal = () => {
  showNewWorkModal.value = false;
  // Resetar o formulário
  newWork.value = {
    name: "",
    client: "",
    address: "",
    status: "Planejamento",
    startDate: "",
    deadline: "",
    description: "",
    progress: 0,
  };
};

async function saveNewWork() {
  try {
    loadingAddNewWork.value = true;
    const { data, error } = await http.post("work/create", {
      ...newWork.value,
      userId: "",
    });

    if (error.value) {
      console.error("Erro ao criar obra:", error.value);
      toast.error({
        title: "Erro ao criar obra. Tente novamente.",
      });
      loadingAddNewWork.value = false;
      return;
    }

    console.log(data.value, "New work");

    toast.success({
      title: "Obra criada com sucesso!",
    });

    works.value.push(data.value.content);

    closeNewWorkModal();
    loadingAddNewWork.value = false;
  } catch (error) {
    console.error("Erro ao salvar nova obra:", error);
    toast.error({
      title: "Erro ao criar obra. Tente novamente.",
    });
    loadingAddNewWork.value = false;
  }
}

async function getWorks() {
  try {
    loadingGetWorks.value = true;
    const { data, error } = await http.get("work/list");

    if (error.value) {
      console.error("Erro ao buscar obras:", error.value);
      loadingGetWorks.value = false;
      return;
    }

    works.value = data.value.content;

    loadingGetWorks.value = false;
  } catch (error) {
    console.error("Erro ao buscar obras:", error);
    loadingGetWorks.value = false;
  }
}

async function deleteWork() {
  if (!workToDelete.value) return;

  deleteWorkLoading.value = true;
  try {
    const { error } = await http.delete(`work/${workToDelete.value.id}`);

    if (error.value) {
      console.error("Erro ao remover obra:", error.value);
      return;
    }

    toast.success({
      title: "Obra removida com sucesso!",
    });

    deleteWorkLoading.value = false;
    works.value = works.value.filter(
      (item) => item.id !== workToDelete.value.id
    );
    deleteWorkModal.value = false;
    workToDelete.value = null;
  } catch (error) {
    console.error("Erro ao remover obra:", error);
    deleteWorkLoading.value = false;
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
}

function setWorkToDelete(info) {
  workToDelete.value = info;
  deleteWorkModal.value = info;
}

async function getClients() {
  try {
    const { data, error } = await http.get("client/list");

    if (error.value) {
      console.error("Erro ao buscar clientes:", error.value);
      return;
    }

    clients.value = data.value.content.map((client) => ({
      value: client.id,
      label: client.name,
      ...client,
    }));
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
  }
}

getWorks();
getClients();
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
