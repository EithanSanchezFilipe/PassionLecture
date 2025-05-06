<script setup>
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
    <div class="stars"></div>
  </div>
  <p v-else>Aucun commentaire</p>
</template>
