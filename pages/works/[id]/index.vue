<template>
  <div class="h-full max-h-full p-8 overflow-auto bg-[#fff] rounded wrapper">
    <!-- Cabeçalho com informações gerais da obra -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center gap-4">
            <h1 class="text-2xl font-bold text-gray-900">{{ work.name }}</h1>
            <span
              :class="{
                'bg-emerald-100 text-emerald-700': work.status === 0,
                'bg-amber-100 text-amber-700': work.status === 1,
                'bg-blue-100 text-blue-700': work.status === 2,
                'bg-red-100 text-red-700': work.status === 3,
              }"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium"
            >
              {{ workStatusEnum[work.status || 0]?.name }}
            </span>
          </div>
          <p class="text-gray-500 mt-1">
            Cliente: {{ work?.client?.name || "N/A" }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <SharedTButton
            title="Editar Obra"
            icon="tabler:edit"
            class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            @click="openEditWorkModal"
          />
          <SharedTButton
            title="Adicionar Cômodo"
            icon="tabler:plus"
            class="bg-blue-600 hover:bg-blue-700"
            @click="openAddRoomModal"
          />
        </div>
      </div>

      <!-- Progresso e datas -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-500">Progresso Geral</p>
          <div class="mt-2 flex items-center">
            <div class="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div
                class="bg-blue-600 h-2.5 rounded-full"
                :style="{ width: `${work.progress}%` }"
              ></div>
            </div>
            <span class="text-sm font-medium text-gray-700"
              >{{ work.progress }}%</span
            >
          </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-500">Data de Início</p>
          <p class="mt-2 font-medium text-gray-900">
            {{ formatDate(work.startDate) }}
          </p>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-500">Previsão de Conclusão</p>
          <p class="mt-2 font-medium text-gray-900">
            {{ formatDate(work.endDate) }}
          </p>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-500">Orçamento</p>
          <p class="mt-2 font-medium text-gray-900">
            {{ formatCurrency(work?.budget || 0) }}
          </p>
        </div>
      </div>

      <!-- Descrição -->
      <div class="mt-6">
        <p class="text-sm font-medium text-gray-500 mb-2">Descrição</p>
        <p class="text-gray-700">{{ work.description || "Sem descrição" }}</p>
      </div>

      <!-- Endereço -->
      <div class="mt-6">
        <p class="text-sm font-medium text-gray-500 mb-2">Endereço</p>
        <p class="text-gray-700">
          {{ work.address || "Endereço não informado" }}
        </p>
      </div>
    </div>

    <!-- Seção de cômodos -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-900">Cômodos</h2>
        <div class="flex items-center gap-2">
          <div class="relative">
            <input
              type="text"
              v-model="roomSearch"
              placeholder="Buscar cômodo..."
              class="pl-9 pr-3 py-2 w-60 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Icon
              name="tabler:search"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size="1.2rem"
            />
          </div>
          <select
            v-model="roomSortBy"
            class="py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">Nome</option>
            <option value="progress">Progresso</option>
            <option value="elements">Quantidade de Elementos</option>
          </select>
        </div>
      </div>

      <!-- Lista de cômodos em grid -->
      <div
        v-if="filteredRooms.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <WorksRoomsCardPresentation
          v-for="room in filteredRooms"
          :key="room.id"
          :room="room"
          :countElementsByType="countElementsByType"
          :getElementIcon="getElementIcon"
          @edit-room="openEditRoomModal"
          @delete-room="openDeleteRoomModal"
          @expand-room="expandRoom"
        />
      </div>

      <!-- Mensagem quando não há cômodos -->
      <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
        <Icon
          name="tabler:home"
          size="3rem"
          class="mx-auto mb-3 text-gray-400"
        />
        <h3 class="text-lg font-medium text-gray-900 mb-1">
          Nenhum cômodo encontrado
        </h3>
        <p class="text-gray-500 mb-4">
          {{
            rooms.length === 0
              ? "Esta obra ainda não possui cômodos cadastrados."
              : "Nenhum cômodo corresponde à sua busca."
          }}
        </p>
        <SharedTButton
          v-if="rooms.length === 0"
          title="Adicionar Cômodo"
          icon="tabler:plus"
          class="bg-blue-600 hover:bg-blue-700 mx-auto"
          @click="openAddRoomModal"
        />
      </div>
    </div>

    <!-- Detalhes expandidos de um cômodo -->
    <div v-if="selectedRoom" class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <div class="flex items-center gap-2">
            <button
              @click="selectedRoom = null"
              class="text-gray-500 hover:text-blue-600 mr-2"
            >
              <Icon name="tabler:arrow-left" size="1.2rem" />
            </button>
            <h2 class="text-xl font-bold text-gray-900">
              {{ selectedRoom.name }}
            </h2>
          </div>
          <p class="text-gray-500 mt-1">
            {{ selectedRoom.description || "Sem descrição" }}
          </p>
        </div>

        <SharedTButton
          title="Adicionar Elemento"
          icon="tabler:plus"
          class="bg-blue-600 hover:bg-blue-700"
          @click="openAddElementModal"
        />
      </div>

      <!-- Tabs para filtrar elementos -->
      <div class="mb-5 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in elementTabs"
            :key="tab.id"
            @click="activeElementTab = tab.id"
            :class="[
              activeElementTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm',
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Lista de elementos -->
      <div
        v-if="filteredElements.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="element in filteredElements"
          :key="element.id"
          class="bg-gray-50 rounded-lg p-4 border border-gray-100"
        >
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-2">
              <div class="p-2 bg-blue-100 rounded-lg">
                <Icon
                  :name="getElementIcon(element.type)"
                  size="1.2rem"
                  class="text-blue-600"
                />
              </div>
              <h4 class="font-medium text-gray-900">{{ element.name }}</h4>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="openEditElementModal(element)"
                class="text-gray-500 hover:text-blue-600"
              >
                <Icon name="tabler:edit" size="1rem" />
              </button>
              <button
                @click="openDeleteElementModal(element)"
                class="text-gray-500 hover:text-red-600"
              >
                <Icon name="tabler:trash" size="1rem" />
              </button>
            </div>
          </div>

          <p class="text-sm text-gray-500 mb-3">
            {{ element.description || "Sem descrição" }}
          </p>

          <!-- Status do elemento -->
          <div class="flex items-center gap-3 mb-3">
            <span
              :class="{
                'bg-emerald-100 text-emerald-700':
                  element.status === 'Concluído',
                'bg-amber-100 text-amber-700':
                  element.status === 'Em progresso',
                'bg-gray-100 text-gray-700': element.status === 'Não iniciado',
                'bg-red-100 text-red-700': element.status === 'Com problemas',
              }"
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
            >
              {{ element.status }}
            </span>
          </div>

          <!-- Características do elemento -->
          <div class="space-y-2">
            <div
              v-for="(value, key) in element.specs"
              :key="key"
              class="flex justify-between"
            >
              <span class="text-xs text-gray-500">{{
                formatSpecKey(key)
              }}</span>
              <span class="text-xs font-medium text-gray-700">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há elementos -->
      <div v-else class="bg-gray-50 rounded-lg p-8 text-center">
        <Icon
          name="tabler:door"
          size="2.5rem"
          class="mx-auto mb-3 text-gray-400"
        />
        <h3 class="text-lg font-medium text-gray-900 mb-1">
          Nenhum elemento encontrado
        </h3>
        <p class="text-gray-500 mb-4">
          {{
            selectedRoom.elements.length === 0
              ? "Este cômodo ainda não possui elementos cadastrados."
              : "Nenhum elemento corresponde ao filtro selecionado."
          }}
        </p>
        <SharedTButton
          v-if="selectedRoom.elements.length === 0"
          title="Adicionar Elemento"
          icon="tabler:plus"
          class="bg-blue-600 hover:bg-blue-700 mx-auto"
          @click="openAddElementModal"
        />
      </div>
    </div>

    <!-- Modais -->
    <SharedTModal
      v-model="isAddRoomModalOpen"
      title="Adicionar Cômodo"
      @close="isAddRoomModalOpen = false"
    >
      <!-- Formulário de adicionar cômodo -->
      <form @submit.prevent="handleAddRoom" class="space-y-4">
        <div>
          <label
            for="roomName"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Nome do Cômodo</label
          >
          <SharedTInput
            v-model="newRoom.name"
            id="roomName"
            placeholder="Ex: Sala de estar"
            required
          />
        </div>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              for="roomHeight"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Altura</label
            >
            <SharedTInput
              v-model="newRoom.height"
              id="roomHeight"
              placeholder="Ex: 2.5m"
              required
            />
          </div>

          <div>
            <label
              for="roomHeight"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Largura</label
            >
            <SharedTInput
              v-model="newRoom.width"
              id="roomWidth"
              placeholder="Ex: 3.5m"
              required
            />
          </div>

          <div>
            <label
              for="roomLength"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Comprimento</label
            >
            <SharedTInput
              v-model="newRoom.length"
              id="roomLength"
              placeholder="Ex: 4.0m"
              required
            />
          </div>
        </section>

        <div>
          <label
            for="roomHeight"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Tipo</label
          >
          <SharedTSelect
            v-model="newRoom.type"
            :options="roomTypes"
            id="roomType"
            placeholder="Ex: Sala de estar"
            required
          />
        </div>

        <div>
          <label
            for="roomDescription"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Descrição</label
          >
          <textarea
            v-model="newRoom.description"
            id="roomDescription"
            rows="3"
            placeholder="Descrição do cômodo (opcional)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- <div>
          <label
            for="roomProgress"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Progresso Inicial ({{ newRoom.progress }}%)
          </label>
          <input
            v-model.number="newRoom.progress"
            id="roomProgress"
            type="range"
            min="0"
            max="100"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div> -->

        <div class="flex justify-end gap-3 pt-4">
          <SharedTButton
            type="button"
            title="Cancelar"
            @click="isAddRoomModalOpen = false"
            class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          />
          <SharedTButton
            type="submit"
            title="Adicionar"
            class="bg-blue-600 hover:bg-blue-700"
            :loading="isSaving"
            @click="addRoom"
          />
        </div>
      </form>
    </SharedTModal>

    <SharedTModal
      v-model="isAddElementModalOpen"
      :title="editingElementId ? 'Editar Elemento' : 'Adicionar Elemento'"
      @close="
        () => {
          isAddElementModalOpen = false;
          editingElementId = null;
        }
      "
    >
      <WorksRoomsElementsAddOrEditElementCard
        v-model="newElement"
        :category-options="elementCategoryOptions"
        :unity-options="elementUnityOptions"
        :status-options="elementStatusOptions"
        :is-editing="!!editingElementId"
        :loading="isSaving"
        @submit="handleAddElement"
      />

      <template #footer>
        <div class="flex justify-end gap-3 pt-4">
          <SharedTButton
            type="button"
            title="Cancelar"
            @click="
              () => {
                isAddElementModalOpen = false;
                editingElementId = null;
              }
            "
            class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          />
          <SharedTButton
            type="submit"
            :title="editingElementId ? 'Salvar' : 'Adicionar'"
            class="bg-blue-600 hover:bg-blue-700"
            :loading="isSaving"
            @click="handleAddElement"
          />
        </div>
      </template>
    </SharedTModal>
  </div>
</template>

<script setup>
const route = useRoute();
const http = useApi();
const toast = useToast();

const workId = route.params.id;

// Estado
const isLoading = ref(false);
const isSaving = ref(false);

// Dados da obra
const work = ref({
  id: workId,
  name: "",
  client: "",
  status: "",
  progress: 65,
  startDate: "",
  endDate: "",
  budget: 180000,
  description: "",
  address: "",
  clientId: null,
});

const workRooms = ref([]);
const roomTypes = ref([]);

const workStatusEnum = {
  0: {
    name: "A começar",
  },
  1: {
    name: "Em andamento",
  },
  2: {
    name: "Pausado",
  },
  3: {
    name: "Concluído",
  },
};

// Dados de cômodos (simulando backend)
const rooms = ref([
  {
    id: "1",
    name: "Sala de Estar",
    description: "Sala de estar com vista para o jardim",
    progress: 80,
    elements: [
      {
        id: "101",
        name: "Janela Principal",
        type: "Janela",
        description: "Janela de correr com vista para o jardim",
        status: "Concluído",
        specs: {
          width: 200,
          height: 160,
          windowType: "De correr",
          glassType: "Temperado",
        },
      },
      {
        id: "102",
        name: "Porta de entrada",
        type: "Porta",
        description: "Porta principal da sala",
        status: "Concluído",
        specs: {
          width: 90,
          height: 210,
          material: "Madeira maciça",
        },
      },
      {
        id: "103",
        name: "Piso",
        type: "Piso",
        description: "Piso da sala de estar",
        status: "Em progresso",
        specs: {
          area: 24,
          material: "Porcelanato",
          color: "Bege acetinado",
        },
      },
      {
        id: "104",
        name: "Parede Norte",
        type: "Parede",
        description: "Parede principal com TV",
        status: "Em progresso",
        specs: {
          area: 12,
          paintType: "Tinta acrílica",
          color: "Branco neve",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Cozinha",
    description: "Cozinha estilo americana",
    progress: 45,
    elements: [
      {
        id: "201",
        name: "Janela sobre pia",
        type: "Janela",
        description: "Janela basculante sobre a pia",
        status: "Em progresso",
        specs: {
          width: 120,
          height: 80,
          windowType: "Basculante",
          glassType: "Comum",
        },
      },
      {
        id: "202",
        name: "Porta para área de serviço",
        type: "Porta",
        description: "Porta de acesso à área de serviço",
        status: "Não iniciado",
        specs: {
          width: 80,
          height: 210,
          material: "Madeira",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Quarto Principal",
    description: "Quarto com suíte",
    progress: 30,
    elements: [
      {
        id: "301",
        name: "Porta do quarto",
        type: "Porta",
        description: "Porta de entrada do quarto",
        status: "Concluído",
        specs: {
          width: 80,
          height: 210,
          material: "Madeira laqueada",
        },
      },
      {
        id: "302",
        name: "Janela do quarto",
        type: "Janela",
        description: "Janela lateral com vista para o jardim",
        status: "Com problemas",
        specs: {
          width: 150,
          height: 120,
          windowType: "De correr",
          glassType: "Temperado fumê",
        },
      },
    ],
  },
  {
    id: "4",
    name: "Banheiro Social",
    description: "Banheiro para visitas",
    progress: 70,
    elements: [],
  },
]);

// Filtros e ordenação de cômodos
const roomSearch = ref("");
const roomSortBy = ref("name");

// Filtros de elementos
const elementTabs = [
  { id: "all", name: "Todos" },
  { id: "door", name: "Portas" },
  { id: "window", name: "Janelas" },
  { id: "floor", name: "Pisos" },
  { id: "wall", name: "Paredes" },
  { id: "other", name: "Outros" },
];
const activeElementTab = ref("all");

// Cômodo selecionado para exibir detalhes
const selectedRoom = ref(null);

// Modais
const isAddRoomModalOpen = ref(false);
const isAddElementModalOpen = ref(false);
const editingElementId = ref(null); // ID do elemento sendo editado

// Controla quais seções do formulário estão expandidas
const openSections = reactive({
  dimensions: true,
  prices: true,
  supplier: false,
  specific: true,
});

// Dados para novos registros
const newRoom = reactive({
  name: "",
  description: "",
  progress: 0,
  elements: [],
});

const newElement = reactive({
  name: "",
  type: "", // Campo mantido por compatibilidade com dados legados
  description: "",
  status: "Não iniciado",
  category: "1", // ID de categoria: 1=Revestimento
  unity: "1", // ID de unidade: 1=Unidade
  quantity: 1,
  unitLength: null,
  unitWidth: null,
  unitHeight: null,
  unitPrice: 0,
  laborPrice: 0,
  supplier: "",
  supplierContact: "",
  productCode: "",
  specs: {}, // Objeto para campos específicos por tipo
});

// Opções para selects
const elementCategoryOptions = [
  { value: 1, label: "Revestimento" },
  { value: 2, label: "Hidráulico" },
  { value: 3, label: "Elétrico" },
  { value: 4, label: "Pintura" },
  { value: 5, label: "Mobiliário" },
  { value: 6, label: "Marcenaria" },
  { value: 7, label: "Estrutura" },
  { value: 8, label: "Iluminação" },
  { value: 9, label: "Vidraçaria" },
  { value: 10, label: "Metais e Ferragens" },
  { value: 11, label: "Climatização" },
  { value: 12, label: "Paisagismo" },
  { value: 13, label: "Automação" },
  { value: 14, label: "Decoração" },
  { value: 15, label: "Outro" },
];

const elementStatusOptions = [
  { value: "Não iniciado", label: "Não iniciado" },
  { value: "Em progresso", label: "Em progresso" },
  { value: "Com problemas", label: "Com problemas" },
  { value: "Concluído", label: "Concluído" },
];

const elementUnityOptions = [
  { value: 1, label: "Unidade" },
  { value: 2, label: "Metro Quadrado" },
  { value: 3, label: "Metro Linear" },
  { value: 4, label: "Metro Cúbico" },
  { value: 5, label: "Litro" },
  { value: 6, label: "Mililitro" },
  { value: 7, label: "Quilograma" },
  { value: 8, label: "Grama" },
  { value: 9, label: "Caixa" },
  { value: 10, label: "Rolo" },
  { value: 11, label: "Pacote" },
  { value: 12, label: "Peça" },
  { value: 13, label: "Conjunto" },
  { value: 14, label: "Par" },
  { value: 15, label: "Folha" },
  { value: 16, label: "Saco" },
  { value: 17, label: "Balde" },
  { value: 18, label: "Barra" },
  { value: 19, label: "Placa" },
  { value: 20, label: "Outro" },
];
// Mapear valor da categoria para seu nome correspondente
const getCategoryNameById = (categoryId) => {
  const category = elementCategoryOptions.find(
    (opt) => opt.value === categoryId
  );
  return category ? category.label : "";
};

// Computed para obter o nome da categoria atual
const currentCategoryName = computed(() => {
  return getCategoryNameById(newElement.category);
});

// Computed para controlar quando mostrar os campos específicos baseados na categoria
const showTypeSpecificFields = computed(() => {
  // Incluir todas as categorias que devem ter campos específicos
  const categoriesWithSpecificFields = ["1", "2", "3", "4", "5", "6"]; // Revestimento, Hidraulico, Elétrico, etc.
  return categoriesWithSpecificFields.includes(newElement.category);
});

// Observa mudanças na categoria de elemento para limpar os campos específicos
watch(
  () => newElement.category,
  (newCategory) => {
    console.log(
      `Categoria alterada para: ${newCategory} (${getCategoryNameById(
        newCategory
      )})`
    );
    newElement.specs = {}; // Limpa os campos específicos quando a categoria muda
  }
);

// Computed properties
const filteredRooms = computed(() => {
  let result = [...workRooms.value];

  // Filtrar por busca
  if (roomSearch.value) {
    const searchTerm = roomSearch.value.toLowerCase();
    result = result.filter(
      (room) =>
        room.name.toLowerCase().includes(searchTerm) ||
        (room.description &&
          room.description.toLowerCase().includes(searchTerm))
    );
  }

  // Ordenar
  result.sort((a, b) => {
    if (roomSortBy.value === "name") {
      return a.name.localeCompare(b.name);
    } else if (roomSortBy.value === "progress") {
      return b.progress - a.progress;
    } else if (roomSortBy.value === "elements") {
      return b.elements.length - a.elements.length;
    }
    return 0;
  });

  return result;
});

const filteredElements = computed(() => {
  if (!selectedRoom.value) return [];

  let result = [...selectedRoom.value.elements];

  // Filtrar por tipo
  if (activeElementTab.value !== "all") {
    const tabToTypeMap = {
      door: "Porta",
      window: "Janela",
      floor: "Piso",
      wall: "Parede",
    };

    if (activeElementTab.value === "other") {
      result = result.filter(
        (element) =>
          !["Porta", "Janela", "Piso", "Parede"].includes(element.type)
      );
    } else {
      const targetType = tabToTypeMap[activeElementTab.value];
      result = result.filter((element) => element.type === targetType);
    }
  }

  return result;
});

// Métodos
const formatDate = (dateString) => {
  if (!dateString) return "Não definido";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const countElementsByType = (elements) => {
  const counts = {};
  elements.forEach((element) => {
    const name = elementCategoryOptions[element.category].label;
    counts[name] = (counts[name] || 0) + 1;
  });
  
  return counts;
};

const getElementIcon = (categoryIdOrName) => {
  const iconsByid = {
    1: "tabler:texture", // Revestimento
    2: "tabler:droplet", // Hidráulico
    3: "tabler:plug", // Elétrico
    4: "tabler:paint", // Pintura
    5: "tabler:armchair", // Mobiliário
    6: "tabler:wood", // Marcenaria
    7: "tabler:building", // Estrutura
    8: "tabler:bulb", // Iluminação
    9: "tabler:window", // Vidraçaria
    10: "tabler:tool", // Metais e Ferragens
    11: "tabler:air-conditioning", // Climatização
    12: "tabler:plant", // Paisagismo
    13: "tabler:device-laptop", // Automação
    14: "tabler:sofa", // Decoração
    15: "tabler:building", // Outro
  };

  // Mapeamento de ícones por nome de categoria (para compatibilidade com elementos antigos)
  const iconsByName = {
    Revestimento: "tabler:texture",
    Hidraulico: "tabler:droplet",
    Elétrico: "tabler:plug",
    Pintura: "tabler:paint",
    Mobiliário: "tabler:armchair",
    Marcenaria: "tabler:wood",
    Estrutura: "tabler:building",
    Iluminação: "tabler:bulb",
    Vidraçaria: "tabler:window",
    Porta: "tabler:door",
    Janela: "tabler:window",
    Piso: "tabler:grid-dots",
    Parede: "tabler:wall",
    Outro: "tabler:building",
  };

  // Tenta buscar o ícone por ID primeiro, depois por nome
  return (
    iconsByid[categoryIdOrName] ||
    iconsByName[categoryIdOrName] ||
    "tabler:building"
  );
};

const formatSpecKey = (key) => {
  const formatMap = {
    width: "Largura",
    height: "Altura",
    area: "Área",
    material: "Material",
    color: "Cor",
    windowType: "Tipo de Janela",
    glassType: "Tipo de Vidro",
    paintType: "Tipo de Pintura",
  };

  return formatMap[key] || key;
};

// Alterna a visibilidade das seções do formulário
const toggleSection = (section) => {
  openSections[section] = !openSections[section];
};

const expandRoom = (room) => {
  selectedRoom.value = room;
};

const openAddRoomModal = () => {
  // Resetar dados do formulário
  Object.assign(newRoom, {
    name: "",
    description: "",
    progress: 0,
    elements: [],
  });

  isAddRoomModalOpen.value = true;
};

const openAddElementModal = () => {
  // Resetar dados do formulário
  Object.assign(newElement, {
    name: "",
    type: "",
    description: "",
    status: "Não iniciado",
    category: "1", // ID da categoria Revestimento
    unity: "1", // ID da unidade "Unidade"
    quantity: 1,
    unitLength: null,
    unitWidth: null,
    unitHeight: null,
    unitPrice: 0,
    laborPrice: 0,
    supplier: "",
    supplierContact: "",
    productCode: "",
    specs: {},
  });

  // Redefinir quais seções estão abertas por padrão
  Object.assign(openSections, {
    dimensions: true,
    prices: true,
    supplier: false,
    specific: true,
  });

  isAddElementModalOpen.value = true;
};

const openEditRoomModal = (room) => {
  // Implementação futura
  console.log("Editar cômodo:", room.id);
};

const openDeleteRoomModal = (room) => {
  // Implementação futura
  console.log("Excluir cômodo:", room.id);
};

const openEditElementModal = (element) => {
  // Preencher o formulário com os dados do elemento existente
  newElement.name = element.name;

  // Para compatibilidade com dados legados
  newElement.type = element.type || "";

  // Mapear tipos antigos para categorias novas se necessário
  let mappedCategory = element.category;
  if (!mappedCategory && element.type) {
    // Mapeamento de tipos antigos para novas categorias
    const typeToCategory = {
      Porta: "9", // Vidraçaria
      Janela: "9", // Vidraçaria
      Piso: "1", // Revestimento
      Parede: "1", // Revestimento
      Iluminação: "8", // Iluminação
      Outro: "15", // Outro
    };
    mappedCategory = typeToCategory[element.type] || "1";
  }

  newElement.description = element.description || "";
  newElement.status = element.status;
  newElement.category = mappedCategory || "1"; // Default para Revestimento

  // Mapear unidades antigas para novos IDs se necessário
  let mappedUnity = element.unity;
  if (typeof mappedUnity === "string") {
    const unityToId = {
      Unidade: "1",
      Metro: "3", // Metro Linear
      "Metro Quadrado": "2",
      "Metro Cúbico": "4",
      Quilograma: "7",
      Litro: "5",
    };
    mappedUnity = unityToId[mappedUnity] || "1";
  }

  newElement.unity = mappedUnity || "1";
  newElement.quantity = element.quantity;
  newElement.unitLength = element.unitLength;
  newElement.unitWidth = element.unitWidth;
  newElement.unitHeight = element.unitHeight;
  newElement.unitPrice = element.unitPrice;
  newElement.laborPrice = element.laborPrice;
  newElement.supplier = element.supplier || "";
  newElement.supplierContact = element.supplierContact || "";
  newElement.productCode = element.productCode || "";
  newElement.specs = element.specs ? { ...element.specs } : {};

  // Abrir o modal de edição
  isAddElementModalOpen.value = true;
  editingElementId.value = element.id;
};

const openDeleteElementModal = (element) => {
  // Implementação futura
  console.log("Excluir elemento:", element.id);
};

const handleAddRoom = () => {
  isSaving.value = true;

  // Simulação de uma chamada de API
  setTimeout(() => {
    const newRoomData = {
      id: Date.now().toString(),
      name: newRoom.name,
      description: newRoom.description,
      progress: newRoom.progress,
      elements: [],
    };

    rooms.value.push(newRoomData);
    isAddRoomModalOpen.value = false;
    isSaving.value = false;
  }, 500);
};

// Métodos para cálculos de preço total
const calculateTotalMaterialPrice = () => {
  return newElement.unitPrice * newElement.quantity || 0;
};

const calculateTotalLaborPrice = () => {
  return newElement.laborPrice * newElement.quantity || 0;
};

const handleAddElement = async () => {
  if (!selectedRoom.value) return;

  isSaving.value = true;

  const { data, error } = await http.post(`element/${selectedRoom.value.id}`, {
    name: newElement.name,
    description: newElement.description,
    category: newElement.category,
    unity: newElement.unity,
    quantity: newElement.quantity,
    unitLength: newElement.unitLength,
    unitWidth: newElement.unitWidth,
    unitHeight: newElement.unitHeight,
    unitPrice: newElement.unitPrice,
    laborPrice: newElement.laborPrice,
    supplier: newElement.supplier,
    supplierContact: newElement.supplierContact,
    productCode: newElement.productCode,
    roomId: selectedRoom.value.id,
    // type: getCategoryNameById(newElement.category), // Usar o nome da categoria como tipo
    // status: newElement.status,
    // totalMaterialPrice: calculateTotalMaterialPrice(),
    // totalLaborPrice: calculateTotalLaborPrice(),
    // specs: { ...newElement.specs },
  });

  if (error.value) {
    console.error("Erro ao adicionar/editar elemento:", error.value);
    toast.error({
      title: "Erro ao adicionar/editar elemento. Tente novamente.",
    });
    isSaving.value = false;
    return;
  }

  toast.success({
    title: `Elemento ${
      editingElementId.value ? "editado" : "adicionado"
    } com sucesso.`,
  });

  selectedRoom.value.elements.push(data.value.content);
  isSaving.value = false;
  isAddElementModalOpen.value = false;
  editingElementId.value = null;
};

const getWorkInfo = async () => {
  const { data, error } = await http.get(`work/${workId}`);

  if (error.value) {
    console.error("Erro ao buscar informações da obra:", error);
    toast.error({
      title: "Erro ao buscar informações da obra. Tente novamente.",
    });

    return;
  }
  work.value = data.value.content;
};

const getRoomsWork = async () => {
  const { data, error } = await http.get(`rooms/work/${workId}`);

  if (error.value) {
    console.error("Erro ao buscar informações dos cômodos:", error);
    toast.error({
      title: "Erro ao buscar informações dos cômodos. Tente novamente.",
    });

    return;
  }

  workRooms.value = data.value.content;
};

const getRoomsTypes = async () => {
  const { data, error } = await http.get(`rooms/types`);

  if (error.value) {
    console.error("Erro ao buscar informações dos tipos de cômodos:", error);
    toast.error({
      title:
        "Erro ao buscar informações dos tipos de cômodos. Tente novamente.",
    });

    return;
  }

  roomTypes.value = data.value.content;
};

const addRoom = async () => {
  isSaving.value = true;

  const { data, error } = await http.post("rooms", {
    name: newRoom.name,
    description: newRoom.description,
    type: newRoom.type,
    height: newRoom.height,
    width: newRoom.width,
    length: newRoom.length,
    workId: workId,
    // progress: newRoom.progress
  });

  if (error.value) {
    console.error("Erro ao adicionar cômodo:", error);
    toast.error({
      title: "Erro ao adicionar cômodo. Tente novamente.",
    });
    isSaving.value = false;
    return;
  }

  toast.success({
    title: "Cômodo adicionado com sucesso.",
  });

  rooms.value.push(data.value.content);
  isAddRoomModalOpen.value = false;
  isSaving.value = false;
};

const startup = async () => {
  await Promise.all([getWorkInfo(), getRoomsWork(), getRoomsTypes()]);
};

// CREATED
startup();
// Carregar dados da obra
onMounted(async () => {
  isLoading.value = true;

  try {
    // Simulando uma chamada para API para buscar os dados da obra
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Os dados já estão inicializados para demonstração
  } catch (error) {
    console.error("Erro ao carregar dados da obra:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Animação suave para as transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ajustes para os inputs de range */
input[type="range"] {
  appearance: none;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: #e5e7eb;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #2563eb;
  cursor: pointer;
}
</style>
