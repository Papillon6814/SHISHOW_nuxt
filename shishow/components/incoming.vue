<template>
  <div class="incoming">
    <span class="iconPicPosition">
      <div class="iconPic">
        <img id="image" :src="user['image']" />
      </div>
    </span>

    <div class="usernamePosition">
      <div class="username">
        {{user["username"]}}
      </div>
    </div>

    <div class="n_btn-circle-3d" @click="accept">許可</div>
  </div>
</template>

<script>
import firebase from '../plugins/firestore'
import 'firebase/firestore'
import '@firebase/auth'

const db = firebase.firestore();

export default {
  name: 'incoming',

  props:[
    "user",
    "signuser"
  ],

  methods: {
    accept: function() {

      // 自分のドキュメント
      const sign_db = db.collection("USER")
                        .doc(this.signuser.email);
      // 相手のドキュメント
      const user_db = db.collection("USER")
                        .doc(this.user.email);

      let now = new Date();

      db.collection("PrivateChat")
              .add({
                email1: this.signuser.email,
                email2: this.user.email
              })
              .then(doc1 => {

                      sign_db.collection("incoming")
                            .doc(this.user.email)
                            .delete()
                            .then(()=>{

                              sign_db.collection("friends")
                                      .doc(this.user.email)
                                      .set({
                                        username: this.user.username,
                                        email: this.user.email,
                                        chatID: doc1.id,
                                        lastChatDate: now,
                                        isSHISHOW: false
                                      });

                              sign_db.collection("incoming")
                                      .get()
                                      .then(doc2 =>{
                                        this.$parent.income = doc2.docs;
                                      }).catch(()=>{
                                        this.$parent.income = "";
                                      })

                              sign_db.collection("friends")
                                      .get()
                                      .then(doc2 => {
                                        this.$parent.fri = doc2.docs;
                                      }).catch(()=>{
                                        this.$parent.fri = "";
                                      })
                            }).catch(() => {

                            });

                  user_db.collection("outgoing")
                          .doc(this.signuser.email)
                          .delete()
                          .then(()=>{

                            user_db.collection("friends")
                                  .doc(this.signuser.email)
                                  .set({
                                    username: this.signuser.username,
                                    email: this.signuser.email,
                                    chatID: doc1.id,
                                    lastChatDate: now,
                                    isSHISHOW: true
                                  })
                          })

                  db.collection("USER")
                    .doc(this.user.email)
                    .collection("relation")
                    .doc(this.signuser.email)
                    .set({
                      relation: 3,
                    })

                  db.collection("USER")
                    .doc(this.signuser.email)
                    .collection("relation")
                    .doc(this.user.email)
                    .set({
                      relation: 4,
                    })

                  user_db.collection("notice")
                          .doc(this.signuser.email)
                          .set({
                            msg:this.signuser.username + "とフレンドになりました。",
                            date:new Date()
                          })

                  sign_db.collection("notice")
                          .doc(this.user.email)
                          .get()
                          .then(doc=>{
                            if(doc.exists){
                              sign_db.collection("notice")
                                    .doc(this.user.email)
                                    .delete();
                            }
                          })
              })
    }
  }
}

</script>

<style lang="scss" scoped>
  .incoming {
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
      font-size: 25px;
      text-align: left;
    }

    .usernamePosition{
      position: absolute;

      top: 20px;
      left: 165px;
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
      background: #ffb300;
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

  .incoming:hover{
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
</style>
