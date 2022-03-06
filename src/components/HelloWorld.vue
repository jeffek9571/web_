<script setup>
import { ref } from 'vue'
import axios from "axios"
defineProps({
  msg: String
})

// export default {
//   data() {
//     return {
//       info:null
//     }
//   },
//   methods:{
//     get(){
//      axios
//       .get('https://www.runoob.com/try/ajax/json_demo.json')
//       .then(response => (this.info = response.data.sites))
//       .catch(function (error) { // 请求失败处理
//         console.log(error);
//       }); 
//     }
//   }
// }

const count1 = ref(0)
const count = ()=>{
    count1.value++
}


</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count()">count is: {{ count1 }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div v-for="site in info" :key="site.id">{{site.name}}</div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>