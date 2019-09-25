<template>
  <div class="navTab">
    <tab>
      <tab-item @on-item-click="getIndex" :selected="index == 0 || !index">{{wait || '待完成'}}</tab-item>
      <tab-item @on-item-click="getIndex" :selected="index == 1">{{success || '已完成'}}</tab-item>
      <tab-item @on-item-click="getIndex" :selected="index == 2">{{cancel || '已取消'}}</tab-item>
    </tab>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props: ['wait', 'success', 'cancel'],
  data() {
    return {
      index: 0,
    }
  },
  created() {
    this.index = this.$store.state.navIndex
  },
  methods: {
    getIndex (index) {
      this.$store.commit('NavIndex', index)
    },
  }
}
</script>

<style scoped>
.navTab{
  width: 100%;
  position: fixed;
  top: 44px;
  z-index: 999;
}
</style>
