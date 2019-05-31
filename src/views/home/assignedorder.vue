<template>
  <div>
    <!-- 导航 -->
    <nav-bar wait="待指派" success="已指派" cancel="已取消"></nav-bar>
    <!-- 内容 -->
    <router-view :key="$store.state.navIndex" class="content_list"></router-view>
  </div>
</template>

<script>
export default {
  name: "assignedorder",
  data() {
    return {

    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != '/assignedorderinfo') this.$store.commit('NavIndex', 0);
    next()
  },
  methods: {

  },
}
</script>

<style scoped>
.content_list {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
}
</style>
