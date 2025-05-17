<template>
  <div class="book-cover-container">
    <Skeleton v-if="!coverImage" width="100%" height="100%" />
    <img 
      v-else
      :src="coverImage" 
      :alt="altText"
      class="book-cover"
      @error="handleImageError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Skeleton from 'primevue/skeleton'

const props = defineProps({
  coverImage: {
    type: String,
    default: null
  },
  altText: {
    type: String,
    default: 'Couverture du livre'
  }
})

const handleImageError = (e) => {
  e.target.style.display = 'none'
  e.target.parentElement.querySelector('.p-skeleton').style.display = 'block'
}
</script>

<style scoped>
.book-cover-container {
  width: 100%;
  height: 100%;
  aspect-ratio: 2/3;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

:deep(.p-skeleton) {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style> 