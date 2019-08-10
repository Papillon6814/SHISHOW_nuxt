<template>
  <div class="signinBanner">
    <div class="LoginTitle"></div>

    <div class="drawnSpace">
    </div>

    <div class="usernamePosition">
      <input class="username" type="text" placeholder="E-mail" v-model="e_mail" />
    </div>

    <div class="divideLine"></div>

    <div class="passwordPosition">
      <input
        class="password"
        type="password"
        placeholder="PASSWORD"
        v-model="password"
        @keydown.enter="login"
      />
    </div>

    <nuxt-link to="/signup">
      <div class="signupArea">Sign up</div>
    </nuxt-link>

    <div class="signin_button" @click="login">
      Sign in
    </div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";
import store from "../store";
export default {
  name: "Signin",
  data: function() {
    return {
      username: "",
      password: "",
      e_mail: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignedIn;
    }
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.e_mail, this.password)
        .then(function(req) {
          req.user.getIdToken().then(token=>{
            console.log(token.toString())
          })
          alert("Signed in.");
          $nuxt.$router.push("/home");
        })
        .catch(()=> {
          alert('Could not signed in.');
        });
        let signinButton = document.getElementsByClassName('signin_button');
        signinButton[0].style.background = "#b2ebf2";
        signinButton[0].style.color= "#fff";
        this.$forceUpdate();
    },
  }
};
</script>

<style lang="scss" scoped>
.signinBanner {
  position: absolute;
  width: 48%;
  height: 480px;
  background-color: #fff;
  border-radius: 3px;
  transition: .3s;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  z-index: 2;
  .LoginTitle {
    padding: auto;
    color: #fff;
    background-color: $light_primary_color;
    height: 60px;
    text-align: center;
  }
  .drawnSpace {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 140px;
    background-color: #fafafa;
  }
  .usernamePosition {
    position: absolute;
    top: 210px;
    left: 50%;
    width: 65%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    .username {
      width:  100%; //$user_width
      height: 35px; //$user_height
    }
  }
  .passwordPosition {
    position: absolute;
    top: 290px;
    left: 50%;
    width: 65%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    .password {
      width: 100%; //$id_width
      height: 35px; //$id_height
    }
  }
  .signin_button {
    position: absolute;
    top: 350px;
    left: 50%;
    background: #fff;
    width: 30%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    display: inline-block;
    padding: 0.3em 1em;
    text-decoration: none;
    color: $primary_text;
    border: solid 2px $light_primary_color;
    border-radius: 3px;
    transition: .4s;
    text-align: center;
    cursor: pointer;
  }
  .signin_button:hover{
    background: $light_primary_color;
    color: #fff;
  }
  .divideLine {
    position: absolute;
    top: 268px;
    left: 10%;
    width: 80%;
    height: 4px;
    background-color: #fafafa;
  }
  .signupArea {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #fafafa;
    color: $primary_text;
    line-height: 55px;
    text-align: center;
    cursor: pointer;
  }
}
.signinBanner:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}
</style>
