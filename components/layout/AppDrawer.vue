<template>
  <div class="py-6 px-3 h-full  flex flex-col">
    <div class="logo text-white text-center">
      <strong class="text-3xl font-black title"> BlokarApp.</strong>
    </div>

    <section class="mt-20 flex-1 flex flex-col justify-between">

      <ul>
        <li v-for="link in links" :key="link.href">
          <NuxtLink :to="link.href" class="text-[#8996b1] block rounded-2xl py-3 px-4 flex items-center font-bold">
            <Icon :name="link.icon" size="1.3rem" class="text-[#8996b1] mr-4" />
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>

      <div class="mt-6 border-t border-[#092654]">
        <NuxtLink to="/help" class="text-[#8996b1] block rounded-2xl py-3 px-4 flex items-center font-bold">
          <Icon name="tabler:help" size="1.3rem" class="text-[#8996b1] mr-4" />
          Ajuda
        </NuxtLink>

        <NuxtLink to="/whatsapp" class="text-[#8996b1] block rounded-2xl py-3 px-4 flex items-center font-bold">
          <Icon name="tabler:brand-whatsapp" size="1.3rem" class="text-[#8996b1] mr-4" />
          WhatsApp
        </NuxtLink>

        <NuxtLink to="/logout" class="text-[#8996b1] block rounded-2xl py-3 px-4 flex items-center font-bold">
          <Icon name="tabler:logout" size="1.3rem" class="text-[#8996b1] mr-4" />
          Sair
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
const links = [
  { text: "Dashboard", href: "/", icon: "tabler:layout-dashboard" },
  { text: "Obras", href: "/works", icon: "tabler:hammer" },
  { text: "Clientes", href: "/clients", icon: "tabler:users" },
  { text: "Configurações", href: "/settings", icon: "tabler:settings" },
];
</script>

<style scoped lang="postcss">
.title{
  font-family: 'Archivo Black', sans-serif; 
}
.router-link-exact-active {
  font-weight: bold;
  background: #13346c;
  color: #fff !important;
}

.router-link-exact-active span {
  color: #fff !important;
}
</style>
