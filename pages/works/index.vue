<template>
  <div class="h-full max-h-full p-8 overflow-auto bg-[#fff] rounded">
    <section>
      <h1 class="text-4 xl font-black">Clientes</h1>
      <span class="text-sm text-gray-500">Lista de clientes cadastrados</span>
    </section>

    <section class="mt-10 flex items-center gap-4">
      <SharedTInput placeholder="Buscar cliente..." class="flex-1" />
      <SharedTButton title="Novo cliente" class="w-auto" />
    </section>

    <section class="mt-10">
      <SharedTTable :columns="columnsTable" :rows="items"></SharedTTable>
    </section>
  </div>
</template>

<script setup>

const columnsTable = [
  {
    key: "name",
    label: "Nome",
    thClass: "w-50",
    tdClass: "text-[#0d151c]",
  },
  { key: "phone", label: "Telefone", thClass: "w-50", tdClass: "" },
  {
    key: "address",
    label: "Endereço",
    thClass: "w-30",
    tdClass: "text-[#49749c]",
  },
  {
    key: "quantity_works",
    label: "Quantidade de Obras",
    thClass: "w-30",
    tdClass: "text-[#49749c]",
  },

  {
    key: "actions",
    label: "Ações",
    thClass: "w-20",
    tdClass: "text-[#49749c]",
  },
];


const items = []

</script>

<style></style>