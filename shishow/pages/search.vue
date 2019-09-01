<template>
  <div id="searchRoot">
    <div id="wrap">

      <navi @search="filterUser"></navi>
      <div class="searchBannerPosition">
        <div v-for="(userinfo, N) in searchResults"
             :key="N" v-bind:class="'n'+N">

          <normalBanner
            :user="searchResults[N]"
            :relations="relation[N]"
            :signuser="signuser"
            @clickNB="NBclick(userinfo)"
            @clickReqButton="RBclick(userinfo, N)"
            ref="normal">
          </normalBanner>
        </div>

      </div>
    </div>

    <div class="NBModal">
      <div class="modalPosition">
        <popupNormalBanner
          :userInfo="popupUser"
          @callFade="fadeOut()">
        </popupNormalBanner>
      </div>
    </div>

    <div class="selectModal">
      <div class="closeBtn" @click="fadeOut()">
        <i class="fas fa-times"></i>
      </div>
      <div class="selectedBannerPosition">
        <div v-for="N in hisGames.length" :key="N"
        v-bind:class="'GameLoops'">
        <div @click="select(hisGames[N-1])">
          <gameBanner
            :game="hisGames[N-1]"
            :signuser="signuser">
          </gameBanner>
        </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

import navi from "../components/NavigationBar.vue";
import normalBanner from "../components/NormalBanner";
import popupNormalBanner from "../components/PopupNormalBanner.vue";

const db = firebase.firestore();
let currentUser;
let NBPosition;
let NBModal;
let selectModal;

export default {
  name: "search",

  head:{
    title:"search",
  },

  components: {
    navi,
    normalBanner,
    popupNormalBanner
  },

  data: function() {
    return {
      users: [],
      filteredUser: [],
      searchResults: [],
      relation:[],
      signuser:"",
      games: [],
      hisGames: [],
      popupUser: '',
      userId: ''
    };
  },

  computed: {
    getSearchWordFromStore() {
      return this.$store.getters["user/getSearchWord"];
    }
  },

  methods: {
    filterUser(word) {

      let users_i;
      let index = 0;
      let relat;
      if (word) {
        this.searchResults = [];
        db.collection("USER").doc(""+this.$store.getters["user/user"].email).collection("relation").get().then(docs=>{
        for (users_i in this.users) {
          //ユーザーネームの走査
          if (this.users[users_i].data().username.indexOf(word) !== -1) {
            this.$set(this.searchResults, index, {
              username: this.users[users_i].data().username,
              bio: this.users[users_i].data().bio,
              email: this.users[users_i].data().email,
              image: this.users[users_i].data().image
            });


            if(docs){

              let i;
              for(i=0;i<docs.docs.length && this.users[users_i].data().email != docs.docs[i].id;i++);
              if(i==docs.docs.length){
                relat = 0;
              }else{
                relat = docs.docs[i].data().relation;
              }
            }else{
              relat = 0;
            }
            this.$set(this.relation, index, relat);

            index++;
          }
          this.$forceUpdate();
        }
        })
      }
    },

    NBclick: function(userinfo) {
      console.log("NBclick");
      this.showNBModal();

      this.popupUser = userinfo;
    },

    RBclick: function(userinfo,N) {
      console.log("RBclick");
      this.hisGames = [];
      this.showSelectModal();

      db.collection("USER")
        .doc(userinfo.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            this.hisGames.push(doc1);
          })
        })
        this.userId = N;
    },

    select: function(game) {
      console.log(game.data().gamename);
      this.$refs.normal[this.userId].sendFriendReq(game.id);
      this.fadeOut()
    },

    showNBModal: function() {
      NBModal[0].style.display = "block";
      this.$forceUpdate();
    },

    showSelectModal: function() {
      selectModal[0].style.display = "block";
      this.$forceUpdate();
    },

    fadeOut: function() {
      NBModal[0].style.display = "none";
      selectModal[0].style.display = "none";
      editModal[0].style.display = "none";
      this.$forceUpdate();
    }
  },

  created() {
    db.collection("USER")
      .get()
      .then(doc => {
        this.users = doc.docs;
        doc.forEach(docs => {
          this.filteredUser.push(docs.data());
        });
        this.filterUser(/*word = */ this.getSearchWordFromStore);
      });

    currentUser = firebase.auth().currentUser;
    this.signuser = {"username":this.$store.getters["user/user"].username,
                     "email":this.$store.getters["user/user"].email}

  },

  mounted: function() {

    NBModal = document.getElementsByClassName("NBModal");
    selectModal = document.getElementsByClassName("selectModal");
  }
};
</script>

<style lang='scss' scoped>

html {
  overflow-x: hidden;
  overflow-y: scroll;
}

.searchBannerPosition {
  position: absolute;

  top: 100px;
  left: 0;

  width: 100%;
  height: 100%;

  padding-top: 165px;
  margin-left: 10%;

  $i: 0;

  list-style: none;
  @while $i <= 30 {
    $temporary_top: (200px * $i) !global;

    .n#{$i} {
      position: absolute;

      top: $temporary_top;
      left: 0;

      width: 100%;
      height: $n_banner_height;

      transition: 0.3s;
    }

    $i: $i + 1;
  }
}

.NBModal {
  display: none;

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .modalPosition {
    position: absolute;

    top: 300px;
    left: 50%;

    width: 65%;
    height: 100%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

.selectModal {
  display: none;

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .closeBtn {
    position: fixed;

    top: 200px;
    right: 20vw;

    width: 30px;
    height: 30px;

    font-size: 30px;

    color: $secondary_text;
    cursor: pointer;
  }

  .selectedBannerPosition {
    position: absolute;

    top: 300px;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    width: $n_banner_width;
    height: auto;

    z-index: 10002;

    .GameLoops {
      position: relative;

      width: 100%;
      height: $n_banner_height;

      margin-top: 1vw;
    }
  }
}
</style>
