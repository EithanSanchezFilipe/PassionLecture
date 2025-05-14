<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import bookService from '@/services/bookService'
import categoryService from '@/services/categoryService'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'

const router = useRouter()
const currentYear = new Date().getFullYear()

const categories = ref([])
const selectedCategory = ref(null)

onMounted(async () => {
  try {
    const response = await categoryService.getAllCategory()
    categories.value = response.data.categories
  } catch (error) {
    console.error('Error loading categories:', error)
  }
})

const book = ref({
  name: '',
  passage: '',
  summary: '',
  editionYear: currentYear,
  pages: null,
  coverImage: null,
  category_fk: null,
})

const error = ref('')
const loading = ref(false)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    book.value.coverImage = file
  }
}

const validateForm = () => {
  if (
    !book.value.name ||
    !book.value.summary ||
    !book.value.editionYear ||
    !book.value.pages ||
    !selectedCategory.value
  ) {
    throw new Error('Veuillez remplir tous les champs obligatoires')
  }

  if (book.value.editionYear > currentYear) {
    throw new Error("L'année ne peut pas être dans le futur")
  }

  if (book.value.pages < 1) {
    throw new Error('Le nombre de pages doit être au moins 1')
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    validateForm()
    await bookService.addBook(book.value)
    router.push('/')
  } catch (err) {
    error.value = err.message || "Une erreur est survenue lors de l'ajout du livre"
  } finally {
    loading.value = false
  }
}

watch(selectedCategory, (newVal) => {
  book.value.category_fk = newVal?.id || null
})
</script>

<template>
  <div class="add-book">
    <h1>Ajouter un livre</h1>

    <form @submit.prevent="handleSubmit" class="book-form">
      <div class="form-group">
        <label for="name">Titre*</label>
        <InputText
          id="name"
          v-model="book.name"
          required
          pattern="^[\p{L}\p{P}\s\d]*$"
          title="Seules les lettres, les accents, les espaces, les virgules et les points sont autorisés"
        />
      </div>

      <div class="form-group">
        <label for="passage">Passage</label>
        <InputText
          id="passage"
          v-model="book.passage"
          pattern="^[\p{L}\p{P}\s\d]*$"
          title="Seules les lettres, les accents, les espaces, les virgules et les points sont autorisés"
        />
      </div>

      <div class="form-group">
        <label for="summary">Résumé*</label>
        <Textarea id="summary" v-model="book.summary" rows="5" required autoResize />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="editionYear">Année d'édition*</label>
          <InputNumber
            id="editionYear"
            v-model="book.editionYear"
            :min="1000"
            :max="currentYear"
            required
          />
        </div>

        <div class="form-group">
          <label for="pages">Nombre de pages*</label>
          <InputNumber id="pages" v-model="book.pages" :min="1" required />
        </div>
      </div>

      <div class="form-group">
        <label for="cover">Couverture</label>
        <input type="file" id="cover" accept="image/*" @change="handleImageUpload" />
      </div>

      <div class="form-group">
        <label for="category">Catégorie*</label>
        <Dropdown
          id="category"
          v-model="selectedCategory"
          :options="categories"
          optionLabel="name"
          placeholder="Sélectionner une catégorie"
          required
        />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <Button type="submit" :loading="loading" class="submit-button"> Ajouter le livre </Button>
    </form>
  </div>
</template>

<style scoped>
.add-book {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.book-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

label {
  font-weight: 600;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

.submit-button {
  align-self: center;
  min-width: 200px;
}

input[type='file'] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Style for PrimeVue components */
:deep(.p-inputtext),
:deep(.p-inputnumber-input) {
  width: 100%;
}
</style>
