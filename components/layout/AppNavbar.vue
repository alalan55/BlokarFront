<template>
  <nav class="bg-[#182643] text-white border-b border-[#304267] shadow-sm">
    <div class="h-[55px] px-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          @click="toggleSidebar"
          class="p-2 rounded-md hover:bg-blue-800/30 transition-colors mt-2"
          aria-label="Menu principal"
        >
          <Icon name="tabler:menu-2" size="1.5rem" />
        </button>

        <!-- Logo -->
        <div class="flex items-center">
          <div
            class="bg-blue-500 w-6 h-6 rounded flex items-center justify-center mr-2"
          >
            <Icon name="tabler:building-skyscraper" size="1.1rem" />
          </div>
          <strong class="text-lg font-black title">BlokarApp.</strong>
        </div>

        <!-- Breadcrumbs em tablet e desktop -->
        <!-- <div class="hidden sm:flex items-center text-sm text-blue-200/70 ml-4">
          <span v-if="currentRoute">
            <span
              v-for="(item, index) in breadcrumbs"
              :key="index"
              class="flex items-center"
            >
              <NuxtLink
                v-if="index < breadcrumbs.length - 1"
                :to="item.path"
                class="hover:text-white transition-colors"
              >
                {{ item.name }}
              </NuxtLink>
          <span v-else class="font-medium text-white">{{ item.name }}</span>

              <Icon
                v-if="index < breadcrumbs.length - 1"
                name="tabler:chevron-right"
                size="0.875rem"
                class="mx-2 opacity-50"
              />
            </span>
          </span>
        </div> -->
      </div>

      <!-- Ações e perfil -->
      <div class="flex items-center gap-2">
        <!-- Pesquisa rápida - visível apenas em desktop -->
        <div class="hidden md:flex items-center relative">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar..."
              class="bg-[#304267] text-white text-sm pl-9 pr-3 py-1.5 rounded-md w-48 focus:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
            />
            <Icon
              name="tabler:search"
              size="1rem"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/70"
            />
          </div>
        </div>

        <!-- Notificações -->
        <button
          class="relative p-2 rounded-md hover:bg-blue-800/30 transition-colors"
          @click="toggleNotifications"
          aria-label="Notificações"
        >
          <Icon name="tabler:bell" size="1.25rem" />
          <span
            v-if="unreadNotifications > 0"
            class="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center"
          >
            {{ unreadNotifications > 9 ? "9+" : unreadNotifications }}
          </span>
        </button>

        <!-- Dropdown do perfil -->
        <div class="relative">
          <button
            @click="toggleProfileMenu"
            class="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-blue-800/30 transition-colors"
            :class="{ 'bg-blue-800/30': isProfileMenuOpen }"
          >
            <div
              class="bg-gradient-to-br from-blue-400 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <span class="font-medium text-sm">{{ userInitials }}</span>
            </div>
            <span class="hidden sm:inline text-sm">{{ userName }}</span>
            <Icon
              name="tabler:chevron-down"
              size="1rem"
              :class="{ 'transform rotate-180': isProfileMenuOpen }"
              class="transition-transform duration-200"
            />
          </button>

          <!-- Menu dropdown -->
          <div
            v-if="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50"
          >
            <div class="px-4 py-2 border-b border-gray-100">
              <p class="font-medium">{{ userName }}</p>
              <p class="text-xs text-gray-500">{{ userEmail }}</p>
            </div>
            <NuxtLink
              to="/settings"
              class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <Icon name="tabler:settings" size="1rem" />
              <span>Configurações</span>
            </NuxtLink>
            <NuxtLink
              to="/profile"
              class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <Icon name="tabler:user" size="1rem" />
              <span>Meu perfil</span>
            </NuxtLink>
            <div class="border-t border-gray-100 mt-1">
              <button
                @click="logout"
                class="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
              >
                <Icon name="tabler:logout" size="1rem" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dropdown de notificações -->
    <div
      v-if="isNotificationsOpen"
      class="absolute right-4 top-16 w-80 bg-white rounded-md shadow-lg z-40 max-h-96 overflow-auto"
    >
      <div
        class="flex items-center justify-between p-3 border-b border-gray-100"
      >
        <h3 class="font-medium text-gray-800">Notificações</h3>
        <button
          v-if="notifications.length > 0"
          @click="markAllAsRead"
          class="text-xs text-blue-600 hover:text-blue-800"
        >
          Marcar tudo como lido
        </button>
      </div>
      <div
        v-if="notifications.length === 0"
        class="p-4 text-center text-gray-500"
      >
        <Icon
          name="tabler:bell-off"
          size="2rem"
          class="mx-auto mb-2 opacity-30"
        />
        <p>Nenhuma notificação</p>
      </div>
      <div v-else>
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          class="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
          :class="{ 'bg-blue-50': !notification.read }"
        >
          <div class="flex items-start">
            <div
              class="p-2 rounded-full mr-3 flex-shrink-0"
              :class="getNotificationTypeClass(notification.type)"
            >
              <Icon
                :name="getNotificationTypeIcon(notification.type)"
                size="1rem"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm text-gray-800 mb-0.5">
                {{ notification.title }}
              </p>
              <p class="text-xs text-gray-500 line-clamp-2">
                {{ notification.message }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                {{ formatNotificationTime(notification.time) }}
              </p>
            </div>
            <div
              v-if="!notification.read"
              class="w-2 h-2 bg-blue-500 rounded-full"
            ></div>
          </div>
        </div>
        <div class="p-2 text-center border-t border-gray-100">
          <NuxtLink
            to="/notifications"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Ver todas as notificações
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Sidebar para mobile com animações -->
    <Transition name="fade">
      <div
        v-if="isMobileSidebarOpen"
        class="fixed inset-0 z-50 flex md:hidden"
        @click="toggleSidebar"
      >
        <!-- Overlay com fade -->
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50"></div>

        <!-- Sidebar com animação de deslizamento aprimorada -->
        <div
          class="relative flex flex-col w-[280px] max-w-[85%] h-full transform transition-transform duration-300 ease-in-out"
          :class="[isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full']"
          @click.stop
        >
          <div class="bg-[#182643] shadow-xl h-full overflow-y-auto">
            <LayoutAppDrawer @link-clicked="toggleSidebar" />
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
// Estado do componente
const searchQuery = ref("");
const isProfileMenuOpen = ref(false);
const isNotificationsOpen = ref(false);
const isMobileSidebarOpen = ref(false);
const route = useRoute();

// Dados do usuário (poderia vir de um store)
const userName = ref("Allan Silva");
const userEmail = ref("allan.silva@exemplo.com");
const userInitials = computed(() => {
  return userName.value
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
});

// Notificações de exemplo
const notifications = ref([
  {
    id: 1,
    title: "Projeto atualizado",
    message:
      'O status do projeto "Edifício Residencial Aurora" foi alterado para "Em andamento".',
    time: new Date(Date.now() - 30 * 60000), // 30 minutos atrás
    read: false,
    type: "info",
  },
  {
    id: 2,
    title: "Novo comentário",
    message:
      'João deixou um novo comentário no projeto "Casa de Praia Oceano".',
    time: new Date(Date.now() - 5 * 3600000), // 5 horas atrás
    read: false,
    type: "comment",
  },
  {
    id: 3,
    title: "Prazo próximo",
    message:
      'O projeto "Reforma Shopping Center" tem um prazo que vence em 3 dias.',
    time: new Date(Date.now() - 24 * 3600000), // 1 dia atrás
    read: true,
    type: "warning",
  },
]);

const unreadNotifications = computed(() => {
  return notifications.value.filter((n) => !n.read).length;
});

// Breadcrumbs baseado na rota atual
const currentRoute = computed(() => {
  return route.path;
});

const breadcrumbs = computed(() => {
  const result = [{ name: "Home", path: "/" }];

  if (route.path === "/") return result;

  // Mapeia rotas para nomes mais amigáveis
  const routeMap = {
    clients: "Clientes",
    works: "Obras",
    settings: "Configurações",
    login: "Login",
  };

  const pathSegments = route.path.split("/").filter(Boolean);
  let currentPath = "";

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Verifica se é um ID (param)
    if (segment.match(/^\d+$/) || segment.includes("id")) {
      // Tenta encontrar um nome significativo para o ID
      if (route.name && route.name.includes("detail")) {
        result.push({
          name: "Detalhes",
          path: currentPath,
        });
      } else {
        result.push({
          name: `#${segment}`,
          path: currentPath,
        });
      }
    } else {
      result.push({
        name:
          routeMap[segment] ||
          segment.charAt(0).toUpperCase() + segment.slice(1),
        path: currentPath,
      });
    }
  });

  return result;
});

// Métodos para notificações
const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value;
  if (isNotificationsOpen.value) {
    isProfileMenuOpen.value = false;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
};

const getNotificationTypeClass = (type) => {
  switch (type) {
    case "warning":
      return "bg-yellow-100 text-yellow-600";
    case "error":
      return "bg-red-100 text-red-600";
    case "success":
      return "bg-green-100 text-green-600";
    case "comment":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-blue-100 text-blue-600";
  }
};

const getNotificationTypeIcon = (type) => {
  switch (type) {
    case "warning":
      return "tabler:alert-triangle";
    case "error":
      return "tabler:alert-circle";
    case "success":
      return "tabler:check-circle";
    case "comment":
      return "tabler:message-circle";
    default:
      return "tabler:info-circle";
  }
};

const formatNotificationTime = (time) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) {
    return "Agora mesmo";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minuto" : "minutos"} atrás`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hora" : "horas"} atrás`;
  } else {
    return time.toLocaleDateString("pt-BR");
  }
};

// Toggle do perfil
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
  if (isProfileMenuOpen.value) {
    isNotificationsOpen.value = false;
  }
};

// Toggle da sidebar mobile
const toggleSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

// Logout
const logout = () => {
  // Implementar lógica de logout
  console.log("Logout");
};

// Fechar dropdowns quando clicar fora deles
const handleClickOutside = (event) => {
  const notificationsButton = document.querySelector(
    '[aria-label="Notificações"]'
  );
  const profileButton = document.querySelector(".relative button");

  if (
    isProfileMenuOpen.value &&
    profileButton &&
    !profileButton.contains(event.target) &&
    !document
      .querySelector(".absolute.right-0.mt-2.w-48")
      ?.contains(event.target)
  ) {
    isProfileMenuOpen.value = false;
  }

  if (
    isNotificationsOpen.value &&
    notificationsButton &&
    !notificationsButton.contains(event.target) &&
    !document
      .querySelector(".absolute.right-4.top-16.w-80")
      ?.contains(event.target)
  ) {
    isNotificationsOpen.value = false;
  }
};

// Adicionar event listener para fechar dropdowns quando clicar fora
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="postcss" scoped>
.title {
  font-family: "Archivo Black", sans-serif;
}

/* Estilo para dropdown com animação suave */
.absolute {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilo para line-clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animações para o drawer mobile e overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transições baseadas em classes para o drawer */
.translate-x-0 {
  transform: translateX(0);
}

.-translate-x-full {
  transform: translateX(-100%);
}

/* Efeito de sombra dinâmico durante a transição */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease;
}
</style>
