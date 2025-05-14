<script setup>
import { ref, computed } from 'vue'
import Steps from 'primevue/steps'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const props = defineProps({
  visible: Boolean,
  categories: Array,
})

const emit = defineEmits(['update:visible', 'save'])

const activeIndex = ref(0)
const formData = ref({
  name: '',
  passage: '',
  summary: '',
  editionYear: new Date().getFullYear(),
  pages: null,
  coverImage: null,
  category_fk: null,
})

const steps = ref([
  { label: 'Informations de base' },
  { label: 'Contenu' },
  { label: 'Détails supplémentaires' },
])

const isStepValid = computed(() => {
  switch (activeIndex.value) {
    case 0:
      return formData.value.name && formData.value.category_fk
    case 1:
      return formData.value.summary
    case 2:
      return formData.value.editionYear && formData.value.pages
    default:
      return false
  }
})

const handleNext = () => {
  if (activeIndex.value < 2) activeIndex.value++
  else handleSubmit()
}

const handleBack = () => {
  if (activeIndex.value > 0) activeIndex.value--
}

const handleSubmit = () => {
  emit('save', formData.value)
  emit('update:visible', false)
  // Reset form
  formData.value = {
    name: '',
    passage: '',
    summary: '',
    editionYear: new Date().getFullYear(),
    pages: null,
    coverImage: null,
    category_fk: null,
  }
  activeIndex.value = 0
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.coverImage = file
  }
}
</script>

<template>
  <div class="add-book-stepper">
    <Dialog
      :visible="visible"
      @update:visible="$emit('update:visible', false)"
      :modal="true"
      :style="{ width: '50vw' }"
      class="custom-dialog"
    >
      <div class="dialog-content">
        <Steps :model="steps" :activeIndex="activeIndex" />

        <div class="step-content">
          <!-- Étape 1: Informations de base -->
          <div v-if="activeIndex === 0">
            <div class="form-group">
              <label>Titre*</label>
              <InputText v-model="formData.name" required />
            </div>
            <div class="form-group">
              <label>Catégorie*</label>
              <Dropdown
                v-model="formData.category_fk"
                :options="categories"
                optionLabel="name"
                optionValue="id"
                placeholder="Sélectionner une catégorie"
              />
            </div>
          </div>

          <!-- Étape 2: Contenu -->
          <div v-if="activeIndex === 1">
            <div class="form-group">
              <label>Résumé*</label>
              <Textarea v-model="formData.summary" rows="5" autoResize />
            </div>
            <div class="form-group">
              <label>Passage</label>
              <Textarea v-model="formData.passage" rows="3" autoResize />
            </div>
          </div>

          <!-- Étape 3: Détails supplémentaires -->
          <div v-if="activeIndex === 2">
            <div class="form-group">
              <label>Année d'édition*</label>
              <InputNumber v-model="formData.editionYear" :max="new Date().getFullYear()" />
            </div>
            <div class="form-group">
              <label>Nombre de pages*</label>
              <InputNumber v-model="formData.pages" :min="1" />
            </div>
            <div class="form-group">
              <label>Couverture</label>
              <input type="file" accept="image/*" @change="handleImageUpload" />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div id="footer">
          <Button
            label="Retour"
            @click="handleBack"
            :disabled="activeIndex === 0"
            class="p-button-secondary"
          />
          <Button
            :label="activeIndex === 2 ? 'Terminer' : 'Suivant'"
            @click="handleNext"
            :disabled="!isStepValid"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.add-book-stepper {
  max-width: 800px;
  margin: 0 auto;
}

.dialog-content {
  background-color: #f9f9f9;
  border-radius: 6px;
  padding: 2rem;
}

/* Reset des styles PrimeVue */
:deep(.p-dialog) {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

:deep(.p-dialog-header) {
  background-color: white;
  padding: 1.5rem 2rem;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

:deep(.p-dialog-content) {
  padding: 0 !important;
  background-color: white;
}

:deep(.p-dialog-footer) {
  background-color: white;
  padding: 1.5rem 2rem;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.step-content {
  margin: 2rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.p-steps) {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 1rem;
}

:deep(.p-steps-item) {
  opacity: 0.7;
}

:deep(.p-steps-item.p-highlight) {
  opacity: 1;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

:deep(.p-inputtext),
:deep(.p-dropdown),
:deep(.p-inputnumber-input),
:deep(.p-textarea) {
  width: 100%;
  background-color: white !important;
}

input[type='file'] {
  background-color: white;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}
#footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
