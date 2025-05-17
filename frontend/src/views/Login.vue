<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, inject } from 'vue'
import router from '@/router'
const auth = useAuthStore()
const username = ref('')
const GStore = inject('GStore')
const password = ref('')
const onSubmit = () => {
  auth
    .Login({ username: username.value, password: password.value })
    .then((response) => {

      if (response.status === 200) {
        GStore.flashMessage = 'Connexion réussie. Bienvenue !'
        GStore.isSuccess = true
        setTimeout(() => {
          GStore.flashMessage = ''
        }, 3000)
        router.push({ name: 'Home' })
      }

    })
    .catch((e) => {
      console.error(e)
      GStore.flashMessage = e.response.data.message
      GStore.isSuccess = false
    })
}
const goBack = () => {
  router.push({ name: 'Home' })
}
</script>
<template>
  <div class="login-container">
    <div class="back-button" @click="goBack()">← Retourner a l'accueil</div>

    <form @submit.prevent="onSubmit" class="formulaire-login">
      <h2>Se connecter</h2>

      <div class="champ">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" v-model="username" placeholder="Nom d'utilisateur" />
      </div>

      <div class="champ">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" placeholder="Mot de passe" />
      </div>

      <button type="submit">Se connecter</button>
      <RouterLink :to="{ name: 'Register' }">Vous n'avez pas de compte?</RouterLink>
    </form>
  </div>
</template>
<style scoped>
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  background: transparent;
  border: none;
  font-weight: bold;
}

.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6fa;
  font-family: 'Poppins', sans-serif;
}

.formulaire-login {
  background: #fff;
  padding: 70px 40px;
  border-radius: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.formulaire-login h2 {
  margin: 0;
  text-align: center;
  color: #000;
}

.champ {
  display: flex;
  flex-direction: column;
}

.champ label {
  margin-bottom: 6px;
  color: black;
  font-size: 14px;
}

.champ input {
  padding: 10px;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  font-size: 14px;
}

button {
  background-color: #2c2c2c;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #444;
}
a {
  color: #000;
}
</style>
