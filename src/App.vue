<template>
  <div id="app">
    <!-- 弹窗 -->
    <div class="alertCon" :style="{'display':status}">
      <div class="alertCon-mask"></div>
      <div class="alertCon-dialog">
        <div class="alertCon-text">当前app不是最新版，请下载最新版本使用。</div>
        <div class="alertCon-btn">
          <a href="javascript:;" @click="status = 'none'">取消</a>
          <a href="javascript:;" @click="onConfirm()">下载</a>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <router-view style="height: 100%;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      status: 'none',
      show: false
    }
  },
  mounted() {
    this.getVersion();
  },
  methods: {
    onConfirm() {
      window.location.href = `${this.axiosUrl}app/easyService.apk`
      this.status = 'none'
    },
    getVersion() {
      if (!window.localStorage.getItem('token')) return false;
      this.axios
        .get(`version/getCurrentVersion.do`)
        .then(res => {
          // console.log(res)
          const appVersion = window.localStorage.getItem('appVersion')
          const {version:{f_version}} = res.data
          // alert(`当前版本:${appVersion},最新版本:${f_version}`)
          console.log(`当前版本:${appVersion},最新版本:${f_version}`)
          if (appVersion == f_version) return false;
          this.status = 'block'
        })
    }
  }
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
.alertCon .alertCon-mask{
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.alertCon .alertCon-dialog {
  position: absolute;
  display: block;
  z-index: 5000;
  width: 80%;
  max-width: 300px;
  top: 240px;
  right: 0;
  left: 0;
  margin: auto;
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
}
.alertCon .alertCon-dialog .alertCon-text {
  padding: 2.7em 20px 1.7em;
  color: #353535;
}
.alertCon .alertCon-dialog .alertCon-btn::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #D5D5D6;
}
.alertCon .alertCon-dialog .alertCon-btn {
  position: relative;
  line-height: 48px;
  font-size: 18px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.alertCon .alertCon-dialog .alertCon-btn a {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #3CC51F;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}
.alertCon .alertCon-dialog .alertCon-btn a:first-child::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
  background-color: #D5D5D6;
}
</style>
