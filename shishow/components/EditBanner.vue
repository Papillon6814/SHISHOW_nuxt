<template>
  <div class="editBanner">

    <span class="iconCirclePosition">
      <label>
        <div class="iconCircle">
          <img :src="croppedimg" class="gameIcon">
          <input hidden class="iconFile" type="file"
          @change="setImage" accept="image/*" name="image">
        </div>
      </label>
    </span>

    <div class="closeBtn" @click="close()">
      <font-awesome-icon icon="times"/>
    </div>

    <input class="favoriteGame" type="text"
      maxlength="30" v-model="favoriteGame"
      placeholder="favorite game" />


    <input class="username" type="text"
      maxlength="12" v-model="username"/>

    <input class="placeGames" type="text"
      v-model="enumGames" readonly="readonly" />

    <div class="bioPosition">
      <textarea v-model="userBio" :rows="rows()"

        maxlength="50"></textarea>
    </div>

    <div class="applyChangeButton" @click="apply()">
      Apply
    </div>

    <nuxt-link to="/terms">
      <div class="terms">!</div>
    </nuxt-link>

    <nuxt-link to="/privacypolicy">
      <div class="privacyPolicy">?</div>
    </nuxt-link>

  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();
let currentUser;
export default {
  name: "EditBanner",

  data: function() {
    return {
      croppedimg: '',
      username: '' + this.user.username,
      userBio: '' + this.user.bio,
      enumGames: ' ',
      favoriteGame: ' ',
      value: ' ',
      uploadedImage: ' '
    }
  },

  props:[
    'user'
  ],

  methods: {
    rows: function() {
      var num = this.userBio.split("\n").length;
      return (num > 3) ? 3 : num;
    },

    setImage: function(e) {
      const file = e.target.files[0];

      if(!file.type.includes('image/')) {
        alert('Invalid file type!');
        return;
      }

      if (typeof FileReader == 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.$parent.uploadedImage = event.target.result;
        };

        reader.readAsDataURL(file);

      } else {
        alert('Your browser does not support FileReader.');
      }
    },

    close: function() {
      console.log(this.username)
      this.$emit("close");
    },

    loadGames: function() {
      db.collection("USER")
        .doc(currentUser.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            this.enumGames += doc1.data().gamename + ' / '
          })
          this.enumGames = this.enumGames.slice(0, -2);
        })
    },

    apply: function() {
      if(this.croppedimg == '') {
        db.collection("USER")
          .doc(currentUser.email)
          .update({
            username: this.username,
            bio: this.userBio,
            favoriteGame: this.favoriteGame
          })
          .then(() => {
            this.$router.go({
              path: this.$router.currentRoute.path, force: true
            });
          })
      } else {
        db.collection("USER")
          .doc(currentUser.email)
          .update({
            username: this.username,
            bio: this.userBio,
            favoriteGame: this.favoriteGame,
            image: this.croppedimg
          })
          .then(() => {
            location.reload();
          })
      }
    },

    setUser(){
      this.username = this.user.username;
      this.userBio = this.user.bio;
      this.favoriteGame = this.user.favoriteGame;
    }
  },

  created:function(){
    currentUser = firebase.auth().currentUser;
    if (currentUser == null) {
      currentUser = this.$store.state.user.user;
    }

    // ユーザーネーム取得
    db.collection("USER")
      .doc(""+currentUser.email)
      .get()
      .then(doc1 => {
        this.username = doc1.data().username;
        this.userBio = doc1.data().bio;
        this.favoriteGame = doc1.data().favoriteGame;
    })

    // アイコンをcroppedimgに格納
    db.collection("USER")
      .doc(""+currentUser.email)
      .get()
      .then(doc1 => {
        this.croppedimg = doc1.data().image;
      })
  },

  mounted: function(){
    this.modal = document.getElementById("modal");
    this.loadGames();
  },
}
</script>

<style lang="scss" scoped>
.iconCirclePosition {
    position: absolute;
    left: 7%;
    top: 5%;
    width: 140px;
    height: 140px;

    .iconCircle {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 50%;
      border-style: solid;
      border-width: 1px;
      cursor: pointer;

      .iconFile {
        height: 100%;
        width: 100%;
        opacity: 0;
        cursor: pointer;
      }

      .gameIcon {
        height: 100%;
        width: 100%;

        border-radius: 50%;
      }
    }
  }
// editBannerPositionに適した形に整形してあります
.editBanner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  input {
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    color: $primary_text;
  }
  textarea {
    border-top: none;
    border-left: none;
    border-right: none;
    resize: none;
    color: $primary_text;
    transition: 0.3s;
  }
  textarea:focus {
    outline: none;
  }
  .closeBtn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #bdbdbd;
    cursor: pointer;
  }
  .favoriteGame {
    position: absolute;
    top: 10%;
    right: 9%;
    height: 40px;
    width: 50%;
    font-size: 35px;
  }
  .username {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    height: 40px;
    width: 80%;
    font-size: 35px;
  }
  .placeGames {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    height: 40px;
    width: 80%;
    color: $secondary_text;
    font-size: 35px;
  }
  .applyChangeButton {
    position: absolute;
    bottom: 1vh;
    left: 50%;
    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    width: 120px;
    height: 30px;
    background-color: $accent_color;
    border-radius: 15px;
    color: $primary_text;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .bioPosition {
    position: absolute;
    top: 65%;
    left: 10%;
    width: 80%;
    height: auto;
    textarea {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
      font-size: 35px;
    }
  }

  .privacyPolicy {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 25px;
    height: 25px;
    font-size: 20px;
    color: white;
    border-radius: 50%;
    background-color: #212121;

    text-align: center;
  }

  .terms {
    position: absolute;
    right: 45px;
    bottom: 10px;
    width: 25px;
    height: 25px;
    font-size: 20px;
    color: white;
    border-radius: 50%;
    background-color: #212121;

    text-align: center;
  }
}
</style>
