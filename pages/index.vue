<template>
  <div class="h-full p-6 bg-white rounded-lg overflow-auto">

    <header class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        Olá, <span class="text-blue-600">{{ store.user?.name }}</span
        >! Bem-vindo ao BlokarApp
      </h1>
      <p class="text-gray-600">
        Seu sistema de gerenciamento de obras e projetos
      </p>
    </header>

    <!-- Seção de dicas rápidas -->
    <section class="bg-blue-50 p-5 rounded-xl mb-8 border border-blue-100">
      <div class="flex items-center mb-3">
        <div class="bg-blue-100 p-2 rounded-full mr-3">
          <Icon name="tabler:bulb" class="text-blue-600" size="1.5rem" />
        </div>
        <h2 class="text-lg font-semibold text-gray-800">Dicas para começar</h2>
      </div>
      <p class="text-gray-600 mb-4">
        Aqui estão algumas ações rápidas que você pode fazer para começar:
      </p>

      <div class="space-y-2">
        <div class="flex items-center">
          <div
            class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0"
          >
            1
          </div>
          <p class="text-gray-700">
            Cadastre seus <strong>clientes</strong> para organizar melhor seus
            contatos e projetos
          </p>
        </div>
        <div class="flex items-center">
          <div
            class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0"
          >
            2
          </div>
          <p class="text-gray-700">
            Crie uma <strong>obra</strong> para começar a gerenciar um novo
            projeto
          </p>
        </div>
        <div class="flex items-center">
          <div
            class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0"
          >
            3
          </div>
          <p class="text-gray-700">
            Acesse o <strong>painel</strong> para visualizar o andamento de
            todos os seus projetos
          </p>
        </div>
      </div>
    </section>

    <!-- Principais recursos -->
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      O que você pode fazer no BlokarApp
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <!-- Card de Gerenciar Clientes -->
      <div
        class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
        @click="navigateTo('/clients')"
      >
        <div
          class="flex items-center justify-center h-14 w-14 rounded-full bg-amber-100 text-amber-600 mb-4 mx-auto"
        >
          <Icon name="tabler:users" size="1.75rem" />
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2 text-center">
          Gerenciar Clientes
        </h3>
        <p class="text-gray-600 text-center">
          Cadastre e organize seus clientes em um só lugar
        </p>
        <div class="mt-4 flex justify-center">
          <button
            class="flex items-center text-amber-600 font-medium hover:text-amber-700"
          >
            <span>Ver clientes</span>
            <Icon name="tabler:arrow-right" class="ml-1" />
          </button>
        </div>
      </div>

      <!-- Card de Gerenciar Obras -->
      <div
        class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
        @click="navigateTo('/works')"
      >
        <div
          class="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto"
        >
          <Icon name="tabler:building" size="1.75rem" />
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2 text-center">
          Gerenciar Obras
        </h3>
        <p class="text-gray-600 text-center">
          Acompanhe suas obras e organize os detalhes de cada projeto
        </p>
        <div class="mt-4 flex justify-center">
          <button
            class="flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            <span>Ver obras</span>
            <Icon name="tabler:arrow-right" class="ml-1" />
          </button>
        </div>
      </div>

      <!-- Card de Configurações -->
      <div
        class="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
        @click="navigateTo('/settings')"
      >
        <div
          class="flex items-center justify-center h-14 w-14 rounded-full bg-purple-100 text-purple-600 mb-4 mx-auto"
        >
          <Icon name="tabler:settings" size="1.75rem" />
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2 text-center">
          Configurações
        </h3>
        <p class="text-gray-600 text-center">
          Personalize sua conta e ajuste as preferências do sistema
        </p>
        <div class="mt-4 flex justify-center">
          <button
            class="flex items-center text-purple-600 font-medium hover:text-purple-700"
          >
            <span>Configurar</span>
            <Icon name="tabler:arrow-right" class="ml-1" />
          </button>
        </div>
      </div>
    </div>

    <!-- Vídeo de introdução -->
    <div class="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-2 flex items-center">
        <Icon name="tabler:video" class="mr-2 text-red-500" />
        Como usar o BlokarApp
      </h2>
      <p class="text-gray-600 mb-4">
        Assista a este breve vídeo para conhecer os recursos principais do
        sistema:
      </p>
      <div
        class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300 hover:bg-gray-300 transition-colors cursor-pointer"
      >
        <div class="text-center">
          <div
            class="bg-white/80 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg"
          >
            <Icon
              name="tabler:player-play"
              size="2rem"
              class="text-red-600 ml-1"
            />
          </div>
          <span class="text-sm font-medium text-gray-700"
            >Clique para assistir ao tutorial</span
          >
        </div>
      </div>
    </div>

    <!-- Suporte -->
    <div
      class="bg-green-50 p-5 rounded-lg border border-green-100 flex items-start"
    >
      <div class="bg-green-100 p-2 rounded-full mr-4 flex-shrink-0">
        <Icon name="tabler:headset" class="text-green-600" size="1.5rem" />
      </div>
      <div>
        <h3 class="font-medium text-gray-800 mb-1">Precisa de ajuda?</h3>
        <p class="text-gray-600 mb-3">
          Nossa equipe está disponível para ajudar você a tirar o máximo
          proveito do BlokarApp.
        </p>
        <div class="flex flex-wrap gap-3">
          <button
            class="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-lg shadow-sm"
          >
            <Icon name="tabler:mail" class="mr-2" />
            <span>Enviar e-mail</span>
          </button>
          <button
            class="flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-sm"
          >
            <Icon name="tabler:brand-whatsapp" class="mr-2" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

// Estado do usuário
const userName = ref("");
const isLoading = ref(false);

// Carregar dados do usuário
onMounted(async () => {
  isLoading.value = true;

  try {
    // Aqui você poderia buscar dados do usuário de uma API
    // Simulando um usuário para demonstração
    await new Promise((resolve) => setTimeout(resolve, 500));
    userName.value = "Maria Silva";
  } catch (error) {
    console.error("Erro ao carregar dados do usuário:", error);
  } finally {
    isLoading.value = false;
  }
});

// Navegação
const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* Estilo para melhorar a legibilidade do texto */
p {
  line-height: 1.6;
}

/* Transições suaves */
.transition-shadow {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

/* Estilos para dispositivos móveis */
@media (max-width: 768px) {
  .p-6 {
    padding: 1rem;
  }
}
</style>
