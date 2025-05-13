<script setup>
import { ref, watch, onMounted } from 'vue'
import loupe from '@/assets/loupe.svg'
import bookService from '@/services/bookService' // adapte le chemin si besoin

const term = ref(localStorage.getItem('searchTerm') || '')
const books = ref([])

const fetchData = async () => {
  try {
    const response = await bookService.getBooks(term.value)
    books.value = response.data
  } catch (err) {
    console.error('Erreur lors de la récupération des livres:', err)
  }
}

watch(term, () => {
  fetchData()
})

// Clic sur la loupe = "valider" la recherche
function submitSearch() {
  localStorage.setItem('searchTerm', term.value)
  fetchData()
}

// Charger la recherche précédente au rechargement
onMounted(() => {
  if (term.value) {
    fetchData()
  }
})
</script>

<template>
  <div class="search-bar-container">
    <div class="input-wrapper">
      <img :src="loupe" @click="submitSearch" alt="Rechercher" class="icon" />
      <input type="text" v-model="term" placeholder="Rechercher un livre..." class="search-bar" />
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  min-height: 10px;
  background-color: var(--sds-color-background-default-secondary);
  color: #3f3f46;
  white-space: nowrap;
}

.search-bar-container {
  display: flex;
  margin: 0 auto;
  margin-top: 5em;
  margin-bottom: 5em;
  max-width: 100%;
  width: 500px;
  background-color: #f5f5f5;
}

.input-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  width: 100%;
  min-height: 2.25rem;
  border: 1px solid black;
  border-radius: 0.75rem;
  background-color: rgba(250, 250, 250, 0.9);
}

.input-wrapper .icon {
  width: 1.75rem;
  padding: 0.375rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 0.75rem;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
}

.input-wrapper input {
  flex: 1;
  font-size: 1.125rem;
  background: transparent;
  border: none;
  outline: none;
}
</style>
