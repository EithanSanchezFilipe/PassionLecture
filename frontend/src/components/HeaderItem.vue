<script setup>
import { ref } from 'vue'
import logosvg from '@/assets/icons/logo.svg'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const logo = ref(logosvg)
</script>

<template>
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
</style>
