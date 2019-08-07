<template>
  <div class="GameRequestBanner">
    <span class="iconCirclePosition">
      <label>
        <div class="iconCircle">
          <div id="result"></div>
          <input hidden class="iconFile" type="file" @change="onFileChange">
        </div>
      </label>
    </span>

    <div class="closeBtn" @click="fade()">
      <i class="fas fa-times"></i>
    </div>

    <div class="GamenamePosition">
      <input class="Gamename" type="text" placeholder="Display Gamename"
        v-model="Gamename" required>
    </div>

    <div @click="gameCollection()" class="create_button">
      Create
    </div>

    <div class="drawnSpace"></div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";

const db = firebase.firestore();

export default{
  name:"GameRequestBanner",
  data(){
    return{
      Gamename: "",
      type: "",
      uploadedImage: "",
      roundimg: "",
    }
  },

  props: [
    'cropped'
  ],

  methods: {
    onFileChange(event) {

      //file変数定義
      let files = event.target.files || event.dataTransfer.files;
      if (files[0].type.match(/image/)) {

        this.showImage(files[0])

      }
    },

   showImage(file) {
      // FileReaderオブジェクトの変数を定義file、外部ファイルを読み込むのに使用
      let reader = new FileReader();
      // ファイルが読み込まれたとき、eventを引数とするアロー関数作動
      let place = this;
      reader.onload = event => {
        // htmlにファイルを反映
        this.uploadedImage = event.target.result;
        this.$emit('filechange',this.uploadedImage);
      };
      // 読み込み開始
      reader.readAsDataURL(file);
    },


   gameCollection: function(){
     if(this.Gamename == ""){
       alert('Fill in your Display Gamename!');
    } else {
      this.addToDatabase(this.Gamename, this.cropped);
      alert("Added a game.");
      this.fade();
    }
   },

   addToDatabase(Gamename, image){
    db.collection("GameCollection")
      .doc()
      .set({
        gamename: Gamename,
        image: image,
        lastChatDate: ''
     })
   },

   fade: function() {
     this.$emit("callFade");
   }
  },

  mounted: function(){
    this.modal = document.getElementById("modal");
  },
};
</script>

<style lang="scss" scoped>
.GameRequestBanner {
  position: absolute;

  width: 100%;
  height: 450px;

  background-color: #fff;

  z-index: 2;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  .iconCirclePosition {
    position: absolute;
    left: 40px;
    top: 40px;
    width: 140px;
    height: 140px;

    .iconCircle {
      width: 100%;
      height: 100%;

      background-color: #fff;

      border-radius: 15px;
      border-style: solid;
      border-width: 1px;

      cursor: pointer;

      #result {
        z-index: 7;
      }

      .iconFile {
        height: 100%;
        width: 100%;
        opacity: 0;

        cursor: pointer;
      }
    }
  }

  .closeBtn {
    position: absolute;

    right: 10px;
    top: 10px;

    width: 30px;
    height: 30px;

    font-size: 30px;

    z-index: 5;

    cursor: pointer;
  }

  .GamenamePosition {
    position: absolute;

    top: 250px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 65%;

    .Gamename {
      width: 100%;
      height: $su_user_height;
    }
  }


  .create_button {
    position: absolute;

    top: 330px;
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

    cursor: pointer;
  }

  .create_button:hover{
    background: $light_primary_color;
    color: #fff;
  }

  .drawnSpace {
    position: absolute;

    bottom: 0;
    left: 0;

    width: 100%;
    height: 60px;

    background-color: #fafafa;
  }
}


</style>
