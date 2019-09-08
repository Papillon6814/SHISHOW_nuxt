<template>
  <div class="signup">
    <navi></navi>
    <div id="signupBannerPosition">
      <signupBanner></signupBanner>
    </div>
  </div>
</template>

<script>
// @ is an alias to /sonBar.vue'
import navi from '~/components/NavigationBar.vue'
import signupBanner from '~/components/SignupBanner.vue'
export default {
  name: 'signup',

  head:{
    title:"signout",
  },

  components: {
    navi,
    signupBanner
  }
}
</script>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  width:100%;
  height: 2000px;
  background-color: $dark_color;
  .signup{
    position: absolute;

    left: 0;
    top: 0;

    height: 100%;
    width: 100%;

    overflow: hidden;
    @media screen and (max-width: 1300px) {
      background-color: $dark_primary_color;
    }

    @media screen and (min-width: 1300px) {
      background-color: $dark_color;
    }
  }

}
#signupBannerPosition {
  position: absolute;
  width: 100%;
  //temporary top
  top: 20%;
  left: 25%;
}
</style>
