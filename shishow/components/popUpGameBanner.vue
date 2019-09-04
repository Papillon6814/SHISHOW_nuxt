<template>
  <div class="popupGameBanner">

    <div class="BgPosition">
        <img class="Bg" src="../assets/image/bg.png">
    </div>

    <div class="GamenamePosition">
        <div class="Gamename">
          {{ gamename(N) }}
        </div>
    </div>

    <div class="SubscribedPosition">
        <div class="Subscribed">フォローしてる友達</div>
    </div>

    <div class="SubscriberPosition">
        <div class="Subscriber">

        </div>
    </div>

    <div class="FollowerPpsition">
        <div class="Follower">Follwer</div>
    </div>

    <div class="FollowerNumberPosition">
        <div class="FollowerNumber">人数</div>
    </div>

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
  },

    
    gamename: function(N){
      return string()
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

  .BgPosition{
        position: abusolute;
        //仮の数値です
        width: 600px;
        height: 300px;
    
        .Bg{
          position: absolute;
          width: 70%;
          height: 70%;

          margin: 20px;
          top: 30px;
          right: 20px;

        }
    }

    .GamenamePosition{
        position: absolute;

        top: 10%;
        left: 15%;

        .Gamename{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .SubscribedPosition{
        position: absolute;

        top: 30%;
        left: 7%;
    
        .Subscribed{
            width: 100px;
            height: 50px;

        }
    }

    .SubscriberPosition{
        position: absolute;

        top: 30%;
        left: 30%;

        .Subscriber{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .FollowerPpsition{
        position: absolute;

        top: 20%;
        right: 30%;

        .Follower{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .FollowerNumberPosition{
        position: absolute;

        top: 20%;
        right: 23%;

        .FollowerNumber{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

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
