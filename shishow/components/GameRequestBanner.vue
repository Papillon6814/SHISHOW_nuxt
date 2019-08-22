<template>
  <div class="GameRequestBanner">
    <span class="iconCirclePosition">
      <label>
        <div class="iconCircle">
          <img :src="croppedimg" class="gameIcon">
          <input hidden class="iconFile" type="file"
          @change="setImage" accept="image/*" name="image">
        </div>
      </label>
    </span>

    <div class="closeBtn" @click="fade()">
      <font-awesome-icon icon="times" />
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
      croppedimg: ""
    }
  },

  props: [
    'cropped'
  ],

  methods: {
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

   gameCollection: function(){
     if(this.Gamename == ""){
       alert('Fill in your Display Gamename!');
    } else {
      this.addToDatabase(this.Gamename, this.croppedimg);
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

  border-radius: 15px 15px 0 0;

  z-index: 2;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  .iconCirclePosition {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 168px;

    .iconCircle {
      width: 100%;
      height: 100%;

      background-color: #fff;

      border-radius: 15px 15px 0 0;
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

        border-radius: 15px 15px 0 0;
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

    text-align: center;

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
