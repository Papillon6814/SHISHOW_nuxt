<template>
  <div id="root">
    <tbody id="wrap">

      <header>
        <navi @search="getSearchWord"></navi>
      </header>

      <transition appear name="v">
        <div id="myBannerPosition">
          <myBanner
            v-if="userStatus"
            :loginedUser="getCurrentUserName"
            @callEditBanner="showEditBanner()"
            :user='signuser'
            :shishow='shishow'
            :deshi='deshi'>
          </myBanner>
        </div>
      </transition>

      <div id="moving">

        <transition appear name="v3">
          <div id="gameBannerPosition">
            <div v-for="N in games.length"
              :key="N" v-bind:class="'g'+N">
              <div @click="showGBModal(games[N-1])">
                <gameBanner
                  :game="games[N-1]"
                  :signuser="user"
                  :count="N-1">
                </gameBanner>
              </div>
            </div>
          </div>
        </transition>

        <transition appear name="v2">
          <div class="normalBannerPosition">
            <div v-for="(userinfo, N) in filteredUser"
              :key="N" v-bind:class="'n'+N">
              <normalBanner
                :user="filteredUser[N]"
                :signuser="signuser"
                :relations="relation[N]"
                @clickNB="NBclick(userinfo)"
                @clickReqButton="RBclick(userinfo,N)"
                ref="normal">
              </normalBanner>
            </div>
          </div>
        </transition>

        <div class="adPosition">
        </div>

      </div>

    </tbody>

    <!-- cropperのときのmodal -->

    <div class="modal">
      <div class="cropperPosition">
        <vue-cropper
          ref="cropper"
          :guides="true"
          :view-mode="2"
          drag-mode="crop"
          :aspectRatio="1 / 1"
          :auto-crop-area="0.5"
          :min-container-width="250"
          :min-container-height="180"
          :background="true"
          :rotatable="true"
          :src="uploadedImage"
          alt="Source Image"
          :img-style="{ 'width': '672px', 'height': '450px' }">
        </vue-cropper>
      </div>

      <div class="cropBtn" @click="cropImage()">
        Crop
      </div>
    </div>

    <!-- normalBannerを表示するときのmodal -->

    <div class="NBModal">
      <div class="modalPosition">
        <popupNormalBanner
          :userInfo="popupUser"
          @callFade="fadeOut()">
        </popupNormalBanner>
      </div>
    </div>

    <!-- gameBannerを表示するときのmodal -->

    <div class="GBModal">
      <div class="modalPosition">
        <popupGameBanner
        ref="popupGB"
        @callFade="fadeOut()">
        </popupGameBanner>
      </div>
    </div>

    <!-- フレンド申請を行うときのmodal -->

    <div class="selectModal">
      <div class="closeBtn" @click="fadeOut()">
        <font-awesome-icon icon="times" />
      </div>
      <div class="selectedBannerPosition">
        <div v-for="N in hisGames.length" :key="N"
        v-bind:class="'GameLoops'">
        <div @click="select(hisGames[N-1])">
          <gameBanner
            :game="hisGames[N-1]"
            :signuser="user"
            :count="N-1">
          </gameBanner>
        </div>
        </div>
      </div>
    </div>

    <!-- プロフィール編集を行うときのmodal -->

    <div class="editModal">
      <div class="editBannerPosition">
        <editBanner @close="fadeOut()"
        ref="EBanner"
        :roundimg='croppedimg'
        :user='signuser'>
        </editBanner>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import navi from "../components/NavigationBar.vue";
import myBanner from "../components/MyBanner.vue";
import normalBanner from "../components/NormalBanner.vue";
import gameBanner from "../components/GameBanner.vue";
import editBanner from "../components/EditBanner.vue";
import popupNormalBanner from "../components/PopupNormalBanner.vue";
import popupGameBanner from "../components/PopupGameBanner.vue";

import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();
const axios = require("axios");

let NBPosition;
let NBModal;
let GBModal;
let selectModal;
let editModal;
let modal;

export default {
  name: "home",

  head:{
    title:"home",
  },

  data: function() {
    return {
      users: [],
      searchWord: "",
      filteredUser: [],
      games: [],
      hisGames: [],
      currentUser: "",
      signuser: '',
      relation: [],
      popupUser: ' ',
      userId:' ',
      croppedimg:" ",
      uploadedImage:' ',
      shishow:0,
      deshi:0
    };
  },

  components: {
    navi,
    myBanner,
    normalBanner,
    gameBanner,
    editBanner,
    popupNormalBanner,
    popupGameBanner
  },

  watch: {
    uploadedImage: function(newval) {
      modal[0].style.display = 'block';
      this.$refs.cropper.replace(newval);
      console.log('watch image')
    }
  },

  computed: {
    user() {
      return this.$store.state.user.user;
    },
    userStatus() {
      return this.$store.state.user.status;
    },
    getCurrentUserName: function() {
      return this.$store.state.user.user.username;
    },

    getCurrentUserId: function() {
      return this.$store.state.user.user.uid;
    },
  },

  methods: {
    getSearchWord(word) {
      $nuxt.$router.push("/home");
    },

    scroll2top: function() {
      let scrollArea = document.getElementById('moving');
      scrollArea.scrollTo(0, 0);
    },

    cropImage: function() {
      console.log('cropImage');
      this.$refs.EBanner.croppedimg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      modal[0].style.display = 'none';
    },

    NBclick: function(userinfo) {
      console.log("NBclick");
      this.showNBModal();

      this.popupUser = userinfo;
    },

    RBclick: function(userinfo,N) {
      console.log("RBclick");
      this.hisGames = [];
      this.showSelectModal();

      db.collection("USER")
        .doc(userinfo.email)
        .collection("GAMES")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc1 => {
            this.hisGames.push(doc1);
          })
        })

        this.userId = N;
    },

    select: function(game) {
      this.$refs.normal[this.userId].sendFriendReq(game.id);
      this.fadeOut()
    },

    placeNB: function() {
      NBPosition = document.getElementsByClassName("normalBannerPosition");
      db.collection("GameCollection")
        .get()
        .then(query => {
          let i=0
          let j;

          while(i<3 && i<query.docs.length){

            let num = Math.floor(Math.random()*query.docs.length);

            for(j=0;j<i&&this.games[j].id != query.docs[num].id ;j++);
            if(j==i) {
              this.games.push(query.docs[num]);
              i++
            }

          }

          NBPosition[0].style.top = ((55 / 4) * (this.games.length + 1)) + "vw";

          this.$forceUpdate();
        })
    },

    showNBModal: function() {
      NBModal[0].style.display = "block";
      this.$forceUpdate();
    },

    showGBModal: function(game) {
      GBModal[0].style.display = "block";
      this.$forceUpdate();
      this.$refs.popupGB.gamedata = game;
    },

    showSelectModal: function() {
      selectModal[0].style.display = "block";
      this.$forceUpdate();
    },

    showEditBanner: function() {
      editModal[0].style.display = "block";
      console.log("showEditBanner");
      this.$refs.EBanner.setUser()
      this.$forceUpdate();
    },

    fadeOut: function() {
      NBModal[0].style.display = "none";
      GBModal[0].style.display = "none";
      selectModal[0].style.display = "none";
      editModal[0].style.display = "none";
      this.$forceUpdate();
    },

    setOtherUser:function(){
      var url = "https://us-central1-shishow-7cc37.cloudfunctions.net/api/homeData";

      axios.get(url, {
        params: {
          email: this.user.email
        }
      })
      .then(response => {
        this.users = response.data.users;
        this.filteredUser = response.data.filteredUser;
        this.relation = response.data.relation;
        console.log(this.filteredUser.length);
      })
      .catch(e => {
        console.log(e);
      })
    },

    getUser() {
      db.collection("USER")
      .doc(""+this.user.email)
      .get()
      .then(doc =>{
        this.signuser = doc.data();
      });
    },

    myBanner_created() {
      var email = this.$store.state.user.user.email;
      var shishowBox = 0;
      var deshiBox = 0;

          return db.collection("USER")
            .doc(""+email)
            .collection("friends")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc =>{
                    // doc.data() is never undefined for query doc snapshots
                    if(doc.data()["isSHISHOW"]){
                      shishowBox += 1;
                    }
                    else {
                      deshiBox += 1;
                    }
                });
                this.shishow = shishowBox;
                this.deshi = deshiBox;
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    },

    gameBanner_created(){
      db.collection("GameCollection")
        .get()
        .then(query => {
          let i=0
          let j;

          while(i<5 && i<query.docs.length) {

            let num = Math.floor(Math.random()*query.docs.length);

            for(j=0;j<i&&this.games[j].id != query.docs[num].id ;j++);
            if(j==i){
              this.games.push(query.docs[num]);
              i++
            }
          }
        })
    },
  },

  created:function() {
    this.getUser();
    this.setOtherUser();
    this.myBanner_created();
    this.gameBanner_created();
  },

  mounted: function() {
    modal = document.getElementsByClassName("modal");

    NBModal = document.getElementsByClassName("NBModal");
    GBModal = document.getElementsByClassName("GBModal");
    selectModal = document.getElementsByClassName("selectModal");
    editModal = document.getElementsByClassName("editModal");
  },

  fetch({store,redirect}) {
    if(store.state.init && store.state.user.user.email == null){
      redirect("/")
    }
  }
};

</script>

<style lang="scss" scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 20000;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .cropperPosition {
    position: absolute;

    height: auto;
    width: auto;

    top: 150px;
    left: 50vw;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  .cropBtn {
    position: absolute;

    width: 120px;
    height: 40px;

    bottom: 10vh;
    left: 50vw;

    color: $primary_text;

    border-radius: 15px;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    background-color: $accent_color;

    line-height: 40px;

    text-align: center;

    cursor: pointer;
  }
}

body {
  padding: 0;
  margin: 0;

  background-color: $dark_color;
}

#myBannerPosition {
  
  @media screen and (max-width: 1300px) {
    position: fixed;
    top: 8.5vh;
    width: 100%;
    height: 49vw;
  }

  @media screen and (min-width: 1300px) {
    position: fixed;
    top: 100px;
    width: 23%;
    height: calc(100% - 100px);
  }

  left: 0;

  z-index: 10000;
}

#moving {
  position: absolute;

  @media screen and (max-width: 1300px) {
    top: 45vw;
    /*left: 7.5vw;*/

    width: 100%/*calc(100% - 7.5vw)*/;
    background-color: #bdbdbd;

    overflow-x: hidden;
    overflow-y: visible;
    height: calc(100% - 45vw);
  }

  @media screen and (min-width: 1300px) {
    top: -30px;
    left: 23%;

    width: calc(100% - 23%);

    overflow-x: hidden;
    overflow-y: scroll;
    height: 100%;
  }

  $g: 1;

  #gameBannerPosition {
    position: absolute;

    left:1.5vw;
    height: auto;

    @while $g <= 5 {
      .g#{$g} {
        position: absolute;

        @media screen and (max-width: 1300px){
          top: (89vw / 3.5) * $g;
        }

        @media screen and (min-width: 1300px) {
          top: (55vw / 4) * $g;
        }

        /*left: 5%;*/

        /*width: 100%;*/
        height: $n_banner_height;

        transition: 0.1s;
      }

      $g: $g + 1;
    }
  }

  $i: 0;

  .normalBannerPosition {
    position: absolute;

    @media screen and (max-width: 1300px) {
      top: ((90vw / 3.5) * 6);
    }

    @media screen and (min-width: 1300px) {
      top: ((55vw / 4) * 6);
    }
    left: 1.5vw;

    /*width: 100%;*/
    height: 100%;

    @while $i <= 30 {

      .n#{$i} {
        position: absolute;
/*
        left: 2vw;

        /*width: 100%;*/

        @media screen and (max-width: 1300px) {
          top: ((90vw / 4) * $i);
          /*height: calc(85vw / 4.5);*/
        }

        @media screen and (min-width: 1300px) {
          top: ((55vw / 4) * $i);
          height: $n_banner_height;
        }

        transition: 0.1s;
      }

      $i: $i + 1;

    }

    .alphaSpace {
      position: absolute;

      left: 0;

      @media screen and (max-width: 1300px) {
        top: ((85vw / 4) * 31);
      }

      @media screen and (min-width: 1300px) {
        top: ((55vw / 4) * 31);
      }

      height: 140px;
      /*width: 100%;*/

      background-color: #000;//rgba(0, 0, 0, 0);
    }
  }

  .adPosition {
    position: absolute;

    right: 0vw;
    top: 350vw;

    width: 160px;
    height: 600px;

    @media screen and (max-width: 1300px) {
        width:100vw;
        display: none;
      }

  }
}


footer {
  position: absolute;

  top: 110%;
  left: 0;

  width: 100%;
  height: $footer_height;

  transition: .3s;

  padding-top: 100px;
}

.v-enter {
  transform: translate(-500px, 0);
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 1.2s 1.2s ease;
}

.v2-enter {
  transform: translate(-500px, 0);
  opacity: 0;
}

.v2-enter-to {
  opacity: 1;
}

.v2-enter-active {
  transition: all 1.2s 1.2s ease;
}

.v3-enter {
  transform: translate(-500px, 0);
  opacity: 0;
}

.v3-enter-to {
  opacity: 1;
}

.v3-enter-active {
  transition: all 1.2s 1.2s ease;
}

.NBModal {
  display: none;

  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .modalPosition {
    position: absolute;

    @media screen and (min-width: 1300px) {
      top: 300px;
      left: 50%;
      width: 65%;
    }

    @media screen and (max-width: 1300px){ 
      top: 10vh;
      left: 50%;
      width: 90%;
    }

    height: 100%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

.GBModal {
  display: none;

  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .modalPosition {
    position: absolute;

    @media screen and (min-width: 1300px) {
      top: 300px;
      width: 65%;
    }

    @media screen and (max-width: 1300px) {
      top: 10vh;
      width: 90%;
    }
    left: 50%;

    height: 100%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

.selectModal {
  display: none;

  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .closeBtn {
    position: fixed;

    top: 200px;
    right: 20vw;

    width: 30px;
    height: 30px;

    font-size: 30px;

    color: $secondary_text;
    cursor: pointer;
  }

  .selectedBannerPosition {
    position: absolute;

    @media screen and (min-width: 1300px) {
      top: 20vh;
      height: calc(100% - 40vh);
    }

    @media screen and (max-width: 1300px) {
      top: 10vh;
      height: calc(100% - 20vh);
    }

    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    width: $n_banner_width;
/*
    overflow-x: hidden;
    overflow-y: scroll;
*/
    z-index: 10002;

    .GameLoops {
      position: relative;

      width: 100%;
      height: $n_banner_height;

      margin-top: 1vw;
    }
  }
}

.editModal {
  display: none;

  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .editBannerPosition {
    position: absolute;

    @media screen and (min-width: 1300px) {
      top: 110px;
      left: 50%;
      width: 40%;
      height: calc(92% - 110px);
    }

    @media screen and (max-width: 1300px) {
      top: 10vh;
      left: 50%;
      width: 90vw;
      height: 80vh;
    }

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
  }
}
</style>
