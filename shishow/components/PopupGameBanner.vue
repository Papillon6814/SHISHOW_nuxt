<template>
  <div class="popupGameBanner">
    <div class="closeBtn" @click="fade()">
      <font-awesome-icon icon="times" />
    </div>
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
    }
  },

  props: [
    "gameInfo"
  ],

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
  height: 400px;

  background-color: #fff;

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

}
</style>
