<template>
  <div class="signin">
    <navi></navi>
    <div id="signinBannerPosition">
      <signinBanner></signinBanner>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navi from '../components/NavigationBar.vue'
import signinBanner from '../components/SigninBanner.vue'

export default {
  name: 'signin',
  components: {
    navi,
    signinBanner
  }
}

</script>

<style lang="scss">

body {
  padding: 0;
  margin: 0;

  width: 100%;

  overflow: hidden;

  background-color: $dark_color;
}

#signinBannerPosition {
  position: absolute;

  width: 100%;

  //temporary top
  top: 180px;
  left: 26%;
}

</style>
