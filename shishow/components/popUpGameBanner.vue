<template>
  <div class="popupGameBanner">
    <div class="closeBtn" @click="fade()">
      <font-awesome-icon icon="times" />
    </div>

    <div class="gamename">
      {{ gamename }}
    </div>

    <img src="~/assets/image/bg.png" class="bg" />
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();

export default {
  name: 'popupGameBanner',

  data: function() {
    return {
      gamedata: '',
      gamename: '',
    }
  },

  props: [
    "gameInfo"
  ],

  watch: {
    gamedata: function(newval) {
      db.collection("GameCollection")
        .doc(newval.id)
        .get()
        .then(doc => {
          this.gamename = doc.data().gamename
        })
    }
  },

  methods: {
    fade: function() {
      this.$emit("callFade");
    }
  }
}

</script>

<style lang="scss" scoped>
.popupGameBanner {
  position: absolute;

  width: 100%;

  @media screen and  (min-width: 1300px) {
    height: 400px;
  }

  @media screen and (max-width: 1300px) {
    height: 80vh;
  }

  background-color: #fff;

  border-radius: 15px;

  overflow: hidden;

  .closeBtn {
    position: absolute;

    top: 10px;
    right: 10px;

    width: 30px;
    height: 30px;

    font-size: 30px;

    cursor: pointer;
    z-index: 40;
  }

  .gamename {
    position: absolute;

    left: 5%;
    top: 10%;

    font-size: 5vh;

    width: 90%;
    height: 30%;

    color: $primary_text;

    z-index: 39;
  }

  .bg {
    position: absolute;

    @media screen and (min-width: 1300px) {
      right: -300px;
    }

    @media screen and (max-width: 1300px) {
      right: -150px;
      height: 110%;
    }

    width: 100%;
  }
}
</style>
