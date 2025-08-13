<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Seção esquerda - Banner/ilustração -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10 flex-col justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">BlokarApp</h1>
        <p class="text-blue-100">Gerencie seus projetos de construção com eficiência</p>
      </div>
      
      <div class="flex-1 flex items-center justify-center">
        <img src="/illustrations/building-management.svg" alt="Ilustração de gerenciamento de obras" class="max-w-md w-full" />
      </div>
      
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="bg-white/20 p-2 rounded-lg">
            <Icon name="tabler:chart-pie" class="text-white" size="1.5rem" />
          </div>
          <div>
            <h3 class="font-medium">Análises detalhadas</h3>
            <p class="text-blue-100 text-sm">Relatórios e métricas para suas obras e projetos</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="bg-white/20 p-2 rounded-lg">
            <Icon name="tabler:users" class="text-white" size="1.5rem" />
          </div>
          <div>
            <h3 class="font-medium">Gestão de clientes</h3>
            <p class="text-blue-100 text-sm">Organize seus contatos e histórico de serviços</p>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="bg-white/20 p-2 rounded-lg">
            <Icon name="tabler:building" class="text-white" size="1.5rem" />
          </div>
          <div>
            <h3 class="font-medium">Controle de obras</h3>
            <p class="text-blue-100 text-sm">Acompanhe o progresso e custos de cada projeto</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Seção direita - Formulário de login -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
      <div class="w-full max-w-md">
        <!-- Logo para mobile -->
        <div class="md:hidden text-center mb-8">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">BlokarApp</h1>
          <p class="text-gray-500">Gerencie seus projetos de construção com eficiência</p>
        </div>
        
        <!-- Cabeçalho do formulário -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h2>
          <p class="text-gray-500">
            Faça login na sua conta para continuar
          </p>
        </div>
        
        <!-- Alertas de erro/sucesso -->
        <div v-if="loginError" class="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start">
          <Icon name="tabler:alert-circle" class="mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p class="font-medium">Não foi possível fazer login</p>
            <p class="text-sm">{{ loginError }}</p>
          </div>
        </div>
        
        <!-- Formulário de login -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
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
              <label for="password" class="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <NuxtLink to="/auth/forgot-password" class="text-sm text-blue-600 hover:text-blue-800">
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
        
        <!-- Separador -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-4 text-sm text-gray-500">ou continue com</span>
          </div>
        </div>
        
        <!-- Botões de login social -->
        <div class="grid grid-cols-2 gap-4">
          <button 
            type="button" 
            @click="handleGoogleLogin" 
            class="w-full py-2.5 px-4 border border-gray-300 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Icon name="tabler:brand-google" size="1.25rem" class="text-gray-700" />
            <span>Google</span>
          </button>
          <button 
            type="button" 
            @click="handleMicrosoftLogin" 
            class="w-full py-2.5 px-4 border border-gray-300 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Icon name="tabler:brand-microsoft" size="1.25rem" class="text-gray-700" />
            <span>Microsoft</span>
          </button>
        </div>
        
        <!-- Link para cadastro -->
        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Não tem uma conta?
            <NuxtLink to="/auth/register" class="text-blue-600 hover:text-blue-800 font-medium">
              Registre-se
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);
const loginError = ref('');

// Dados do formulário
const formData = reactive({
  email: '',
  password: '',
  remember: false
});

// Erros de validação
const errors = reactive({
  email: '',
  password: ''
});

// Validar formulário
const validateForm = () => {
  let isValid = true;
  
  // Resetar erros
  errors.email = '';
  errors.password = '';
  
  // Validar email
  if (!formData.email) {
    errors.email = 'O e-mail é obrigatório';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Insira um e-mail válido';
    isValid = false;
  }
  
  // Validar senha
  if (!formData.password) {
    errors.password = 'A senha é obrigatória';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres';
    isValid = false;
  }
  
  return isValid;
};

// Manipular login
const handleLogin = async () => {
  if (!validateForm()) return;
  
  isLoading.value = true;
  loginError.value = '';
  
  try {
    // Simulação de uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Credenciais de teste para demonstração
    if (formData.email === 'admin@exemplo.com' && formData.password === '123456') {
      // Login bem-sucedido
      router.push('/');
    } else {
      // Credenciais inválidas
      loginError.value = 'E-mail ou senha incorretos. Tente novamente.';
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    loginError.value = 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.';
  } finally {
    isLoading.value = false;
  }
};

// Login com Google
const handleGoogleLogin = () => {
  // Implementação do login com Google
  console.log('Login com Google');
};

// Login com Microsoft
const handleMicrosoftLogin = () => {
  // Implementação do login com Microsoft
  console.log('Login com Microsoft');
};
</script>

<style scoped>
/* Estilização para o fundo em gradiente */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientBackground 15s ease infinite;
}

@keyframes gradientBackground {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
</style>