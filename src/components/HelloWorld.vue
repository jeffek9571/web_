<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios"

const info = ref("")
const page = ref(0)
const onscroll_header = ref(false)
const onscroll_up = ref(0)

defineProps({
  msg: String
})

onMounted(()=>{
    getPic();
})

window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.documentElement.scrollTop > onscroll_up.value) {
    onscroll_header.value=true;
  } else {
    onscroll_header.value=false;
  }
  onscroll_up.value = document.documentElement.scrollTop;
}


function getPic(){
  axios
      .get('https://randomuser.me/api/?results=50')
      .then(response => {
        info.value = response.data.results;
        console.log(response.data.results);
        page.value = response.data.info.page;
      })
      .catch(function (error) { 
        console.log(error);
      }); 
}

function addToggle(event){
    let button = event.target;
    button.classList.toggle('is-active');
}

</script>

<template>

  <nav class="header" v-if="onscroll_header === false">
      <div class="container-header">
        <h1>
          HELLO
        </h1>

        <div class="nav-header">
          <a href="#">Home</a>
          <a href="#">Home</a>
          <a href="#">Home</a>
          <a href="#">Home</a>
          <a href="#">Home</a>
        </div>

        <button class="hamburger" @click="addToggle">
          <span ></span>
          <span ></span>
          <span ></span>
        </button>
      </div>
  </nav>


  <div class="box">
    <div class="container" v-for="data in info" :key="data.id" >
      <a class="btn" :href="data.picture.large" v-if="data.dob.age>30">
        <img class="pic" :src="data.picture.large" >
        <p class="text" v-if="data.dob.age>30">{{data.name.first}}</p>
      </a>
    </div>
  </div>
  

  <!-- <div class="clear">
  </div> -->

  <button @click="getPic" v-if="page>0">
    {{page}}
  </button>

  <nav class="footer">
      <div class="container-footer">
        <h1>
          Copyright
        </h1>
      </div>
  </nav>

</template>

<style scoped>
/* :root{
  --primary: #8c38ff;
} */

.container {
  
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  flex: 1;
  /* background: lightcoral; */
}


/* .box{
  min-height: 100%;
} */

/* .clear{
  clear: both;
} */




.btn {
  border:1px solid gray;
  border-radius:3%;
  margin: 24px;
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


.fixed-header, .fixed-footer{
  position: fixed; 
  width: 100%;       
  background: #333;
  color: #fff;
  z-index: 50;
  height: 5%;
  left: 0;
  right: 0;
}
.fixed-header{
  top: 0;
}
.fixed-footer{
  bottom: 0;
}

.container-header{
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

}

.header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #333;
  list-style-type: none;
  margin: 0;
  padding: 0px 32px;
  border-bottom: 2px solid wheat;
  transition: 1s;

}
.container-header.on-scroll{
  display:none;
  opacity: 0;
}

.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #333;
  list-style-type: none;
  margin: 0;
  padding: 0px 32px;
  border-bottom: 2px solid wheat;

}
.header h1{
  color: brown;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.footer h1{
  color: deepskyblue;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.hamburger{
  display: block;
  position: relative;
  z-index: 1;
  user-select: none;
  border: none;
  appearance: none;
  outline: none;
  background: none;
  cursor: pointer;

}
.hamburger span{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 4px;
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  z-index: 1;
  transform-origin: 0 0;
  transition: 0.5s;
}
/* .hamburger:hover span:nth-child(1){
  transform:  rotate(-15deg)
} */

.hamburger:hover span:nth-child(2){
  transform: translate(10px);
  background-color: aqua;
}

/* .hamburger:hover span:nth-child(3){
  transform:  rotate(15deg)
} */
.hamburger.is-active span:nth-child(1){
  transform:  translate(0px,-4px) rotate(45deg)
}
.hamburger.is-active span:nth-child(2){
  opacity: 0;
  transform:  translateX(15px);
}
.hamburger.is-active span:nth-child(3){
  transform:  translate(-3px,3px) rotate(-45deg)
}

nav a{
  color: #fff;
  text-decoration: none;
  /* display: inline-block;
  padding: 10px; */
}
.nav-header a:hover {
  background-color: grey;
}

@media (min-width:768px) {
  .hamburger{
    display: none;
  }
}

@media (max-width:768px) {
  .nav-header{
    display:none;
  }
  .btn{
    margin: 12px;
  }
}
</style>