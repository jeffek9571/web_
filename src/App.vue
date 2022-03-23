<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  display:flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  left: 0;
  right: 0;
  margin-top: 8%;
  margin-bottom: 8%;
}

@media (max-width:768px) {
  #app{
    margin-top: 20%;
    margin-bottom: 15%;
  }
}
@media (max-width:375px) {
  #app{
    margin-top: 25%;
    margin-bottom: 15%;
  }
}
@media (max-width:315px) {
  #app{
    margin-top: 30%;
    margin-bottom: 20%;
  }
}
</style>
