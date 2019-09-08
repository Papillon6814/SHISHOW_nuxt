<template>
<div id="wrap">
  <div id="header">

    <div>
      <nuxt-link to="/home">
        <img class="logo" src="../assets/image/logoShishow.png"
        alt="logo" />
      </nuxt-link>
    </div>

    <font-awesome-icon icon="angle-left" class="back" />

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
          <font-awesome-icon icon="bell" class="bell" @click="notdelete()"/>
           <dev class="notification" v-show="notice.length">{{notice.length}}</dev>
        </nuxt-link>
        <nuxt-link to="/home">
          <font-awesome-icon icon="home" class="home" />
        </nuxt-link>
      </div>
    </div>
  </div>

  <div id="footer">
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

  <div class="pinkButton" @click="click()">
    <div class="fontPosition">
      <font-awesome-icon icon="sort-up" />
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
    },

    click() {
      this.$parent.scroll2top();
    },

    showBackArrow() {
      let ba = document.getElementsByClassName('back');
      ba[0].style.display = "block";
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
  z-index: 10;

  -webkit-transform: translate3d(0, 0, 1px);
	transform: translate3d(0, 0, 1px);

  @media screen and (max-width: 1300px) {
    height: 8.5vh;
  }

  @media screen and (min-width: 1300px) {
    height: $header_height;
  }

  background-color: $header_color;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);

  .centered {

    @media screen and (min-width: 1300px) {
      position: absolute;
      top: 13px;
      right: 50px;
    }

    @media screen and (max-width: 1300px) {
      position: absolute;

      top: 1vh;
      left: 2vw;

      display: none;
    }

    .group {
      position: relative;
      width: 100%;

      @media screen and (min-width: 1300px) {
        height: $searchbar_width / 5;
      }

      @media screen and (max-width: 1300px) {
        height: 6vh;
      }

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

        @media screen and (min-width: 1300px) {
          font-size: $searchbar_width/15;
        }

        @media screen and (max-width: 1300px) {
          font-size: 5vh;
        }

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

    @media screen and (max-width: 1300px) {
      width: 7.5vh;
      height: 7.5vh;
      top: 50%;

      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);

      right: 20px;
    }

    @media screen and (min-width: 1300px) {
      width: 80px;
      height: 80px;
      top: 10px;
      left: 50%;
      transform: translate(-50%, 0);
    }

    z-index: 10;
  }

  ::selection {
    background: rgba($secondary-color, 0.3);
    transition: 0.3s ease;
  }

  #menuButtons {
    @media screen and (max-width: 1300px) {
      display: none;
    }

    position: absolute;
    height: 100%;
    top: 18px;
    left: 0;

    .dm {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 350px;
      top: 10px;
      color: #fff;
    }

    .game {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 250px;
      top: 10px;
      color: #fff;
    }

    .bell {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 150px;
      top: 10px;
      color: #fff;
    }

    .notification {
      position: absolute;
      height: 20px;
      width: 20px;
      left: 150px;
      color: white;
      border-radius: 20%;
      background-color: red;
      z-index: 10;
    }

    .home {
      position: absolute;
      width: $button_width;
      height: $button_height;
      left: 50px;
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

#footer {
  @media screen and (min-width: 1300px) {
    display: none;
  }

  position: fixed;

  bottom: 0;
  left: 0;

  width: 100%;
  height: 8.5vh;

  background-color: $header_color;

  z-index: 1000;

  .home {
    position: absolute;

    top: 1vh;

    left: 12.5vw;
    height: 7vh;
    width: 5vh;

    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);

    color: #fff;
  }

  .bell {
    position: absolute;

    top: 1vh;

    left: 37.5vw;
    height: 7vh;
    width: 5vh;

    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);

    color: #fff;
  }

  .game {
    position: absolute;

    top: 1vh;

    right: 37.5vw;
    height: 7vh;
    width: 5vh;

    transform: translateX(50%);
    -webkit-transform: translateX(50%);
    -moz-transform: translateX(50%);

    color: #fff;
  }

  .dm {
    position: absolute;

    top: 1vh;

    right: 12.5vw;
    height: 7vh;
    width: 5vh;

    transform: translateX(50%);
    -webkit-transform: translateX(50%);
    -moz-transform: translateX(50%);

    color: #fff;
  }
}

@media screen and (max-width: 1300px) {
  .pinkButton {
    position: fixed;

    bottom: 10.5vh;
    right: 6.5vw;

    width: 15vw;
    height: 15vw;

    line-height: 0px;
    border-radius: 50%;

    background-color: $accent_color;

    z-index: 1001;

    cursor: pointer;

    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);

    .fontPosition{
      margin-top:4.5vw;
      text-align: center;
      font-size: 10vw;
      color: #fff;
    }

  }
}

.back {
  position: absolute;

  left: 5px;
  top: 10px;

  width: 6.5vh;
  height: 6.5vh;

  color: #fff;

  cursor: pointer;

  display: none;
}


</style>
