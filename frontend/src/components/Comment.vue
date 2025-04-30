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
    <div class="stars">
      <svg
        v-for="(star, index) in comment.stars"
        :key="index"
        class="star"
        :class="{ active: star }"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    </div>
  </div>
  <p v-else>Aucun commentaire</p>
</template>
