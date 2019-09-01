
<template>
  <div class="signupBanner">

    <!-- hidden area -->
    <!--
    <div id="modal" class="modal">
      <div class="modal-content">
        <div class="modal-body">
          <img id="image" v-show="uploadedImage" :src="uploadedImage">
          <button id="button" type="button">Confirm</button>
          <input type="button" id="closeBtn" value="close">
        </div>
      </div>
    </div>
    -->

    <div class="SignupTitle"></div>

    <input class="username" type="text" placeholder="ユーザー名"
    v-model="username" maxlength="12" required />

    <input class="email" type="text" placeholder="メールアドレス" v-model="email">

    <input class="password" type="password" placeholder="パスワード" v-model="password">

    <input
      class="passwordConfirm"
      type="password"
      placeholder="パスワード確認"
      v-model="p_confirm"
      @keydown.enter="signUp"
    >

    <button @click="signUp" class="signup_button">
      アカウント作成
    </button>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
const db = firebase.firestore();
let countUsers = 0;
//使用するオリジナルの関数を定義
export default {
  //名前定義
  name: "signupBanner",
  //templateで使用する変数を定義
  data() {
    return {
      username: "",
      email: "",
      password: "",
      p_confirm: "",
      uploadedImage: "",
      roundimg:"",
      modal: "",
    };
  },
  mounted:function(){
    this.modal = document.getElementById("modal");
  },
  methods: {
    signUp: function() {
      let url;
      db.collection("USER")
        .get()
        .then(query => {
          query.forEach(() => {
            countUsers++;
          })
          if(!this.roundimg){
            if(countUsers % 2 == 0) {
              db.collection("Image")
                .doc("SampleImage2")
                .get()
                .then(doc =>{
                  url = doc.data()["image"];
                })
            } else {
              db.collection("Image")
                .doc("SampleImage")
                .get()
                .then(doc => {
                  url = doc.data()["image"];
                })
            }
          }
          if(this.username == "") {
            alert('Fill in your Display Name!');
          } else {
            if(this.p_confirm != this.password) {
              alert('Password does not match!');
            }
            else if(this.errorIndication());
            else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((req) => {
                  sessionStorage.setItem("shishow_user_email",req.user.email)
                  sessionStorage.setItem("shishow_user_name",req.user.displayName)
                  sessionStorage.setItem("shishow_user_uid",req.user.uid)
                  var User = firebase.auth().currentUser;
                  var email;
                  User.updateProfile({
                    displayName: this.username
                  }).then(() => {
                    //変数に情報を格納
                    email = User.email;
                    alert("Create account: " + email);
                    if (!this.roundimg) {
                      this.roundimg = url;
                    }
                    this.addToDatabase(this.email.toLowerCase(), this.username, this.roundimg);
                    $nuxt.$router.push("/home")
                  });
                })
                .catch(error => {
                  alert(error.message);
                });
              }
          }
        })
    },
    addToDatabase(email, username, image) {
      db.collection("USER")
      .doc(""+email)
      .set({
          email: email,
          username: username,
          favoriteGame: '',
          image: image,
          bio: 'No bio'
      })
    },
    errorIndication() {
      if (!this.email) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.signupBanner {
  position: absolute;
  width: 50%;
  height: 500px;
  background-color: #fff;
  z-index: 2;
  transition: .3s;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  .SignupTitle {
    position: absolute;
    color: #fff;
    background-color: $light_primary_color;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
  }
  .username {
    position: absolute;
    left: 50%;
    top: 110px;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 65%;
    height: $su_user_height;
  }
  .email {
    position: absolute;
    top: 180px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 65%;
    height: $su_user_height;
  }
  .password {
    position: absolute;
    top: 250px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 65%;
    height: $su_pass_height;
  }
  .passwordConfirm {
    position: absolute;
    top: 320px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 65%;
    height: $su_pass_height;
  }
  .signup_button {
    position: absolute;
    top: 410px;
    left: 50%;
    background: #fff;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 40%;
    display: inline-block;
    padding: 0.3em 1em;
    text-decoration: none;
    color: $primary_text;
    border: solid 2px $light_primary_color;
    border-radius: 3px;
    transition: .4s;
    cursor: pointer;
  }
  .signup_button:hover{
    background: $light_primary_color;
    color: #fff;
  }
}
.signupBanner:hover{
  box-shadow: 3px 3px 3px  rgba(0, 0, 0, 0.3);
}
#result{  //cropper
  z-index: 7;
}
//modal
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: white;
  width: 500px;
  margin: 40% auto;
}
</style>
