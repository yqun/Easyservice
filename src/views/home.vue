<template>
  <div style="padding: 44px 0 53px; height: 100%; box-sizing: border-box;">
    <div class="header">
      运维平台
    </div>
    <router-view class="content_view"></router-view>
    <tabbar v-model="index" @on-index-change="getRouterPath">
      <tabbar-item link="/myorder">
        <i class="iconfont icon-fl-jia" slot="icon"></i>
        <i class="iconfont icon-fl-jia" slot="icon-active" style="color: orange"></i>
        <span slot="label">我的工单</span>
      </tabbar-item>
      <tabbar-item link="/assignedorder" v-if="assignedorder">
        <i class="iconfont icon-icon02" slot="icon"></i>
        <i class="iconfont icon-icon02" slot="icon-active" style="color: orange"></i>
        <span slot="label">指派工单</span>
      </tabbar-item>
      <tabbar-item link="/performorder" v-if="performorder">
        <i class="iconfont icon-fl-banzi" slot="icon"></i>
        <i class="iconfont icon-fl-banzi" slot="icon-active" style="color: orange"></i>
        <span slot="label">执行工单</span>
      </tabbar-item>
      <tabbar-item link="/personal">
        <i class="iconfont icon-wo1" slot="icon"></i>
        <i class="iconfont icon-wo1" slot="icon-active" style="color: orange"></i>
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      index: 1,
      roles: [], // 用户权限
      assignedorder: false,
      performorder: false
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    // 获取  用户权限
    getUser() {
      this.roles = JSON.parse(window.localStorage.getItem('roles'))
      this.roles.forEach(item => {
        if (item.id == 6 || item.id == 4 || item.id == 2) {this.assignedorder = true}
        if (item.id == 8) {this.performorder = true}
      })
    },
    // 判断 进首页时的路由 判断底部tabbar
    getRouterPath() {
      const routerpath = this.$route.path
      switch(routerpath) {
        case '/myorder':
          this.index = 0
        break;
        case '/listItem':
          this.index = 1
        break;
        case '/performlist':
          if (this.assignedorder) {
            this.index = 2
          } else {
            this.index = 1
          }
        break;
      }
      // console.log(this.index)
    },
  },
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 46px;
  background-color: dodgerblue;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  line-height: 46px;
}
.content_view {
  height: 100%;
  box-sizing: border-box;
  padding-top: 44px;
}
/* 底部导航 */
.weui-tabbar {
  position: fixed;
  bottom: 0;
}
i.iconfont {
  font-size: 22px;
  color: #fff;
}
div.weui-tabbar {
  background-color: #2A91D8;
}
.weui-tabbar__item p.weui-tabbar__label span {
  color: #fff;
}
.weui-tabbar__item.weui-bar__item_on p.weui-tabbar__label span{
  color: orange;
}
</style>
