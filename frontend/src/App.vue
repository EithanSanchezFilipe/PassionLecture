<script setup>
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/HeaderItem.vue'
import Footer from '@/components/FooterItem.vue'
import { computed, inject } from 'vue'
import Popup from './components/Popup.vue'
import 'primeicons/primeicons.css'
import { useAuthStore } from './stores/auth'
const GStore = inject('GStore')
const route = useRoute()
const auth = useAuthStore()
const noLayoutRoutes = ['/login', '/register']
const hideLayout = computed(() => noLayoutRoutes.includes(route.path))
auth.initAuth()
const closeFlashMessage = () => {
  GStore.flashMessage = ''
}
</script>

<template>
  <Header v-if="!hideLayout"></Header>
  <transition name="fade">
    <div
      class="flashMessage"
      v-if="GStore.flashMessage"
      :class="{ success: GStore.isSuccess, error: !GStore.isSuccess }"
    >
      <p>{{ GStore.flashMessage }}</p>
      <button @click="closeFlashMessage">
        <i class="pi pi-times"></i>
      </button>
    </div>
  </transition>
  <RouterView />
  <Footer v-if="!hideLayout"></Footer>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  margin: 0px;
  font-family: 'Poppins';
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.flashMessage {
  position: fixed;
  top: 2em;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  margin: 0 auto;
  width: 90%;
  max-width: 800px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

.flashMessage p {
  margin: 0;
  flex: 1;
}

.flashMessage.success {
  background-color: #e6ffed;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.flashMessage.error {
  background-color: #ffebee;
  color: #d32f2f;
  border: 1px solid #f44336;
}

.flashMessage button {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 12px;
  transition: color 0.2s ease-in-out;
}

.flashMessage.succes button:hover {
  color: #1b5e20;
}
.flashMessage.error button:hover {
  color: #aa2626;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
