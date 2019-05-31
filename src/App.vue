<template>
  <div id="app">
    <router-view style="height: 100%;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html, body, #app {
  height: 100%;
}
body {
  background-color: #fbf9fe;
}
</style>
