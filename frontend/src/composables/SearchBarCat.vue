<script setup>
import { ref, watch } from 'vue'
import loupe from '@/assets/loupe.svg'
import AutoComplete from 'primevue/autocomplete'
import SearchService from '@/services/SearchService'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)
const suggestions = ref([])

const loading = ref(false)
watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  },
)

watch(value, (val) => {
  emit('update:modelValue', val)
})

const searchSuggestions = async (event) => {
  const term = event.query.trim()
  if (term.length === 0) {
    suggestions.value = []
    return
  }

  try {
    const res = await SearchService.search(term, 'category')
    suggestions.value = res.data?.map((cat) => cat.name) || []
  } catch (err) {
    console.warn('Erreur catégories :', err)
    suggestions.value = []
  }
}
</script>

<template>
  <div class="search-bar-container">
    <div class="input-wrapper">
      <img :src="loupe" alt="Rechercher" class="icon" />
      <AutoComplete
        v-model="value"
        :suggestions="suggestions"
        field="name"
        :loading="loading"
        placeholder="Rechercher une catégorie..."
        @complete="searchSuggestions"
        class="search-input"
      />
    </div>
  </div>
</template>

<style scoped>
.search-bar-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 2em;
  margin-bottom: 2em;
  width: 100%;
  max-width: 400px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  width: 100%;
  border: 1px solid black;
  border-radius: 0.5rem;
  background-color: white;
  cursor: text;
}

.input-wrapper .icon {
  width: 1.2rem;
  min-width: 1.2rem;
  margin-right: 0.4rem;
}

:deep(.search-input) {
  width: 100%;
}

:deep(.p-autocomplete) {
  width: 100%;
}

:deep(.p-autocomplete-input) {
  width: 100% !important;
  border: none !important;
  padding: 0.3rem 0 !important;
  font-size: 0.95rem;
  background-color: transparent !important;
}

:deep(.p-autocomplete-input:focus) {
  box-shadow: none !important;
  outline: none !important;
}

:deep(.p-autocomplete-panel) {
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.p-autocomplete-items) {
  padding: 0.5rem 0;
}

:deep(.p-autocomplete-item) {
  padding: 0.75rem 1rem;
  cursor: pointer;
}

:deep(.p-autocomplete-item:hover) {
  background-color: #f5f5f5;
}

:deep(.p-autocomplete-loader) {
  right: 0.5rem;
}
</style>
