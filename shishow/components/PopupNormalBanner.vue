<template>
  <div class="popupNormalBanner">
    <div class="closeBtn" @click="fade()">
      <font-awesome-icon icon="times" />
    </div>

    <span class="iconPicPosition">
      <img class="icon" :src="userInfo['image']"
      alt="hisIcon" />
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
      enumGames: '',
      maxChar:16
    }
  },

  props: [
    "userInfo"
  ],

  watch: {
    userInfo: function(newval){
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
        .doc(""+this.userInfo.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            if (this.enumGames.length > 12) {
              // do nothing
            } else {
              this.enumGames += doc1.data().gamename + ' / ';
            }
          })
          this.enumGames = this.enumGames.slice(0, -2);

          if (this.enumGames.length > 12) {
            this.enumGames += '/...';
          }
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

  @media screen and (min-width: 1300px) {
    height: 400px;
  }

  @media screen and (max-width: 1300px) {
    height: 80vh;
  }

  background-color: $dark_color;

  border-radius: 15px;

  .closeBtn {
    position: absolute;

    top: 10px;
    right: 10px;

    @media screen and (min-width: 1300px) {
      width: 30px;
      height: 30px;
    }

    @media screen and (max-width: 1300px) {
      width: 7vh;
      height: 7vh;
    }

    font-size: 30px;

    cursor: pointer;
  }

  .iconPicPosition {
    position: absolute;

    top: 25px;
    left: 20px;

    .icon {
      position: absolute;

      @media screen and (min-width: 1300px) {
        width: 170px;
        height: 170px;
      }

      @media screen and (max-width: 1300px) {
        width: 30vw;
        height: 30vw;
      }

      left: 7%;

      border-radius: 50%;
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

    width: calc(86% - 170px);

    @media screen and (min-width: 1300px) {
      left: calc(7% + 170px);
      font-size: 60px;
      height: 85px;
      top: 25px;
    }

    @media screen and (max-width: 1300px) {
      left: 40vw;
      font-size: 8vw;
      height: auto;
      top: 50px;
    }

    text-align: left;

    border-bottom: solid;
    border-color: $divider_color;
    border-width: 2px;
  }

  .profilePosition {
    position: absolute;

    padding:5px;

    @media screen and (min-width: 1300px) {
      top: 115px;
      left: calc(7% + 170px);
      width: calc(86% - 170px);
      height: 200px;
    }

    @media screen and (max-width: 1300px) {
      left: 5vw;
      top: calc(4vh + 30vw);

      width: 90%;
      height: 70%;
    }

    /*
    border-top: solid;
    border-width: 2px;
    border-color: $divider_color;
    border-radius: 15px;
    */

    .bioText{
      width: 100%;
      font-size:40px;
      padding-bottom: 5px;
    }

  }

  .gamesPosition {
    position: absolute;

    height: 50px;
    bottom: 7px;

    @media screen and (min-width: 1300px) {
      left: calc(7% + 170px);
      width: calc(76% - 170px);
      font-size: 30px;
    }

    @media screen and (max-width: 1300px) {
      left: 5%;
      width: 85%;
      font-size: 8vw;
    }

    text-align: left;

    color: #bdbdbd;
  }
}
</style>
