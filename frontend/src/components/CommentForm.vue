<script setup>
import { ref } from 'vue'

const note = ref(1)

const updateNote = (value) => {
  note.value = value
}
</script>

<template>
  <div class="rating">
    <div v-for="i in 5" :key="i">
      <input
        type="radio"
        :name="rating"
        :value="i"
        :id="'star-' + i"
        :checked="i <= note"
        @change="updateNote(i)"
        style="display: none"
      />
      <label :for="'star-' + i">
        <svg class="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      </label>
    </div>
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
