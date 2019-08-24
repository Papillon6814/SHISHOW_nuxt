<template>
  <div id="header">

    <div>
      <nuxt-link to="/home">
        <img class="logo" src="../assets/image/logoShishow.png" />
      </nuxt-link>
    </div>

    <div class="centered">
      <div class="group">
        <div id="get_data">
          <input
            v-model="word"
            type="text"
            id="search"
            required="required"
            @keydown.enter="onChangeInput()"
          />
          <label for="search">Search...</label>
          <div class="bar"></div>
          <!-- <img class="sch" src="../assets/search-button.png" @click="onChangeInput"> -->
          <nuxt-link to="/search">
            <font-awesome-icon icon="search"
             @click="onChangeInput()" class="sch" />
          </nuxt-link>
        </div>
      </div>
    </div>

    <div id="menuButtons">
      <div class="buttons">
        <nuxt-link to="/directMessage">
          <font-awesome-icon icon="envelope" class="dm" />
        </nuxt-link>
        <nuxt-link to="/friend">
          <font-awesome-icon icon="gamepad" class="game" />
        </nuxt-link>
        <nuxt-link to="/notification">
          <font-awesome-icon icon="bell" class="bell" />
        </nuxt-link>
        <nuxt-link to="/home">
          <font-awesome-icon icon="home" class="home" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
const db = firebase.firestore();
export default {
  name: "navi",
  data:function() {
    return {
      word: "",
      notice: []
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    onChangeInput() {
      this.commitChange(this.word);
    },
    commitChange(newValue) {
      //this.$emit("input", newValue);
      this.$emit("search", newValue);
      this.$store.commit("onSearchWordInput", newValue);
    }
  },
  created: function() {
    if(this.user != null) {
      db.collection("USER")
        .doc(""+this.user.email)
        .collection("notice")
        .get()
        .then(doc => {
          this.notice = doc.docs;
        })
        .catch(() => {
          this.notice = [];
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Pangolin&display=swap");
#header {
  position: fixed;
  top: $header_height;
  left: 0;
  width: 100%;
  height: $header_height;
  background-color: $header_color;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  .centered {
    position: absolute;
    top: 13px;
    right: 50px;
    .group {
      position: relative;
      width: 100%;
      height: $searchbar_width/5;
      overflow: hidden;
      label {
        position: absolute;
        left: 0;
        top: $searchbar_width/15;
        color: #fff;
        font: 400 $searchbar_width/15 Roboto;
        cursor: text;
        transition: 0.25s ease;
      }
      input {
        display: block;
        width: 100%;
        padding-top: $searchbar_width/15;
        border: none;
        border-radius: 0; // For iOS
        color: #fff;
        background: $header_color;
        font-size: $searchbar_width/15;
        transition: 0.3s ease;
        &:valid {
          ~ label {
            top: 0;
            font: 700 $searchbar_width/25 Roboto;
            color: #fff;
          }
        }
        &:focus {
          outline: none;
          ~ label {
            top: 0;
            font: 700 $searchbar_width/25 Roboto;
            color: $secondary-color;
          }
          ~ .bar {
            background: $secondary-color;
          }
          ~ .sch {
            color: $secondary-color;
          }
        }
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $header_color inset;
          -webkit-text-fill-color: #fff !important;
        }
      }
      .bar {
        position: relative;
        content: "";
        width: $searchbar_width;
        height: $searchbar_width/150;
        background: #fff;
        transition: 0.3s ease;
      }
      .sch {
        position: absolute;
        width: 40px;
        height: 40px;
        left: 355px;
        top: 20px;
        color: #fff;
        cursor: pointer;
        transition: 0.3s ease;
      }
      .sch:hover {
        color: $secondary-color;
      }
    }
  }
  .logo {
    position: absolute;
    width: 80px;
    height: 80px;
    top: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 10;
  }
  ::selection {
    background: rgba($secondary-color, 0.3);
    transition: 0.3s ease;
  }
  #menuButtons {
    position: absolute;
    height: 100%;
    top: 18px;
    left: 0;
    .dm {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 50px;
      top: 10px;
      color: #fff;
    }
    .game {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 150px;
      top: 10px;
      color: #fff;
    }
    .bell {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 250px;
      top: 10px;
      color: #fff;
    }
    .notification {
      position: absolute;
      height: 20px;
      width: 20px;
      left: 20px;
      color: white;
      border-radius: 20%;
      background-color: red;
      z-index: 10;
    }
    .home {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 350px;
      top: 10px;
      color: #fff;
    }
    .dm:hover {
      opacity: 0.5;
    }
    .game:hover {
      opacity: 0.5;
    }
    .bell:hover {
      opacity: 0.5;
    }
    .notification:hover .bell {
      opacity: 0.5;
    }
    .home:hover {
      opacity: 0.5;
    }
    .global:hover {
      opacity: 0.5;
    }
  }
}
#header {
  top: 0px;
}
.logoSentence2 {
  position: absolute;
  font-family: "Pangolin", cursive;
  font-size: 60px;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
  color: white;
  text-shadow: 2px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>
