<script setup>
import { ref } from 'vue'
import Rating from 'primevue/rating'
const note = ref(1)
const commentaire = ref('')

const onSubmit = () => {}
</script>

<template>
  <form @submit.prevent="envoyerFormulaire" class="formulaire-commentaire">
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

    <button type="submit" @click="onSubmit">Envoyer</button>
  </form>
</template>

<style scoped></style>
