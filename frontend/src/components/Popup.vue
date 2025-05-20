<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'cancel'])
const act = computed(() => {
  if (props.action === 'logout') {
    return 'déconnecter'
  } else if (props.action === 'update') {
    return 'modifier ce livre'
  } else if (props.action === 'delete') {
    return 'supprimer ce livre'
  }
})
</script>
<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-container">
      <p>Voulez-vous vraiment vous {{ act }} ?</p>
      <div class="popup-buttons">
        <button class="confirm" @click="$emit('confirm')">Oui</button>
        <button class="cancel" @click="$emit('cancel')">Non</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.popup-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
  font-family: 'Poppins', sans-serif;
  padding: 70px 40px;
  border-radius: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-container {
  background: #f5f6fa;
  font-family: 'Poppins', sans-serif;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.popup-buttons button {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.confirm {
  background-color: #e74c3c;
  color: white;
}

.cancel {
  background-color: #bdc3c7;
  color: #2c3e50;
}
</style>
