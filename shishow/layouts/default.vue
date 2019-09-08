<template>
  <div>
    <nuxt />
    <img src="~/assets/image/Beta.png" class="beta"
    alt="beta" />
  </div>
</template>

<script>
export default {
  middleware:"auth",
  head:{
    titleTemplate:"SHISHOW", //shishow %s",
    meta: [
      { hid: 'description', name: 'description', content: 'SHISHOWはゲームを通じて人との繋がりを築くプラットフォームで，あなたのゲームスキルの成長に役立ちます。' },
      { property: 'og:site_name', content: "SHISHOW"},
      { property: 'og:image', content: "https://i.imgur.com/smKCDby.png" },
      { name: 'viewport', content: 'width=device-width, initial-scale=0.5'},
      { property: 'og:description', content: 'SHISHOWはゲームを通じて人との繋がりを築くプラットフォームで，あなたのゲームスキルの成長に役立ちます。' },
      { property: 'og:url', content: 'https://www.shishow.tokyo/' },
    ],
  },
}
</script>



<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.beta {
  position: fixed;

  left: 10px;
  bottom: 10px;

  height: 60px;
  width: 60px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
