<template>
  <div class="banner">
    <span class="iconPicPosition">
      <div class="iconPic">
        <img id="image" v-show="user.image"
        :src="user.image" />

      </div>
    </span>

    <div class="username">
      {{user.username}}
    </div>

    <div class="shishowPosition">
      <div class="shishowText">
      師匠
      </div>
      <div class="shishowNumber">
        {{shishow}}
      </div>
    </div>

    <div class="deshiPosition">
      <div class="deshiText">
        弟子
      </div>
      <div class="deshiNumber">
        {{deshi}}
      </div>
    </div>

    <div class="profilePosition">
      <div class="profile">
        {{user.bio}}
      </div>
      <div class="separateLine"></div>
    </div>

    <div class="editButton"
      @click="showEditBanner()">
      編集
    </div>

    <div class="editIndicator"
    @click="showEditBanner()">
      <font-awesome-icon icon="pen" class="pen" />
    </div>

    <div class="logout" @click="logout">
      ログアウト
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firestore";
import "@firebase/auth";
import "firebase/firestore";

const db = firebase.firestore();

export default {
  name: "myBanner",

  props: [
    "loginedUser",
    "user",
    "shishow",
    "deshi"
  ],

  watch: {
    loginedUser: function() {
      this.$forceUpdate();
    }
  },

  methods: {

    logout: function() {
      this.$store.commit("user/onUserLogout")
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("Signed out.");
          sessionStorage.removeItem("shishow_user_email")
          sessionStorage.removeItem("shishow_user_name")
          sessionStorage.removeItem("shishow_user_uid")

          $nuxt.$router.push("/")
        })
        .catch(() => {
        });
    },

    showEditBanner: function() {
      this.$emit("callEditBanner");
    }
  },
};

</script>

<style lang="scss" scoped>

.banner {
  overflow-y: hidden;
  overflow-x: hidden;

  position: absolute;

  width: $banner_width;
  height: 100%;

  background-color: $banner_color;

  border: solid;
  border-width: 5px;
  border-color: $banner_color;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  transition: 0.3s;

  @media screen and (max-width: 1300px) {
    border-radius: 0 0 15px 15px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
  }


  /*
  .banner:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
  */

  .iconPicPosition {
    position: absolute;

    width: 100%;
    height: 100%;

    top: 6.5vh;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    @media screen and (max-width: 1300px) {
      top:3vh;
    }

    .iconPic {
      position: absolute;

      left: 50%;

      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      transform: translate(-50%, 0);

      @media screen and (min-width: 1300px) {
        top: 0;
        width: $icon_width;
        height: $icon_height;
      }

      @media screen and (max-width: 1300px) {
        top: -15px;
        width: 30vw;
        height: 30vw;
      }

      // temporary color
      background-color: #fff;
      border-radius: 50%;

      #image {
        border-radius: 50%;

        @media screen and (min-width: 1300px) {
          width: 130px;
          height: 130px;
        }

        @media screen and (max-width: 1300px) {
          width: 30vw;
          height: 30vw;
        }

      }
    }
  }

  .username {
    position: absolute;

    top: 25vh;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 100%;
    height: 45px;

    font-size: 35px;
    text-align: center;

    @media screen and (max-width: 1300px) {
      top:17vh;
    }

  }

  .shishowPosition {
    position: absolute;

    top: 41vh;
    left: 50%;

    width: 80%;
    height: 50px;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .shishowText {
      position: absolute;

      left: 0;
      bottom: 0;

      font-family: "robot";
      font-size: 30px;
    }

    .shishowNumber {
      position: absolute;

      right: 0;
      bottom: 0;

      color: $secondary_text;
      font-family: "robot";
      font-size: 30px;
    }
  }

  .deshiPosition {
    position: absolute;

    top: 46vh;
    left: 50%;

    width: 80%;
    height: 50px;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .deshiText {
      position: absolute;

      left: 0;
      bottom: 0;

      font-family: "robot";
      font-size: 30px;
    }

    .deshiNumber {
      position: absolute;

      right: 0;
      bottom: 0;

      color: $secondary_text;
      font-family: "robot";
      font-size: 30px;
    }
  }

  .profilePosition {

    @media screen and (max-width: 1300px) {
      display: none;
    }

    position: absolute;

    width: 88%;
    height: 24vh;

    bottom: 9.5vh;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    border-radius: 15px;

    background-color: #fff;

    .profile {
      position: absolute;

      width: 90%;
      height: calc(70% - 10px);

      top: 10px;
      left: 50%;

      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      transform: translate(-50%, 0);

      text-align: left;
    }

    .separateLine {
      position: absolute;

      width: 90%;
      height: 2px;

      top: calc(70% - 10px);
      left: 50%;

      -webkit-transform: translate(-50%, 0);
      -moz-transform: translate(-50%, 0);
      transform: translate(-50%, 0);

      background-color: #ddd;
    }

    .games {
      position: absolute;

      width: 100%;
      height: 30%;

      top: calc(70% - 14px);
      left: 0;
    }
  }

  .editButton {
    position: absolute;

    bottom: 3vh;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 160px;
    height: 32px;

    background-color: $accent_color;

    border-radius: 15px;

    text-align: center;
    font-size: 20px;
    line-height: 32px;

    cursor: pointer;

    @media screen and (max-width: 1300px) {
      bottom: 3vh;
      display: none;
    }

  }

  .editIndicator {
      position: absolute;

      left: 2vw;
      bottom: 3%;

      border-radius: 50%;
      background: $accent_color;

      padding: 0.5em;

      color: #fff;

      cursor: pointer;

      .pen {
        width: 2vh;
        height: 2vh;
      }
    }

  .logout {
    position: absolute;

    width: 80px;
    height: 18px;

    @media screen and (min-width: 1300px) {
      bottom: 18px;
    }

    @media screen and (max-width: 1300px) {
      bottom: 3%;
    }

    right: 0px;

    color: $secondary_text;
    text-align: right;
    font-size: 14px;

    cursor: pointer;
  }
}

</style>
