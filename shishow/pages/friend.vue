<template>
  <div>
    <navi></navi>
    <div class="friend">
      <div class="tabWrapper">
        <div class="tab1" id="in" @click="I">
          承認
          <span style="color:white;"></span>
        </div>
        <div class="tab2" id="out" @click="O">申請</div>
        <div class="tab3" id="fri" @click="S">師匠</div>
        <div class="tab4" id="fri" @click="D">弟子</div>
        <div class="tabSpace"></div>

        <div class="whiteLine"></div>
      </div>

      <div class="mainobject" v-if="IOSD==0" style="background-color:white">
        <div v-for="N in income.length" :key="N" v-bind:class="'n'+N">
          <incoming :user="income[N-1].data()" :signuser="signuser"></incoming>
        </div>
      </div>

      <div class="mainobject" v-else-if="IOSD==1" style="background-color:white">
        <div v-for="N in outgo.length" :key="N" v-bind:class="'n'+N">
          <outgoing :user="outgo[N-1].data()" :signuser="signuser"></outgoing>
        </div>
      </div>

      <div class="mainobject" v-else-if="IOSD==2" style="background-color:white">
        <div v-for="N in shi.length" :key="N" v-bind:class="'n'+N">
          <friends :user="shi[N-1]" :signuser="signuser"></friends>
        </div>
      </div>

      <div class="mainobject" v-else-if="IOSD==3" style="background-color:white">
        <div v-for="N in de.length" :key="N" v-bind:class="'n'+N">
          <friends :user="de[N-1]" :signuser="signuser"></friends>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../plugins/firestore";
import "firebase/firestore";
import "@firebase/auth";

import navi from "../components/NavigationBar.vue";
import incoming from "../components/incoming.vue";
import outgoing from "../components/outgoing.vue";
import friends from "../components/friends.vue";
import store from "../store";

const db = firebase.firestore();

let tab1, tab2, tab3, tab4;
let whiteLine;

export default {
  name: "friend",

  data: function() {
    return {
      IOSD: 0,
      income: "",
      outgo: "",
      signuser: "",
      shi: [],
      de: []
    };
  },

  components: {
    incoming,
    outgoing,
    navi,
    friends
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    }
  },

  methods: {
    I() {
      this.IOSD = 0;

      tab1[0].style.color = "#212121";
      tab2[0].style.color = "#757575";
      tab3[0].style.color = "#757575";
      tab4[0].style.color = "#757575";

      whiteLine[0].style.left = "0px";

      this.$forceUpdate();
    },

    O() {
      this.IOSD = 1;

      tab1[0].style.color = "#757575";
      tab2[0].style.color = "#212121";
      tab3[0].style.color = "#757575";
      tab4[0].style.color = "#757575";

      whiteLine[0].style.left = "16%";

      this.$forceUpdate();
    },

    S() {
      this.IOSD = 2;

      tab1[0].style.color = "#757575";
      tab2[0].style.color = "#757575";
      tab3[0].style.color = "#212121";
      tab4[0].style.color = "#757575";

      whiteLine[0].style.left = "32%";

      this.$forceUpdate();
    },

    D() {
      this.IOSD = 3;

      tab1[0].style.color = "#757575";
      tab2[0].style.color = "#757575";
      tab3[0].style.color = "#757575";
      tab4[0].style.color = "#212121";

      whiteLine[0].style.left = "48%";

      this.$forceUpdate();
    },

    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit("onAuthStateChanged", user);
        store.commit("onUserStatusChanged", user.uid ? true : false);
      });
    },

    getDeshiData() {
      db.collection("USER")
        .doc(this.user.email)
        .collection("friends")
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (!doc.data().isSHISHOW) {
              this.de.push(doc.data());
            }
          });
        });
    },
    getIncomingData() {
      db.collection("USER")
        .doc(this.user.email)
        .collection("incoming")
        .onSnapshot(doc => {
          this.income = doc.docs;
        });
    },
    getOutgoingData() {
      db.collection("USER")
        .doc(this.user.email)
        .collection("outgoing")
        .onSnapshot(doc => {
          this.outgo = doc.docs;
        });
    },
    getFriendsData() {
      db.collection("USER")
        .doc(this.user.email)
        .collection("friends")
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().isSHISHOW) {
              this.shi.push(doc.data());
            }
          });
        });
    }
  },

  created: function() {
    this.onAuth();
    this.getIncomingData();
    this.getOutgoingData();
    this.getFriendsData();

    db.collection("USER")
      .doc(this.user.email)
      .get()
      .then(doc => {
        this.signuser = doc.data();
      });
    this.getDeshiData();
  },

  mounted: function() {
    tab1 = document.getElementsByClassName("tab1");
    tab2 = document.getElementsByClassName("tab2");
    tab3 = document.getElementsByClassName("tab3");
    tab4 = document.getElementsByClassName("tab4");

    whiteLine = document.getElementsByClassName("whiteLine");
  }
};
</script>


<style lang="scss">
.friend {
  position: absolute;

  width: 100%;
  height: calc(100% - 200px);

  top: 100px;

  $i: 1;
  @while $i <= 30 {
    .n#{$i} {
      padding-top: 10px; /* + (200px * $i);*/
      padding-bottom: 10px;
    }
    $i: $i + 1;
  }
}

.tabWrapper {
  position: absolute;

  top: 0;
  left: 10%;

  width: 80%;
  height: 100px;

  margin: 0 auto;

  .tab1 {
    position: absolute;

    left: 0;

    width: 16%;
    height: 100%;

    font-size: 30px;
    line-height: 90px;
    color: $primary_text;

    background-color: $light_primary_color;
    text-align: center;

    cursor: pointer;
  }

  .tab2 {
    position: absolute;

    left: 16%;

    width: 16%;
    height: 100%;

    font-size: 30px;
    line-height: 90px;
    color: $secondary_text;

    background-color: $light_primary_color;
    text-align: center;

    cursor: pointer;
  }

  .tab3 {
    position: absolute;

    left: 32%;

    width: 16%;
    height: 100%;
    float: left;

    font-size: 30px;
    line-height: 90px;
    color: $secondary_text;

    background-color: $light_primary_color;
    text-align: center;

    cursor: pointer;
  }

  .tab4 {
    position: absolute;

    left: 48%;

    width: 16%;
    height: 100%;
    float: left;

    font-size: 30px;
    line-height: 90px;
    color: $secondary_text;

    background-color: $light_primary_color;
    text-align: center;

    cursor: pointer;
  }

  .tabSpace {
    position: absolute;

    right: 0;
    top: 0;

    width: 36%;
    height: 100%;

    background-color: $light_primary_color;
  }

  .whiteLine {
    position: absolute;

    bottom: 0;
    left: 0;

    width: 16%;
    height: 5px;

    background-color: #fff;
    z-index: 2;

    transition: 0.3s;
  }
}

.mainobject {
  position: absolute;

  top: 100px;
  left: 10%;

  width: 80%;
  height: 100%;

  margin: 0 auto;

  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
