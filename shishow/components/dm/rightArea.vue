<template>
  <div class="rightArea">
    <div class="nameSpace"></div>
    <!-- {{ friendDocID }} -->
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
        <div class="hisChatBalloon">
          {{ msgList[N-1].msg }}
        </div>
        <div class="hisDatePosition">
          {{ msgList[N-1].date.toDate().toLocaleString() }}
        </div>
      </div>

    </div>
    <div class="scrollSpace"></div>
  </div>
</template>

<script>
import firebase from "../../plugins/firestore";
import 'firebase/firestore'
import '@firebase/auth'


const db = firebase.firestore();
let currentUserEmail;
let chatID;

export default {

  name: 'rightArea',

  data() {
    return {
      msgList: []
    }
  },

  props: [
    'friendDocID',
    'isGame'
  ],

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        this.$store.commit('onAuthStateChanged', user);
        this.$store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    isMine: function(msg) {
      return (msg.sender == currentUserEmail);
    },

    isHis: function(msg) {
      return (msg.sender != currentUserEmail);
    },

    chatScroll: function() {
      let scrollArea = document.getElementsByClassName('rightArea');
      scrollArea[0].scrollBy(0, 300000000);
    }
  },

  watch:{
    friendDocID: function(newval) {
      if(newval){
      this.msgList = [];
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
                })
              })
          })
      }
    }}
  },

  created: function() {
    this.onAuth();

    currentUserEmail = firebase.auth().currentUser.email;
  },

  mounted: function() {
    this.chatScroll();
  }
};

</script>

<style lang='scss' scoped>
.rightArea {
  position: absolute;

  top: 0;
  right: 0;

  width: 60%;
  height: 100%;

  background-color: #fff;

  overflow-y: scroll;
  overflow-x: hidden;
}

.myChatBalloonPosition {
  position: relative;

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
  position: relative;

  padding-top: 20px;

  width: auto;
  height: auto;

  overflow-y: visible;
  overflow-x: hidden;

  text-align: left;

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

  height: 120px;
  width: 100%;
}

.nameSpace {
  position: relative;

  height: 160px;
  width: 100%;
}

</style>
