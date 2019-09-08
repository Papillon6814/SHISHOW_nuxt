<template>
  <div class="signinBanner">
    <div class="LoginTitle"></div>

    <div class="drawnSpace">
    </div>

    <div class="loginPosition">
      <img class="logo" src="../assets/image/login.png"
      alt="door"/>
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
      <div class="signup_button">Sign up</div>
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
          sessionStorage.setItem("shishow_user_email",req.user.email)
          sessionStorage.setItem("shishow_user_name",req.user.displayName)
          sessionStorage.setItem("shishow_user_uid",req.user.uid)

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

  transition: .3s;
  z-index: 2;

  @media screen and (max-width: 1300px) {
    width: 70%;
    height: 50vh;

    background-color: #fff;

    border-radius: 3px;

    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  }

  @media screen and (min-width: 1300px) {
    width: 48%;
    height: 480px;

    background-color: #fff;

    border-radius: 3px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  }

  .LoginTitle {
    padding: auto;
    color: #fff;
    background-color: $light_primary_color;
    height: 60px;
    text-align: center;
    border-radius: 7px 7px 0 0;
  }

  @media screen and (min-width: 1300px) {
    .drawnSpace {
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      height: 140px;
      background-color: #fafafa;
    }
  }

  .logo{
    position: absolute;
    @media screen and (max-width: 1300px) {
      display: none;
    }

    @media screen and (min-width: 1300px) {
      width: 100px;
      height: 100px;
      top: 8vh;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }

  .usernamePosition {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 25%;
      width: 85%;
      height: 11.25%;
    }

    @media screen and (min-width: 1300px) {
      top: 210px;
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
  .passwordPosition {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: 45%;
      width: 85%;
      height: 11.25%;
    }

    @media screen and (min-width: 1300px) {
      top: 290px;
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

  .signin_button {
    position: absolute;
    left: 50%;
    background: #fff;
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
    cursor: pointer;
    text-align: center;

    @media screen and (max-width: 1300px) {
      top: 81.5%;
      width: 50%
    }

    @media screen and (min-width: 1300px) {
      top:74%;
      width: 35%;
    }
  }

  .signin_button:hover{

    @media screen and (max-width: 1300px) {
      background: $light_primary_color;
      color: #fff;
      // TODO: ホバーのとき
    }

    @media screen and (min-width: 1300px) {
      background: $light_primary_color;
      color: #fff;
    }

  }

    .signup_button {
    position: absolute;
    left: 50%;
    background: #fff;
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
    cursor: pointer;
    text-align: center;

    @media screen and (max-width: 1300px) {
      top: 65.5%;
      width: 50%
    }

    @media screen and (min-width: 1300px) {
      top:86%;
      width: 35%;
    }
  }

  .signup_button:hover{

    @media screen and (max-width: 1300px) {
      background: $light_primary_color;
      color: #fff;
      // TODO: ホバーのとき
    }

    @media screen and (min-width: 1300px) {
      background: $light_primary_color;
      color: #fff;
    }

  }
}

.signinBanner:hover {
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 1300px) {
  .grayLine {
    height: 1px;
    background-color: $divider_color;

    width: 90%;
    margin-left: 5%;
  }

  .separetor1 {
    position: absolute;

    top: 75%;
    left: 3%;

    height: 1px;
    width: 30%;

    background-color: $divider_color;
  }

  .separetor2 {
    position: absolute;

    top: 75%;
    right: 3%;

    height: 1px;
    width: 30%;

    background-color: $divider_color;
  }

  .or {
    position: absolute;
    width: 60%;
    height: 30px;

    top: 70%;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    font-size: 30px;
    color: $secondary_text;

    text-align: center;
  }
}

</style>
