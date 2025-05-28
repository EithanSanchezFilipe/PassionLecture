<script setup>
import { ref, computed } from 'vue'
import BaseRating from '@/components/base/BaseRating.vue'
import bookService from '@/services/bookService'

const note = ref(1)
const commentaire = ref('')

const COMMENT_MAX_LENGTH = 500
const commentLength = computed(() => commentaire.value.length)

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['commentAdded'])

const onSubmit = () => {
  if (commentLength.value > COMMENT_MAX_LENGTH) return

  bookService
    .addBookComment(props.id, {
      note: note.value ? note.value : 0,
      commentaire: commentaire.value,
    })
    .then(() => {
      note.value = 1
      commentaire.value = ''
      emit('commentAdded')
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="formulaire-commentaire">
    <div class="champ-rating">
      <label for="note">Note :</label>
      <BaseRating v-model="note" />
    </div>

    <div class="champ-commentaire">
      <label for="commentaire">Commentaire :</label>
      <div class="textarea-container">
        <textarea
          id="commentaire"
          v-model="commentaire"
          rows="4"
          :maxlength="COMMENT_MAX_LENGTH"
          placeholder="Écris ton avis ici..."
          :class="{ 'p-invalid': commentLength > COMMENT_MAX_LENGTH }"
        />
        <span class="char-count" :class="{ 'count-error': commentLength > COMMENT_MAX_LENGTH }">
          {{ commentLength }}/{{ COMMENT_MAX_LENGTH }}
        </span>
      </div>
    </div>

    <button type="submit" :disabled="commentLength > COMMENT_MAX_LENGTH">Envoyer</button>
  </form>
</template>

<style scoped>
.formulaire-commentaire {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.champ-rating {
  display: flex;
  align-items: center;
  gap: 1em;
}

.champ-commentaire {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.textarea-container {
  position: relative;
}

.textarea-container textarea {
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

.textarea-container textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.textarea-container textarea.p-invalid {
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
}

.count-error {
  color: #dc2626;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  align-self: flex-start;
  transition: background-color 0.2s ease-in-out;
}

button:hover:not(:disabled) {
  background-color: #4f46e5;
}

button:disabled {
  background-color: #c7c7c7;
  cursor: not-allowed;
}
</style>
