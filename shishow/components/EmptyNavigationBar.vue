<template>
  <div id="header">
    <img class="logo" src="../assets/image/logoShishow.png" />
  </div>
</template>

<script>

export default {
  name: 'emptyNavi'
}

</script>

<style lang="scss" scoped>

#header {
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: $header_height;

  background-color: $header_color;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

</style>
