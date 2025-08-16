<template>
  <div class="h-full max-h-full p-8 overflow-auto bg-[#fff] rounded wrapper">
    <!-- Cabeçalho da página -->
    <section class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-black bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
            Configurações
          </h1>
          <span class="text-sm text-gray-500">Gerencie sua conta e preferências do sistema</span>
        </div>
      </div>
    </section>

    <!-- Layout principal com navegação lateral e conteúdo -->
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Barra lateral de navegação -->
      <aside class="md:w-64 flex-shrink-0">
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <nav>
            <ul>
              <li>
                <button 
                  @click="activeSection = 'profile'" 
                  class="w-full text-left px-4 py-3 flex items-center gap-2 border-l-4"
                  :class="activeSection === 'profile' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-gray-50'"
                >
                  <Icon name="tabler:user" />
                  <span>Perfil</span>
                </button>
              </li>
              <li>
                <button 
                  @click="activeSection = 'account'" 
                  class="w-full text-left px-4 py-3 flex items-center gap-2 border-l-4"
                  :class="activeSection === 'account' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-gray-50'"
                >
                  <Icon name="tabler:shield" />
                  <span>Conta e Segurança</span>
                </button>
              </li>
              <li>
                <button 
                  @click="activeSection = 'notifications'" 
                  class="w-full text-left px-4 py-3 flex items-center gap-2 border-l-4"
                  :class="activeSection === 'notifications' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-gray-50'"
                >
                  <Icon name="tabler:bell" />
                  <span>Notificações</span>
                </button>
              </li>
              <li>
                <button 
                  @click="activeSection = 'appearance'" 
                  class="w-full text-left px-4 py-3 flex items-center gap-2 border-l-4"
                  :class="activeSection === 'appearance' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-gray-50'"
                >
                  <Icon name="tabler:palette" />
                  <span>Aparência</span>
                </button>
              </li>
              <li>
                <button 
                  @click="activeSection = 'company'" 
                  class="w-full text-left px-4 py-3 flex items-center gap-2 border-l-4"
                  :class="activeSection === 'company' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-gray-50'"
                >
                  <Icon name="tabler:building" />
                  <span>Empresa</span>
                </button>
              </li>
              <li>
                <button 
                  @click="activeSection = 'billing'" 
                  class="w-full text-left px-4 py-3 flex items-center gap-2 border-l-4"
                  :class="activeSection === 'billing' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-gray-50'"
                >
                  <Icon name="tabler:credit-card" />
                  <span>Faturamento</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Área de conteúdo principal -->
      <div class="flex-1">
        <!-- Seção de Perfil -->
        <div v-if="activeSection === 'profile'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold mb-4">Informações Pessoais</h2>
            
            <div class="flex flex-col sm:flex-row gap-6 mb-6">
              <!-- Avatar upload -->
              <div class="flex flex-col items-center">
                <div class="relative mb-3">
                  <div class="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar" class="h-full w-full object-cover" />
                    <Icon v-else name="tabler:user" size="2rem" class="text-gray-400" />
                  </div>
                  <button class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 shadow-md hover:bg-blue-600">
                    <Icon name="tabler:pencil" size="1rem" />
                  </button>
                </div>
                <button class="text-sm text-blue-600 hover:text-blue-800">Alterar foto</button>
              </div>

              <!-- Informações básicas -->
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <SharedTInput v-model="profile.firstName" placeholder="Nome" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                  <SharedTInput v-model="profile.lastName" placeholder="Sobrenome" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <SharedTInput v-model="profile.email" placeholder="email@exemplo.com" type="email" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <SharedTInput 
                    v-model="profile.phone" 
                    placeholder="(00) 00000-0000" 
                    v-maska
                    data-maska="(##) #####-####"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <SharedTInput v-model="profile.jobTitle" placeholder="Ex: Gerente de Projetos" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <SharedTSelect 
                  v-model="profile.department" 
                  :options="departmentOptions" 
                  placeholder="Selecione o departamento"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  v-model="profile.bio" 
                  rows="3" 
                  placeholder="Breve descrição sobre você" 
                  class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <SharedTButton 
                title="Salvar alterações" 
                class="w-auto bg-blue-600 hover:bg-blue-700" 
                @click="saveProfile"
              />
            </div>
          </div>
        </div>

        <!-- Seção de Conta e Segurança -->
        <div v-if="activeSection === 'account'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold mb-4">Alterar Senha</h2>
            
            <div class="space-y-4 max-w-md">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Senha atual</label>
                <SharedTInput v-model="security.currentPassword" placeholder="••••••••" type="password" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nova senha</label>
                <SharedTInput v-model="security.newPassword" placeholder="••••••••" type="password" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar nova senha</label>
                <SharedTInput v-model="security.confirmPassword" placeholder="••••••••" type="password" />
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <SharedTButton 
                title="Atualizar senha" 
                class="w-auto bg-blue-600 hover:bg-blue-700" 
                @click="updatePassword"
              />
            </div>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold mb-4">Segurança da Conta</h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium">Autenticação de dois fatores</h3>
                  <p class="text-sm text-gray-500">Aumente a segurança da sua conta com autenticação de dois fatores</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="security.twoFactorEnabled" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium">Notificações de login</h3>
                  <p class="text-sm text-gray-500">Receba notificações quando houver login em um novo dispositivo</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="security.loginNotifications" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium">Sessões ativas</h3>
                  <p class="text-sm text-gray-500">Você está conectado em 2 dispositivos</p>
                </div>
                <SharedTButton 
                  title="Gerenciar" 
                  class="w-auto bg-gray-100 text-gray-700 hover:bg-gray-200" 
                  @click="showSessionsModal = true"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Seção de Notificações -->
        <div v-if="activeSection === 'notifications'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold mb-4">Preferências de Notificação</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="font-medium mb-3">Notificações por Email</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-sm">Atualizações de projetos</p>
                      <p class="text-sm text-gray-500">Notificações quando houver mudanças em projetos</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.emailProjectUpdates" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-sm">Novos clientes</p>
                      <p class="text-sm text-gray-500">Notificações quando novos clientes forem adicionados</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.emailNewClients" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-sm">Prazos próximos</p>
                      <p class="text-sm text-gray-500">Alertas sobre prazos que estão chegando</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.emailDeadlines" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <h3 class="font-medium mb-3">Notificações no Sistema</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-sm">Atualizações de projetos</p>
                      <p class="text-sm text-gray-500">Notificações quando houver mudanças em projetos</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.systemProjectUpdates" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-sm">Comentários</p>
                      <p class="text-sm text-gray-500">Notificações quando novos comentários forem adicionados</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.systemComments" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <SharedTButton 
                title="Salvar preferências" 
                class="w-auto bg-blue-600 hover:bg-blue-700" 
                @click="saveNotifications"
              />
            </div>
          </div>
        </div>

        <!-- Seção de Aparência -->
        <div v-if="activeSection === 'appearance'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold mb-4">Tema e Aparência</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="font-medium mb-3">Modo de exibição</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div 
                    class="flex flex-col items-center bg-gray-50 rounded-lg p-4 cursor-pointer border-2"
                    :class="appearance.theme === 'light' ? 'border-blue-500' : 'border-gray-100'"
                    @click="appearance.theme = 'light'"
                  >
                    <div class="h-20 w-full bg-white border border-gray-200 rounded-md mb-3 flex items-center justify-center">
                      <div class="w-8 h-8 rounded-full bg-blue-500"></div>
                    </div>
                    <div class="font-medium text-sm">Claro</div>
                  </div>
                  
                  <div 
                    class="flex flex-col items-center bg-gray-50 rounded-lg p-4 cursor-pointer border-2"
                    :class="appearance.theme === 'dark' ? 'border-blue-500' : 'border-gray-100'"
                    @click="appearance.theme = 'dark'"
                  >
                    <div class="h-20 w-full bg-gray-800 border border-gray-700 rounded-md mb-3 flex items-center justify-center">
                      <div class="w-8 h-8 rounded-full bg-blue-400"></div>
                    </div>
                    <div class="font-medium text-sm">Escuro</div>
                  </div>
                  
                  <div 
                    class="flex flex-col items-center bg-gray-50 rounded-lg p-4 cursor-pointer border-2"
                    :class="appearance.theme === 'system' ? 'border-blue-500' : 'border-gray-100'"
                    @click="appearance.theme = 'system'"
                  >
                    <div class="h-20 w-full bg-gradient-to-r from-white to-gray-800 border border-gray-200 rounded-md mb-3 flex items-center justify-center">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"></div>
                    </div>
                    <div class="font-medium text-sm">Sistema</div>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <h3 class="font-medium mb-3">Cor principal</h3>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2">
                  <div 
                    v-for="color in colorOptions" 
                    :key="color.value"
                    class="flex flex-col items-center cursor-pointer"
                    @click="appearance.accentColor = color.value"
                  >
                    <div 
                      class="h-10 w-10 rounded-full border-2 mb-1"
                      :class="[
                        color.bgClass, 
                        appearance.accentColor === color.value ? 'border-gray-800' : 'border-transparent'
                      ]"
                    ></div>
                    <span class="text-xs">{{ color.label }}</span>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <h3 class="font-medium mb-3">Layout da navegação</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div 
                    class="flex flex-col items-center bg-gray-50 rounded-lg p-4 cursor-pointer border-2"
                    :class="appearance.navLayout === 'sidebar' ? 'border-blue-500' : 'border-gray-100'"
                    @click="appearance.navLayout = 'sidebar'"
                  >
                    <div class="h-20 w-full bg-white border border-gray-200 rounded-md mb-3 flex items-start p-2">
                      <div class="w-1/4 h-full bg-gray-100 rounded"></div>
                    </div>
                    <div class="font-medium text-sm">Lateral</div>
                  </div>
                  
                  <div 
                    class="flex flex-col items-center bg-gray-50 rounded-lg p-4 cursor-pointer border-2"
                    :class="appearance.navLayout === 'top' ? 'border-blue-500' : 'border-gray-100'"
                    @click="appearance.navLayout = 'top'"
                  >
                    <div class="h-20 w-full bg-white border border-gray-200 rounded-md mb-3 flex flex-col p-2">
                      <div class="w-full h-1/4 bg-gray-100 rounded mb-2"></div>
                    </div>
                    <div class="font-medium text-sm">Superior</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <SharedTButton 
                title="Salvar preferências" 
                class="w-auto bg-blue-600 hover:bg-blue-700" 
                @click="saveAppearance"
              />
            </div>
          </div>
        </div>

        <!-- Seção de Empresa -->
        <div v-if="activeSection === 'company'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold mb-4">Informações da Empresa</h2>
            
            <div class="flex flex-col sm:flex-row gap-6 mb-6">
              <!-- Logo upload -->
              <div class="flex flex-col items-center">
                <div class="relative mb-3">
                  <div class="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img v-if="company.logo" :src="company.logo" alt="Logo" class="h-full w-full object-cover" />
                    <Icon v-else name="tabler:building" size="2rem" class="text-gray-400" />
                  </div>
                  <button class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 shadow-md hover:bg-blue-600">
                    <Icon name="tabler:pencil" size="1rem" />
                  </button>
                </div>
                <button class="text-sm text-blue-600 hover:text-blue-800">Alterar logo</button>
              </div>

              <!-- Informações da empresa -->
              <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nome da empresa</label>
                  <SharedTInput v-model="company.name" placeholder="Nome da empresa" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                  <SharedTInput 
                    v-model="company.taxId" 
                    placeholder="00.000.000/0000-00" 
                    v-maska 
                    data-maska="##.###.###/####-##"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <SharedTInput v-model="company.email" placeholder="contato@empresa.com" type="email" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <SharedTInput 
                    v-model="company.phone" 
                    placeholder="(00) 0000-0000" 
                    v-maska 
                    data-maska="(##) ####-####"
                  />
                </div>
              </div>
            </div>

            <!-- Endereço -->
            <div class="pt-4 border-t border-gray-200">
              <h3 class="font-medium mb-3">Endereço</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                  <SharedTInput 
                    v-model="company.address.postalCode" 
                    placeholder="00000-000" 
                    v-maska 
                    data-maska="#####-###"
                    @blur="fetchAddressByPostalCode"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                  <SharedTInput v-model="company.address.street" placeholder="Rua/Avenida" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Número</label>
                  <SharedTInput v-model="company.address.number" placeholder="Número" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                  <SharedTInput v-model="company.address.complement" placeholder="Sala, Andar, etc." />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <SharedTInput v-model="company.address.district" placeholder="Bairro" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <SharedTInput v-model="company.address.city" placeholder="Cidade" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <SharedTSelect 
                    v-model="company.address.state" 
                    :options="stateOptions" 
                    placeholder="Selecione um estado"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <SharedTButton 
                title="Salvar informações" 
                class="w-auto bg-blue-600 hover:bg-blue-700" 
                @click="saveCompany"
              />
            </div>
          </div>
        </div>

        <!-- Seção de Faturamento -->
        <div v-if="activeSection === 'billing'" class="space-y-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-bold">Plano e Assinatura</h2>
              <SharedTButton 
                title="Alterar plano" 
                class="w-auto bg-blue-600 hover:bg-blue-700" 
              />
            </div>
            
            <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 rounded-lg">
                  <Icon name="tabler:award" class="text-blue-600" size="1.5rem" />
                </div>
                <div>
                  <h3 class="font-medium text-blue-800">Plano Premium</h3>
                  <p class="text-sm text-blue-600 mb-1">
                    R$ 199,90 / mês
                  </p>
                  <p class="text-sm text-gray-600">
                    Próxima cobrança em 15/09/2025
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-4 mb-6">
              <h3 class="font-medium">Detalhes do plano</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex gap-2 items-center">
                  <Icon name="tabler:check" class="text-green-500" />
                  <span>Usuários ilimitados</span>
                </div>
                <div class="flex gap-2 items-center">
                  <Icon name="tabler:check" class="text-green-500" />
                  <span>Projetos ilimitados</span>
                </div>
                <div class="flex gap-2 items-center">
                  <Icon name="tabler:check" class="text-green-500" />
                  <span>Relatórios avançados</span>
                </div>
                <div class="flex gap-2 items-center">
                  <Icon name="tabler:check" class="text-green-500" />
                  <span>Suporte prioritário</span>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="font-medium mb-3">Método de pagamento</h3>
              
              <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg mb-4">
                <div class="p-2 bg-gray-100 rounded">
                  <Icon name="tabler:credit-card" class="text-gray-700" />
                </div>
                <div class="flex-1">
                  <div class="font-medium">Cartão final 4242</div>
                  <div class="text-sm text-gray-500">Expira em 12/2026</div>
                </div>
                <button class="text-blue-600 hover:text-blue-800 text-sm">
                  Alterar
                </button>
              </div>

              <div class="flex justify-end">
                <SharedTButton 
                  title="Adicionar novo método" 
                  class="w-auto bg-gray-100 text-gray-700 hover:bg-gray-200" 
                  icon="tabler:plus"
                />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 class="text-lg font-bold mb-4">Histórico de pagamentos</h2>
            
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead>
                  <tr class="border-b border-gray-100">
                    <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th class="py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                    <th class="py-3 text-right text-xs font-medium text-gray-500 uppercase">Valor</th>
                    <th class="py-3 text-right text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th class="py-3 text-right text-xs font-medium text-gray-500 uppercase">Recibo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(invoice, index) in billingHistory" 
                    :key="index"
                    class="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td class="py-3 text-sm">{{ invoice.date }}</td>
                    <td class="py-3 text-sm">{{ invoice.description }}</td>
                    <td class="py-3 text-sm text-right">R$ {{ invoice.amount }}</td>
                    <td class="py-3 text-right">
                      <span 
                        class="px-2 py-1 rounded-full text-xs font-medium"
                        :class="invoice.status === 'Pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                      >{{ invoice.status }}</span>
                    </td>
                    <td class="py-3 text-right">
                      <button class="text-blue-600 hover:text-blue-800">
                        <Icon name="tabler:download" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de sessões ativas -->
  <SharedTModal 
    v-model="showSessionsModal" 
    title="Gerenciar sessões ativas" 
    @close="showSessionsModal = false"
  >
    <div class="space-y-4">
      <p class="text-sm text-gray-500">
        Estas são as sessões atualmente ativas em sua conta. Você pode terminar qualquer sessão que não reconheça.
      </p>

      <div class="space-y-3 mt-4">
        <div 
          v-for="(session, index) in activeSessions" 
          :key="index"
          class="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
        >
          <div class="flex gap-3">
            <div class="p-2 bg-gray-100 rounded">
              <Icon :name="session.device === 'mobile' ? 'tabler:device-mobile' : 'tabler:device-laptop'" class="text-gray-600" />
            </div>
            <div>
              <div class="font-medium">{{ session.browser }} em {{ session.os }}</div>
              <div class="text-xs text-gray-500">{{ session.location }} · {{ session.lastActive }}</div>
            </div>
          </div>
          <button 
            v-if="session.current"
            class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded"
          >
            Sessão atual
          </button>
          <button 
            v-else
            class="text-xs text-red-600 hover:text-red-800"
            @click="terminateSession(index)"
          >
            Encerrar sessão
          </button>
        </div>
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <SharedTButton 
          title="Encerrar todas as outras sessões" 
          class="w-auto bg-red-600 hover:bg-red-700" 
          @click="terminateAllSessions"
        />
        <SharedTButton 
          title="Fechar" 
          class="w-auto bg-gray-200 hover:bg-gray-300 text-gray-800" 
          @click="showSessionsModal = false" 
        />
      </div>
    </div>
  </SharedTModal>
</template>

<script setup>
import { ref } from 'vue';

// Seção ativa
const activeSection = ref('profile');

// Estado do modal de sessões
const showSessionsModal = ref(false);

// Perfil
const profile = ref({
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao.silva@exemplo.com',
  phone: '(11) 98765-4321',
  jobTitle: 'Gerente de Projetos',
  department: 'engenharia',
  bio: 'Gerente de projetos com mais de 10 anos de experiência em construção civil.',
  avatar: null // URL da imagem
});

// Opções para departamentos
const departmentOptions = [
  { value: 'engenharia', label: 'Engenharia' },
  { value: 'administrativo', label: 'Administrativo' },
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'operacional', label: 'Operacional' }
];

// Segurança da conta
const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: false,
  loginNotifications: true
});

// Notificações
const notifications = ref({
  emailProjectUpdates: true,
  emailNewClients: true,
  emailDeadlines: true,
  systemProjectUpdates: true,
  systemComments: true
});

// Aparência
const appearance = ref({
  theme: 'light', // light, dark, system
  accentColor: 'blue',
  navLayout: 'sidebar' // sidebar, top
});

// Opções de cores
const colorOptions = [
  { value: 'blue', label: 'Azul', bgClass: 'bg-blue-500' },
  { value: 'indigo', label: 'Índigo', bgClass: 'bg-indigo-500' },
  { value: 'purple', label: 'Roxo', bgClass: 'bg-purple-500' },
  { value: 'teal', label: 'Verde-água', bgClass: 'bg-teal-500' },
  { value: 'green', label: 'Verde', bgClass: 'bg-green-500' }
];

// Empresa
const company = ref({
  name: 'Construtora Exemplo Ltda',
  taxId: '12.345.678/0001-90',
  email: 'contato@exemplo.com',
  phone: '(11) 3456-7890',
  logo: null,
  address: {
    postalCode: '01234-567',
    street: 'Av. Paulista',
    number: '1000',
    complement: 'Sala 123',
    district: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP'
  }
});

// Estados brasileiros
const stateOptions = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

// Faturamento
const billingHistory = [
  { date: '12/08/2025', description: 'Plano Premium - Agosto', amount: '199,90', status: 'Pago' },
  { date: '12/07/2025', description: 'Plano Premium - Julho', amount: '199,90', status: 'Pago' },
  { date: '12/06/2025', description: 'Plano Premium - Junho', amount: '199,90', status: 'Pago' },
  { date: '12/05/2025', description: 'Plano Premium - Maio', amount: '199,90', status: 'Pago' },
  { date: '12/04/2025', description: 'Plano Premium - Abril', amount: '199,90', status: 'Pago' }
];

// Sessões ativas
const activeSessions = [
  { 
    device: 'desktop', 
    browser: 'Chrome', 
    os: 'Windows', 
    location: 'São Paulo, BR',
    lastActive: 'Agora',
    current: true
  },
  { 
    device: 'mobile', 
    browser: 'Safari', 
    os: 'iOS', 
    location: 'Rio de Janeiro, BR',
    lastActive: '2 horas atrás',
    current: false
  }
];

// Funções
const saveProfile = () => {
  console.log('Salvando perfil...', profile.value);
  // Implementação real enviaria para a API
};

const updatePassword = () => {
  console.log('Atualizando senha...');
  // Implementação real faria validação e enviaria para a API
  security.value.currentPassword = '';
  security.value.newPassword = '';
  security.value.confirmPassword = '';
};

const saveNotifications = () => {
  console.log('Salvando preferências de notificações...', notifications.value);
  // Implementação real enviaria para a API
};

const saveAppearance = () => {
  console.log('Salvando preferências de aparência...', appearance.value);
  // Implementação real enviaria para a API e aplicaria as mudanças
};

const saveCompany = () => {
  console.log('Salvando informações da empresa...', company.value);
  // Implementação real enviaria para a API
};

const fetchAddressByPostalCode = () => {
  // Simular busca de CEP
  if (company.value.address.postalCode === '01234-567') {
    company.value.address.street = 'Av. Paulista';
    company.value.address.district = 'Bela Vista';
    company.value.address.city = 'São Paulo';
    company.value.address.state = 'SP';
  }
};

const terminateSession = (index) => {
  console.log('Encerrando sessão:', activeSessions[index]);
  activeSessions.splice(index, 1);
};

const terminateAllSessions = () => {
  console.log('Encerrando todas as sessões exceto a atual');
  activeSessions.value = activeSessions.value.filter(session => session.current);
  showSessionsModal.value = false;
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