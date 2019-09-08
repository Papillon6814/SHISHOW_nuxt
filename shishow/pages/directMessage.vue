<template>
  <div id="DirectMessage">
    <navi ref="nav"></navi>
    <div class="dmPosition">
      <dmField></dmField>
    </div>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue'
import dmField from '../components/dm/DirectMessageField.vue'

export default {
  name: 'directMessage',

  head:{
    title:"message",
  },

  components: {
    navi,
    dmField
  },

  mounted: function() {
    if(process.browser) {
      if(window.innerWidth < 1300) {
        this.$refs.nav.showBackArrow();
      }
    }
  },

  methods: {
    scroll2top: function() {
      //do nothing
    },
  },

  fetch({store,redirect}){
    if(store.state.init && store.state.user.user.email == null){
      redirect("/")
    }
  }
}

</script>

<style lang='scss' scoped>

body {
  height: 100%;
  width: 100%;

  overflow-y: hidden;
}
</style>
