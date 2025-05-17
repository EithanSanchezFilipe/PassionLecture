<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemsPerView: {
    type: Number,
    default: 4
  },
  title: {
    type: String,
    required: true
  }
})

const currentIndex = ref(0)
const isAnimating = ref(false)
const slideDirection = ref(null)

const visibleItems = computed(() => {
  if (!props.items.length) return []
  const totalItems = props.items.length
  let indices = []
  for (let i = 0; i < props.itemsPerView; i++) {
    indices.push((currentIndex.value + i) % totalItems)
  }
  return indices.map(i => props.items[i])
})

const canScrollPrev = computed(() => props.items.length > props.itemsPerView && !isAnimating.value)
const canScrollNext = computed(() => props.items.length > props.itemsPerView && !isAnimating.value)

const scroll = async (direction) => {
  if (!props.items.length || isAnimating.value) return
  
  isAnimating.value = true
  slideDirection.value = direction
  
  const totalItems = props.items.length
  
  await new Promise(resolve => setTimeout(resolve, 300))
  
  if (direction === 'next') {
    currentIndex.value = (currentIndex.value + 1) % totalItems
  } else {
    currentIndex.value = (currentIndex.value - 1 + totalItems) % totalItems
  }
  
  slideDirection.value = null
  isAnimating.value = false
}
</script>

<template>
  <section class="carousel-section">
    <h2>{{ title }}</h2>
    <div class="carousel-container">
      <div class="carousel">
        <div 
          v-for="item in visibleItems" 
          :key="item.id" 
          class="carousel-item"
          :class="{
            'sliding-left': slideDirection === 'next',
            'sliding-right': slideDirection === 'prev',
            'entering': !slideDirection
          }"
        >
          <slot name="item" :item="item"></slot>
        </div>
      </div>
      <button 
        class="nav-button prev" 
        @click="scroll('prev')"
        :disabled="!canScrollPrev"
      >&lt;</button>
      <button 
        class="nav-button next" 
        @click="scroll('next')"
        :disabled="!canScrollNext"
      >&gt;</button>
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  padding: 3em 2em;
  background-color: #ffffff;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-section h2 {
  font-size: 2rem;
  text-decoration: underline;
  color: black;
  margin-bottom: 1.5em;
  text-align: center;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  padding: 0 3em;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.carousel {
  display: flex;
  gap: 2em;
  overflow-x: hidden;
  padding: 1em 0;
  width: 100%;
  position: relative;
}

.carousel-item {
  flex: 0 0 calc(25% - 1.5em);
  min-width: 0;
  transition: transform 0.3s ease-in-out;
}

.carousel-item.sliding-left {
  transform: translateX(-100%);
}

.carousel-item.sliding-right {
  transform: translateX(100%);
}

.carousel-item.entering {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.nav-button.prev {
  left: 0;
}

.nav-button.next {
  right: 0;
}

.nav-button:disabled {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: not-allowed;
}
</style> 