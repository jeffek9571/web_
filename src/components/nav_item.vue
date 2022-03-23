<script setup>
import { ref} from 'vue'
    defineProps({
      msg: String
    })
</script>

<template>
    <ul class="ul-list" @click="clicka">
        <ul>{{ msg }}</ul>
        <img src="../assets/arrow.png" alt="" >
    </ul>
</template>

<style scoped>
img{
  width: 10px;
  height: 10px;
}
.ul-list:hover {
  background-color: grey;
}
.ul-list{
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
}
ul{
    border-radius: 10px;
    width: 50%;
    color: #d9621e;
    margin: 8px;
    padding: 5px;
}
</style>