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

const SUMMARY_MAX_LENGTH = 2000
const PASSAGE_MAX_LENGTH = 250

const summaryLength = computed(() => formData.value.summary.length)
const passageLength = computed(() => formData.value.passage.length)

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
      return formData.value.summary && summaryLength.value <= SUMMARY_MAX_LENGTH && 
             (!formData.value.passage || passageLength.value <= PASSAGE_MAX_LENGTH)
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
              <div class="textarea-container">
                <Textarea 
                  v-model="formData.summary" 
                  rows="5" 
                  autoResize 
                  :maxlength="SUMMARY_MAX_LENGTH"
                  :class="{ 'p-invalid': summaryLength > SUMMARY_MAX_LENGTH }"
                  placeholder="Écrivez le résumé du livre..."
                />
                <span class="char-count" :class="{ 'count-error': summaryLength > SUMMARY_MAX_LENGTH }">
                  {{ summaryLength }}/{{ SUMMARY_MAX_LENGTH }}
                </span>
              </div>
              <small v-if="summaryLength > SUMMARY_MAX_LENGTH" class="p-error">
                Le résumé ne peut pas dépasser {{ SUMMARY_MAX_LENGTH }} caractères
              </small>
            </div>
            <div class="form-group">
              <label>Passage</label>
              <div class="textarea-container">
                <Textarea 
                  v-model="formData.passage" 
                  rows="3" 
                  autoResize 
                  :maxlength="PASSAGE_MAX_LENGTH"
                  :class="{ 'p-invalid': passageLength > PASSAGE_MAX_LENGTH }"
                  placeholder="Écrivez un passage marquant du livre..."
                />
                <span class="char-count" :class="{ 'count-error': passageLength > PASSAGE_MAX_LENGTH }">
                  {{ passageLength }}/{{ PASSAGE_MAX_LENGTH }}
                </span>
              </div>
              <small v-if="passageLength > PASSAGE_MAX_LENGTH" class="p-error">
                Le passage ne peut pas dépasser {{ PASSAGE_MAX_LENGTH }} caractères
              </small>
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
  border-radius: 14px;
  padding: 2.5rem 2rem;
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.12);
}

/* Reset des styles PrimeVue */
:deep(.p-dialog) {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.13);
  border-radius: 14px;
}

:deep(.p-dialog-header) {
  background-color: #fff;
  padding: 1.5rem 2rem;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

:deep(.p-dialog-content) {
  padding: 0 !important;
  background-color: #fff;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

:deep(.p-dialog-footer) {
  background-color: #fff;
  padding: 1.5rem 2rem;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

.step-content {
  margin: 2rem 0;
  padding: 1.5rem 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}

:deep(.p-steps) {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
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
  color: #222;
  letter-spacing: 0.01em;
}

/* Style général pour tous les inputs */
:deep(.p-inputtext),
:deep(.p-inputnumber-input),
:deep(.p-textarea) {
  width: 100%;
  background-color: #fff !important;
  border: 1.5px solid #d1d5db !important;
  border-radius: 6px !important;
  padding: 0.75rem 1rem !important;
  font-size: 1rem;
  color: #222;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  transition: border 0.2s, box-shadow 0.2s;
}

:deep(.p-inputtext.p-invalid),
:deep(.p-textarea.p-invalid) {
  border-color: #dc2626 !important;
}

.p-error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* Style spécifique pour Dropdown PrimeVue */
:deep(.p-dropdown) {
  width: 100% !important;
  background: #fff !important;
  border: 1.5px solid #d1d5db !important;
  border-radius: 6px !important;
  min-height: 2.75rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  transition: border 0.2s, box-shadow 0.2s;
}
:deep(.p-dropdown.p-focus) {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 2px #6366f133;
}
:deep(.p-dropdown-label) {
  color: #222 !important;
  font-size: 1rem;
  background: transparent !important;
}
:deep(.p-dropdown-panel) {
  background: #fff !important;
  border-radius: 6px !important;
  border: 1.5px solid #d1d5db !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.09);
}
:deep(.p-dropdown-item) {
  color: #222 !important;
  font-size: 1rem;
  padding: 0.75rem 1rem;
}
:deep(.p-dropdown-item.p-highlight) {
  background: #6366f1 !important;
  color: #fff !important;
}

/* Style pour le champ fichier */
input[type='file'] {
  background-color: #fff;
  padding: 0.5rem;
  border: 1.5px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  font-size: 1rem;
  color: #222;
  transition: border 0.2s;
}
input[type='file']:focus {
  border-color: #6366f1;
  outline: none;
}

/* Footer boutons */
#footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
}
:deep(.p-button) {
  font-size: 1rem;
  padding: 0.75rem 2.5rem;
  border-radius: 6px;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  border: none;
}
:deep(.p-button-secondary) {
  background: #f3f4f6 !important;
  color: #222 !important;
  border: 1.5px solid #d1d5db !important;
}
:deep(.p-button:not(.p-button-secondary)) {
  background: #6366f1 !important;
  color: #fff !important;
  border: none !important;
}
:deep(.p-button:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

.textarea-container {
  position: relative;
  width: 100%;
}

:deep(.p-inputtextarea) {
  width: 100%;
  padding: 0.75rem;
  border: 1.5px solid #d1d5db;
  border-radius: 6px;
  resize: vertical;
  min-height: 100px;
  font-size: 1rem;
  color: #222;
  background-color: #fff;
  transition: border-color 0.2s ease-in-out;
}

:deep(.p-inputtextarea:focus) {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

:deep(.p-inputtextarea.p-invalid) {
  border-color: #dc2626;
}

.char-count {
  position: absolute;
  bottom: 0.5rem;
  right: 0.75rem;
  font-size: 0.75rem;
  color: #666;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  pointer-events: none;
}

.count-error {
  color: #dc2626;
}
</style>
