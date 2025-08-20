<template>
  <div class="h-dvh bg-[#182643]">
    <div class="wrapper h-full flex flex-col md:flex-row">
      <div class="h-full min-w-[280px] w-[280px] hidden md:block">
        <LayoutAppDrawer />
      </div>

      <LayoutAppNavbar class="block md:hidden" />

      <div
        class="flex-1 h-[calc(100dvh-60px)] md:h-full p-2 md:p-[.5rem_.5rem_.5rem_0]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
