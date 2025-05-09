<script setup>
import authService from '@/services/authService'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const onSubmit = () => {
  authService
    .login({ username: username.value, password: password.value })
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>
<template>
  <form @submit.prevent="onSubmit" class="formulaire-login">
    <div class="champ-username">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" v-model="username" placeholder="Nom d'utilisateur" />
    </div>
    <div class="champ-password">
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="password" placeholder="Mot de passe" />
    </div>

    <button type="submit">Envoyer</button>
  </form>
</template>
