<script setup>
import { ref, computed, watch } from 'vue'
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
  initialData: {
    type: Object,
    default: () => ({
      name: '',
      passage: '',
      summary: '',
      editionYear: new Date().getFullYear(),
      pages: null,
      coverImage: null,
      category_fk: null,
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
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

// Watch for changes in initialData and update formData accordingly
watch(
  () => props.initialData,
  (newValue) => {
    if (newValue) {
      formData.value = { ...newValue }
    }
  },
  { immediate: true, deep: true },
)

// Watch for visibility changes - reset form when dialog is opened
watch(
  () => props.visible,
  (newValue) => {
    if (newValue && !props.isEditing) {
      // Only reset if we're not editing
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
  },
)


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
      return !!formData.value.summary
    case 2:
      return (
        formData.value.editionYear &&
        formData.value.pages &&
        formData.value.editionYear <= new Date().getFullYear() &&
        formData.value.pages > 0
      )
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
  // Only reset if we're not in edit mode
  if (!props.isEditing) {
    formData.value = {
      name: '',
      passage: '',
      summary: '',
      editionYear: new Date().getFullYear(),
      pages: null,
      coverImage: null,
      category_fk: null,
    }
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
      <template #header>
        <h2 class="dialog-title">{{ isEditing ? 'Modifier le livre' : 'Ajouter un livre' }}</h2>
      </template>

      <div class="dialog-content">
        <div class="steps-container">
          <div class="steps-progress-container">
            <div class="steps-markers">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="step-marker-container"
                :class="{ 'step-disabled': index > activeIndex && !isStepValid }"
              >
                <div
                  class="step-marker"
                  :class="{
                    'step-active': index <= activeIndex,
                    'step-completed': index < activeIndex,
                  }"
                  @click="
                    index <= activeIndex || (index === activeIndex + 1 && isStepValid)
                      ? (activeIndex = index)
                      : null
                  "
                >
                  {{ index + 1 }}
                  <div class="step-pulse" v-if="index === activeIndex"></div>
                </div>
                <div class="step-label" :class="{ 'active-label': index <= activeIndex }">
                  {{ step.label }}
                </div>

                <!-- Ligne de connexion entre les cercles (sauf pour le dernier) -->
                <div v-if="index < steps.length - 1" class="connector-line">
                  <div class="connector-bg"></div>
                  <div class="connector-progress" :class="{ filled: activeIndex > index }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="step-content">
          <transition name="fade-slide" mode="out-in">
            <component :is="'div'" :key="activeIndex" class="step-form-container">
              <!-- Étape 1: Informations de base -->
              <template v-if="activeIndex === 0">
                <div class="form-group appear-animation">
                  <label>Titre*</label>
                  <InputText v-model="formData.name" required />
                </div>
                <div class="form-group appear-animation" style="animation-delay: 0.1s">
                  <label>Catégorie*</label>
                  <Dropdown
                    v-model="formData.category_fk"
                    :options="categories"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Sélectionner une catégorie"
                  />
                </div>
              </template>

              <!-- Étape 2: Contenu -->
              <template v-if="activeIndex === 1">
                <div class="form-group appear-animation">
                  <label>Résumé*</label>
                  <div class="textarea-container">
                    <Textarea
                      v-model="formData.summary"
                      rows="5"
                      autoResize
                      placeholder="Écrivez le résumé du livre..."
                    />
                  </div>
                </div>
                <div class="form-group appear-animation" style="animation-delay: 0.1s">
                  <label>Passage</label>
                  <div class="textarea-container">
                    <Textarea
                      type="url"
                      v-model="formData.passage"
                      rows="1"
                      pattern="https?://.+\.pdf$"
                      placeholder="Mettre un lien du passage du livre..."
                    />
                  </div>
                </div>
              </template>

              <!-- Étape 3: Détails supplémentaires -->
              <template v-if="activeIndex === 2">
                <div class="form-group appear-animation">
                  <label>Année d'édition*</label>
                  <InputNumber v-model="formData.editionYear" :max="new Date().getFullYear()" />
                </div>
                <div class="form-group appear-animation" style="animation-delay: 0.1s">
                  <label>Nombre de pages*</label>
                  <InputNumber v-model="formData.pages" :min="1" />
                </div>
                <div class="form-group appear-animation" style="animation-delay: 0.2s">
                  <label>Couverture</label>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="file-input"
                  />
                </div>
              </template>
            </component>
          </transition>
        </div>
      </div>

      <template #footer>
        <div id="footer">
          <Button
            label="Retour"
            @click="handleBack"
            :disabled="activeIndex === 0"
            class="p-button-secondary btn-animated"
          />
          <Button
            :label="activeIndex === 2 ? 'Terminer' : 'Suivant'"
            @click="handleNext"
            :disabled="!isStepValid"
            class="btn-animated"
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

.dialog-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.dialog-content {
  background-color: transparent;
  border-radius: 14px;
  padding: 2.5rem 2rem;
  box-shadow: none;
}
.steps-container {
  position: relative;
  margin-bottom: 2rem;
}

.steps-progress-container {
  position: relative;
  width: 100%;
  height: 110px;
  margin: 20px 0 40px;
}

.steps-markers {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.steps-connector {
  display: none; /* Removing the old connector */
}

.progress-line {
  display: none; /* Removing the old progress line */
}

.step-marker-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 110px;
  z-index: 3;
}

.connector-line {
  position: absolute;
  top: 18px; /* Half height of marker to align with center */
  left: 36px; /* Full width of the marker to start from its right edge */
  width: calc(100% + 100% + 100% + 50%); /* Extended further to reach the next marker */
  height: 4px;
  z-index: 1;
}

.connector-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #e5e7eb;
  border-radius: 4px;
}

.connector-progress {
  position: absolute;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.connector-progress.filled {
  width: 100%;
}

.step-marker {
  position: relative;
  width: 36px;
  height: 36px;
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #6b7280;
  z-index: 2;
  transition: all 0.3s ease;
  cursor: pointer;
}

.step-active {
  border-color: #6366f1;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  transform: scale(1.2);
  box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.2);
}

.step-completed {
  border-color: #6366f1;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.step-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(99, 102, 241, 0.3);
  z-index: -1;
  animation: pulseAnimation 2s infinite;
}

@keyframes pulseAnimation {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  70% {
    transform: translate(-50%, -50%) scale(1.7);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.7);
    opacity: 0;
  }
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
  background-color: transparent;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #eaeaea;
}

/* Hide PrimeVue Steps since we're replacing it with our custom UI */
:deep(.p-steps) {
  display: none;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition:
    border 0.2s,
    box-shadow 0.2s;
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

/* Style Dropdown Épuré */
:deep(.p-dropdown) {
  width: 100% !important;
  border: 1.5px solid #d1d5db !important;
  border-radius: 6px !important;
  min-height: 2.75rem;
  box-shadow: none;
  transition:
    border 0.2s,
    box-shadow 0.2s;
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
  border-radius: 6px !important;
  border: 1.5px solid #d1d5db !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.09);
  background: white;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border: none;
}
:deep(.p-button-secondary) {
  background: #f3f4f6 !important;
  color: #222 !important;
  border: 1.5px solid #d1d5db !important;
}
:deep(.p-button:not(.p-button-secondary)) {
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
  color: #fff !important;
  border: none !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
}

:deep(.p-button:not(.p-button-secondary)):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4) !important;
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
  transition: all 0.2s ease;
  transform-origin: right center;
}

.count-error {
  color: #dc2626;
  transform: scale(1.1);
  font-weight: bold;
}
/* Animations pour transitions d'étapes */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Animation d'apparition des form groups */
.appear-animation {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation pour les boutons */
.btn-animated {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease !important;
}

.btn-animated:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-animated:active:not(:disabled) {
  transform: translateY(0);
}

/* Animation des steps */
:deep(.p-steps .p-steps-item) {
  transition: opacity 0.4s ease;
}

:deep(.p-steps .p-steps-item .p-menuitem-link .p-steps-number) {
  transition:
    background-color 0.4s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

:deep(.p-steps .p-steps-item.p-highlight .p-steps-number) {
  animation: pulse 1.5s infinite;
  animation-delay: 0.5s;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

/* Style de focus amélioré */
:deep(.p-inputtext:focus),
:deep(.p-dropdown:focus),
:deep(.p-inputnumber-input:focus) {
  animation: focusPulse 0.6s ease;
}

@keyframes focusPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
  }
  100% {
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
  }
}

/* Style pour l'upload de fichier */
.file-input {
  transition: all 0.3s ease;
}

.file-input:hover {
  opacity: 0.8;
}

/* Animation de container d'étape */
.step-form-container {
  animation: fadeScale 0.5s ease;
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.step-label {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
  text-align: center;
  max-width: 110px;
  pointer-events: none; /* Rend le label non-cliquable */
}

.active-label {
  color: #4f46e5;
  font-weight: 600;
}

.step-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-disabled:hover .step-marker {
  transform: none !important;
}

.step-marker-container:hover .step-marker:not(.step-active) {
  border-color: #a5b4fc;
  transform: scale(1.1);
}
</style>
