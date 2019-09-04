<template>
  <div class="signin">
    <div class="res">
      <navi></navi>
    </div>
    <div class="nres">
      <nuxt-link to="/">
        <img src="../assets/image/logoShishow.png"
          class="logo"/>
      </nuxt-link>
    </div>
    <div id="signinBannerPosition">
      <signinBanner></signinBanner>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navi from '~/components/EmptyNavigationBar.vue'
import signinBanner from '~/components/SigninBanner.vue'

export default {
  name: 'signin',
  head:{
    title:"signin",
  },

  components: {
    navi,
    signinBanner
  },



}

</script>

<style lang="scss" scoped>

body {
  padding: 0;
  margin: 0;

  overflow: hidden;

  .signin {
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

    .res {
      @media screen and (max-width: 1300px) {
        display: none;
      }

      overflow-y: hidden;
    }

    .nres {
      @media screen and (min-width: 1300px) {
        display: none;
      }
    }
  }
}

.logo {
  position: absolute;

  height: 110px;
  width: 110px;

  top: 50px;
  left: 50%;

  transform: translate(-50%, 0);
}

#signinBannerPosition {
  position: absolute;

  width: 100%;
  height: calc(100% - 180px);

  //temporary top
  top: 180px;

  @media screen and (max-width: 1300px) {
    left: 15%;
  }

  @media screen and (min-width: 1300px) {
    left: 26%;
  }

  overflow-y: hidden;
}

</style>
