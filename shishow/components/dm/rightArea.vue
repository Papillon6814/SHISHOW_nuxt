<template>
  <div class="rightArea">
    <div class="nameSpace"></div>
    <div class="chatnavi">
      <font-awesome-icon icon="angle-left"
      class="backarrow" @click="back" />
      <div class="username">{{username}}</div>
    </div>
    <!-- {{ friendDocID }} -->
      <div class="chatSpace">
        <div class="chatheadspace"></div>
        <div v-for="N in msgList.length" v-bind:key="N">

          <div v-show="isMine(msgList[N-1])" class="myChatBalloonPosition">
            <div class="myChatBalloon">
              {{ msgList[N-1].msg }}
            </div>
            <div class="myDatePosition">
              {{ msgList[N-1].date.toDate().toLocaleString() }}
            </div>
          </div>

          <div v-show="isHis(msgList[N-1])" class="hisChatBalloonPosition">
            <img :src="iconList[N-1]" class="hisIcon" @click="clickUser(userInfoList[N-1])"/>
            <div class="hisChatBalloon">
              {{ msgList[N-1].msg }}
            </div>
            <div class="hisDatePosition">
              {{ msgList[N-1].date.toDate().toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    <div class="scrollSpace"></div>
    <div class="chatbar"></div>
  </div>
</template>

<script>
import firebase from "../../plugins/firestore";
import 'firebase/firestore'
import '@firebase/auth'

const db = firebase.firestore();
let currentUserEmail;
let chatID;

let chatSpace;
let rightArea, chatnavi, chatbar;

export default {

  name: 'rightArea',

  data() {
    return {
      msgList: [],
      userInfoList: [],
      iconList: [],
      username: ''
    }
  },

  props: [
    'friendDocID',
    'isGame'
  ],

  methods: {
    clickUser: function(usr) {
      this.$parent.clickedUser = usr;
      this.$parent.showImage();
    },

    isMine: function(msg) {
      return (msg.sender == currentUserEmail);
    },

    isHis: function(msg) {
      return (msg.sender != currentUserEmail);
    },

    chatScroll: function() {
      console.log('scroll')
      let scrollArea = document.getElementsByClassName('rightArea');
      scrollArea[0].scrollTo(0, 300000000);
    },

    spawnItself: function() {
      console.log('spawnitself')
      rightArea[0].style.left = "0";
      chatnavi[0].style.left = "0";
      chatbar[0].style.left = "0";
      this.$forceUpdate();
    },

    back: function() {
      rightArea[0].style.left = "100vw";
      chatnavi[0].style.left = "100vw";
      chatbar[0].style.left = "100vw";
      this.$parent.back();
    },
  },

  watch:{
    friendDocID: function(newval) {
      if(newval){
      this.msgList = [];
      this.userInfoList = [];
      this.iconList = [];
      chatSpace[0].style.display = "none";
      currentUserEmail = firebase.auth().currentUser.email;

        if(this.isGame) {

          db.collection("GameCollection")
            .doc(newval)
            .collection("GlobalChat")
            .orderBy('date')
            .onSnapshot(querySnapshot => {
              this.msgList = [];

              querySnapshot.forEach(doc1 => {
                this.msgList.push(doc1.data());
                db.collection("USER")
                  .doc(doc1.data().sender)
                  .get()
                  .then(doc2 => {
                    this.userInfoList.push(doc2.data());
                    this.iconList.push(doc2.data().image)
                  })
              })
            })

        } else {

          db.collection("USER")
            .doc(currentUserEmail)
            .collection('friends')
            .doc(newval)
            .get()
            .then(doc1 => {
              chatID = doc1.data()['chatID'];

              db.collection("PrivateChat")
                .doc(chatID)
                .collection("contents")
                .orderBy('date')
                .onSnapshot(querySnapshot => {
                  this.msgList = [];

                  querySnapshot.forEach(doc2 => {
                    this.msgList.push(doc2.data());

                    db.collection("USER")
                      .doc(doc2.data().sender)
                      .get()
                      .then(doc3 => {
                        this.userInfoList.push(doc3.data());
                        this.iconList.push(doc3.data().image)
                      })
                  })
                })
            })
        }
      }
    }
  },

  created: function() {
    let currentUser = firebase.auth().currentUser;
    if(currentUser == null) {
      currentUser = this.$store.getters["user/user"]
    }

    currentUserEmail = currentUser.email
  },

  mounted: function() {
    chatSpace = document.getElementsByClassName("chatSpace");
    rightArea = document.getElementsByClassName('rightArea');
    chatnavi = document.getElementsByClassName('chatnavi');
    chatbar = document.getElementsByClassName('chatbar');
  },

  updated: function() {
    this.$nextTick(() => {
      this.chatScroll();
    })
    chatSpace[0].style.display = "block";
  }
};

</script>

<style lang='scss' scoped>
.rightArea {
  position: absolute;

  @media screen and (min-width: 1300px) {
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
  }

  @media screen and (max-width: 1300px) {
    top: 0px;
    left: 100vw;
    width: 100%;
    height: 100vh;

    border-left-color: #757575;
    border-left-style: solid;
    border-left-width: 1px;

    z-index: 9999;
  }

  background-color: #fff;

  overflow-y: scroll;
  overflow-x: hidden;

  vertical-align: bottom;

  transition: .3s;
}

.chatSpace {
  display: none;
}

.myChatBalloonPosition {
  display: inline-block;
  position: relative;

  bottom: 0;

  width: 100%;
  height: auto;

  overflow-y: visible;
  overflow-x: hidden;

  text-align: right;

  .myChatBalloon {
    display: inline-block;

    position: relative;

    padding: 5px 6px 5px 6px;

    right: 20px;

    min-width: 10px;
    max-width: 30%;
    height: auto;

    border-radius: 20px;
    border: solid;
    border-color: $secondary_text;

    word-break: break-all;
    -ms-word-break: break-all;
  }

  .myDatePosition {
    display: block;

    position: relative;

    padding-top: 5px;
    right: 20px;

    width: auto;
    height: auto;
  }
}

.hisChatBalloonPosition {
  display: inline-block;

  position: relative;

  bottom: 0;

  padding-top: 20px;

  width: 100%;
  height: auto;

  overflow-y: visible;
  overflow-x: hidden;

  text-align: left;

  .hisIcon {
    display: inline-block;

    position: relative;

    left: 20px;

    height: 40px;
    width: 40px;

    top: 5px;

    border-radius: 50%;

    cursor: pointer;
  }

  .hisChatBalloon {
    display: inline-block;

    position: relative;

    padding: 5px 6px 5px 6px;

    left: 20px;

    min-width: 10px;
    max-width: 30%;
    height: auto;

    border-radius: 20px;
    border: solid;
    border-color: $secondary_text;

    word-break: break-all;
    -ms-word-break: break-all;
  }

  .hisDatePosition {
    display: block;

    padding-top: 5px;
    left: 20px;

    position: relative;

    width: auto;
    height: auto;
  }
}

.scrollSpace {
  position: relative;

  @media screen and (min-width: 1300px) {
    height: 120px;
  }

  @media screen and (max-width: 1300px) {
    height: 180px;
  }
  width: 100%;
}

.nameSpace {
  position: relative;

  height: 160px;
  width: 100%;

  @media screen and (max-width: 1300px) {
    display: none;
  }
}

.chatnavi {
  position: fixed;

  left: 100vw;
  top: 0;

  width: 100vw;
  height: 8.5vh;

  border-left-color: #757575;
  border-left-style: solid;
  border-left-width: 1px;

  z-index: 19999;

  -webkit-transform: translate3d(0, 0, 10px);
	transform: translate3d(0, 0, 10px);

  transition: .3s;

  background: $header-color;

  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 1300px) {
    display: none;
  }

  .backarrow {
    position: absolute;

    left: 5px;
    top: 10px;

    width: 6.5vh;
    height: 6.5vh;

    color: #fff;

    cursor: pointer;
  }

  .username {
    position: absolute;

    top: 1.5vh;
    left: 50vw;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);

    width: 90vw;
    height: 5vh;

    text-align: center;
    color: #fff;
    font-size: 5vh;
  }
}

.chatbar {
  position: fixed;

  left: 100vw;
  bottom: 0px;

  width: 100vw;
  height: 8.5vh;

  border-left-color: #757575;
  border-left-style: solid;
  border-left-width: 1px;

  transition: .3s;

  @media screen and (min-width: 1300px) {
    display: none;
  }

  background-color: $header-color;
}

.chatheadspace {
  @media screen and (min-width: 1300px) {
    display: none;
  }

  position: relative;
  width: 100%;
  height: 20px;
}

</style>
