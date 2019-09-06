<template>
  <div id="inputBar">
    <input v-model="msg" type="text" class="inputText" @keydown.enter="sendMsg" />
    <div class="checkEmojiPlace" @click="sendMsg()">
      <font-awesome-icon icon="check" />
    </div>
  </div>
</template>

<script>
import firebase from "../../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

let db = firebase.firestore();
let currentUser;

export default {
  name: "inputArea",

  data() {
    return {
      msg: "",
      chatID: "",
      chattable: true
    };
  },

  props: [
    // leftAreaでクリックされたフレンドのドキュメントID
    "friendDocID",
    "isGame"
  ],

  created: function() {
    currentUser = firebase.auth().currentUser;
  },

  methods: {

    //メッセージを送る
    sendMsg() {
      var root = this;

      if(this.msg == '') {
        return;
      }

      if(this.chattable){
        this.chattable = false;
        // 文字が入力されているときにのみ送信
        let msg = this.msg;
        this.msg = "";
        msg.replace(/\r?\n/g, '');
        // 現在の日時を取得(文字列型)
        let now = new Date();

        if(this.isGame) {
          db.collection("GameCollection")
          .doc(this.friendDocID)
          .collection("GlobalChat")
          .add({
            msg: msg,
            date: now,
            sender: currentUser.email
          })
          .then(() => {
            db.collection("GameCollection")
            .doc(this.friendDocID)
            .update({
              lastChatDate: now
            })
            msg = "";
            this.chattable = true;
          })
        } else {

          db.collection("USER")
          .doc(currentUser.email)
          .collection("friends")
          .doc(root.friendDocID)
          .get()
          .then(doc => {
            root.chatID = doc.data()["chatID"];

            if (msg) {

              db.collection("PrivateChat")
              .doc(root.chatID)
              .collection("contents")
              .add({
                msg: msg,
                date: now,
                sender: currentUser.email
              })
              .then(() => {
                db
                .collection("USER")
                .doc(currentUser.email)
                .collection("friends")
                .doc(root.friendDocID)
                .update({
                  lastChatDate: now
                })

                root.$emit('scrollRightArea');
                msg = "";

                this.chattable = true;
              })

            }

          });
        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
#inputBar {
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0);


  .inputText {
    position: absolute;

    top: 7px;

    height: 50px;

    font-size: 30px;

    @media screen and (min-width: 1300px) {
      width: calc(84% - 40px);
      left: 6%;
    }

    @media screen and (max-width: 1300px) {
      width: 100%;
      left: 0;
    }
  }

  .checkEmojiPlace {
    position: absolute;

    @media screen and (min-width: 1300px) {
      right: 5%;
    }

    @media screen and (max-width: 1300px) {
      right: -15%;
    }

    top: 3px;

    font-size: 50px;
    color: $primary_text;

    cursor: pointer;
  }
}
</style>
