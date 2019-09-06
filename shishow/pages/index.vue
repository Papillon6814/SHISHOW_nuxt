<template>
  <div id="root">
    <div id="prehome">
      <div class="topBar">
        <nuxt-link to="/signin">
          <div class="signin">
            ログイン
          </div>
        </nuxt-link>
      </div>

      <div class="topBar upperBar">
        <nuxt-link to="/signin">
        <div class="signin">
          ログイン
        </div>
        </nuxt-link>
      </div>

      <div class="page1">
        <img src="~/assets/image/part1.png" class="part1" />

        <div class="phrase1">
          SHISHOW
        </div>
        <div class="phrase2">
          師匠とゲームを上達させる
        </div>

        <div class="clause1">
          自分より強いプレイヤーを見つけて<br>
          切磋琢磨しよう<br>
          ゲームの世界を広げよう
        </div>

        <img src="~/assets/image/leaf.png" class="leaf" />

        <nuxt-link to="/home">
          <div class="enterButton" @click.prevent="checkUser()">
            はじめる
          </div>
        </nuxt-link>
      </div>

      <div class="page2">
        <img src="~/assets/image/part2.png" class="part2" />

        <div class="card1 card">
          <div class="step">STEP1</div>
          <img src="~/assets/image/step1only.png" class="cardPic" />
          <div class="cardtext">自分の好きなゲームを登録</div>
        </div>

        <div class="card2 card">
          <div class="step">STEP2</div>
          <img src="~/assets/image/step2only.png" class="cardPic" />
          <div class="cardtext">強いプレイヤーに弟子入り</div>
        </div>

        <div class="card3 card">
          <div class="step">STEP3</div>
          <img src="~/assets/image/step3only.png" class="cardPic3" />
          <div class="cardtext">メッセージでやりとり</div>
        </div>
      </div>

      <div class="page3">
        <div class="aboutus">
          About us
        </div>
        <img src="~/assets/image/part3.png" class="part3"/>
      </div>
    </div>

    <div id="prehome_mobile">
      <div class="topBar">
        <nuxt-link to="/signin">
          <div class="signin">ログイン</div>
        </nuxt-link>
      </div>

      <div class="page1">
        <img src="~/assets/image/mini1.png" class="mini1" />
        <img src="~assets/image/mini2.png" class="mini2" />

        <div class="passageBlock1">
          SHISHOW
        </div>
        <div class="passageBlock2">
          師匠とゲームを上達させる
        </div>
        <div class="passageBlock3">
          自分より強いプレイヤーを見つけて<br>
          切磋琢磨しよう<br>
          ゲームの世界を広げよう
        </div>
      </div>

      <div class="page2">
        <img src="~/assets/image/mini3.png" class="mini3" />
        <div class="how2use">
          はじめかた
        </div>
        <div class="card">
          <div class="section1">
            <img src="~/assets/image/step1only.png" class="pic" />
            <div class="clause">
              <div class="bold">STEP1.</div><br>
              自分の好きなゲームを登録<br>
            </div>
            <div class="goright" @click="go2()"></div>
          </div>

          <div class="section2">
            <div class="goleft" @click="go1()"></div>
            <img src="~/assets/image/step2only.png" class="pic" />
            <div class="clause">
              <div class="bold">STEP2.</div><br>
              強いプレイヤーに弟子入り<br>
            </div>
            <div class="goright" @click="go3()"></div>
          </div>

          <div class="section3">
            <div class="goleft" @click="go2()"></div>
            <img src="~/assets/image/step3only.png" class="pic" />
            <div class="clause">
              <div class="bold">STEP3.</div><br>
              メッセージでやりとり<br>
            </div>
          </div>
        </div>
      </div>

      <div class="page3">
        <img src="~/assets/image/mini4.png" class="mini4" />
        <div class="aboutus">
          About us
        </div>
        <div class="card"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

let topBar;
let section1, section2, section3;

export default {

  head:{
    title:"top",
  },

  name: 'prehome',

  data:function(){
    return{
      aaa:"",
      scrollY: 0
    }
  },

  watch: {
    scrollY: function(newval) {
      console.log(newval);

      if(newval > 180) {
        //topBarを上から表示
        topBar[1].style.top = '0px';
        topBar[0].style.display = "none";
      }
      else {
        topBar[1].style.top = '-120px';
        topBar[0].style.display = 'block';
      }
    }
  },

  methods:{
    checkUser(){
      if(firebase.auth().currentUser){
        $nuxt.$router.push("/home")
      }else{
        $nuxt.$router.push("/signin")
      }
      console.log(firebase.auth().currentUser)
    },

    handleScroll: function() {
      console.log('handle')
      this.scrollY = window.scrollY;
    },

    go1: function() {
      section1[0].style.left = '0';
      section2[0].style.left = '100%';
      section3[0].style.left = '200%';
    },

    go2: function() {
      section1[0].style.left = '-100%';
      section2[0].style.left = '0';
      section3[0].style.left = '100%';
    },

    go3: function() {
      section1[0].style.left = '-200%';
      section2[0].style.left = '-100%';
      section3[0].style.left = '0';
    }
  },

  created:function(){
    this.$store.commit("user/onUserLogout")
    //console.log(this.aaa.email == null)
  },

  mounted: function() {
    window.addEventListener('scroll', this.handleScroll);
    topBar = document.getElementsByClassName('topBar');

    //レスポンシブの場合
    section1 = document.getElementsByClassName('section1');
    section2 = document.getElementsByClassName('section2');
    section3 = document.getElementsByClassName('section3');
  },

  asyncData({req,store}){
    return{
      aaa:store.state.user.user
    }
  },
}
</script>

<style lang="scss" scoped>
#prehome {
  background-color: #fafafa;

  @media screen and (max-width: 1300px) {
    display: none;
  }

  .topBar {
    position: absolute;

    top: 0;
    left: 0;

    width: 100vw;
    height: 60px;

    background: #fff;

    box-shadow: 0 2px 18px rgba(0, 0, 0, 0.8);

    z-index: 1;

    transition: .3s;

    .signin {
      position: absolute;

      right: 4vw;
      top: 50%;

      text-align: center;
      font-size: 14px;

      color: $primary_text;

      transform: translate(0, -50%);
      -webkit-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);

      cursor: pointer;
    }
  }

  .upperBar {
    position: fixed !important;

    top: -120px;
    transition: .3s;

    background: rgba(255, 255, 255, 0.7);
  }

  .page1 {
    .part1 {
      position: absolute;

      top: 0;
      left: 0;

      width: 100%;
      height: auto;
    }

    .phrase1 {
      position: absolute;

      top: calc(6vh + 60px);
      left: 11vw;

      width: 56vw;
      height: 8vh;

      color: #fff;
      font-size: 40px;
    }

    .phrase2 {
      position: absolute;

      top: calc(14vh + 60px);
      left: 11vw;

      width: 56vw;
      height: 9vh;

      color: #fff;
      font-size: 45px;
    }

    .clause1 {
      position: absolute;

      top: calc(23vh + 60px);
      left: 11vw;

      width: 56vw;
      height: 15vh;

      color: #757575;
      font-size: 20px;
    }

    .leaf {
      position: absolute;

      right: 23vw;
      top: calc(24vh + 6px);

      width: 230px;
      height: 230px;
    }

    .enterButton {
      position: absolute;

      left: 11vw;
      top: 360px;

      width: 150px;
      height: 42px;

      text-align: center;
      color: $primary_text;
      font-size: 18px;

      color: #fff;

      border-color: #fff;
      border-style: solid;
      border-radius: 15px;

      line-height: 37px;

      cursor: pointer;
    }
  }

  .page2 {
    .part2 {
      position: absolute;

      top: 140vh;
      left: 0;

      width: 100%;
    }

    .card {
      width: 22vw;
      height: 29vw;

      background-color: #fff;

      border-radius: 15px;

      -webkit-filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
    }

    .step {
      position: absolute;

      top: 15px;
      left: 20px;

      font-size: 20px;
    }

    .cardPic {
      position: absolute;

      bottom: 35%;
      right: 49%;

      transform: translate(50%, 0);
      -webkit-transform: translate(50%, 0);
      -ms-transform: translate(50%, 0);

      width: 50%;
    }

    .cardtext {
      position: absolute;

      left: 50%;
      top: 80%;

      height: 30%;
      width: 94%;

      transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);

      text-align: center;
      font-size: 18px;
    }

    .card1 {
      position: absolute;

      left: 10vw;
      top: 155vh;
    }

    .card2 {
      position: absolute;

      left: 40vw;
      top: 172vh;
    }

    .card3 {
      position: absolute;

      left: 70vw;
      top: 189vh;

      .cardPic3 {
        position: absolute;

        bottom: 29%;
        right: 42%;

        transform: translate(50%, 0);
        -webkit-transform: translate(50%, 0);
        -ms-transform: translate(50%, 0);

        width: 70%;
      }
    }
  }

  .page3 {
    .aboutus {
      position: absolute;

      top: 275vh;
      left: 3vw;

      font-size: 35px;
    }
    .part3 {
      position: absolute;

      top: 350vh;
      left: 0;

      width: 100%;
    }
  }
}

#prehome_mobile {
  background: #fafafa;

  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (min-width: 1300px) {
    display: none;
  }

  .topBar {
    position: fixed;

    left: 0;
    top: 0;

    width: 100vw;
    height: 60px;

    background: #fff;

    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);

    z-index: 2;

    .signin {
      position: absolute;

      right: 0%;
      top: 0;

      width: 140px;
      height: 60px;

      text-align: center;
      line-height: 60px;

      font-size: 20px;
    }
  }

  .page1 {
      position: absolute;

      width: 100vw;
      height: 100vh;

      .mini1 {
        position: absolute;

        right: 0;
        top: 0;

        width: 40vh;

        z-index: -1;
      }

      .mini2 {
        position: absolute;

        left: 0;
        top: 50vh;

        width: 50vh;

        z-index: -1;
      }

      .passageBlock1 {
        position: absolute;

        top: 110px;
        left: 5vw;

        width: 80vw;
        height: 10vh;

        font-size: 45px;
      }

      .passageBlock2 {
        position: absolute;

        top: 180px;
        left: 6vw;

        width: 80vw;
        height: 30vh;

        font-size: 46px;
      }

      .passageBlock3 {
        position: absolute;

        top: 260px;
        left: 6vw;

        width: 80vw;
        height: 20vh;

        font-size: 25px;

        color: #757575;
      }
  }

  .page2 {
    width: 100vw;

    .mini3 {
      position: absolute;

      right: 0;
      top: 170vh;

      width: 40vh;
    }

    .how2use {
      position: absolute;

      top: 70vh;
      left: 50vw;

      transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);

      text-align: center;
      font-size: 45px;
    }
  }

  .page3 {
    .mini4 {
      position: absolute;

      top: 300vh;
      left: 0;

      width: 100vw;
    }

    .aboutus {
      position: absolute;

      top: 210vh;
      left: 50%;

      transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);

      text-align: center;
      font-size: 45px;
    }

    .card {
      position: absolute;

      top: 225vh;
      left: 50%;

      transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
    }
  }

  .card {
      position: absolute;

      top: 85vh;
      left: 50%;

      transform: translate(-50%, 0);
      -webkit-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);

      height: 400px;
      width: 60vw;

      background: #fff;

      border-radius: 15px;

      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);

      overflow-x: hidden;
      overflow-y: hidden;

      .bold {
        font-weight: bold;
      }

      .goleft {
        position: absolute;

        left: 0;
        top: 0;

        width: 50%;
        height: 100%;

        cursor: pointer;

        z-index: 2;
      }

      .goright {
        position: absolute;

        right: 0;
        top: 0;

        width: 50%;
        height: 100%;

        cursor: pointer;

        z-index: 2;
      }

      .section1 {
        position: absolute;

        top: 0;
        left: 0;

        height: 100%;
        width: 100%;

        transition: .3s;

        .pic {
          position: absolute;

          top: 24%;
          left: 7vw;

          width: 200px;
        }

        .clause {
          position: absolute;

          left: 30vw;
          top: 25%;

          width: 45%;
          height: 365px;

          font-size: 20px;
        }
      }

      .section2 {
        position: absolute;

        top: 0;
        left: 100%;

        width: 100%;
        height: 100%;

        transition: .3s;

        .pic {
          position: absolute;

          top: 24%;
          left: 7vw;

          width: 200px;
        }

        .clause {
          position: absolute;

          left: 30vw;
          top: 25%;

          width: 45%;
          height: 365px;

          font-size: 20px;
        }
      }

      .section3 {
        position: absolute;

        left: 200%;
        top: 0;

        width: 100%;
        height: 100%;

        transition: .3s;

        .pic {
          position: absolute;

          top: 24%;
          left: 7vw;

          width: 200px;
        }

        .clause {
          position: absolute;

          left: 30vw;
          top: 25%;

          width: 45%;
          height: 365px;

          font-size: 20px;
        }
      }
    }
}
</style>
