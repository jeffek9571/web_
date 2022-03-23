<script setup>
import { onMounted, ref, watch ,reactive} from 'vue'
import axios from "axios"
import navItem from './nav_item.vue'
import loader from './loader.vue'

const ui_control = reactive({
  _width :769,
  _info : "",
  _page : 0,
  _nav_bar : false,
  _onscroll_up : 0,
  _onscroll_header : false,
  _loader: true,
})

defineProps({
  msg: String
})

onMounted(()=>{
    getPic();
    //監聽寬度 控制元件
    getWidth();
})

//滾動控制header,漢堡顯示
window.onscroll = function() {myFunction()};
function myFunction() {
  if (document.documentElement.scrollTop > ui_control._onscroll_up) {
    ui_control._onscroll_header=true;
  } else {
    ui_control._onscroll_header=false;
  }
  ui_control._onscroll_up = document.documentElement.scrollTop;
  if(window.innerWidth<ui_control._width){
    ui_control._nav_bar = false;
  }
  
}
//漢堡.nav_bar顯示控制
const hamburger = document.getElementsByClassName('hamburger')
function control_Navbar(){
  if(ui_control._nav_bar === true){
    ui_control._nav_bar = false;
    Array.from(hamburger).forEach(element=>{
      element.classList.toggle('is-active');
    })
  }
}
//漢堡點擊 控制漢堡.nav_bar顯示
function addToggle(event){
    let button = event.target;
    button.classList.toggle('is-active');

    ui_control._nav_bar === true? ui_control._nav_bar=false:ui_control._nav_bar=true;
}

//nav_bar顯示控制
function getWidth(){
  if(window.innerWidth>=ui_control._width){
    ui_control._nav_bar=true;
  }
  window.addEventListener('resize', e => {
     window.innerWidth >=ui_control._width ? ui_control._nav_bar=true:ui_control._nav_bar=false;
     Array.from(hamburger).forEach(element=>{
       if(element.classList.contains('is-active')){
         element.classList.remove('is-active');
       }
     })
  }, false);
}

//串接api
function getPic(){
  axios
      .get('https://randomuser.me/api/?results=200')
      .then(response => {
        ui_control._info = response.data.results;
        console.log(response.data.results);
        ui_control._page = response.data.info.page;
        ui_control._loader = false
      })
      .catch(function (error) { 
        console.log(error);
        ui_control._loader = false
      }); 
}


</script>

<template>

  <nav class="header" v-if="ui_control._onscroll_header === false">
      <div class="container-header">
        <h1>
          HELLO
        </h1>

        <!-- <loader msg="" v-if="ui_control._loader===true"></loader> -->

        <div class="nav-header" v-if="ui_control._nav_bar === true">
          <navItem msg="HOME"></navItem>
          <navItem msg="SEC"></navItem>
          <navItem msg="ABOUT"></navItem>
          <navItem msg="CONTACT"></navItem>
        </div>

        <button class="hamburger" @click="addToggle">
          <span ></span>
          <span ></span>
          <span ></span>
        </button>
      </div>
  </nav>

  <loader msg="" v-if="ui_control._loader===true"></loader>

  <div class="box" @click="control_Navbar">
    <div class="container" v-for="data in ui_control._info" :key="data.id" >
      <a class="btn" :href="data.picture.large" v-if="data.dob.age>0">
        <img class="pic" v-lazy="data.picture.large" alt="">
        <div class="text" v-if="data.dob.age>0">{{data.name.first}}</div>
      </a>
    </div>
  </div>
  

  <!-- <div class="clear">
  </div> -->

  <div @click="getPic" v-if="ui_control._page>0">
    <button v-for="data in ui_control._page" :key="data.id">
      {{data}}
    </button>
  </div>

  <nav class="footer">
      <div class="container-footer">
        <h1>
          Copyright
        </h1>
      </div>
  </nav>
  

</template>

<style scoped>
/* @import "../scss/all.scss"; */

button{
  display:none;
}

navItem{
  cursor: pointer;
}

.container {
  /* display: flex; */
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  flex: 1;
  /* background: lightcoral; */
}


.box{
  min-height: 70vh;
  /* background-image: linear-gradient(165deg,white,
  white,50%,gray 50%); */
}


/* .clear{
  clear: both;
} */




.btn {
  /* border:0.5px solid rgba(128, 128, 128, 0.4); */
  border-radius:3%;
  box-shadow: 2px 2px 2px 1px black;
  margin: 24px;
  color: white;
  background: white;
  /* display: flex;
  justify-content: space-between; */
  /* background: lightcoral; */
}

.pic {
  
  border-radius:25%;
  padding: 24px;
  width: 128px;
  height: 128px;
  /* background: rgb(128, 132, 240); */
}


/* .fixed-header, .fixed-footer{
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
} */

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
.text{
  text-decoration:none;
  color:#333;
  bottom: 0;
  padding: 5px;
  letter-spacing: 2px;
}
.header h1{
  color: brown;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
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
.hamburger:hover{
  z-index: 1;
}
.hamburger span{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 4px;
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  z-index: -1;
  transform-origin: 0 0;
  transition: 0.5s;
}


.hamburger:hover span:nth-child(2){
  transform: none;
  background-color: white;
}

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

.nav-header{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
}

/* .nav-header ul{
    border-radius: 10px;
    width: 50%;
    color: #d9621e;
    margin: 8px;
    padding: 5px;
} */

/* .ul-list:hover {
  background-color: grey;
}
.ul-list{
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
} */



@media (min-width:769px) {
  .hamburger{ 
    display: none;
  }
  .btn:hover {
  /* width: 100px;
  height: 100px; */
  transform: scale(1.2) ;
  /* transition:  1s,ease-in-out; */
  }
}
@media (max-width:768px) {
  .nav-header{
    width: 50%;
    position:absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(110, 108, 108, 0.95);
    top: 100%;
    right: 0;
    animation-name:anim;
    animation-duration: 1s;
    border-radius: 0 0 12px 12px;

  }
  .btn{
    margin: 18px;
  }
  .pic {
    border-radius:25%;
    padding: 18px;
    width: 140px;
    height: 140px;
    /* background: rgb(128, 132, 240); */
  }

  @keyframes anim{
    from{
        opacity:0;
    }
    to{
        opacity:100px;
    }
  }
}
@media (max-width:444px) {
  .btn{
    margin: 12px;
  }
  .pic {
    padding: 12px;
    width: 120px;
    height: 120px;
    /* background: rgb(128, 132, 240); */
  }
}
@media (max-width:355px) {
  .btn{
    margin: 12px;
  }
  .pic {
    padding: 12px;
    width: 100px;
    height: 100px;
    /* background: rgb(128, 132, 240); */
  }
  .text{
    table-layout: fixed;
    letter-spacing: 1px;
    word-wrap: break-word; word-break: normal;
  }
}

@media (max-width:315px) {
  .btn{
    margin: 12px;
  }
  .pic {
    padding: 12px;
    width: 4em;
    height: 4em;
    /* background: rgb(128, 132, 240); */
  }
  .text{
    max-width: 80px;
    font-size: 10px;
    font-weight: bolder;
    /* word-wrap: break-word;
    word-break: normal; */
    white-space:nowrap;
    overflow: hidden;
  }
}
</style>