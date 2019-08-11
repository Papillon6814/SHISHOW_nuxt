<template>
  <div id="prehome">
    <div class="logo">
      SHISHOW
    </div>


      <div class="enterButton" @click="checkUser()">
      アカウントを作成
      </div>

    <nuxt-link to="/signin">
      <div class="loginButton">
        ログイン
      </div>
    </nuxt-link>

    <div class="footer"></div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";
import { Promise } from 'q';


export default {
  
  name: 'prehome',
  data:function(){
    return{
      users:{},
    }
  },
  methods:{
    checkUser(){
      if(firebase.auth().currentUser){
        $nuxt.$router.push("/home")
      }else{
        $nuxt.$router.push("/signin")
      }
    },
  },
  created:function(){
    console.log(this.$store.state.user.status)
  }
}
</script>

<style lang="scss" scoped>
#prehome {

  .logo {
    position: absolute;

    top: 35%;
    left: 50%;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    color: $primary_text;
    font-size: 10vh;
  }

  .enterButton {
    position: absolute;

    left: 50%;
    top: 50%;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    width: 60vh;
    height: 65px;

    background-color: $primary_color;

    text-align: center;
    color: $primary_text;
    font-size: 40px;

    line-height: 65px;

    cursor: pointer;
  }

  .loginButton {
    position: absolute;

    left: 50%;
    top: 62%;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    width: 60vh;
    height: 65px;

    background-color: #fff;

    text-align: center;
    color: $primary_text;
    font-size: 40px;

    line-height: 65px;

    border-style: solid;
    border-width: 1px;
    border-color: $divider_color;

    cursor: pointer;
  }

  .footer {
    position: absolute;

    width: 100%;
    height: 60px;

    background-color: $dark_primary_color;

    bottom: 0;
    left: 0;
  }
}
</style>
