<template>
  <div class="gamebanner">
    <!--
      <span class="iconPicPosition">
        <img class="iconPic" :src="game.data().image"
        alt="gameIcon" />
      </span>
    -->

    <!--
      <div class="gamenamePosition">
        <div class="gamename">
          {{ game.data().gamename }}
        </div>
      </div>
    -->

    <div class="gamename">
      {{ game.data().gamename }}
    </div>

    <img src="~/assets/image/bg.png" class="png" />

    <div v-if="isSubscribed" class="subscribeButton" @click="remove()">登録済み</div>
    <div v-else class="subscribeButton" @click="subscribe()">登録</div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();
let subscribeButton;

export default {
  name: 'myBanner',

  data: function() {
    return {
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

  mounted: function() {
    subscribeButton = document.getElementsByClassName("subscribeButton");
    this.checkSubscription();
  }
}

</script>

<style lang="scss" scoped>
  .gamebanner {
    position: absolute;

    @media screen and (max-width: 1300px) {
      width: 97vw;
      height: calc(/*85vw*/97vw / 4);
    }

    @media screen and (min-width: 1300px) {
      width: $n_banner_width;
      height: $n_banner_height;
    }

    background-color: #fff;

    transition: 0.3s;

    border-radius: 15px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    overflow: hidden;

    .gamename {
      position: absolute;

      left: 5%;
      top: 10%;

      font-size: 3vh;

      z-index: 5;
    }

    .png {
      position: absolute;

      left: 30%;

      width: 100%;
    }

    .iconPicPosition {
      position: absolute;

      width: 100%;
      height: 100%;

      top: 0;
      left: 0;

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

      width: $user_width;
      height: $user_height;

      top: 30px;
      left: 140px;
      width:100%;

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

      @media screen and (max-width: 1300px) {
        font-size: 5vw;
      }

      //color: #abbffb;
      color: #fff;
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
