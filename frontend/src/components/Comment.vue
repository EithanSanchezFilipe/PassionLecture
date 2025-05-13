<script setup>
import Rating from 'primevue/rating'
defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div v-if="comment">
    <p class="username">{{ comment.username }}</p>
    <p>
      {{ comment.message }}
    </p>
    <div class="stars">
      <Rating :default-value="comment.note" :readonly="true" />
    </div>
  </div>
  <p v-else>Aucun commentaire</p>
</template>
