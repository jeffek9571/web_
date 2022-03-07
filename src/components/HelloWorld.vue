<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios"
defineProps({
  msg: String
})

const info = ref("")

onMounted(()=>{
    axios
      .get('https://randomuser.me/api/?results=50')
      .then(response => {
        info.value = response.data.results
        console.log(response.data.results);
        
      })
      .catch(function (error) { 
        console.log(error);
      }); 
})

const count1 = ref(0)
const count = ()=>{
    count1.value++
}


</script>

<template>
  <!-- <h1>{{ msg }}</h1>

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
  </p> -->


  <div class="container" v-for="data in info" :key="data.id" >
    <a class="btn" :href="data.picture.large" v-if="data.dob.age>30">
      <img class="pic" :src="data.picture.large" alt="Lamp">
      <p class="text" v-if="data.dob.age>30">{{data.name.first}}</p>
    </a>
    
  </div>
</template>

<style scoped>
.container {
  
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  /* background: lightcoral; */
}



.btn {
  border:1px solid gray;
  border-radius:3%;
  margin: 5px;
  color: #42b983;
  background: white;
  /* display: flex;
  justify-content: space-between; */
  /* background: lightcoral; */
}

.btn:hover {
  /* width: 100px;
  height: 100px; */
  transform: scale(1.2) ;
  /* transition:  1s,ease-in-out; */
}

.pic {
  
  border-radius:25%;
  padding: 24px;
  width: 128px;
  height: 128px;
  /* background: rgb(128, 132, 240); */
}
</style>