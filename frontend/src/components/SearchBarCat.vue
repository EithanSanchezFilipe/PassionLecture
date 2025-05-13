<script setup>
import { ref, watch } from 'vue'
import loupe from '@/assets/loupe.svg'
import AutoComplete from 'primevue/autocomplete'
import SearchService from '@/services/SearchService'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)
const suggestions = ref([])

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
        placeholder="Rechercher une catégorie..."
        @complete="searchSuggestions"
      />
    </div>
  </div>
</template>

<style scoped>
/* 🔁 même style que SearchBarBook */
.search-bar-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 5em;
  margin-bottom: 5em;
  width: 100%;
  max-width: 500px;
  background-color: #f5f5f5;
}
.input-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  width: 100%;
  border: 1px solid black;
  border-radius: 0.75rem;
  background-color: rgba(250, 250, 250, 0.9);
}
.input-wrapper .icon {
  width: 1.75rem;
  padding: 0.375rem;
  cursor: pointer;
}
</style>
