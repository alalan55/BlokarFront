<template>
  <div class="h-dvh">
    <div class="wrapper h-full flex">
      <div class="bg-[#071f46] h-full w-[280px]">
        <LayoutAppBar/>
      </div>
      <div class="flex-1 bg-[#f1f2f4] h-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
