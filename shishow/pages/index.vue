<template>
  <div id="prehome">
    <div class="topBar">
      <nuxt-link to="/signin">
        <div class="signin">
          ログイン
        </div>
      </nuxt-link>
    </div>

    <div class="topBar upperBar">
      <nuxt-link to="/signin">
      <div class="signin">
        ログイン
      </div>
      </nuxt-link>
    </div>

    <div class="page1">
      <img src="~/assets/image/part1.png" class="part1" />

      <div class="phrase1">
        PHRASE1
      </div>
      <div class="phrase2">
        PHRASE2
      </div>

      <div class="clause1">
        This is a clause.
      </div>

      <img src="~/assets/image/leaf.png" class="leaf" />

      <nuxt-link to="/home">
        <div class="enterButton" @click.prevent="checkUser()">
          はじめる
        </div>
      </nuxt-link>
    </div>

    <div class="page2">
      <img src="~/assets/image/part2.png" class="part2" />

      <div class="card1 card">
        <div class="step">STEP1</div>
        <img src="~/assets/image/step1only.png" class="cardPic" />
      </div>

      <div class="card2 card">
        <div class="step">STEP2</div>
        <img src="~/assets/image/step2only.png" class="cardPic" />
      </div>

      <div class="card3 card">
        <div class="step">STEP3</div>
        <img src="~/assets/image/step3only.png" class="cardPic3" />
      </div>
    </div>

    <div class="page3">
      <div class="aboutus">
        About us
      </div>
      <img src="~/assets/image/part3.png" class="part3"/>
    </div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

let topBar;

export default {

  head:{
    title:"top",
  },

  name: 'prehome',

  data:function(){
    return{
      aaa:"",
      scrollY: 0
    }
  },

  watch: {
    scrollY: function(newval) {
      console.log(newval);

      if(newval > 180) {
        //topBarを上から表示
        topBar[1].style.top = '0px';
        topBar[0].style.display = "none";
      }
      else {
        topBar[1].style.top = '-120px';
        topBar[0].style.display = 'block';
      }
    }
  },

  methods:{
    checkUser(){
      if(firebase.auth().currentUser){
        $nuxt.$router.push("/home")
      }else{
        $nuxt.$router.push("/signin")
      }
      console.log(firebase.auth().currentUser)
    },

    handleScroll: function() {
      console.log('handle')
      this.scrollY = window.scrollY;
    }
  },

  created:function(){
    this.$store.commit("user/onUserLogout")
    //console.log(this.aaa.email == null)
  },

  mounted: function() {
    window.addEventListener('scroll', this.handleScroll);
    topBar = document.getElementsByClassName('topBar');
  },

  asyncData({req,store}){
    return{
      aaa:store.state.user.user
    }
  },
}
</script>

<style lang="scss" scoped>

#prehome {
  background-color: #fafafa;

  .topBar {
    position: absolute;

    top: 0;
    left: 0;

    width: 100vw;
    height: 60px;

    background: #fff;

    box-shadow: 0 2px 18px rgba(0, 0, 0, 0.8);

    z-index: 1;

    transition: .3s;

    .signin {
      position: absolute;

      right: 4vw;
      top: 50%;

      text-align: center;
      font-size: 14px;

      color: $primary_text;

      transform: translate(0, -50%);
      -webkit-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);

      cursor: pointer;
    }
  }

  .upperBar {
    position: fixed !important;

    top: -120px;
    transition: .3s;

    background: rgba(255, 255, 255, 0.7);
  }

  .page1 {
    .part1 {
      position: absolute;

      top: 0;
      left: 0;

      width: 100%;
      height: auto;
    }

    .phrase1 {
      position: absolute;

      top: calc(6vh + 60px);
      left: 11vw;

      width: 56vw;
      height: 8vh;

      color: #fff;
      font-size: 40px;
    }

    .phrase2 {
      position: absolute;

      top: calc(14vh + 60px);
      left: 11vw;

      width: 56vw;
      height: 9vh;

      color: #fff;
      font-size: 45px;
    }

    .clause1 {
      position: absolute;

      top: calc(23vh + 60px);
      left: 11vw;

      width: 56vw;
      height: 15vh;

      color: #757575;
      font-size: 20px;
    }

    .leaf {
      position: absolute;

      right: 23vw;
      top: calc(24vh + 6px);

      width: 230px;
      height: 230px;
    }

    .enterButton {
      position: absolute;

      left: 11vw;
      top: 360px;

      width: 150px;
      height: 42px;

      text-align: center;
      color: $primary_text;
      font-size: 18px;

      color: #fff;

      border-color: #fff;
      border-style: solid;
      border-radius: 15px;

      line-height: 37px;

      cursor: pointer;
    }
  }

  .page2 {
    .part2 {
      position: absolute;

      top: 140vh;
      left: 0;

      width: 100%;
    }

    .card {
      width: 22vw;
      height: 29vw;

      background-color: #fff;

      border-radius: 15px;

      -webkit-filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
    }

    .step {
      position: absolute;

      top: 15px;
      left: 20px;

      font-size: 20px;
    }

    .cardPic {
      position: absolute;

      bottom: 35%;
      right: 49%;

      transform: translate(50%, 0);
      -webkit-transform: translate(50%, 0);
      -ms-transform: translate(50%, 0);

      width: 50%;
    }

    .card1 {
      position: absolute;

      left: 10vw;
      top: 155vh;
    }

    .card2 {
      position: absolute;

      left: 40vw;
      top: 172vh;
    }

    .card3 {
      position: absolute;

      left: 70vw;
      top: 189vh;

      .cardPic3 {
      position: absolute;

      bottom: 29%;
      right: 42%;

      transform: translate(50%, 0);
      -webkit-transform: translate(50%, 0);
      -ms-transform: translate(50%, 0);

      width: 70%;
      }
    }
  }

  .page3 {
    .aboutus {
      position: absolute;

      top: 275vh;
      left: 3vw;

      font-size: 35px;
    }
    .part3 {
      position: absolute;

      top: 350vh;
      left: 0;

      width: 100%;
    }
  }
}
</style>
