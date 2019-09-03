<template>
  <div class="popupGameBanner">

    <div class="BgPosition">
        <img class="Bg" src="../assets/image/bg.png">
    </div>

    <div class="GamenamePosition">
        <div class="Gamename">名前</div>
    </div>

    <div class="SubscribedPosition">
        <div class="Subscribed">フォローしてる人</div>
    </div>

    <div class="SubscriberPosition">
        <div class="Subscriber">小野優真</div>
    </div>

    <div class="FollowerPpsition">
        <div class="Follower">Follwer</div>
    </div>

    <div class="FollowerNumberPosition">
        <div class="FollowerNumber">人数</div>
    </div>

    <div class="BackButtonPosition">
        <div class="BackButton">Back</div>
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

        width: 600px;
        height: 300px;
    
        .Bg{
        width: 60%;
        height: 50%;

        margin: 30px;
        right: 20px;

        }
    }

    .GamenamePosition{
        position: absolute;

        top: 30px;
        left: 200px;

        .Gamename{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .SubscribedPosition{
        position: absolute;

        top: 40px;
        left: 20px;
    
        .Subscribed{
            width: 100px;
            height: 50px;

        }
    }

    .SubscriberPosition{
        position: absolute;

        top: 40px;
        left: 120px;

        .Subscriber{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .FollowerPpsition{
        position: absolute;

        top: 20px;
        right: 60px;

        .Follower{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .FollowerNumberPosition{
        position: absolute;

        top: 20px;
        right: 30px;

        .FollowerNumber{
            position: absolute;

            width: 100px;
            height: 50px;
        }
    }

    .BackButtonPosition{
        position: absolute;

        bottom: 50px;
        right: 30px;

        .BackButton{
            position: absolute;

            width: 100px;
            height:50px;
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
