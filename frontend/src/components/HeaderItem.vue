<script setup>
import Popup from './Popup.vue'
import { ref, inject } from 'vue'
import logosvg from '@/assets/icons/logo.svg'
const GStore = inject('GStore')
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const logo = ref(logosvg)

const logout = () => {
  auth
    .Logout()
    .then((_) => {
      GStore.flashMessage = 'Vous vous êtes déconnecter avec succes !'
      GStore.isSuccess = true
      setTimeout(() => {
        GStore.flashMessage = ''
      }, 3000)
      popup()
    })
    .catch((e) => {
      console.error(e)
    })
}
const showPopup = ref(false)
const popup = () => {
  showPopup.value = !showPopup.value
}
</script>

<template>
  <Popup action="logout" :show="showPopup" @cancel="popup" @confirm="logout" />
  <header>
    <RouterLink to="/"> <img :src="logo" alt="Logo" /></RouterLink>
    <div class="link-auth">
      <nav>
        <RouterLink :to="{ name: 'Home' }">Accueil</RouterLink>
        <RouterLink :to="{ name: 'Category' }">Catégories</RouterLink>
        <RouterLink :to="{ name: 'Book' }">Livres</RouterLink>
      </nav>
      <div class="auth" v-if="!auth.isAuthenticated">
        <RouterLink class="auth-btn" id="sign-in" :to="{ name: 'Login' }">Se connecter</RouterLink>
        <RouterLink class="auth-btn" id="sign-up" :to="{ name: 'Register' }"
          >Créer un compte</RouterLink
        >
      </div>
      <div class="logout" v-else>
        <RouterLink class="profile-btn" :to="{ name: 'Profile' }">Mon Profil</RouterLink>
        <button @click="popup" type="button" class="logout-btn">Se déconnecter</button>
      </div>
    </div>
  </header>
</template>
<style scoped>
a {
  color: black;
  text-decoration: none;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #d9d9d9;
}
.link-auth {
  display: flex;
  gap: 3em;
}
nav {
  display: flex;
  gap: 2em;
  align-items: center;
}
nav a:hover {
  color: #1e1e1e;
}
.auth {
  display: flex;
  gap: 2em;
}
.auth a {
  border: 1px solid #767676;
  padding: 8px;
  border-radius: 12px;
}
#sign-in {
  background-color: #e3e3e3;
}
#sign-up {
  background-color: #2c2c2c;
  color: #f5f5f5;
}
#sign-in:hover {
  cursor: pointer;
  background-color: #b2b2b2;
}
#sign-up:hover {
  cursor: pointer;
  background-color: #1e1e1e;
}
.logout-btn {
  background-color: #f5f5f5;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}
.logout-btn:hover {
  background-color: #dcdcdc;
  transform: scale(1.05);
}
.logout-btn:focus {
  outline: none;
}

.profile-btn {
  background-color: #f8f9fa;
  border: 1px solid #6366f1;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: #6366f1;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
}

.profile-btn:hover {
  background-color: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(99, 102, 241, 0.2);
}

.logout {
  display: flex;
  align-items: center;
  gap: 1em;
}
</style>
