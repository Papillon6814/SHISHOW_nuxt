<template>
  <div class="dmGameBanner">
    <div>
    <!--
    <img :src="iconPic" class="iconPosition" />
    <div class="globalMsgArea">
    </div>
    -->
    <div class="gamename">
      {{ gamename }}
    </div>

    <img src="~/assets/image/bg.png" class="png" />

    </div>
    <div class="gameCover"></div>
  </div>
</template>

<script>
import firebase from "../../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth"

const db = firebase.firestore();

export default {
  name: "dmGameBanner",

  data: function() {
    return {
      iconPic: '',
      gamename: '',
    }
  },

  props: [
    'gameDocId'
  ],

  mounted: function() {
    db.collection("GameCollection")
      .doc(this.gameDocId)
      .get()
      .then(doc1 => {
        this.gamename = doc1.data().gamename;
        this.iconPic = doc1.data().image
      })
  }
}

</script>

<style lang="scss" scoped>

.dmGameBanner {
  position: relative;

  display: block;

  width: 100%;
  height: 120px;

  margin-top: 20px;

  background-color: $dm_banner_color;
  text-align: left;

  cursor: pointer;

  overflow: hidden;

  .gamename {
      position: absolute;

      left: 5%;
      top: 10%;

      font-size: 3vh;

      z-index: 5;
    }

  .iconPosition {
    //display: none;

    position: absolute;

    width: 100%;
    height: 100%;
  }

  .dmGameName{
    position: absolute;
  }

  .gameCover{
    position:absolute;
    width: 100%;
    height: 120px;
    background:rgba(255, 0, 0, 0);
  }

  .png {
      position: absolute;

      left: 30%;

      width: 100%;
    }
}

.dmGameBanner:hover {
  background-color: $dm_banner_color_hover;
}

</style>
