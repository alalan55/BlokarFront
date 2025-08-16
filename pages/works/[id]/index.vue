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
                'bg-emerald-100 text-emerald-700': work.status === 'Em andamento',
                'bg-amber-100 text-amber-700': work.status === 'Planejamento',
                'bg-blue-100 text-blue-700': work.status === 'Concluído',
                'bg-red-100 text-red-700': work.status === 'Parado'
              }" 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium"
            >
              {{ work.status }}
            </span>
          </div>
          <p class="text-gray-500 mt-1">Cliente: {{ work.client }}</p>
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
              <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${work.progress}%` }"></div>
            </div>
            <span class="text-sm font-medium text-gray-700">{{ work.progress }}%</span>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-500">Data de Início</p>
          <p class="mt-2 font-medium text-gray-900">{{ formatDate(work.startDate) }}</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-500">Previsão de Conclusão</p>
          <p class="mt-2 font-medium text-gray-900">{{ formatDate(work.estimatedEndDate) }}</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm font-medium text-gray-500">Orçamento</p>
          <p class="mt-2 font-medium text-gray-900">{{ formatCurrency(work.budget) }}</p>
        </div>
      </div>

      <!-- Descrição -->
      <div class="mt-6">
        <p class="text-sm font-medium text-gray-500 mb-2">Descrição</p>
        <p class="text-gray-700">{{ work.description || 'Sem descrição' }}</p>
      </div>

      <!-- Endereço -->
      <div class="mt-6">
        <p class="text-sm font-medium text-gray-500 mb-2">Endereço</p>
        <p class="text-gray-700">{{ work.address || 'Endereço não informado' }}</p>
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
      <div v-if="filteredRooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="room in filteredRooms" 
          :key="room.id" 
          class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div class="p-5">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900">{{ room.name }}</h3>
              <div class="flex items-center gap-2">
                <button 
                  @click="openEditRoomModal(room)" 
                  class="text-gray-500 hover:text-blue-600"
                >
                  <Icon name="tabler:edit" size="1.2rem" />
                </button>
                <button 
                  @click="openDeleteRoomModal(room)" 
                  class="text-gray-500 hover:text-red-600"
                >
                  <Icon name="tabler:trash" size="1.2rem" />
                </button>
              </div>
            </div>
            
            <p class="text-sm text-gray-500 mb-3">{{ room.description || 'Sem descrição' }}</p>
            
            <!-- Progresso do cômodo -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-medium text-gray-500">Progresso</span>
                <span class="text-xs font-medium text-gray-700">{{ room.progress }}%</span>
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
              <span class="text-xs font-medium text-gray-500">Total de elementos</span>
              <span class="text-xs font-medium text-gray-700">{{ room.elements.length }}</span>
            </div>
            
            <!-- Elementos por tipo -->
            <div v-if="room.elements.length > 0" class="flex flex-wrap gap-2 mb-4">
              <div
                v-for="(count, type) in countElementsByType(room.elements)"
                :key="type"
                class="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md text-xs"
              >
                <Icon :name="getElementIcon(type)" size="0.875rem" class="text-gray-600" />
                <span>{{ count }} {{ type }}</span>
              </div>
            </div>
            
            <!-- Botão para ver detalhes -->
            <SharedTButton 
              title="Ver Elementos" 
              size="sm"
              class="w-full mt-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              @click="expandRoom(room)"
            />
          </div>
        </div>
      </div>
      
      <!-- Mensagem quando não há cômodos -->
      <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
        <Icon name="tabler:home" size="3rem" class="mx-auto mb-3 text-gray-400" />
        <h3 class="text-lg font-medium text-gray-900 mb-1">Nenhum cômodo encontrado</h3>
        <p class="text-gray-500 mb-4">
          {{ rooms.length === 0 ? 
            'Esta obra ainda não possui cômodos cadastrados.' : 
            'Nenhum cômodo corresponde à sua busca.' }}
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
            <button @click="selectedRoom = null" class="text-gray-500 hover:text-blue-600 mr-2">
              <Icon name="tabler:arrow-left" size="1.2rem" />
            </button>
            <h2 class="text-xl font-bold text-gray-900">{{ selectedRoom.name }}</h2>
          </div>
          <p class="text-gray-500 mt-1">{{ selectedRoom.description || 'Sem descrição' }}</p>
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
              'whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
      
      <!-- Lista de elementos -->
      <div v-if="filteredElements.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="element in filteredElements" 
          :key="element.id" 
          class="bg-gray-50 rounded-lg p-4 border border-gray-100"
        >
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-2">
              <div class="p-2 bg-blue-100 rounded-lg">
                <Icon :name="getElementIcon(element.type)" size="1.2rem" class="text-blue-600" />
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
          
          <p class="text-sm text-gray-500 mb-3">{{ element.description || 'Sem descrição' }}</p>
          
          <!-- Status do elemento -->
          <div class="flex items-center gap-3 mb-3">
            <span 
              :class="{
                'bg-emerald-100 text-emerald-700': element.status === 'Concluído',
                'bg-amber-100 text-amber-700': element.status === 'Em progresso',
                'bg-gray-100 text-gray-700': element.status === 'Não iniciado',
                'bg-red-100 text-red-700': element.status === 'Com problemas'
              }" 
              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
            >
              {{ element.status }}
            </span>
          </div>
          
          <!-- Características do elemento -->
          <div class="space-y-2">
            <div v-for="(value, key) in element.specs" :key="key" class="flex justify-between">
              <span class="text-xs text-gray-500">{{ formatSpecKey(key) }}</span>
              <span class="text-xs font-medium text-gray-700">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mensagem quando não há elementos -->
      <div v-else class="bg-gray-50 rounded-lg p-8 text-center">
        <Icon name="tabler:door" size="2.5rem" class="mx-auto mb-3 text-gray-400" />
        <h3 class="text-lg font-medium text-gray-900 mb-1">Nenhum elemento encontrado</h3>
        <p class="text-gray-500 mb-4">
          {{ selectedRoom.elements.length === 0 ? 
            'Este cômodo ainda não possui elementos cadastrados.' : 
            'Nenhum elemento corresponde ao filtro selecionado.' }}
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
          <label for="roomName" class="block text-sm font-medium text-gray-700 mb-1">Nome do Cômodo</label>
          <SharedTInput v-model="newRoom.name" id="roomName" placeholder="Ex: Sala de estar" required />
        </div>
        
        <div>
          <label for="roomDescription" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea 
            v-model="newRoom.description" 
            id="roomDescription" 
            rows="3" 
            placeholder="Descrição do cômodo (opcional)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label for="roomProgress" class="block text-sm font-medium text-gray-700 mb-1">
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
        </div>
        
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
          />
        </div>
      </form>
    </SharedTModal>
    
    <SharedTModal 
      v-model="isAddElementModalOpen" 
      title="Adicionar Elemento" 
      width="max-w-md"
      @close="isAddElementModalOpen = false"

    >
      <!-- Formulário de adicionar elemento -->
      <form @submit.prevent="handleAddElement" class="space-y-4">
        <div>
          <label for="elementName" class="block text-sm font-medium text-gray-700 mb-1">Nome do Elemento</label>
          <SharedTInput v-model="newElement.name" id="elementName" placeholder="Ex: Janela principal" required />
        </div>
        
        <div>
          <label for="elementType" class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <SharedTSelect 
            v-model="newElement.type" 
            id="elementType" 
            :options="elementTypeOptions" 
            required 
          />
        </div>
        
        <div>
          <label for="elementDescription" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea 
            v-model="newElement.description" 
            id="elementDescription" 
            rows="2" 
            placeholder="Descrição do elemento (opcional)"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label for="elementStatus" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <SharedTSelect 
            v-model="newElement.status" 
            id="elementStatus" 
            :options="elementStatusOptions" 
            required 
          />
        </div>
        
        <!-- Campos dinâmicos baseados no tipo de elemento -->
        <div v-if="newElement.type === 'Porta'" class="space-y-4">
          <div>
            <label for="doorWidth" class="block text-sm font-medium text-gray-700 mb-1">Largura (cm)</label>
            <SharedTInput v-model.number="newElement.specs.width" id="doorWidth" type="number" placeholder="Ex: 80" />
          </div>
          <div>
            <label for="doorHeight" class="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
            <SharedTInput v-model.number="newElement.specs.height" id="doorHeight" type="number" placeholder="Ex: 210" />
          </div>
          <div>
            <label for="doorMaterial" class="block text-sm font-medium text-gray-700 mb-1">Material</label>
            <SharedTInput v-model="newElement.specs.material" id="doorMaterial" placeholder="Ex: Madeira" />
          </div>
        </div>
        
        <div v-else-if="newElement.type === 'Janela'" class="space-y-4">
          <div>
            <label for="windowWidth" class="block text-sm font-medium text-gray-700 mb-1">Largura (cm)</label>
            <SharedTInput v-model.number="newElement.specs.width" id="windowWidth" type="number" placeholder="Ex: 100" />
          </div>
          <div>
            <label for="windowHeight" class="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
            <SharedTInput v-model.number="newElement.specs.height" id="windowHeight" type="number" placeholder="Ex: 120" />
          </div>
          <div>
            <label for="windowType" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Janela</label>
            <SharedTInput v-model="newElement.specs.windowType" id="windowType" placeholder="Ex: De correr" />
          </div>
          <div>
            <label for="windowGlass" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Vidro</label>
            <SharedTInput v-model="newElement.specs.glassType" id="windowGlass" placeholder="Ex: Temperado" />
          </div>
        </div>
        
        <div v-else-if="newElement.type === 'Piso'" class="space-y-4">
          <div>
            <label for="floorArea" class="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
            <SharedTInput v-model.number="newElement.specs.area" id="floorArea" type="number" placeholder="Ex: 20" />
          </div>
          <div>
            <label for="floorMaterial" class="block text-sm font-medium text-gray-700 mb-1">Material</label>
            <SharedTInput v-model="newElement.specs.material" id="floorMaterial" placeholder="Ex: Porcelanato" />
          </div>
          <div>
            <label for="floorColor" class="block text-sm font-medium text-gray-700 mb-1">Cor/Modelo</label>
            <SharedTInput v-model="newElement.specs.color" id="floorColor" placeholder="Ex: Bege acetinado" />
          </div>
        </div>
        
        <div v-else-if="newElement.type === 'Parede'" class="space-y-4">
          <div>
            <label for="wallArea" class="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
            <SharedTInput v-model.number="newElement.specs.area" id="wallArea" type="number" placeholder="Ex: 15" />
          </div>
          <div>
            <label for="wallPaint" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Pintura/Revestimento</label>
            <SharedTInput v-model="newElement.specs.paintType" id="wallPaint" placeholder="Ex: Tinta acrílica" />
          </div>
          <div>
            <label for="wallColor" class="block text-sm font-medium text-gray-700 mb-1">Cor</label>
            <SharedTInput v-model="newElement.specs.color" id="wallColor" placeholder="Ex: Branco neve" />
          </div>
        </div>
        
        <div class="flex justify-end gap-3 pt-4">
          <SharedTButton 
            type="button" 
            title="Cancelar" 
            @click="isAddElementModalOpen = false"
            class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50" 
          />
          <SharedTButton 
            type="submit" 
            title="Adicionar" 
            class="bg-blue-600 hover:bg-blue-700"
            :loading="isSaving" 
          />
        </div>
      </form>
    </SharedTModal>
    
    <!-- Outros modais (edição e exclusão) poderiam ser implementados de forma similar -->
  </div>
</template>

<script setup>

const route = useRoute();
const workId = route.params.id;

// Estado
const isLoading = ref(false);
const isSaving = ref(false);

// Dados da obra
const work = ref({
  id: workId,
  name: 'Residência Silva',
  client: 'João Silva',
  status: 'Em andamento',
  progress: 65,
  startDate: '2025-04-15',
  estimatedEndDate: '2025-10-30',
  budget: 180000,
  description: 'Construção de residência com 3 quartos, sala de estar, cozinha e 2 banheiros.',
  address: 'Rua das Flores, 123 - Jardim Primavera'
});

// Dados de cômodos (simulando backend)
const rooms = ref([
  {
    id: '1',
    name: 'Sala de Estar',
    description: 'Sala de estar com vista para o jardim',
    progress: 80,
    elements: [
      {
        id: '101',
        name: 'Janela Principal',
        type: 'Janela',
        description: 'Janela de correr com vista para o jardim',
        status: 'Concluído',
        specs: {
          width: 200,
          height: 160,
          windowType: 'De correr',
          glassType: 'Temperado'
        }
      },
      {
        id: '102',
        name: 'Porta de entrada',
        type: 'Porta',
        description: 'Porta principal da sala',
        status: 'Concluído',
        specs: {
          width: 90,
          height: 210,
          material: 'Madeira maciça'
        }
      },
      {
        id: '103',
        name: 'Piso',
        type: 'Piso',
        description: 'Piso da sala de estar',
        status: 'Em progresso',
        specs: {
          area: 24,
          material: 'Porcelanato',
          color: 'Bege acetinado'
        }
      },
      {
        id: '104',
        name: 'Parede Norte',
        type: 'Parede',
        description: 'Parede principal com TV',
        status: 'Em progresso',
        specs: {
          area: 12,
          paintType: 'Tinta acrílica',
          color: 'Branco neve'
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Cozinha',
    description: 'Cozinha estilo americana',
    progress: 45,
    elements: [
      {
        id: '201',
        name: 'Janela sobre pia',
        type: 'Janela',
        description: 'Janela basculante sobre a pia',
        status: 'Em progresso',
        specs: {
          width: 120,
          height: 80,
          windowType: 'Basculante',
          glassType: 'Comum'
        }
      },
      {
        id: '202',
        name: 'Porta para área de serviço',
        type: 'Porta',
        description: 'Porta de acesso à área de serviço',
        status: 'Não iniciado',
        specs: {
          width: 80,
          height: 210,
          material: 'Madeira'
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Quarto Principal',
    description: 'Quarto com suíte',
    progress: 30,
    elements: [
      {
        id: '301',
        name: 'Porta do quarto',
        type: 'Porta',
        description: 'Porta de entrada do quarto',
        status: 'Concluído',
        specs: {
          width: 80,
          height: 210,
          material: 'Madeira laqueada'
        }
      },
      {
        id: '302',
        name: 'Janela do quarto',
        type: 'Janela',
        description: 'Janela lateral com vista para o jardim',
        status: 'Com problemas',
        specs: {
          width: 150,
          height: 120,
          windowType: 'De correr',
          glassType: 'Temperado fumê'
        }
      }
    ]
  },
  {
    id: '4',
    name: 'Banheiro Social',
    description: 'Banheiro para visitas',
    progress: 70,
    elements: []
  }
]);

// Filtros e ordenação de cômodos
const roomSearch = ref('');
const roomSortBy = ref('name');

// Filtros de elementos
const elementTabs = [
  { id: 'all', name: 'Todos' },
  { id: 'door', name: 'Portas' },
  { id: 'window', name: 'Janelas' },
  { id: 'floor', name: 'Pisos' },
  { id: 'wall', name: 'Paredes' },
  { id: 'other', name: 'Outros' }
];
const activeElementTab = ref('all');

// Cômodo selecionado para exibir detalhes
const selectedRoom = ref(null);

// Modais
const isAddRoomModalOpen = ref(false);
const isAddElementModalOpen = ref(false);

// Dados para novos registros
const newRoom = reactive({
  name: '',
  description: '',
  progress: 0,
  elements: []
});

const newElement = reactive({
  name: '',
  type: 'Porta',
  description: '',
  status: 'Não iniciado',
  specs: {}
});

// Opções para selects
const elementTypeOptions = [
  { value: 'Porta', label: 'Porta' },
  { value: 'Janela', label: 'Janela' },
  { value: 'Piso', label: 'Piso' },
  { value: 'Parede', label: 'Parede' },
  { value: 'Iluminação', label: 'Iluminação' },
  { value: 'Outro', label: 'Outro' }
];

const elementStatusOptions = [
  { value: 'Não iniciado', label: 'Não iniciado' },
  { value: 'Em progresso', label: 'Em progresso' },
  { value: 'Com problemas', label: 'Com problemas' },
  { value: 'Concluído', label: 'Concluído' }
];

// Computed properties
const filteredRooms = computed(() => {
  let result = [...rooms.value];
  
  // Filtrar por busca
  if (roomSearch.value) {
    const searchTerm = roomSearch.value.toLowerCase();
    result = result.filter(room => 
      room.name.toLowerCase().includes(searchTerm) || 
      (room.description && room.description.toLowerCase().includes(searchTerm))
    );
  }
  
  // Ordenar
  result.sort((a, b) => {
    if (roomSortBy.value === 'name') {
      return a.name.localeCompare(b.name);
    } else if (roomSortBy.value === 'progress') {
      return b.progress - a.progress;
    } else if (roomSortBy.value === 'elements') {
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
  if (activeElementTab.value !== 'all') {
    const tabToTypeMap = {
      'door': 'Porta',
      'window': 'Janela',
      'floor': 'Piso',
      'wall': 'Parede'
    };
    
    if (activeElementTab.value === 'other') {
      result = result.filter(element => 
        !['Porta', 'Janela', 'Piso', 'Parede'].includes(element.type)
      );
    } else {
      const targetType = tabToTypeMap[activeElementTab.value];
      result = result.filter(element => element.type === targetType);
    }
  }
  
  return result;
});

// Métodos
const formatDate = (dateString) => {
  if (!dateString) return 'Não definido';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).format(date);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value);
};

const countElementsByType = (elements) => {
  const counts = {};
  elements.forEach(element => {
    counts[element.type] = (counts[element.type] || 0) + 1;
  });
  return counts;
};

const getElementIcon = (type) => {
  const icons = {
    'Porta': 'tabler:door',
    'Janela': 'tabler:window',
    'Piso': 'tabler:grid-dots',
    'Parede': 'tabler:wall',
    'Iluminação': 'tabler:bulb',
    'Outro': 'tabler:building'
  };
  
  return icons[type] || 'tabler:building';
};

const formatSpecKey = (key) => {
  const formatMap = {
    'width': 'Largura',
    'height': 'Altura',
    'area': 'Área',
    'material': 'Material',
    'color': 'Cor',
    'windowType': 'Tipo de Janela',
    'glassType': 'Tipo de Vidro',
    'paintType': 'Tipo de Pintura'
  };
  
  return formatMap[key] || key;
};

const expandRoom = (room) => {
  selectedRoom.value = room;
};

const openAddRoomModal = () => {
  // Resetar dados do formulário
  Object.assign(newRoom, {
    name: '',
    description: '',
    progress: 0,
    elements: []
  });
  
  isAddRoomModalOpen.value = true;
};

const openAddElementModal = () => {
  // Resetar dados do formulário
  Object.assign(newElement, {
    name: '',
    type: 'Porta',
    description: '',
    status: 'Não iniciado',
    specs: {}
  });
  
  isAddElementModalOpen.value = true;
};

const openEditRoomModal = (room) => {
  // Implementação futura
  console.log('Editar cômodo:', room.id);
};

const openDeleteRoomModal = (room) => {
  // Implementação futura
  console.log('Excluir cômodo:', room.id);
};

const openEditElementModal = (element) => {
  // Implementação futura
  console.log('Editar elemento:', element.id);
};

const openDeleteElementModal = (element) => {
  // Implementação futura
  console.log('Excluir elemento:', element.id);
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
      elements: []
    };
    
    rooms.value.push(newRoomData);
    isAddRoomModalOpen.value = false;
    isSaving.value = false;
  }, 500);
};

const handleAddElement = () => {
  if (!selectedRoom.value) return;
  
  isSaving.value = true;
  
  // Simulação de uma chamada de API
  setTimeout(() => {
    const newElementData = {
      id: Date.now().toString(),
      name: newElement.name,
      type: newElement.type,
      description: newElement.description,
      status: newElement.status,
      specs: { ...newElement.specs }
    };
    
    selectedRoom.value.elements.push(newElementData);
    isAddElementModalOpen.value = false;
    isSaving.value = false;
    
    // Atualizar progresso do cômodo (simplificado)
    const completedElements = selectedRoom.value.elements.filter(el => el.status === 'Concluído').length;
    const totalElements = selectedRoom.value.elements.length;
    if (totalElements > 0) {
      selectedRoom.value.progress = Math.round((completedElements / totalElements) * 100);
    }
  }, 500);
};

// Carregar dados da obra
onMounted(async () => {
  isLoading.value = true;
  
  try {
    // Simulando uma chamada para API para buscar os dados da obra
    await new Promise(resolve => setTimeout(resolve, 500));
    // Os dados já estão inicializados para demonstração
  } catch (error) {
    console.error('Erro ao carregar dados da obra:', error);
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