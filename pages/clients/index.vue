<template>
  <div class="h-full max-h-full p-8 overflow-auto bg-[#fff] rounded">

    <section class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-800 text-transparent bg-clip-text">
            Clientes</h1>
          <span class="text-sm text-gray-500">Gerencie seus clientes e contratos</span>
        </div>
        <div class="flex gap-4">
          <div class="bg-blue-50 rounded-lg p-4 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Total de clientes</div>
            <div class="text-xl font-bold text-blue-700">{{ items.length || 0 }}</div>
          </div>
          <div class="bg-purple-50 rounded-lg p-4 shadow-sm">
            <div class="text-xs text-gray-500 font-medium">Clientes ativos</div>
            <div class="text-xl font-bold text-purple-700">{{ activeClients }}</div>
          </div>
        </div>
      </div>
    </section>


    <section class="mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div class="flex flex-wrap items-center gap-4">
        <SharedTInput placeholder="Buscar cliente..." class="flex-1" icon="tabler:search" />
        <SharedTSelect placeholder="Status" class="w-50" :options="statusOptions" v-model="selectedStatus" />
        <SharedTSelect placeholder="Ordenar por" class="w-50" :options="sortOptions" v-model="sortBy" />
        <SharedTButton title="Novo Cliente" class="w-auto bg-blue-600 hover:bg-blue-700" icon="tabler:plus"
          @click="openNewClientModal" />
      </div>
    </section>

    <section class="mt-6">
      <div>
        <SharedTTable :columns="columnsTable" :rows="items"
          class="shadow-sm border border-gray-100 rounded-lg overflow-hidden" hover-effect></SharedTTable>

        <!-- Paginação -->
        <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Mostrando {{ items.length }} de {{ totalClients }} clientes</span>
          <div class="flex items-center gap-2">
            <button class="p-2 rounded hover:bg-gray-100">
              <Icon name="tabler:chevron-left" />
            </button>
            <button class="px-3 py-1 rounded hover:bg-gray-100 text-blue-600 font-medium">1</button>
            <button class="px-3 py-1 rounded hover:bg-gray-100">2</button>
            <button class="px-3 py-1 rounded hover:bg-gray-100">3</button>
            <button class="p-2 rounded hover:bg-gray-100">
              <Icon name="tabler:chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>


    <SharedTModal v-model="showNewClientModal" title="Novo Cliente" @close="closeNewClientModal">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
          <SharedTInput v-model="newClient.name" placeholder="Nome completo" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <SharedTInput v-model="newClient.phone" placeholder="(00) 00000-0000" v-maska data-maska="(##) #####-####" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
          <SharedTInput v-model="newClient.address" placeholder="Endereço completo" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <SharedTInput v-model="newClient.email" placeholder="email@exemplo.com" type="email" />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <SharedTButton variant="outlined" title="Cancelar" class="w-auto bg-gray-200 hover:bg-gray-300 text-gray-800"
            @click="closeNewClientModal" />
          <SharedTButton title="Salvar Cliente" class="w-auto bg-blue-600 hover:bg-blue-700" @click="saveNewClient" />
        </div>
      </div>
    </SharedTModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Colunas da tabela
const columnsTable = [
  {
    key: "name",
    label: "Nome",
    thClass: "w-50",
    tdClass: "font-medium text-blue-800",
  },
  {
    key: "phone",
    label: "Telefone",
    thClass: "w-50",
    tdClass: "",
    formatter: (value) => {
      // Formata o telefone se necessário
      return value;
    }
  },
  {
    key: "address",
    label: "Endereço",
    thClass: "w-30",
    tdClass: "text-gray-600",
  },
  {
    key: "email",
    label: "Email",
    thClass: "w-30",
    tdClass: "text-gray-600",
  },
  {
    key: "quantity_works",
    label: "Obras",
    thClass: "w-20",
    tdClass: "text-center",
    formatter: (value) => {
      return `<span class="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">${value || 0}</span>`;
    }
  },
  {
    key: "status",
    label: "Status",
    thClass: "w-20",
    tdClass: "",
    formatter: (value) => {
      const statusClasses = {
        'Ativo': 'bg-green-100 text-green-800',
        'Inativo': 'bg-gray-100 text-gray-800',
        'Potencial': 'bg-yellow-100 text-yellow-800'
      };
      return `<span class="px-2 py-1 rounded-full text-xs font-medium ${statusClasses[value] || ''}">${value}</span>`;
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
    name: "João Silva",
    phone: "(11) 98765-4321",
    email: "joao@exemplo.com",
    address: "Rua das Flores, 123",
    quantity_works: 3,
    status: "Ativo"
  },
  {
    id: 2,
    name: "Maria Oliveira",
    phone: "(11) 91234-5678",
    email: "maria@exemplo.com",
    address: "Av. Principal, 456",
    quantity_works: 1,
    status: "Ativo"
  },
  {
    id: 3,
    name: "Carlos Santos",
    phone: "(11) 92468-1357",
    email: "carlos@exemplo.com",
    address: "Alameda dos Anjos, 789",
    quantity_works: 0,
    status: "Potencial"
  }
]);

// Opções para filtros
const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Inativo', label: 'Inativo' },
  { value: 'Potencial', label: 'Potencial' }
];

const sortOptions = [
  { value: 'name_asc', label: 'Nome (A-Z)' },
  { value: 'name_desc', label: 'Nome (Z-A)' },
  { value: 'works_asc', label: 'Obras (menor)' },
  { value: 'works_desc', label: 'Obras (maior)' }
];

// Estado dos filtros
const selectedStatus = ref('');
const sortBy = ref('name_asc');
const totalClients = ref(3); // Simulando um total maior

// Estatísticas
const activeClients = computed(() => {
  return items.value.filter(item => item.status === 'Ativo').length;
});

// Estado do modal
const showNewClientModal = ref(false);
const newClient = ref({
  name: '',
  phone: '',
  address: '',
  email: '',
  quantity_works: 0,
  status: 'Potencial'
});

// Funções para gerenciar o modal
const openNewClientModal = () => {
  showNewClientModal.value = true;
};

const closeNewClientModal = () => {
  showNewClientModal.value = false;
  // Resetar o formulário
  newClient.value = {
    name: '',
    phone: '',
    address: '',
    email: '',
    quantity_works: 0,
    status: 'Potencial'
  };
};

const saveNewClient = () => {
  // Simular salvar um novo cliente
  const id = items.value.length + 1;
  items.value.push({
    id,
    ...newClient.value
  });
  closeNewClientModal();
};
</script>

<style scoped>
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
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>