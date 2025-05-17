<script setup>
import BaseRating from '@/components/base/BaseRating.vue'
defineProps({
  comment: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div v-if="comment" class="comment">
    <p class="username">{{ comment.username }}</p>
    <p class="message">
      {{ comment.message }}
    </p>
    <div class="stars">
      <BaseRating :model-value="comment.note" readonly />
    </div>
  </div>
  <p v-else>Aucun commentaire</p>
</template>

<style scoped>
.comment {
  margin-bottom: 1.5em;
}

.username {
  font-weight: bold;
  margin-bottom: 0.5em;
}

.message {
  margin-bottom: 0.5em;
}

.stars {
  margin-top: 0.5em;
}
</style>
