<template>
  <div id="prehome">
    <img src="~/assets/image/part1.png" class="part1" />

    <nuxt-link to="/home">
      <div class="enterButton" @click.prevent="checkUser()">
      はじめる
      </div>
    </nuxt-link>

    <nuxt-link to="/signin">
      <div class="loginButton">
        ログイン
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";


export default {

  head:{
    title:"top",
  },
  name: 'prehome',
  data:function(){
    return{
      aaa:"",

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
  },
  created:function(){
    this.$store.commit("user/onUserLogout")
    console.log(this.aaa.email == null)
  },

  asyncData({req,store}){
    return{
      aaa:store.state.user.user
    }
  }
}
</script>

<style lang="scss" scoped>
#prehome {

  .part1 {
    position: absolute;

    width: 100%;
    height: auto;
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
}
</style>
