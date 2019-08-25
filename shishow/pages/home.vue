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
              :user='signuser'>
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

    <div id="modal" class="modal">
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
         :gameInfo="popupGame"
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
        :user='user'
        ref="EBanner">
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
let NBPosition;
let NBModal;
let GBModal;
let selectModal;
let editModal;
let modal;

export default {
  name: "home",

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
      popupUser: '',
      popupGame: '',
      userId:'',
      croppedimg:"",
      uploadedImage:'',
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
      modal.style.display = 'block';
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

    cropImage: function() {
      console.log('cropImage');
      this.$refs.EBanner.croppedimg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      modal.style.display = 'none';
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
            if(j==i){
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
    },

    showSelectModal: function() {
      selectModal[0].style.display = "block";
      this.$forceUpdate();
    },

    showEditBanner: function() {
      editModal[0].style.display = "block";
      console.log("showEditBanner");
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
      const sign_db = db.collection("USER")
                      .doc(""+this.user.email);


      sign_db.collection("relation")
           .get()
           .then(docs_r=>{
           db.collection("USER")
             .get()
             .then(docs_p =>{
               docs_p.forEach(doc=>{
                 if(doc.data().email != this.user.email){
                   this.users.push(doc.data());
                   this.filteredUser.push(doc.data());

                   if(docs_r.docs){
                     let i;
                     for(i=0;i<docs_r.docs.length && doc.data().email != docs_r.docs[i].id;i++);
                     if(i==docs_r.docs.length){
                       this.relation.push(0)
                     }else{
                       this.relation.push(docs_r.docs[i].data().relation);
                     }
                   }else{
                     this.relation.push(0)
                   }
                  }
               })
             })
           });

    db.collection("USER")
      .doc(""+this.user.email)
      .get()
      .then(doc =>{
        this.signuser = doc.data();
      });
    }
  },

  created:function(){
    this.setOtherUser();
  },

  mounted: function() {
    modal = document.getElementById("modal");
    this.placeNB();

    NBModal = document.getElementsByClassName("NBModal");
    GBModal = document.getElementsByClassName("GBModal");
    selectModal = document.getElementsByClassName("selectModal");
    editModal = document.getElementsByClassName("editModal");
  },

};

</script>

<style lang="scss">
.modal {
  display: none;
  position: absolute;
  z-index: 20000;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
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
  width: 100%;

  background-color: $dark_color;

  overflow-x: hidden;
  overflow-y: scroll;
}

#myBannerPosition {
  position: fixed;
  top: 100px;
  left: 0;

  width: 23%;
  height: calc(100% - 100px);

  z-index: 1;
}

#moving {
  position: absolute;

  top: -30px;
  left: 27%;

  width: 100%;
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;

  #gameBannerPosition {
    position: absolute;

    width: 100%;
    height: auto;

    $g: 1;

    @while $g <= 5 {
      .g#{$g} {
        position: absolute;

        top: (55vw / 4) * $g;
        left: 0;

        width: 100%;
        height: $n_banner_height;

        transition: 0.1s;
      }

      $g: $g + 1;
    }
  }

  .normalBannerPosition {
    position: absolute;

    top: 100%;
    left: 0;

    width: 100%;
    height: 100%;

    $i: 1;

    @while $i <= 30 {

      $temporary_top: ((55vw / 4) * $i) !global;

      .n#{$i} {
        position: absolute;

        top: $temporary_top;
        left: 0;

        width: 100%;
        height: $n_banner_height;

        transition: 0.1s;
      }

      $i: $i + 1;
    }

    .alphaSpace {
      position: absolute;

      left: 0;
      top: 180px * 20;

      height: 140px;
      width: 100%;

      background-color: rgba(0, 0, 0, 0);
    }
  }

  .adPosition {
    position: absolute;

    right: 2vw;
    top: 100px;

    width: 160px;
    height: 600px;
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

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .modalPosition {
    position: absolute;

    top: 300px;
    left: 50%;

    width: 65%;
    height: 100%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

.GBModal {
  display: none;

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .modalPosition {
    position: absolute;

    top: 300px;
    left: 50%;

    width: 65%;
    height: 100%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
}

.selectModal {
  display: none;

  position: absolute;

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

    top: 300px;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    width: $n_banner_width;
    height: calc(100% - 300px);

    overflow-x: hidden;
    overflow-y: scroll;

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

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 10000;

  .editBannerPosition {
    position: absolute;

    top: 110px;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    width: 40%;
    height: calc(92% - 110px);
  }
}
</style>
