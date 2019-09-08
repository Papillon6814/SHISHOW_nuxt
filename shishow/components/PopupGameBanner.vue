<template>
  <div class="popupGameBanner">

    <div class="BgPosition">
        <img class="Bg" src="../assets/image/bg.png">
    </div>

    <div class="GamenamePosition">
        <div class="Gamename">
          
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
<<<<<<< HEAD
    gameInfo: function(newval){
      console.log(newval);
      
=======
    gamedata: function(newval) {
      db.collection("GameCollection")
        .doc(newval.id)
        .get()
        .then(doc => {
          this.gamename = doc.data().gamename
        })
>>>>>>> master
    }
  },

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

  @media screen and  (min-width: 1300px) {
    height: 400px;
  }

  @media screen and (max-width: 1300px) {
    height: 80vh;
  }

  background-color: #fff;

  border-radius: 15px;

<<<<<<< HEAD
  .BgPosition{
        position: abusolute;
        //仮の数値です
        width: 600px;
        height: 300px;
    
        .Bg{
          position: absolute;
          width: 65%;
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
           display: inline;

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
=======
  overflow: hidden;
>>>>>>> master

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
