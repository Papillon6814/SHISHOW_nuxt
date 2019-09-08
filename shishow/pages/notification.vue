<template>
  <div id="root">
    <navi></navi>
    <div id="notificationTitle" align="left">
      <div class="notificationText">通知</div>
    </div>
    <div id="notificationField">
      <span v-if="!notice.length" class="no_notification">通知はありません</span>
      <div v-if="notice.length">
      <div v-for="N in notice.length"
      :key="N"
      v-bind:class="'not'+N">
        <notificationBanner
        :user="notice[N-1].id"
        :notice="notice[N-1].data()">
        </notificationBanner>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue'
import notificationBanner from '../components/NotificationBanner.vue'
import firebase from '../plugins/firestore'
import 'firebase/firestore'

const db = firebase.firestore();

export default {
  name: 'home',

  head:{
    title:"notification",
  },

  components: {
    navi,
    notificationBanner
  },
  data:function(){
    return{
      notice:[],
      users:[],
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    userStatus() {
      // ログインするとtrue
      return this.$store.getters["user/isSignedIn"];
    }
  },
  created:function(){
    db.collection("USER").doc(""+this.user.email).collection("notice").orderBy("date").get().then(querydocs=>{
      querydocs.forEach(docu=>{
        this.notice.push(docu);

        db.collection("USER").doc(""+this.user.email).collection("notice").doc(docu.id).delete();
      })
    })

  },
  fetch({store,redirect}){
    if(store.state.init && store.state.user.user.email == null){
      redirect("/")
    }
  }
}
</script>

<style lang='scss' scoped>

  body {
    padding: 0;
    margin: 0;
    width: 100%;

    background-color: $dark_color;
  }

  #notificationTitle{
    position: absolute;

    @media screen and (min-width: 1300px) {
      top: $header_height;
    }

    @media screen and (max-width: 1300px) {
      top: 9.5vh;
    }

    left: 15%;
    width: 70%;
    height: $header_height;

    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);

    background-color: #00b7ce;

    .notificationText {
      font-size: 70px;
      color: white;

      padding-top: 15px;
      padding-left: 20px;
    }
  }

  #notificationField {
    position: absolute;

    @media screen and (min-width: 1300px) {
      top: $header_height*2;
    }

    @media screen and (max-width: 1300px) {
      top: calc(9.5vh + 100px);
    }
    left: 15%;

    width: 70%;
    height: calc(100% - 200px);

    background-color: #fff;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);

    overflow-y: scroll;
    overflow-x: hidden;

    .not1{
      position: relative;
      padding-top: 30px;
      left: 5%;
    }
    $i: 2;
    @while $i<=20 {
      .not#{$i}{
        position: relative;
        left: 5%;
        padding-top: $not_banner_height + 20px;
      }
      $i: $i + 1;
    }
  }
  #notificationField::webkit-scrollbar {
    display: none;
  }

  .no_notification {
    position: absolute;

    top:250px;

    height: auto;
    width: 100%;

    font-size: 7vw;

    text-align: center;

    color:rgba(122,122,122,122)
  }

</style>
