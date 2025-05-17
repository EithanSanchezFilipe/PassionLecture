<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import bookService from '@/services/bookService'
import categoryService from '@/services/categoryService'
import AddBookStepper from '@/composables/AddBookStepper.vue'
import Button from 'primevue/button'

const router = useRouter()
const showStepper = ref(false)
const categories = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await categoryService.getAllCategory()
    categories.value = response.data.categories
  } catch (error) {
    console.error('Error loading categories:', error)
  }
})

const handleSave = async (bookData) => {
  try {
    await bookService.addBook(bookData)
    router.push('/')
  } catch (err) {
    error.value = err.message || "Une erreur est survenue lors de l'ajout du livre"
  }
}
</script>

<template>
  <div class="add-book-container">
    <h1>Ajouter un livre</h1>
    <p class="description">
      Partagez vos découvertes littéraires avec la communauté en ajoutant un nouveau livre à notre
      bibliothèque.
    </p>

    <Button label="Commencer" icon="pi pi-plus" @click="showStepper = true" />

    <AddBookStepper v-model:visible="showStepper" :categories="categories" @save="handleSave" />

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.add-book-container {
  max-width: 800px;
  margin: 0.5rem auto;
  padding: 2rem;
  text-align: center;
}

.description {
  margin: 1rem 0 2rem;
  color: #666;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
