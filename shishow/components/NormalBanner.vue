<template>
  <div class="normalBanner">

    <div class="nbField" @click="click()">

      <span class="iconPicPosition">
        <img class="icon" :src="user['image']" />
        <div class="iconCircle"></div>
      </span>
      <!-- <div class="achievementPosition1">
        <div class="achievement"></div>
      </div>
      <div class="achievementPosition2">
        <div class="achievement"></div>
      </div>
      <div class="achievementPosition3">
        <div class="achievement"></div>
      </div> -->
      <div class="usernamePosition">
        <div class="username" align="left">{{ user.username }}</div>
      </div>
    </div>

      <div v-if="relation==0" @click="startSending()" class="friendRequest_button">申請</div>
      <div v-else-if="relation==1" @click="add_db" class="friendRequest_button">承認</div>
      <div v-else-if="relation==2" @click="delete_db" class="friendRequest_button">削除</div>
      <div v-else-if="relation==3" class="friendRequest_button">師匠</div>
      <div v-else-if="relation==4" class="friendRequest_button">弟子</div>

  </div>

</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();

export default {
  name: 'normalBanner',

  props: [
    "user",
    "signuser",
    "relations"
  ],

  created:function(){
    this.relation = this.relations;
  },

  data: function() {
    return {
      relation: 0,
    };
  },

  methods: {
    click: function() {
      this.$emit("clickNB");
    },

    startSending: function() {
      this.$emit("clickReqButton");


    },

    sendFriendReq: function(gameId) {
        db.collection("USER")
          .doc(this.signuser.email)
          .collection("outgoing")
          .doc(this.user.email)
          .set({
            username: this.user["username"],
            email: this.user["email"],
            gameId:gameId
          })


        db.collection("USER")
          .doc(this.user.email)
          .collection("incoming")
          .doc(this.signuser.email)
          .set({
            username: this.signuser["username"],
            email: this.signuser["email"],
            gameId:gameId
          })

        db.collection("USER").doc(this.user.email)
          .collection("relation")
          .doc(this.signuser.email).set({
            relation:1,
          })

        db.collection("USER")
          .doc(this.signuser.email)
          .collection("relation")
          .doc(this.user.email).set({
            relation:2,
          })

        db.collection("USER")
          .doc(this.user.email)
          .collection("notice")
          .doc(this.signuser.email)
          .set({
            msg:this.signuser.username+"が入門を申し込んできました。",
            date: new Date()
          })
          this.relation = 2;

    },

    delete_db: function() {
      const sign_db = db.collection("USER")
                        .doc(this.signuser.email);
      const user_db = db.collection("USER")
                        .doc(this.user.email)

      user_db.collection("incoming")
             .doc(this.signuser.email)
             .delete()

      sign_db.collection("outgoing")
             .doc(this.user.email)
             .delete()

      db.collection("USER")
        .doc(this.user.email)
        .collection("relation")
        .doc(this.signuser.email)
        .delete()

      db.collection("USER")
        .doc(this.signuser.email)
        .collection("relation")
        .doc(this.user.email)
        .delete()

      user_db.collection("notice")
             .doc(this.signuser.email)
             .delete();

      this.relation = 0
    },

    add_db: function() {
      const sign_db = db.collection("USER")
                        .doc(this.signuser.email);
      const user_db = db.collection("USER")
                        .doc(this.user.email);

      let now = new Date();

      db.collection("PrivateChat")
        .add({
          email1: this.signuser.email,
          email2: this.user.email
        })
        .then(doc1 => {

        sign_db.collection("incoming")
               .doc(this.user.email)
               .delete()
               .then(()=>{

                 sign_db.collection("friends")
                 .doc(this.user.email)
                 .set({
                   username: this.user.username,
                   email: this.user.email,
                   chatID: doc1.id,
                   lastChatDate: now,
                   isSHISHOW: false
                 });
               })
               .catch(() => {

               });

        user_db.collection("outgoing")
               .doc(this.signuser.email)
               .delete()
               .then(() => {
                 user_db.collection("friends")
                        .doc(this.signuser.email)
                        .set({
                          username: this.signuser.username,
                          email: this.signuser.email,
                          chatID: doc1.id,
                          lastChatDate: now,
                          isSHISHOW: true
                        })
               })

        db.collection("USER")
          .doc(this.user.email)
          .collection("relation")
          .doc(this.signuser.email)
          .set({
            relation: 3,
          })

        db.collection("USER")
          .doc(this.signuser.email)
          .collection("relation")
          .doc(this.user.email)
          .set({
            relation: 4,
          })

        user_db.collection("notice")
               .doc(this.signuser.email)
               .set({
                 msg: this.signuser.username+"とフレンドになりました。",
                 date: new Date()
               })

        sign_db.collection("notice")
               .doc(this.user.email)
               .get()
               .then(doc => {
                 if(doc.exists){
                   sign_db.collection("notice")
                          .doc(this.user.email)
                          .delete();
                 }
               })
        this.relation = 3
      })
    }
  },

};
</script>

<style lang="scss" scoped>

@media screen and (max-width: 800px) {
  .normalBanner {
    position: absolute;

    width: 85vw;
    height: calc(85vw / 4.5);

    background-color: #fff;

    border-radius: 3px;

    z-index: 2;

    cursor: pointer;

    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    transition: 0.2s;
  }
}

@media screen and (min-width: 800px) {
  .normalBanner {
    position: absolute;

    overflow-y: hidden;

    width: $n_banner_width;
    height: $n_banner_height;

    background-color: white;

    border-radius: 3px;

    z-index: 2;

    cursor: pointer;

    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    transition: 0.2s;
  }
}

.normalBanner:hover {
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
}

.iconPicPosition {
  position: absolute;

  @media screen and (max-width: 800px) {
    width: 10vw;
    height: 10vw;
  }

  @media screen and (min-width: 800px) {
    width: 8vw;
    height: 8vw;
  }

  top: 15px;
  left: 20px;

  .iconCircle{
    position: relative;

    top: 0px;
    left: 6px;

    width: 100%;
    height: 100%;

    display: inline-block;

    background-color: #ccc;
    color: #ccc;

    line-height: 63px;
    border-radius: 50%;

    z-index: -1;
  }
}

.username {
  width: $user_width;
  height: $n_user_height;

  background-color: #fff;

  font: "メイリオ";
  font-size: 22px;
}

.usernamePosition {
  position: absolute;

  top: 30px;
  left: 140px;
  right: 0px;
}

.profilePosition {
  position: absolute;

  top: 88px;
  left: 172px;
  right: 25px;
}

.profile {
  width: $profile_width;
  height: $n_profile_height;

  background-color: #fff;
}

.userInfo {
  width: 100%;
  height: 160px;

  background-color: #fff;

  border-radius: 5%;
  border: dashed;
  border-width: 2px;
  border-color: $window_flame;
}

.userInfoPosition {
  position: absolute;

  top: 200px;
  left: 75px;
  right: 25px;
}

.friendRequest_button {
  position: absolute;

  top: 25px;
  right: 5%;

  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #9aa5ef;
  border: solid 2px #9aa5ef;
  border-radius: 3px;
  transition: .4s;

  cursor: pointer;
}

.friendRequest_button:hover{
  background: #9aa5ef;
  color: white;
}

.friendRequest_button:active {
  background-color: #9aa5ef;
  color: white;
}

.icon {
  position: absolute;

  @media screen and (max-width: 800px) {
    width: 10vw;
    height: 10vw;
  }

  @media screen and (min-width: 800px){
    width: 8vw;
    height: 8vw;
  }

  left: 7%;
}

</style>
