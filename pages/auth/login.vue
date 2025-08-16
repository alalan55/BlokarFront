<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <div
      class="hidden md:flex md:w-1/2 bg-gray-900 text-white relative overflow-hidden"
    >
      <!-- Padrão geométrico abstrato de fundo -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-full h-full">
          <div
            class="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30"
          ></div>
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-800 rounded-full blur-3xl opacity-40"
          ></div>
        </div>

        <!-- Linhas geométricas -->
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect
              width="40"
              height="40"
              fill="none"
              stroke="currentColor"
              stroke-width="0.5"
              stroke-opacity="0.1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <!-- Conteúdo principal -->
      <div class="relative z-10 flex flex-col justify-between h-full p-12">
        <!-- Logo e slogan -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center"
            >
              <Icon
                name="tabler:building-skyscraper"
                class="text-white"
                size="1.5rem"
              />
            </div>
            <h1 class="text-3xl font-bold tracking-tight">BlokarApp</h1>
          </div>
          <p class="text-gray-400 text-lg">
            Plataforma de gerenciamento de obras e projetos
          </p>
        </div>

        <!-- Elemento central - Citação -->
        <div class="my-12 max-w-md">
          <blockquote
            class="border-l-4 border-blue-500 pl-4 py-2 italic text-gray-300"
          >
            "Transforme seus projetos de construção com uma gestão eficiente e
            integrada. Simplifique o complexo e potencialize resultados."
          </blockquote>
          <div class="mt-4 flex items-center gap-3">
            <div
              class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center"
            >
              <Icon name="tabler:user" class="text-blue-400" size="1.5rem" />
            </div>
            <div>
              <p class="font-medium">Engenharia & Arquitetura</p>
              <p class="text-sm text-gray-400">Profissionais de construção</p>
            </div>
          </div>
        </div>

        <!-- Recursos principais em design minimalista -->
        <div class="grid grid-cols-2 gap-6">
          <div
            class="p-4 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-sm"
          >
            <div class="mb-3">
              <Icon
                name="tabler:chart-bar"
                class="text-blue-400"
                size="1.75rem"
              />
            </div>
            <h3 class="font-medium mb-1">Análise Avançada</h3>
            <p class="text-gray-400 text-sm">
              Métricas e insights em tempo real
            </p>
          </div>

          <div
            class="p-4 bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-sm"
          >
            <div class="mb-3">
              <Icon
                name="tabler:building-estate"
                class="text-blue-400"
                size="1.75rem"
              />
            </div>
            <h3 class="font-medium mb-1">Gestão Completa</h3>
            <p class="text-gray-400 text-sm">Projetos, orçamentos e prazos</p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-md">
        <div class="md:hidden text-center mb-8">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">BlokarApp</h1>
          <p class="text-gray-500">
            Gerencie seus projetos de construção com eficiência
          </p>
        </div>

        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta
          </h2>
          <p class="text-gray-500">Faça login na sua conta para continuar</p>
        </div>

        <div
          v-if="loginError"
          class="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start"
        >
          <Icon name="tabler:alert-circle" class="mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-medium">Não foi possível fazer login</p>
            <p class="text-sm">{{ loginError }}</p>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <SharedTInput
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="seu@email.com"
              autocomplete="email"
              :error="errors.email"
              required
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <NuxtLink
                to="/auth/forgot-password"
                class="text-sm text-blue-600 hover:text-blue-800"
              >
                Esqueceu a senha?
              </NuxtLink>
            </div>
            <SharedTInput
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              :error="errors.password"
              required
            />
          </div>

          <div class="flex items-center">
            <input
              id="remember"
              v-model="formData.remember"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700">
              Lembrar de mim
            </label>
          </div>

          <div>
            <SharedTButton
              type="submit"
              title="Entrar"
              class="w-full bg-blue-600 hover:bg-blue-700"
              :loading="isLoading"
            />
          </div>
        </form>

        <div class="relative my-6">
          <div class="0 flex absolute inset-items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-4 text-sm text-gray-500"
              >ou continue com</span
            >
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            @click="handleGoogleLogin"
            class="w-full py-2.5 px-4 border border-gray-300 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Icon
              name="tabler:brand-google"
              size="1.25rem"
              class="text-gray-700"
            />
            <span>Google</span>
          </button>
          <button
            type="button"
            @click="handleMicrosoftLogin"
            class="w-full py-2.5 px-4 border border-gray-300 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Icon
              name="tabler:brand-microsoft"
              size="1.25rem"
              class="text-gray-700"
            />
            <span>Microsoft</span>
          </button>
        </div>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Não tem uma conta?
            <NuxtLink
              to="/auth/register"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Registre-se
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const http = useApi();
const store = useStore();

const router = useRouter();
const isLoading = ref(false);
const loginError = ref("");

// Dados do formulário
const formData = reactive({
  email: "",
  password: "",
  remember: false,
});

// Erros de validação
const errors = reactive({
  email: "",
  password: "",
});

// Validar formulário
const validateForm = () => {
  let isValid = true;

  // Resetar erros
  errors.email = "";
  errors.password = "";

  // Validar email
  if (!formData.email) {
    errors.email = "O e-mail é obrigatório";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Insira um e-mail válido";
    isValid = false;
  }

  // Validar senha
  if (!formData.password) {
    errors.password = "A senha é obrigatória";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres";
    isValid = false;
  }

  return isValid;
};

// Manipular login
const handleLogin = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  loginError.value = "";

  try {
    // Simulação de uma chamada de API
    const { data, error } = await http.post("auth/login", formData);

    if (error.value) {
      loginError.value = error.value;
      console.error("Erro ao fazer login:", error.value);

      return;
    }

    store.setUser(data.value.content);

    router.push("/");
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    loginError.value =
      "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
  } finally {
    isLoading.value = false;
  }
};

// Login com Google
const handleGoogleLogin = () => {
  // Implementação do login com Google
  console.log("Login com Google");
};

// Login com Microsoft
const handleMicrosoftLogin = () => {
  // Implementação do login com Microsoft
  console.log("Login com Microsoft");
};
</script>

<style scoped>
/* Animações para elementos do painel esquerdo */
@keyframes pulseGlow {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.2;
  }
}

.blur-3xl {
  filter: blur(60px);
  animation: pulseGlow 8s ease-in-out infinite;
}

/* Efeito de hover nos cards */
.bg-gray-800 {
  transition: all 0.3s ease;
}

.bg-gray-800:hover {
  background-color: rgba(39, 48, 63, 0.7);
  transform: translateY(-2px);
}
</style>
