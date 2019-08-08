<template>
  <div class="gamebanner">

    <span class="iconPicPosition">
      <img class="iconPic" :src="game.data().image" />
    </span>

    <div class="gamenamePosition">
      <div class="gamename">
        {{ game.data().gamename }}
      </div>
    </div>

    <div v-if="isSubscribed" class="subscribeButton" @click="remove()">登録済み</div>
    <div v-else class="subscribeButton" @click="subscribe()">登録</div>
  </div>
</template>

<script>
import store from "../store";
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();
let subscribeButton;

export default {
  name: 'myBanner',

  data: function() {
    return {
      gamename: "",
      isSubscribed: false
    }
  },

  props: [
    "game",
    "signuser",
    "count"
  ],

/*
  watch: {
    signuser: function () {
      console.log("dubug")
      this.checkSubscription();
    }
  },
*/

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },

    subscribe: function() {

        db.collection("USER")
          .doc(this.signuser.email)
          .collection("GAMES")
          .doc(this.game.id)
          .set({
            gamename: this.game.data().gamename
          })
        this.isSubscribed = true;

    },

    remove: function() {
      console.log("remove")
      db.collection("USER")
        .doc(this.signuser.email)
        .collection("GAMES")
        .doc(this.game.id)
        .delete()

      this.isSubscribed = false;
      this.$forceUpdate();
    },

    checkSubscription: function() {
      db.collection("USER")
        .doc(this.signuser.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            if(doc1.id == this.game.id) {
              this.isSubscribed = true;
              console.log(doc1.id);
            }
          })
          console.log("inline");
          subscribeButton[this.count].style.display = "inline-block";
        })
    }
  },

  created: function() {
    this.onAuth();
  },

  mounted: function() {
    subscribeButton = document.getElementsByClassName("subscribeButton");
    this.checkSubscription();
  }
}

</script>

<style lang="scss" scoped>
  .gamebanner {
    position: absolute;

    width: $n_banner_width;
    height: $n_banner_height;
    background-color: #fff;

    transition: 0.3s;

    border-radius: 3px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    .iconPicPosition {
      position: absolute;

      width: $n_icon_width;
      height: $n_icon_height;

      top: 10px;
      left: 20px;

      .iconPic {
        width: 100%;
        height: 100%;

        //temporary color
        background-color: #fff;

        border-radius: 15px;
        border-style: solid;
        border-width: 1px;
      }
    }

    .gamenamePosition{
      position: absolute;

      top: 30px;
      left: 140px;

      .gamename{
        position: absolute;

        left: 0;
        top: 0;

        width: $user_width;
        height: $user_height;

        font-size: 22px;
      }
    }

    .subscribeButton {
      display: none;

      position: absolute;

      top: 25px;
      right: 5%;

      padding: 0.3em 1em;
      text-decoration: none;
      color: #abbffb;
      border: solid 2px #abbffb;
      border-radius: 3px;
      transition: .4s;

      cursor: pointer;
    }

    .subscribeButton:hover{
      background: #abbffb;
      color: white;
    }

    .subscribeButton:active {
      background-color: #abbffb;
      color: white;
    }
  }

  .gamebanner:hover{
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
  }

</style>
