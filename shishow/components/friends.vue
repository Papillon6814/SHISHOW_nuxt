<template>
  <div class="outgoing" >
    <span class="iconPicPosition">
      <div class="iconPic">
        <img id="image" :src="user['image']" />
      </div>
    </span>

    <div class="usernamePosition">
      <div class="username">
        {{user.username}}
      </div>
    </div>

    <div v-if="signuser">
      <div class="n_btn-circle-3d" @click="deleteFriend">削除</div>
    </div>
  </div>

</template>

<script>
import firebase from '../plugins/firestore'
import 'firebase/firestore'
import '@firebase/auth'

const db = firebase.firestore();

export default {
  name: 'friends',

  props:[
    "user",
    "signuser"
  ],

  methods: {
    deleteFriend: function() {

      const sign_db = db.collection("USER")
                        .doc(this.signuser.email);
      const user_db = db.collection("USER")
                        .doc(this.user.email)

      user_db.collection("friends")
              .doc(this.signuser.email)
              .delete()
              .then(() => {
               //pass
              })

      sign_db.collection("friends")
              .doc(this.user.email)
              .delete()
              .then(()=>{
                sign_db.collection("friends")
                      .get()
                      .then(doc=>{
                        this.$parent.fri = doc.docs;
                      }).catch(()=>{
                        this.$parent.fri = "";
                      })
              })
              .catch(() => {

              });

      db.collection("USER")
        .doc(this.user.email)
        .collection("relation")
        .doc(this.signuser.email)
        .delete()

      db.collection("USER")
        .doc(this.signuser.email)
        .collection("relation")
        .doc(this.user.email)
        .delete()

      user_db.collection("notice")
              .doc(this.signuser.email)
              .delete();
    },
  }
}

</script>

<style lang="scss" scoped>
  .outgoing {

    position: relative;

    width: $f_banner_width;
    //temporary height
    height: $f_banner_height;

    background-color: #dbdbdb;

    z-index: 2;

    margin: 0px auto;

    transition: 0.3s;

    .iconPic {
      width: $n_icon_width;
      height: $n_icon_height;

      //temporary color
      background-color: #fff;

      border-radius: 50%;
    }

    #image{
      width: $n_icon_width;
      height: $n_icon_height;
      border-radius:50%;
    }

    .iconPicPosition {
      position: absolute;

      top: 15px;
      left: 33px;
    }

    .username{
      width: $user_width;
      height: $n_user_height;

      text-align: left;
      font-size: 25px;
    }

    .usernamePosition{
      position: absolute;

      top: 20px;
      left: 10%;
      right: 0px;
    }

    .profile{
      width: $profile_width;
      height: $n_profile_height;

      background-color: #fff;
    }

    .profilePosition{
      position: absolute;

      top: 95px;
      left: 172px;
      right: 25px;
    }

    .n_btn-circle-3d {
      position: absolute;
      top: 15px;
      right: 20px;
      display: inline-block;
      text-decoration: none;
      background: #ffc107;
      color: #fff;
      width: 150px;
      height: 60px;
      line-height: 63px;
      border-radius: 50%;
      text-align: center;
      font-weight: bold;
      overflow: hidden;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
      border-bottom: solid 3px #ffb300;
      transition: .4s;

      cursor: pointer;
    }

    .n_btn-circle-3d:active {
      -webkit-transform: translateY(2px);
      transform: translateY(2px);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
      border-bottom: none;
    }

    /*.editBioButton{

    }*/
  }

  .outgoing:hover{
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
</style>
