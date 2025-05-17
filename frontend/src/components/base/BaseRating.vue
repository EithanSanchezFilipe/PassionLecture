<script setup>
import Rating from 'primevue/rating'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="base-rating">
    <Rating 
      :model-value="modelValue"
      :readonly="readonly"
      :cancel="false"
      @update:model-value="(value) => emit('update:modelValue', value)"
    />
  </div>
</template>

<style scoped>
.base-rating {
  display: inline-flex;
}

.p-rating {
  gap: 10px;
}

.p-rating * {
  height: 20px;
  color: #ffcc00;
}
</style> 