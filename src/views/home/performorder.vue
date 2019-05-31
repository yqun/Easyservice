<template>
  <div>
    <!-- 导航 -->
    <nav-bar></nav-bar>
    <!-- 内容 -->
    <router-view :key="$store.state.navIndex" class="content_list"></router-view>
  </div>
</template>

<script>
export default {
  name: "performorder",
  data() {
    return {
      index: 0,
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != '/performorderinfo') this.$store.commit('NavIndex', 0);
    next()
  },
}
</script>

<style scoped>
</style>
