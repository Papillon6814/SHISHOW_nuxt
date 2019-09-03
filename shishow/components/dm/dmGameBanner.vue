<template>
  <div class="dmGameBanner">
    <div>
    <img :src="iconPic" class="iconPosition" />
    <div class="globalMsgArea">
    </div>
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

  margin-bottom: 20px;

  background-color: $dm_banner_color;
  text-align: left;

  cursor: pointer;

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
  }
}

.dmGameBanner:hover {
  background-color: $dm_banner_color_hover;
}

</style>
