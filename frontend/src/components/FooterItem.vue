<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

import Instagram from '@/assets/icons/Instagram.svg'
import Twitter from '@/assets/icons/Twitter.svg'
import Youtube from '@/assets/icons/Youtube.svg'
import LinkedIn from '@/assets/icons/LinkedIn.svg'
import logo from '@/assets/icons/logo.svg'

const icons = ref({
  logo,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: LinkedIn,
})
</script>

<template>
  <footer>
    <div class="footer-logo">
      <RouterLink to="/" class="router-link">
        <img :src="icons.logo" alt="logo" />
      </RouterLink>
      <nav>
        <div class="footer-info">
          <h2>À propos de nous</h2>
          <h2>Qui Sommes-nous ?</h2>
          <h2>Nous contacter</h2>
        </div>
      </nav>
    </div>
    <nav>
      <div class="footer-link">
        <RouterLink to="/"><img :src="icons.twitter" alt="Twitter" /> </RouterLink>
        <RouterLink to="/"><img :src="icons.instagram" alt="Instagram" /> </RouterLink>
        <RouterLink to="/"><img :src="icons.youtube" alt="Youtube" /> </RouterLink>
        <RouterLink to="/"><img :src="icons.linkedin" alt="LinkedIn" /> </RouterLink>
      </div>
    </nav>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  margin-top: 1em;
  bottom: 0;
  justify-content: space-around;
  gap: 8em;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10em;
}
.footer-info {
  display: flex;
  gap: 5em;
  justify-content: space-between;
}
.footer-info h2 {
  font-size: 20px;
  width: fit-content;
  height: 100%;
  margin-right: 10em;
}
footer img {
  width: 65px;
}
.footer-link {
  display: flex;
  padding: 10px;
  gap: 10px;
}
.footer-link img {
  width: 40px;
}
</style>
