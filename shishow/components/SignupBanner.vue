
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
    <div class="usernamePosition">
      <input class="username" type="text" placeholder="ユーザー名"
      v-model="username" maxlength="12" required />
    </div>

    <div class="emailPosition">
      <input class="email" type="text" placeholder="メールアドレス" v-model="email" />
    </div>

    <div class="passwordPosition">
      <input class="password" type="password" placeholder="パスワード" v-model="password" />
    </div>

  <div class="comfirmPosition">
    <input
      class="passwordConfirm"
      type="password"
      placeholder="パスワード確認"
      v-model="p_confirm"
      @keydown.enter="signUp"
    >
  </div>

  <div class="checkPosition">
      <input class="check" type="checkbox" value="accept">
  </div>
  <div class="termsPosition">
    <nuxt-link to="/Terms">利用規約</nuxt-link>に同意する。
  </div>

  <div class="checkPositionPri">
    <input class="check" type="checkbox" value="privacy" />
  </div>
  <div class="privacyPosition">
    <nuxt-link class="check" to="/Terms">プライバシーポリシー</nuxt-link>
  </div>

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
      check:false,
      accept:false,
      privacy:false,
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
            else if(this.accept == false || this.privacy == false){
              alert('please check privacy');
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
  background-color: #fff;
  z-index: 2;
  transition: .3s;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1300px) {
    width: 70%;
    height: 65vh;

    border-radius: 3px;

    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

    top: 30%;
    left: -9%;
  }

  @media screen and (min-width: 1300px) {
    width: 48%;
    height: 510px;

    background-color: #fff;

    border-radius: 3px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }

  .SignupTitle {
    position: absolute;
    color: #fff;
    background-color: $light_primary_color;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
  }

    .usernamePosition {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 18%;
      width: 85%;
      height: 7.25%;
    }

    @media screen and (min-width: 1300px) {
      top: 90px;
      width: 65%;
    }

    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .username {
      width:  100%; //$user_width

      @media screen and (max-width: 1300px) {
        height: 100%;

        border-radius: 7px;
        outline: none;
        font-size: 1.5vh;
      }

      @media screen and (min-width: 1300px) {
        height: 35px;
      }
    }
  }

    .emailPosition {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 30%;
      width: 85%;
      height: 7.25%;
    }

    @media screen and (min-width: 1300px) {
      top: 160px;
      width: 65%;
    }

    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .email {
      width: 100%; //$id_width

      @media screen and (max-width: 1300px) {
        height: 100%;

        border-radius: 7px;
        outline: none;
        font-size: 1.5vh;
      }

      @media screen and (min-width: 1300px) {
        height: 35px; //$id_height
      }
    }
  }

      .passwordPosition {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 41%;
      width: 85%;
      height: 7.25%;
    }

    @media screen and (min-width: 1300px) {
      top: 230px;
      width: 65%;
    }

    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .password {
      width: 100%; //$id_width

      @media screen and (max-width: 1300px) {
        height: 100%;

        border-radius: 7px;
        outline: none;
        font-size: 1.5vh;
      }

      @media screen and (min-width: 1300px) {
        height: 35px; //$id_height
      }
    }
  }

    .comfirmPosition {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 52%;
      width: 85%;
      height: 7.25%;
    }

    @media screen and (min-width: 1300px) {
      top: 300px;
      width: 65%;
    }

    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    .passwordConfirm {
      width: 100%; //$id_width

      @media screen and (max-width: 1300px) {
        height: 100%;

        border-radius: 7px;
        outline: none;
        font-size: 1.5vh;
      }

      @media screen and (min-width: 1300px) {
        height: 35px; //$id_height
      }
    }
  }

  .checkPosition {
    position: absolute;

    // -moz-transform: translate(-50%, 0);

    @media screen and (max-width: 1300px) {
      top: 65%;
      width: 85%;
      height: 7.25%;
      left: -31%;
    }

    @media screen and (min-width: 1300px) {
      top: 371px;
      width: 65%;
      left: -13%;
    }

    .check {
      width: 100%; //$id_width

      @media screen and (max-width: 1300px) {
        height: 50%;
        border-radius: 7px;
      }

      @media screen and (min-width: 1300px) {
        height: 20px; //$id_height
      }
    }
  }

  .termsPosition{
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 65%;
      width: 85%;
      height: 7.25%;
      left: 58%;
      border-radius: 7px;
      outline: none;
      font-size: 1.5vh;
    }

    @media screen and (min-width: 1300px) {
      top: 370px;
      width: 65%;
      left: 55%;
    }


    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  .checkPositionPri {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 74%;
      width: 85%;
      height: 7.25%;
      left: -31%;
    }

    @media screen and (min-width: 1300px) {
      top: 411px;
      width: 65%;
      left: -13%;
    }

    //-webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    //transform: translate(-50%, 0);

    .check {
      width: 100%; //$id_width

      @media screen and (max-width: 1300px) {
        height: 50%;
        border-radius: 7px;
      }

      @media screen and (min-width: 1300px) {
        height: 20px; //$id_height
      }
    }
  }

  .privacyPosition{
    position: absolute;

    @media screen and (max-width: 1300px) {
      top:74%;
      width: 85%;
      height: 7.25%;
      left: 58%;
      border-radius: 7px;
      outline: none;
      font-size: 1.5vh;
    }

    @media screen and (min-width: 1300px) {
      top: 410px;
      width: 65%;
      left: 55%;
    }


    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
  
  .signup_button {
    position: absolute;
    left: 50%;
    background: #fff;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 50%;
    display: inline-block;
    padding: 0.3em 1em;
    text-decoration: none;
    color: $primary_text;
    border: solid 2px $light_primary_color;
    border-radius: 3px;
    transition: .4s;
    cursor: pointer;
    @media screen and (max-width: 1300px) {
      top:85%;
    }

    @media screen and (min-width: 1300px) {
      top:455px;
    }
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
