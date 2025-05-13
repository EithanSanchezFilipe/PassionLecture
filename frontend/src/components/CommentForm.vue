<script setup>
import { ref } from 'vue'
import Rating from 'primevue/rating'
import bookService from '@/services/bookService'

const note = ref(1)
const commentaire = ref('')

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['commentAdded'])

const onSubmit = () => {
  bookService
    .addBookComment(props.id, {
      note: note.value,
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
      <Rating v-model="note" :cancel="false" />
    </div>

    <div class="champ-commentaire">
      <label for="commentaire">Commentaire :</label>
      <textarea
        id="commentaire"
        v-model="commentaire"
        rows="4"
        placeholder="Écris ton avis ici..."
      />
    </div>

    <button type="submit">Envoyer</button>
  </form>
</template>
