<template>
  <form @submit.prevent="$emit('submit')" class="space-y-4">
    <!-- Seção 1: Informações básicas -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          for="elementName"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Nome do Elemento</label
        >
        <SharedTInput
          v-model="element.name"
          id="elementName"
          placeholder="Ex: Janela principal"
          required
        />
      </div>

      <div>
        <label
          for="elementType"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Categoria</label
        >
        <SharedTSelect
          v-model="element.category"
          id="elementType"
          :options="categoryOptions"
          required
        />
      </div>
    </section>

    <!-- Seção 2: Unidade -->
    <section class="">
      <div>
        <label
          for="elementUnity"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Unidade</label
        >
        <SharedTSelect
          v-model="element.unity"
          id="elementUnity"
          :options="unityOptions"
          required
        />
      </div>
    </section>

    <div>
      <label
        for="elementDescription"
        class="block text-sm font-medium text-gray-700 mb-1"
        >Descrição</label
      >
      <textarea
        v-model="element.description"
        id="elementDescription"
        rows="2"
        placeholder="Descrição do elemento (opcional)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>

    <!-- Seção 3: Quantidade e Status -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          for="elementQuantity"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Quantidade</label
        >
        <SharedTInput
          v-model.number="element.quantity"
          id="elementQuantity"
          type="number"
          placeholder="Ex: 1"
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div>
        <label
          for="elementStatus"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Status</label
        >
        <SharedTSelect
          v-model="element.status"
          id="elementStatus"
          :options="statusOptions"
          required
        />
      </div>
    </section>

    <!-- Seção 4: Dimensões -->
    <div
      class="bg-gray-50 rounded-lg border border-gray-200 mb-2 overflow-hidden"
    >
      <div
        @click="toggleSection('dimensions')"
        class="p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
      >
        <h3 class="font-medium text-gray-700">Dimensões</h3>
        <Icon
          :name="
            openSections.dimensions
              ? 'tabler:chevron-up'
              : 'tabler:chevron-down'
          "
          size="1.25rem"
          class="text-gray-500 transition-transform duration-200"
        />
      </div>
      <div v-show="openSections.dimensions" class="px-4 pb-4 pt-1">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              for="elementLength"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Comprimento</label
            >
            <SharedTInput
              v-model.number="element.unitLength"
              id="elementLength"
              type="number"
              placeholder="Ex: 100"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label
              for="elementWidth"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Largura</label
            >
            <SharedTInput
              v-model.number="element.unitWidth"
              id="elementWidth"
              type="number"
              placeholder="Ex: 80"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label
              for="elementHeight"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Altura</label
            >
            <SharedTInput
              v-model.number="element.unitHeight"
              id="elementHeight"
              type="number"
              placeholder="Ex: 210"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Seção 5: Preços -->
    <div
      class="bg-gray-50 rounded-lg border border-gray-200 mb-2 overflow-hidden"
    >
      <div
        @click="toggleSection('prices')"
        class="p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
      >
        <h3 class="font-medium text-gray-700">Valores</h3>
        <Icon
          :name="
            openSections.prices ? 'tabler:chevron-up' : 'tabler:chevron-down'
          "
          size="1.25rem"
          class="text-gray-500 transition-transform duration-200"
        />
      </div>
      <div v-show="openSections.prices" class="px-4 pb-4 pt-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="elementUnitPrice"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Preço unitário do material (R$)</label
            >
            <SharedTInput
              v-model.number="element.unitPrice"
              id="elementUnitPrice"
              type="number"
              placeholder="Ex: 150.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label
              for="elementLaborPrice"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Preço da mão de obra (R$)</label
            >
            <SharedTInput
              v-model.number="element.laborPrice"
              id="elementLaborPrice"
              type="number"
              placeholder="Ex: 100.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <!-- Valores calculados -->
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-2 rounded-md">
            <p class="text-xs font-medium text-gray-500 mb-1">
              Total Material:
            </p>
            <p class="font-medium text-blue-700">
              {{ formatCurrency(calculateTotalMaterialPrice()) }}
            </p>
          </div>
          <div class="bg-blue-50 p-2 rounded-md">
            <p class="text-xs font-medium text-gray-500 mb-1">
              Total Mão de Obra:
            </p>
            <p class="font-medium text-blue-700">
              {{ formatCurrency(calculateTotalLaborPrice()) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção 6: Fornecedor -->
    <div
      class="bg-gray-50 rounded-lg border border-gray-200 mb-2 overflow-hidden"
    >
      <div
        @click="toggleSection('supplier')"
        class="p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
      >
        <h3 class="font-medium text-gray-700">Informações do Fornecedor</h3>
        <Icon
          :name="
            openSections.supplier ? 'tabler:chevron-up' : 'tabler:chevron-down'
          "
          size="1.25rem"
          class="text-gray-500 transition-transform duration-200"
        />
      </div>
      <div v-show="openSections.supplier" class="px-4 pb-4 pt-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              for="elementSupplier"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Fornecedor</label
            >
            <SharedTInput
              v-model="element.supplier"
              id="elementSupplier"
              placeholder="Ex: Empresa ABC"
            />
          </div>
          <div>
            <label
              for="elementSupplierContact"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Contato do Fornecedor</label
            >
            <SharedTInput
              v-model="element.supplierContact"
              id="elementSupplierContact"
              placeholder="Ex: (11) 99999-9999"
            />
          </div>
        </div>

        <div class="mt-3">
          <label
            for="elementProductCode"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Código do Produto</label
          >
          <SharedTInput
            v-model="element.productCode"
            id="elementProductCode"
            placeholder="Ex: ABC-123"
          />
        </div>
      </div>
    </div>

    <!-- Campos específicos baseados no tipo de elemento -->
    <div
      v-if="showTypeSpecificFields"
      class="bg-gray-50 rounded-lg border border-gray-200 mb-2 overflow-hidden"
    >
      <div
        @click="toggleSection('specific')"
        class="p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
      >
        <h3 class="font-medium text-gray-700">
          Informações Específicas: {{ currentCategoryName }}
        </h3>
        <Icon
          :name="
            openSections.specific ? 'tabler:chevron-up' : 'tabler:chevron-down'
          "
          size="1.25rem"
          class="text-gray-500 transition-transform duration-200"
        />
      </div>
      <div v-show="openSections.specific" class="px-4 pb-4 pt-1">
        <!-- Revestimento -->
        <div v-if="element.category === '1'" class="space-y-4">
          <div>
            <label
              for="coatingType"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Revestimento</label
            >
            <SharedTInput
              v-model="element.specs.coatingType"
              id="coatingType"
              placeholder="Ex: Porcelanato, Cerâmica, Vinílico"
            />
          </div>
          <div>
            <label
              for="coatingBrand"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Marca</label
            >
            <SharedTInput
              v-model="element.specs.brand"
              id="coatingBrand"
              placeholder="Ex: Portobello, Eliane"
            />
          </div>
          <div>
            <label
              for="coatingColor"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Cor/Modelo</label
            >
            <SharedTInput
              v-model="element.specs.color"
              id="coatingColor"
              placeholder="Ex: Bege acetinado"
            />
          </div>
        </div>

        <!-- Hidráulico -->
        <div v-else-if="element.category === '2'" class="space-y-4">
          <div>
            <label
              for="hydraulicType"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Item</label
            >
            <SharedTInput
              v-model="element.specs.hydraulicType"
              id="hydraulicType"
              placeholder="Ex: Torneira, Válvula, Tubo"
            />
          </div>
          <div>
            <label
              for="hydraulicBrand"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Marca</label
            >
            <SharedTInput
              v-model="element.specs.brand"
              id="hydraulicBrand"
              placeholder="Ex: Docol, Tigre"
            />
          </div>
          <div>
            <label
              for="hydraulicModel"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Modelo/Linha</label
            >
            <SharedTInput
              v-model="element.specs.model"
              id="hydraulicModel"
              placeholder="Ex: Linha Básica, Premium"
            />
          </div>
        </div>

        <!-- Elétrico -->
        <div v-else-if="element.category === '3'" class="space-y-4">
          <div>
            <label
              for="electricType"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Item</label
            >
            <SharedTInput
              v-model="element.specs.electricType"
              id="electricType"
              placeholder="Ex: Interruptor, Tomada, Luminária"
            />
          </div>
          <div>
            <label
              for="electricPower"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Potência/Capacidade</label
            >
            <SharedTInput
              v-model="element.specs.power"
              id="electricPower"
              placeholder="Ex: 10A, 20A, 100W"
            />
          </div>
          <div>
            <label
              for="electricBrand"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Marca</label
            >
            <SharedTInput
              v-model="element.specs.brand"
              id="electricBrand"
              placeholder="Ex: Tramontina, Schneider"
            />
          </div>
        </div>

        <!-- Pintura -->
        <div v-else-if="element.category === '4'" class="space-y-4">
          <div>
            <label
              for="paintType"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Tinta</label
            >
            <SharedTInput
              v-model="element.specs.paintType"
              id="paintType"
              placeholder="Ex: Acrílica, Esmalte, Látex"
            />
          </div>
          <div>
            <label
              for="paintFinish"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Acabamento</label
            >
            <SharedTInput
              v-model="element.specs.finish"
              id="paintFinish"
              placeholder="Ex: Fosco, Acetinado, Brilhante"
            />
          </div>
          <div>
            <label
              for="paintColor"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Cor</label
            >
            <SharedTInput
              v-model="element.specs.color"
              id="paintColor"
              placeholder="Ex: Branco Neve, Azul Horizonte"
            />
          </div>
          <div>
            <label
              for="paintBrand"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Marca</label
            >
            <SharedTInput
              v-model="element.specs.brand"
              id="paintBrand"
              placeholder="Ex: Suvinil, Coral, Sherwin Williams"
            />
          </div>
        </div>

        <!-- Mobiliário -->
        <div v-else-if="element.category === '5'" class="space-y-4">
          <div>
            <label
              for="furnitureType"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Móvel</label
            >
            <SharedTInput
              v-model="element.specs.furnitureType"
              id="furnitureType"
              placeholder="Ex: Sofá, Mesa, Cadeira"
            />
          </div>
          <div>
            <label
              for="furnitureMaterial"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Material</label
            >
            <SharedTInput
              v-model="element.specs.material"
              id="furnitureMaterial"
              placeholder="Ex: MDF, Madeira Maciça, Metal"
            />
          </div>
          <div>
            <label
              for="furnitureBrand"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Marca/Fabricante</label
            >
            <SharedTInput
              v-model="element.specs.brand"
              id="furnitureBrand"
              placeholder="Ex: Tok&Stok, Mobly"
            />
          </div>
          <div>
            <label
              for="furnitureColor"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Cor/Acabamento</label
            >
            <SharedTInput
              v-model="element.specs.color"
              id="furnitureColor"
              placeholder="Ex: Carvalho, Preto Fosco"
            />
          </div>
        </div>

        <!-- Marcenaria -->
        <div v-else-if="element.category === '6'" class="space-y-4">
          <div>
            <label
              for="carpentryType"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Tipo de Item</label
            >
            <SharedTInput
              v-model="element.specs.carpentryType"
              id="carpentryType"
              placeholder="Ex: Armário, Bancada, Painel"
            />
          </div>
          <div>
            <label
              for="carpentryMaterial"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Material</label
            >
            <SharedTInput
              v-model="element.specs.material"
              id="carpentryMaterial"
              placeholder="Ex: MDF, Compensado, Madeira Maciça"
            />
          </div>
          <div>
            <label
              for="carpentryFinish"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Acabamento</label
            >
            <SharedTInput
              v-model="element.specs.finish"
              id="carpentryFinish"
              placeholder="Ex: Laminado, Laca, Verniz"
            />
          </div>
          <div>
            <label
              for="carpentryColor"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Cor/Padrão</label
            >
            <SharedTInput
              v-model="element.specs.color"
              id="carpentryColor"
              placeholder="Ex: Carvalho Americano, Branco TX"
            />
          </div>
        </div>

        <!-- Outros tipos podem ser adicionados aqui... -->
      </div>
    </div>

    <!-- Botões de ação - Adicionados apenas para caso de uso do componente isoladamente -->
    <div v-if="showButtons" class="flex justify-end gap-3 pt-4">
      <SharedTButton
        type="button"
        title="Cancelar"
        @click="$emit('cancel')"
        class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
      />
      <SharedTButton
        type="submit"
        :title="isEditing ? 'Salvar' : 'Adicionar'"
        class="bg-blue-600 hover:bg-blue-700"
        :loading="loading"
      />
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  categoryOptions: {
    type: Array,
    required: true,
  },
  unityOptions: {
    type: Array,
    required: true,
  },
  statusOptions: {
    type: Array,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showButtons: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "submit", "cancel"]);

// Criar uma cópia local do elemento para edição
const element = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Controle das seções do formulário
const openSections = reactive({
  dimensions: false,
  prices: false,
  supplier: false,
  specific: false,
});

// Mapear valor da categoria para seu nome correspondente
const getCategoryNameById = (categoryId) => {
  const category = props.categoryOptions.find(
    (opt) => opt.value === categoryId
  );
  return category ? category.label : "";
};

// Computed para obter o nome da categoria atual
const currentCategoryName = computed(() => {
  return getCategoryNameById(element.value.category);
});

// Computed para controlar quando mostrar os campos específicos baseados na categoria
const showTypeSpecificFields = computed(() => {
  // Incluir todas as categorias que devem ter campos específicos
  const categoriesWithSpecificFields = ["1", "2", "3", "4", "5", "6"]; // Revestimento, Hidraulico, Elétrico, etc.
  return categoriesWithSpecificFields.includes(element.value.category);
});

// Observa mudanças na categoria de elemento para limpar os campos específicos
watch(
  () => element.value.category,
  (newCategory) => {
    console.log(
      `Categoria alterada para: ${newCategory} (${getCategoryNameById(
        newCategory
      )})`
    );
    if (element.value.specs) {
      element.value.specs = {}; // Limpa os campos específicos quando a categoria muda
    }
  }
);

// Métodos para cálculos de preço total
const calculateTotalMaterialPrice = () => {
  return element.value.unitPrice * element.value.quantity || 0;
};

const calculateTotalLaborPrice = () => {
  return element.value.laborPrice * element.value.quantity || 0;
};

// Formatação de moeda
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Alterna a visibilidade das seções do formulário
const toggleSection = (section) => {
  openSections[section] = !openSections[section];
};
</script>

<style scoped>
/* Animação suave para as transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
