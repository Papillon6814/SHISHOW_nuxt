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

    <div class="GameCategoryPosition">
      <select v-model="selected">
        <option selected disabled value="">カテゴリ...</option>
        <option v-for="category in categories" :value="category.type">
          {{ category.name }}
        </option>
      </select>

      <div class="arrow">
        <font-awesome-icon icon="angle-down" />
      </div>
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
      croppedimg: "",

      categories: [
        {id: 1, name: 'MMO',            type: 'mmo'},
        {id: 2, name: 'RPG',            type: 'rpg'},
        {id: 3, name: 'アクション',       type: 'action'},
        {id: 4, name: 'アドベンチャー',    type: 'adventure'},
        {id: 5, name: 'カジュアル',       type: 'casual'},
        {id: 6, name: 'シミュレーション',  type: 'simulation'},
        {id: 7, name: 'ストラテジー',     type: 'strategy'},
        {id: 8, name: 'スポーツ',         type: 'sport'},
        {id: 9, name: 'レース',          type: 'race'},
      ],

      selected: ''
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
        category: this.selected,
        image: image,
        lastChatDate: ''
     })
     .catch(e => {
       alert(e)
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

select {
  outline: none;

  width: 100%;
  height: 100%;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  border:1px solid #ddd;

  option {
    background-color: #fff;
  }
}

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

  .GameCategoryPosition {
    position: absolute;

    top: 220px;
    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    width: 65%;
    height: $su_user_height;

    .arrow {
      position: absolute;

      top: 5px;
      right: 3%;

      font-size: 25px;
      color: $primary_text;
    }
  }

  .GamenamePosition {
    position: absolute;

    top: 280px;
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

    top: 340px;
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
