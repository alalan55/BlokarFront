<template>
  <div class="h-full max-h-full p-8 overflow-auto bg-[#fff] rounded wrapper">
    <!-- Cabeçalho do Dashboard -->
    <section class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Dashboard
          </h1>
          <span class="text-sm text-gray-500">Visão geral dos seus projetos e métricas</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-sm text-gray-500">
            {{ currentDate }}
          </div>
          <SharedTButton 
            title="Atualizar dados" 
            icon="tabler:refresh"
            class="bg-gray-100 text-gray-700 hover:bg-gray-200"
            @click="refreshData"
          />
        </div>
      </div>
    </section>

    <!-- Cards principais com métricas -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <div>
            <div class="text-gray-500 text-sm font-medium mb-1">Obras ativas</div>
            <div class="text-3xl font-bold">{{ metrics.activeWorks }}</div>
            <div class="mt-1 text-sm">
              <span class="text-green-500 font-medium">
                <Icon name="tabler:arrow-up" class="inline" />
                {{ metrics.activeWorksGrowth }}%
              </span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
          <div class="bg-blue-100 p-3 rounded-lg">
            <Icon name="tabler:building" class="text-blue-600" size="1.8rem" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <div>
            <div class="text-gray-500 text-sm font-medium mb-1">Faturamento mensal</div>
            <div class="text-3xl font-bold">R$ {{ formatNumber(metrics.monthlyRevenue) }}</div>
            <div class="mt-1 text-sm">
              <span class="text-green-500 font-medium">
                <Icon name="tabler:arrow-up" class="inline" />
                {{ metrics.revenueGrowth }}%
              </span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
          <div class="bg-green-100 p-3 rounded-lg">
            <Icon name="tabler:coin" class="text-green-600" size="1.8rem" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <div>
            <div class="text-gray-500 text-sm font-medium mb-1">Total de clientes</div>
            <div class="text-3xl font-bold">{{ metrics.totalClients }}</div>
            <div class="mt-1 text-sm">
              <span class="text-green-500 font-medium">
                <Icon name="tabler:arrow-up" class="inline" />
                {{ metrics.clientsGrowth }}%
              </span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
          <div class="bg-purple-100 p-3 rounded-lg">
            <Icon name="tabler:users" class="text-purple-600" size="1.8rem" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <div>
            <div class="text-gray-500 text-sm font-medium mb-1">Taxa de conclusão</div>
            <div class="text-3xl font-bold">{{ metrics.completionRate }}%</div>
            <div class="mt-1 text-sm">
              <span class="text-red-500 font-medium">
                <Icon name="tabler:arrow-down" class="inline" />
                {{ metrics.completionRateChange }}%
              </span>
              <span class="text-gray-500 ml-1">vs mês anterior</span>
            </div>
          </div>
          <div class="bg-amber-100 p-3 rounded-lg">
            <Icon name="tabler:chart-pie" class="text-amber-600" size="1.8rem" />
          </div>
        </div>
      </div>
    </section>

    <!-- Gráficos e tabelas principais -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Gráfico principal -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg">Desempenho de Projetos</h2>
          <div class="flex gap-2">
            <button 
              v-for="period in chartPeriods" 
              :key="period.value"
              @click="selectedChartPeriod = period.value"
              class="px-3 py-1 text-sm rounded-md" 
              :class="selectedChartPeriod === period.value ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'"
            >
              {{ period.label }}
            </button>
          </div>
        </div>
        
        <!-- Área do gráfico (mockup) -->
        <div class="h-[300px] relative">
          <!-- Eixo Y -->
          <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <div>R$ 100k</div>
            <div>R$ 75k</div>
            <div>R$ 50k</div>
            <div>R$ 25k</div>
            <div>R$ 0</div>
          </div>
          
          <!-- Gráfico mockup -->
          <div class="absolute left-10 right-0 top-0 h-full flex items-end">
            <div 
              v-for="(item, index) in chartData" 
              :key="index" 
              class="flex-1 mx-1 flex flex-col items-center"
            >
              <div class="w-full flex justify-center">
                <div 
                  class="w-full max-w-[30px] rounded-t-sm" 
                  :class="item.color"
                  :style="{ height: item.height + 'px' }"
                ></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de próximos prazos -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg">Próximos Prazos</h2>
          <button class="text-sm text-blue-600 hover:text-blue-800">Ver todos</button>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="deadline in upcomingDeadlines" 
            :key="deadline.id"
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
          >
            <div 
              class="min-w-[45px] h-[45px] rounded-lg flex items-center justify-center text-center"
              :class="getDeadlineColor(deadline.daysRemaining)"
            >
              <div>
                <div class="text-xs font-medium">{{ deadline.daysRemaining }}</div>
                <div class="text-[10px]">dias</div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-sm truncate">{{ deadline.title }}</h3>
              <p class="text-xs text-gray-500 truncate">{{ deadline.client }}</p>
            </div>
            <Icon name="tabler:chevron-right" class="text-gray-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Segunda linha: Lista de obras recentes e status -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Obras recentes -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg">Obras Recentes</h2>
          <button class="text-sm text-blue-600 hover:text-blue-800">Ver todas</button>
        </div>
        
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase">Projeto</th>
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase">Progresso</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="work in recentWorks" 
                :key="work.id"
                class="border-b border-gray-50 hover:bg-gray-50"
              >
                <td class="py-3">
                  <div class="font-medium text-sm">{{ work.name }}</div>
                </td>
                <td class="py-3 text-sm text-gray-600">{{ work.client }}</td>
                <td class="py-3">
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(work.status)"
                  >{{ work.status }}</span>
                </td>
                <td class="py-3">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        class="h-full" 
                        :class="getProgressClass(work.progress)"
                        :style="{ width: work.progress + '%' }"
                      ></div>
                    </div>
                    <div class="text-xs font-medium">{{ work.progress }}%</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Status de clientes e atividades -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg">Atividades Recentes</h2>
          <button class="text-sm text-blue-600 hover:text-blue-800">Ver todas</button>
        </div>
        
        <div class="space-y-4">
          <div 
            v-for="(activity, index) in recentActivities" 
            :key="index"
            class="flex gap-3"
          >
            <div 
              class="relative flex h-10 w-10 flex-none items-center justify-center rounded-full"
              :class="getActivityIconBackground(activity.type)"
            >
              <Icon 
                :name="getActivityIcon(activity.type)" 
                class="h-5 w-5" 
                :class="getActivityIconColor(activity.type)" 
              />
            </div>
            
            <div class="flex-1 flex flex-col">
              <div class="flex justify-between text-sm">
                <span class="font-medium">{{ activity.title }}</span>
                <span class="text-gray-500">{{ activity.time }}</span>
              </div>
              <div class="text-sm text-gray-500">{{ activity.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Data atual formatada
const currentDate = computed(() => {
  const date = new Date();
  return new Intl.DateTimeFormat('pt-BR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
});

// Métricas principais
const metrics = ref({
  activeWorks: 18,
  activeWorksGrowth: 12.5,
  monthlyRevenue: 87500,
  revenueGrowth: 8.2,
  totalClients: 24,
  clientsGrowth: 15,
  completionRate: 85,
  completionRateChange: 2.5
});

// Formatador de números
const formatNumber = (number) => {
  return number.toLocaleString('pt-BR');
};

// Dados do gráfico
const chartPeriods = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
  { value: 'quarter', label: 'Trimestre' },
  { value: 'year', label: 'Ano' }
];
const selectedChartPeriod = ref('month');

// Dados mockados para o gráfico
const chartData = [
  { label: 'Jan', height: 150, color: 'bg-blue-500' },
  { label: 'Fev', height: 180, color: 'bg-blue-500' },
  { label: 'Mar', height: 120, color: 'bg-blue-500' },
  { label: 'Abr', height: 160, color: 'bg-blue-500' },
  { label: 'Mai', height: 200, color: 'bg-blue-500' },
  { label: 'Jun', height: 180, color: 'bg-blue-500' },
  { label: 'Jul', height: 220, color: 'bg-blue-500' },
  { label: 'Ago', height: 200, color: 'bg-blue-500' },
  { label: 'Set', height: 180, color: 'bg-blue-500' },
  { label: 'Out', height: 160, color: 'bg-purple-500' },
  { label: 'Nov', height: 210, color: 'bg-purple-500' },
  { label: 'Dez', height: 240, color: 'bg-purple-500' }
];

// Prazos próximos
const upcomingDeadlines = [
  { 
    id: 1, 
    title: 'Edifício Aurora - Fase 2', 
    client: 'Construtora Silva',
    daysRemaining: 5
  },
  { 
    id: 2, 
    title: 'Reforma Shopping Plaza', 
    client: 'Shopping Plaza',
    daysRemaining: 12
  },
  { 
    id: 3, 
    title: 'Casa de Praia', 
    client: 'João Pereira',
    daysRemaining: 21
  },
  { 
    id: 4, 
    title: 'Condomínio Parque Verde', 
    client: 'Construtora Silva',
    daysRemaining: 30
  }
];

// Cores para os prazos com base na urgência
const getDeadlineColor = (days) => {
  if (days <= 7) return 'bg-red-100 text-red-800';
  if (days <= 14) return 'bg-amber-100 text-amber-800';
  if (days <= 21) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
};

// Obras recentes
const recentWorks = [
  {
    id: 1,
    name: 'Edifício Residencial Aurora',
    client: 'Construtora Silva',
    status: 'Em andamento',
    progress: 65
  },
  {
    id: 2,
    name: 'Reforma Shopping Center',
    client: 'Shopping Plaza',
    status: 'Planejamento',
    progress: 10
  },
  {
    id: 3,
    name: 'Casa de Praia Oceano',
    client: 'João Pereira',
    status: 'Concluído',
    progress: 100
  },
  {
    id: 4,
    name: 'Condomínio Parque Verde',
    client: 'Construtora Silva',
    status: 'Em andamento',
    progress: 35
  }
];

// Classes para status
const getStatusClass = (status) => {
  const classes = {
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Planejamento': 'bg-blue-100 text-blue-800',
    'Cancelado': 'bg-red-100 text-red-800'
  };
  return classes[status] || '';
};

// Classes para progresso
const getProgressClass = (progress) => {
  if (progress >= 100) return 'bg-green-500';
  if (progress >= 75) return 'bg-green-400';
  if (progress >= 50) return 'bg-yellow-500';
  if (progress >= 25) return 'bg-yellow-400';
  return 'bg-blue-400';
};

// Atividades recentes
const recentActivities = [
  {
    type: 'new_work',
    title: 'Novo projeto criado',
    description: 'Edifício Aurora - Fase 2 foi adicionado',
    time: 'Agora'
  },
  {
    type: 'update',
    title: 'Progresso atualizado',
    description: 'Casa de Praia Oceano: 95% → 100%',
    time: '2h atrás'
  },
  {
    type: 'client',
    title: 'Novo cliente',
    description: 'Pedro Alves foi adicionado como cliente',
    time: '5h atrás'
  },
  {
    type: 'payment',
    title: 'Pagamento recebido',
    description: 'R$ 15.000,00 de Construtora Silva',
    time: '1d atrás'
  },
  {
    type: 'comment',
    title: 'Novo comentário',
    description: 'João deixou um comentário em Reforma Shopping',
    time: '2d atrás'
  }
];

// Ícones para atividades
const getActivityIcon = (type) => {
  const icons = {
    new_work: 'tabler:building-factory',
    update: 'tabler:refresh',
    client: 'tabler:user-plus',
    payment: 'tabler:cash',
    comment: 'tabler:message'
  };
  return icons[type] || 'tabler:activity';
};

// Background para os ícones
const getActivityIconBackground = (type) => {
  const backgrounds = {
    new_work: 'bg-blue-100',
    update: 'bg-yellow-100',
    client: 'bg-purple-100',
    payment: 'bg-green-100',
    comment: 'bg-indigo-100'
  };
  return backgrounds[type] || 'bg-gray-100';
};

// Cores para os ícones
const getActivityIconColor = (type) => {
  const colors = {
    new_work: 'text-blue-600',
    update: 'text-yellow-600',
    client: 'text-purple-600',
    payment: 'text-green-600',
    comment: 'text-indigo-600'
  };
  return colors[type] || 'text-gray-600';
};

// Função para atualizar os dados
const refreshData = () => {
  // Simulação de atualização de dados
  console.log('Atualizando dados...');
  // Implementação real conectaria à API
};
</script>

<style scoped lang="postcss">
.wrapper {
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
    border-radius: 4px;
  }
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
