<template>
  <div class="fixedpadding" style="height: 100%;box-sizing: border-box">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>e服务</span>
      <x-icon slot="overwrite-left"
              type="ios-arrow-left"
              size="30"
              @click="$router.push('/myorder')"
              style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <i class="iconfont icon-jiahao" @click="$router.push('/ordersubmit')"></i>
    <div class="content">
      <!-- 导航 -->
      <nav-bar></nav-bar>
      <!-- 内容 -->
      <router-view :id="id" :key="$store.state.navIndex" class="content_list"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "myorderlist",
  data() {
    return{
      id: 0,
    }
  },
  created() {
    this.getquery()
  },
  methods: {
    // 获取 参数
    getquery() {
      this.id = this.$route.query.id
    },
    bankLink() {
      this.$router.push({path:'/myorder'})
    },
  }
}
</script>

<style scoped>
.vux-header {
  position:fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
.content {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 44px;
}
i.iconfont.icon-jiahao {
  position: absolute;
  z-index: 1000;
  right: 20px;
  top: 3px;
  font-size: 28px;
  color: #fff;
}
</style>
