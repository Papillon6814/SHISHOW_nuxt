<template>

  <div id="leftArea">

    <div class="switchTab">
      <div class="private" @click="switchPrivate()">
        メッセージ
      </div>
      <div class="global" @click="switchGlobal()">
        グローバル
      </div>
    </div>

    <div class="privateDM">
      <div class="dmbannerPosition">
        <div v-for="(friend, N) in friendsDocID"
          :key="N">
          <div @click="click_f(friend, N)">
            <dmBanner
              :dmBannerUsername="usernames[N]"
              :dmMsg="lastMsg[N]"
              :iconPic="dmImages[N]">
            </dmBanner>
          </div>
        </div>
        <div class="space"></div>
      </div>

    </div>

    <div class="globalDM">
      <div class="dmBannerPosition">
        <div v-for="(game, N) in games"
          :key="N">
          <div @click="click_g(game, N)">
            <dmGameBanner
              :gameDocId="game">
            </dmGameBanner>
          </div>
        </div>
        <div class="space"></div>
      </div>

      <div class="addGamePosition" @click="showPopup()">
        New Game
      </div>
    </div>
  </div>
</template>

<script>
// directMessageFieldからフレンドのIDを受け取ってleftareaの内容を表示する
import dmBanner from'./dmBanner.vue';
import dmGameBanner from "./dmGameBanner.vue";

import firebase from '../../plugins/firestore';
import 'firebase/firestore'
import '@firebase/auth'

import draggable from 'vuedraggable';

let db = firebase.firestore();

let currentUserEmail;
let lastMsgDate = [];

let privateDM, globalDM;
let privateTab, globalTab;
let leftArea;

export default {

  name: 'LeftArea',

  data() {
    return {
      friends: '',
      lastMsg: [],
      usernames: [],
      dmImages: [],
      isPrivate: true,
      target:[],
      id: 0,
      games: []
    }
  },

  props: [
    'friendsDocID'
  ],

  components: {
    dmBanner,
    dmGameBanner
  },

  watch: {
    friendsDocID: function() {
        if(this.id != 0){
          let username = this.usernames[this.id];
          let icon = this.dmImages[this.id];
          this.usernames.splice(this.id,1);
          this.dmImages.splice(this.id,1);
          this.target.splice(this.id,1);
          this.usernames.unshift(username);
          this.dmImages.unshift(icon);
          this.target.unshift(true);
        }
    }
  },

  methods: {
    // 最後にメッセージが送信された日時とその内容を取得する
    // TODO: returnできるようにする
    loadLastMsgAndDate: function() {
      db.collection("USER")
        .doc(""+currentUserEmail)
        .collection('friends')
        .orderBy('lastChatDate', 'desc')
        .get()
        .then(friendsSnapshot => {

          friendsSnapshot.forEach(doc1 => {

            db.collection("USER")
              .doc(doc1.data().email)
              .get()
              .then(doc2 => {
                this.usernames.push(doc2.data().username);
                this.dmImages.push(doc2.data().image)
              });

            db.collection("PrivateChat")
              .doc(currentUserEmail + doc1.id)
              .collection('contents')
              .orderBy('date')
              .limit(1)
              .get()
              .then(contentSnapshot => {
                contentSnapshot.forEach(doc2 => {
                  this.lastMsg.push(doc2.data().msg);
                  lastMsgDate.push(doc2.data().date);
                })
              })
            })
      })
    },

    click_f: function(friend, N) {
      if(process.browser) {
        if(window.innerWidth < 1300) {
          this.$parent.slideRightArea();
        }
        else {
          let dmBan = document.getElementsByClassName("dmCover")[this.id]
          dmBan.style.background = "rgba(255, 255, 255, 0)"
          this.id = N;
          dmBan = document.getElementsByClassName("dmCover")[N]
          dmBan.style.background = "rgba(0, 0, 0, 0.36)"
        }
        this.$parent.idFromLeftArea = friend;

        this.$parent.isGame = false;
      }
    },

    click_g: function(game, N) {
      if(process.browser) {
        if(window.innerWidth < 1300) {
          this.$parent.slideRightArea();
        }
        else {
          let dmgameBan = document.getElementsByClassName("gameCover")[this.id]
          dmgameBan.style.background = "rgba(255, 255, 255, 0)"
          this.id = N;
          dmgameBan = document.getElementsByClassName("gameCover")[N]
          dmgameBan.style.background = "rgba(0, 0, 0, 0.36)"
        }
        this.$parent.idFromLeftArea = game;

        this.$parent.isGame = true;
      }
    },

    switchPrivate: function() {
      privateDM[0].style.display = "block";
      globalDM[0].style.display = "none";

      privateTab[0].style.background = "#b2ebf2";
      globalTab[0].style.background = "#fff";

      if(this.games.length != 0){
        let dmBan = document.getElementsByClassName("gameCover")[this.id];
        dmBan.style.background = "rgba(255, 0, 0, 0)";
      }
      this.id = 0;
    },

    switchGlobal: function() {
      privateDM[0].style.display = "none";
      globalDM[0].style.display = "block";

      privateTab[0].style.background = "#fff";
      globalTab[0].style.background = "#b2ebf2"

      if(this.friendsDocID.length != 0) {
        let gameBan = document.getElementsByClassName("dmCover")[this.id];
        gameBan.style.background = "rgba(255, 0, 0, 0)";
      }
      this.id = 0;
    },

    showPopup: function() {
      this.$emit("showPopup");
    }
  },

  created: function() {
    console.log("leftarea created");
    let currentUser = firebase.auth().currentUser;
    if(currentUser == null){
      currentUser = this.$store.getters["user/user"]
    }

    currentUserEmail = currentUser.email
    this.loadLastMsgAndDate();
    for(let i=0;i<this.friendsDocID.length;i++){this.target.push(false)}

    db.collection("USER")
        .doc(""+currentUserEmail)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {

          querySnapshot.forEach(doc1 => {
            this.games.push(doc1.id);
          })
          leftArea.style.display = 'block';
        })
  },

  mounted: function() {
    privateDM = document.getElementsByClassName("privateDM");
    globalDM = document.getElementsByClassName("globalDM");
    privateTab = document.getElementsByClassName("private");
    globalTab = document.getElementsByClassName("global");

    leftArea = document.getElementById('leftArea');
  }
}

</script>

<style lang='scss' scoped>
  #leftArea {

    position: absolute;
    top: 0;
    left: 0;

    @media screen and (min-width: 1300px) {
      height: 100%;
      width: 40%;
    }

    @media screen and (max-width: 1300px) {
      height: 100%;
      width: 100%;
    }

    background-color: #b2ebf2;

    display: none;

    .switchTab {
      .private {
        position: absolute;

        background: #b2ebf2;

        // TODO: note in a SCSS file
        width: 50%;
        height: 90px;

        @media screen and (min-width: 1300px) {
          font-size: 2.5vw;
        }

        @media screen and (max-width: 1300px) {
          font-size: 6vw;
        }

        line-height: 90px;

        text-align: center;

        cursor: pointer;
      }

      .global {
        position: absolute;

        // TODO: color
        background: #fff;

        width: 50%;
        height: 90px;

        right: 0;

        @media screen and (min-width: 1300px) {
          font-size: 2.5vw;
        }

        @media screen and (max-width: 1300px) {
          font-size: 6vw;
        }

        line-height: 90px;

        text-align: center;

        cursor: pointer;
      }
    }

    .privateDM {
      overflow-y: scroll;
      overflow-x: hidden;

      position: absolute;

      top: 90px;
      left: 0;

      width: 100%;
      height: calc(100% - 90px);

      .dmbannerPosition{
        position: absolute;

        top: 70px;
        left: 6%;

        width: 100%;

        float:left;
      }

    }

    .globalDM {
      display: none;

      overflow-y: scroll;
      overflow-x: hidden;

      position: absolute;

      top: 90px;
      left: 0;

      width: 100%;
      height: calc(100% - 210px);

      .dmBannerPosition {
        position: absolute;

        width: 88%;
        height: auto;

        left: 6%;
        top: 70px;

        .enumGameBanner {
          position: relative;

          top: 20px;
        }
      }

      .addGamePosition {
        position: fixed;

        color: $primary_text;

        @media screen and (min-width: 1300px) {
          bottom: 0px;
          width: 40%;
        }

        @media screen and (max-width: 1300px) {
          bottom: 8.5vh;
          width: 100%;
        }

        left: 0;

        height: 60px;

        background-color: $accent_color;

        text-align: center;

        line-height: 60px;
        font-size: 50px;
        cursor: pointer;
      }
    }
  }

.space {
  position: relative;

  height: 10vh;
  width: 100%;
}

</style>
