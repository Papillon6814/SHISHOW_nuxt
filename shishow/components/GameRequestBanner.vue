<template>
  <div class="GameRequestBanner">
    <!--
      TODO: 著作権的な問題
    <span class="iconCirclePosition">
      <label>
        <div class="iconCircle">
          <img :src="croppedimg" class="gameIcon">
          <input hidden class="iconFile" type="file"
          @change="setImage" accept="image/*" name="image">
        </div>
      </label>
    </span>
    -->

    <div class="closeBtn" @click="fade()">
      <font-awesome-icon icon="times" />
    </div>

    <div class="GamenamePosition">
      <input class="Gamename" type="text" placeholder="Gamename"
        v-model="Gamename" required>
    </div>

    <div class="GameCategoryPosition">
      <select v-model="selected" class="category">
        <option selected disabled value="">カテゴリ...</option>
        <option v-for="(category, N) in categories" :value="category.type"
        :key="N">
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
      if(image != '') {
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
      }
      else {
        let tmpimg;

        db.collection("Image")
          .doc('GameSampleImage')
          .get()
          .then(doc => {
            tmpimg = doc.data().image;

            db.collection("GameCollection")
              .doc()
              .set({
                gamename: Gamename,
                category: this.selected,
                image: tmpimg,
                lastChatDate: ''
              })
          })
      }
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

  @media screen and (min-width: 1300px) {
    width: 100%;
    height: 450px;
  }

  @media screen and (max-width: 1300px) {
    width: 90vw;
    height: 80vh;
  }

  background-color: #fff;

  border-radius: 15px 15px 0 0;

  z-index: 2;

  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  .iconCirclePosition {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    @media screen and (min-width: 1300px) {
      height: 168px;
    }

    @media screen and (max-width: 1300px) {
      height: 22.5vw;
    }

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

    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    @media screen and (min-width: 1300px) {
      top: 220px;
      width: 65%;
    }

    @media screen and (max-width: 1300px) {
      top: 25vh;
      width: 80%;

      .category {
        font-size: 7vh;
        height: 10vh;
      }
    }

    height: $su_user_height;

    .arrow {
      position: absolute;

      @media screen and (min-width: 1300px) {
        top: 5px;
        right: 3%;
        font-size: 25px;
      }

      @media screen and (max-width: 1300px) {
        top: 1vh;
        right: 2vw;
        font-size: 7vh;
      }

      color: $primary_text;
    }
  }

  .GamenamePosition {
    position: absolute;

    left: 50%;

    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);

    @media screen and (min-width: 1300px) {
      top: 280px;
      width: 65%;
    }

    @media screen and (max-width: 1300px) {
      top: 45vh;
      width: 80%;
    }

    .Gamename {
      width: 100%;

      @media screen and (min-width: 1300px) {
        height: $su_user_height;
      }

      @media screen and (max-width: 1300px) {
        height: 10vh;
        font-size: 7vh
      }
    }
  }


  .create_button {
    position: absolute;

    @media screen and (min-width: 1300px) {
      top: 340px;
      width: 30%;
    }

    @media screen and (max-width: 1300px) {
      bottom: 13vh;
      width: 60vw;
      font-size: 3vh;
    }

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
