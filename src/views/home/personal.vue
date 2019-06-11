<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <i class="iconfont icon-fanhui" @click="routerLink()"></i>
      个人中心
    </div>
    <!-- 内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {

    }
  },
  methods: {
    // 返回的路由跳转
    routerLink() {
      let frompath = this.$router.path
      if (frompath == '/updatephone' || frompath == '/updatepassword' || frompath == '/login') {
        frompath = '/'
      }
      this.$router.push(frompath)
    }
  }
}
</script>

<style scoped>
.header {
  height: 46px;
  width: 100%;
  background-color: dodgerblue;
  color: #fff;
  font-size: 18px;
  line-height: 46px;
  text-align: center;
  position: relative;
}
i.iconfont.icon-fanhui {
  position: absolute;
  left: 20px;
}
</style>
