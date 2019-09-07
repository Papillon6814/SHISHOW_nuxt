<template>
  <div id = "notificationBanner">
    <div class="userinfo">
      <!-- <i class = "fas fa-user human"></i> -->
      <img class = "iconPic" :src="notiUser.image">
      <span class="name">{{notiUser.username}}</span>
    </div>

    <div class = "messageInfo">
      <div class="message" align="left"> {{notice.msg}} </div>
      <div class="date"> {{notice.date.toDate().toLocaleString()}}</div>
    </div>
  </div>
</template>

<script>
import firebase from '../plugins/firestore'
import 'firebase/firestore'

const db = firebase.firestore()

export default {

  name: 'notBanner',
  props:["user","notice"],
  data:function(){
    return{
      notiUser:{}
    }
  },

  created:function(){
    db.collection("USER").doc(this.user).get().then(doc=>{
      this.notiUser = doc.data()
    })
  }
}

</script>

<style lang='scss' scoped>
  #notificationBanner {
    position: absolute;

    width: $not_banner_width;
    height: $not_banner_height;

    background-color: #ddd;

    border-bottom: solid;
    border-width: 1.2px;
    border-color: #ddd;

  .useringo{
    width: 100%;
  }

  /*.human{
      position: absolute;

      top: 15px;
      left: 15px;

      font-size: 35px;
  }*/

  .iconPic {
    position: absolute;

    top: 20px;
    left: 10px;

    width: 90px;
    height: 90px;

    background-color: #ddd;

    @media screen and (max-width: 1300px) {
      display: none;
    }
  }

  .name{
    position: absolute;

    top: 23px;

    @media screen and (min-width: 1300px) {
      left: 120px;
    }

    @media screen and (max-width: 1300px) {
      left: 5%;
    }

    font-size: 28px
  }

  .messageInfo{
    position: absolute;

    @media screen and (min-width: 1300px) {
      width: 80%;
    }

    @media screen and (max-width: 1300px) {
      width: 90%;
    }

    height:40%;

    right: 5px;
    bottom:10px;
    background-color: #ddd;
  }

  .message{
    width: 100%;
  }

  .date{
    @media screen and (min-width: 1300px) {
      position: relative;
      right: 15px;
      float: right;
    }

    @media screen and (max-width: 1300px) {
      position: absolute;
      right: 15px;

      bottom: 3%;
    }

  }
}


</style>
