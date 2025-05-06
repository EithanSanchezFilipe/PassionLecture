<script setup>
import { ref } from 'vue'
import Rating from 'primevue/rating'
const note = ref(1)
</script>

<template>
  <div class="rating">
    <Rating :defaultValue="2" />
  </div>
</template>

<style scoped>
.rating {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.star {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #ddd; /* Couleur grise par défaut */
  transition: fill 0.3s;
}

input:checked ~ label .star {
  fill: #ffcc00; /* Couleur dorée quand sélectionnée */
}

input:not(:checked) ~ label .star:hover,
label:not(:checked) ~ .star:hover ~ .star {
  fill: #ffcc00; /* Survol de l'étoile */
}
</style>
