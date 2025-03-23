<script setup lang="ts">
const { getFilter, setFilter, isFiltersActive } = useFiltering();

const { attribute } = defineProps({
  attribute: { type: Object, required: true },
});

const selectedTerm = ref(getFilter(attribute.slug) || ''); // Now a single value instead of an array
const filterTitle = ref(attribute.label || attribute.slug);
const isOpen = ref(attribute.openByDefault);

watch(isFiltersActive, () => {
  // Clear the selected term when filters are cleared
  if (!isFiltersActive.value) selectedTerm.value = '';
});

// Update the URL when the radio button is selected
const radioChanged = () => {
  setFilter(attribute.slug, selectedTerm.value);
};
</script>

<template>
  <div class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center" @click="isOpen = !isOpen">
    <span>{{ filterTitle }}</span>
    <Icon name="ion:chevron-down-outline" class="transform" :class="isOpen ? 'rotate-180' : ''" />
  </div>
  <div v-show="isOpen" class="mt-3 mr-1 max-h-[240px] grid gap-1 overflow-auto custom-scrollbar">
    <div v-for="term in attribute.terms" :key="term.slug" class="flex gap-2 items-center">
      <!-- Use radio button instead of checkbox -->
      <input 
        :id="term.slug" 
        v-model="selectedTerm" 
        type="radio" 
        :value="term.slug" 
        @change="radioChanged"
        :name="attribute.slug"  <!-- Ensure only one radio button can be selected -->
      />
      <label :for="term.slug" class="cursor-pointer m-0 text-sm flex items-center flex-wrap">
        <span v-html="term.name" />
        <small v-if="attribute.showCount" class="ml-1 text-gray-400 tabular-nums" aria-hidden="true">({{ term.count || 0 }})</small>
      </label>
    </div>
  </div>
</template>
