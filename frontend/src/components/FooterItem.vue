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
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__left">
        <RouterLink to="/" class="footer__logo-link">
          <img :src="icons.logo" alt="logo" class="footer__logo" />
        </RouterLink>

        <div class="footer__info">
          <div class="confidential">
          <h2>À propos de nous</h2>
          <p>MID2A & CID2A</p>
          </div>
          <div class="name">
          <h2>Qui sommes-nous ?</h2>
          <p>Ryan & Eithan </p>
          </div>
          <div class="contact">
          <h2>Nous contacter</h2>
          <a href="mailto:ryan.depina@eduvaud.ch">ryan.depina@eduvaud.ch</a>
          <a href="mailto:eithan.sanchez@eduvaud.ch">eithan.sanchez@eduvaud.ch</a>
          </div>
        </div>
      </div>

      <div class="footer__socials">
        <RouterLink to="/"><img :src="icons.twitter" alt="Twitter" /></RouterLink>
        <RouterLink to="/"><img :src="icons.instagram" alt="Instagram" /></RouterLink>
        <RouterLink to="/"><img :src="icons.youtube" alt="YouTube" /></RouterLink>
        <RouterLink to="/"><img :src="icons.linkedin" alt="LinkedIn" /></RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  width: 100%;
  padding: 2rem 1rem;
  margin-top: auto;
}

.footer__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 150rem;
  margin: 0, auto, 0, 10em;
  gap: 10rem;
}

.footer__left {
  display: flex;
  gap: 4rem;
}

.footer__logo {
  width: 65px;
}

.footer__info {
  display: flex;
  flex-direction: row;
  gap: 7rem;
}

.footer__info h2 {
  font-size: 1rem;
  margin: 0;
}

.footer__socials {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.footer__socials img {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}
.contact a {
  text-decoration: none;
  display: block;
  flex-direction: column;
}
</style>
