<template>
    <div>
        aaaaa
        <button @click="logout()">logout</button>
    </div>
</template>
<script>

import firebase from "~/plugins/firestore";
import "@firebase/auth";
import "firebase/firestore";

export default {
  methods:{
    logout(){
      firebase
        .auth()
        .signOut()
    }
  }
}
</script>



