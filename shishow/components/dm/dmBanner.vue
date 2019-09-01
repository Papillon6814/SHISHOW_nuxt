<template>

  <div class="dmBanner">
    <div>
    <img :src="iconPic" class="dmBannerIconPosition" />
    <div class="dmBannerName">
      {{ dmBannerUsername }}
    </div>
    <div class="dmTimeArea">
    </div>
    <div class="dmMsgArea">
      {{ dmMsg }}
    </div>
    </div>
    <div class="dmCover"></div>
  </div>

</template>

<script>

export default {
  name: 'dmBanner',

  props: [
    'dmBannerUsername',
    'dmMsg',
    'iconPic',
  ],
}

</script>

<style lang="scss" scoped>

.dmBanner {
  display: block;

  width: 88%;
  height: 120px;

  background-color: $dm_banner_color;

  cursor: pointer;

  .dmBannerIconPosition {
    position: absolute;

    top: 15px;
    left: 20px;

    width: $dm_icon_width;
    height: $dm_icon_width;

    // temporary color
    background-color: #fff;

    border-radius: 50%;
    border: solid;
    border-width: 1px;
    border-color: $window_flame;
  }

  .dmBannerName {
    position: absolute;

    top: 8px;
    left: 130px;

    width: 60%;
    height: 35px;

    font-size: 25px;
    // font-family: 'Noto Sans JP', sans-serif;

    text-align: left;
    }

  .dmMsgArea {
    position: absolute;

    bottom: 8px;
    left: 130px;

    width: 50%;
    height: 60px;

    font-family: 'Noto Sans JP', sans-serif;
  }

  .dmCover{
    position:absolute;
    width: 88%;
    height: 120px;
  }
}

.dmBanner:hover {
  background-color: $dm_banner_color_hover;
}



</style>
