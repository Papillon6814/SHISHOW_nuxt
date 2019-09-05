<template>
  <div id="r">

    <div id="modal" class="modal">
      <div class="cropperPosition">
        <vue-cropper
            ref='cropper'
            :guides="true"
            :view-mode="2"
            drag-mode="crop"
            :aspectRatio="4 / 1"
            :auto-crop-area="0.5"
            :min-container-width="250"
            :min-container-height="180"
            :background="true"
            :rotatable="true"
            :src="uploadedImage"
            alt="Source Image"
            :img-style="{ 'width': '672px', 'height': '450px' }">
        </vue-cropper>
      </div>

      <div class="cropBtn" @click="cropImage()">
        Crop
      </div>
    </div>

    <div id="directMessageField">
      <leftArea
      :friendsDocID="leftAreaData"
      @showPopup="popup">
      </leftArea>
      <div class="nameTagArea">
        <div class="nameTag">
          {{ usernameFromLeftArea }}
        </div>
        <div class="nameBorder">
        </div>
      </div>
      <rightArea
      ref="rightArea"
      :friendDocID="idFromLeftArea"
      :isGame="isGame">
      </rightArea>
      <div class="inputArea">
        <inputArea
        @scrollRightArea="callScroll()"
        :friendDocID="idFromLeftArea"
        :isGame="isGame">
        </inputArea>
      </div>
    </div>

    <div class="entireBox">
      <div class="GameRequestBannerPosition">
        <GameRequestBanner
        @callFade="fadeOut()"
        ref="RGBanner">
      </GameRequestBanner>
      </div>
    </div>

  <div class="userModal">
    <div class="popupNormalBannerPosition">
      <popupNormalBanner
      :userInfo="clickedUser"
      @callFade="fade()">
      </popupNormalBanner>
    </div>
  </div>

  </div>

</template>

<script>
// ほとんどのDMコンポーネントの親
// IDをfirebaseから取得してそれぞれのコンポーネントへ送信する
import leftArea from './leftArea.vue'
import rightArea from './rightArea.vue'
import inputArea from './InputArea.vue'
import GameRequestBanner from '../GameRequestBanner.vue'
import popupNormalBanner from "../PopupNormalBanner.vue";

import firebase from "../../plugins/firestore";
import 'firebase/firestore'
import '@firebase/auth'

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

let db = firebase.firestore();

let currentUser;
let friendsDocID = [];

let entireBox, modal, userModal;

export default {

  name: 'directMessageField',

  data() {
    return{
      rightAreaData: '',
      leftAreaData: [],
      inputAreaData: '',
      idFromLeftArea: '',
      usernameFromLeftArea: '',
      croppedimg:"",
      uploadedImage:'',
      isGame: false,
      clickedUser: ''
    }
  },

  components: {
    leftArea,
    rightArea,
    inputArea,
    GameRequestBanner,
    VueCropper,
    popupNormalBanner
  },

  watch: {
    idFromLeftArea: function(newval) {
      if(newval){

        if(this.isGame) {

          db.collection("GameCollection")
            .doc(newval)
            .get()
            .then(doc1 => {
              this.usernameFromLeftArea = doc1.data().gamename;
            })

        } else {

          db.collection("USER")
            .doc(currentUser.email)
            .collection("friends")
            .doc(newval)
            .get()
            .then(doc1 => {

              db.collection("USER")
                .doc(doc1.data().email)
                .get()
                .then(doc2 => {
                  this.usernameFromLeftArea = doc2.data().username;
                })
            })

        }
      }
    },

    uploadedImage: function(newval) {
      modal.style.display = 'block';
      this.$refs.cropper.replace(newval);
      console.log('watch image')
    }
  },

  methods: {
    showImage: function() {
      userModal[0].style.display = "block";
    },

    fade: function() {
      userModal[0].style.display = "none"
    },

    cropImage: function() {
      console.log('cropImage');
      this.$refs.RGBanner.croppedimg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      modal.style.display = 'none';
    },

    callScroll: function() {
      this.$refs.rightArea.chatScroll();
    },

    loadFriendID: function() {
      friendsDocID = [];

      db.collection("USER")
        .doc(""+currentUser.email)
        .collection("friends")
        .orderBy("lastChatDate", "desc")
        .get()
        .then(friendsSnapshot => {
          friendsSnapshot.forEach(doc1 => {
            friendsDocID.push(doc1.id)
          })
      })
    },

    popup: function() {
      entireBox[0].style.display = "block";

      this.$forceUpdate();
    },

    fadeOut: function() {
      entireBox[0].style.display = "none";
    }
  },

  created: function() {
    currentUser = firebase.auth().currentUser;
    if(currentUser == null){
      currentUser = this.$store.getters["user/user"]
    }
    this.loadFriendID();
    this.leftAreaData = friendsDocID;

    db.collection("USER")
      .doc(""+currentUser.email)
      .collection('friends')
      .limit(1)
      .get()
      .then(friendsSnapshot => {
        this.idFromLeftArea = friendsSnapshot.id;
      })
  },

  mounted: function() {
    entireBox = document.getElementsByClassName("entireBox");
    modal = document.getElementById("modal");

    userModal = document.getElementsByClassName("userModal");
  }
}

</script>

<style lang='scss' scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 20000;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);

  .cropperPosition {
    position: absolute;

    height: auto;
    width: auto;

    top: 150px;
    left: 50vw;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  .cropBtn {
    position: absolute;

    width: 120px;
    height: 40px;

    bottom: 10vh;
    left: 50vw;

    color: $primary_text;

    border-radius: 15px;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    background-color: $accent_color;

    line-height: 40px;

    text-align: center;

    cursor: pointer;
  }
}

#directMessageField {
  position: absolute;

  width: 100%;

  @media screen and (min-width: 1300px) {
    height: calc(100% - 100px);
  }

  @media screen and (max-width: 1300px) {
    height: calc(100% - 80px);
  }

  top: 100px;

  overflow-y: hidden;
  overflow-x: hidden;

  // rightAreaの上の方に表示
  .nameTagArea {
    position: fixed;

    top: 100px;
    right: 17px;

    width: calc(60% - 17px);
    height: 160px;

    background: linear-gradient(to top,
                rgba(255,255,255,0.1), #fff, #fff);

    z-index: 3;

    @media screen and (max-width: 1300px) {
      display: none;
    }

    .nameTag {
      position: absolute;

      top: 30px;
      left: 10%;

      width: 50%;
      height: 35px;

      background-color: rgba(0, 0, 0, 0);

      font-size: 20px;
      text-align: left;
    }

    .nameBorder {
      position: absolute;

      top: 75px;
      left: 10%;

      width: 85%;
      height: 0;

      border-bottom: solid;
      border-color: #eee;
    }
  }

  // 下部に表示する
  .inputArea {

    width: 60%;
    height: 50px;

    @media screen and (min-width: 1300px) {
      position: fixed;

      right: 0;
      bottom: 45px;
    }

    @media screen and (max-width: 1300px) {
      position: absolute;

      left: 100vw;
      bottom: 45px;
    }

    z-index: 3;
  }
}

.entireBox {
  position: fixed;

  display: none;

  width: 100%;
  height: 120%;

  top: 0;
  left: 0;

  z-index: 10000;

  background-color: rgba(0, 0, 0, 0.6);

  transition: 0.3s;

  .GameRequestBannerPosition {
    position: absolute;

    width: 672px;

    top: 150px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}


.userModal {
  display: none;

  position: fixed;
  z-index: 20000;

  left: 0;
  top: 0;

  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  .popupNormalBannerPosition {
    display: block;

    position: absolute;

    top: 150px;
    left: 50vw;

    width: 65%;
    height: 100%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

</style>
