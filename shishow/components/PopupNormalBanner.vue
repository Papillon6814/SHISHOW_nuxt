<template>
  <div class="popupNormalBanner">
    <div class="closeBtn" @click="fade()">
      <i class="fas fa-times"></i>
    </div>

    <span class="iconPicPosition">
      <img class="icon" :src="userInfo['image']" />
      <div class="iconCircle"></div>
    </span>

    <div class="usernamePosition">
      {{ userInfo.username }}
    </div>

    <div class="profilePosition">
      <div v-for="N in textLine" :key="N" class="bioText">
        {{ userBio(N) }}
      </div>
    </div>

    <div class="gamesPosition">
      {{ enumGames }}
    </div>

  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();

export default {
  name: 'popupNormalBanner',

  data: function() {
    return {
      enumGames: ' ',
      maxChar:16
    }
  },

  props: [
    "userInfo"
  ],

  watch: {
    userInfo: function(newval) {
      console.log(newval);
      this.enumGames = '';
      this.loadGames();
    }
  },

  methods: {
    fade: function() {
      this.$emit("callFade");
    },

    loadGames: function() {
      db.collection("USER")
        .doc(this.userInfo.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            this.enumGames += doc1.data().gamename + ' / ';
          })
          this.enumGames = this.enumGames.slice(0, -2);
        })
    },

    userBio: function(N){
      return String(this.userInfo.bio).substr(0+(N-1)*this.maxChar,this.maxChar)
    }
  },

  computed:{
    textLine(){
      return Math.ceil(String(this.userInfo.bio).length / this.maxChar)
    }
  }
}

</script>

<style lang="scss" scoped>
.popupNormalBanner {
  position: absolute;

  width: 100%;
  height: 400px;

  background-color: $dark_color;

  border-radius: 15px;

  .closeBtn {
    position: absolute;

    top: 10px;
    right: 10px;

    width: 30px;
    height: 30px;

    font-size: 30px;

    cursor: pointer;
  }

  .iconPicPosition {
    position: absolute;

    top: 25px;
    left: 20px;

    .icon {
      position: absolute;

      width: 170px;
      height: 170px;
      left: 7%;
    }

    .iconCircle {
      position: relative;

      top: 0px;
      left: 6px;

      width: $n_icon_width;
      height: $n_icon_height;

      display: inline-block;

      background-color: #ccc;
      color: #ccc;

      line-height: 63px;
      border-radius: 50%;

      z-index: -1;
    }
  }

  .usernamePosition {
    position: absolute;

    top: 25px;
    left: calc(7% + 170px);

    width: calc(86% - 170px);
    height: 85px;

    font-size: 60px;

    text-align: left;
  }

  .profilePosition {
    position: absolute;



    top: 115px;
    left: calc(7% + 170px);

    width: calc(86% - 170px);
    height: 200px;

    padding:5px;

    border: solid;
    border-width: 2px;
    border-color: #000000;
    border-radius: 15px;

    .bioText{
      font-size:40px;
      padding-bottom: 5px;
    }

  }

  .gamesPosition {
    position: absolute;

    width: calc(76% - 170px);
    height: 50px;

    left: calc(7% + 170px);
    bottom: 7px;

    text-align: left;

    font-size: 30px;

    color: #bdbdbd;
  }
}
</style>
