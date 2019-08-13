<template>
  <div id="inputBar">
    <input v-model="msg" type="text" class="inputText" @keydown.enter="sendMsg" />
    <div class="checkEmojiPlace">
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
      if(this.chattable){
        this.chattable = false;
        // 文字が入力されているときにのみ送信
        let msg = this.msg;
        this.msg = "";
        this.chattable = true;
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

    left: 6%;
    top: 7px;

    width: calc(84% - 40px);
    height: 50px;

    font-size: 30px;
  }

  .checkEmojiPlace {
    position: absolute;

    right: 5%;
    top: 3px;

    font-size: 50px;
    color: $primary_text;

    cursor: pointer;
  }
}
</style>
