<template>
  <div class="page-wrapper">
    <nav>
      <div class="nav-left">
        <img id="logo" src="" alt="CNX"/>
      </div>
      <div class="nav-right">
        <button id="register-btn">
          <NuxtLink to="register">Register</NuxtLink>
        </button>
        <button id="login-btn">
          <NuxtLink to="login">Log In</NuxtLink>
        </button>
      </div>
    </nav>
    <section class="page-content">
      <div class="banner-box">
        <img src="" alt="CNX banner" />
      </div>
      <div class="description-card">
        <h1>Welcome to CNX System</h1>
        <p>This Web Application is made with Vue.js + Nuxt.js</p>
        <p>
          using typescript as language. It is used for testing and practice
          purposes
        </p>
      </div>
    </section>
    <footer>
      <div class="footer-column footer-left">
        <ul class="footer-links">
          <li v-for="(link, index) in footerLinks" :key="index">
            <NuxtLink :to="link.path">{{ link.description }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="footer-column footer-center">CNX System</div>
      <div class="footer-column footer-right">
        <p>Developer Email: calvin_nunes13@hotmail.com</p>
        <p>Developer Phone: +55 51 98402-9317</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => {
    return {
      footerLinks: [
        { description: 'Register', path: 'register' },
        { description: 'Log In', path: 'login' },
        { description: 'About Us', path: 'about-us' },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
.banner-box {
  width: 100%;
}

.banner-box img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  margin: 0 auto;
}

.description-card {
  margin: 5px auto;
  text-align: center;
}

.description-card h1 {
  color: var(--system-primary);
}
</style>
