<template>
  <div class="content">
    <i class="iconfont icon-jiahao" @click="$router.push('/ordersubmit')"></i>
    <!-- 导航 -->
    <nav-bar></nav-bar>
    <!-- 内容 -->
    <ul class="content_list">
      <li class="item-content"
          v-for="item in list" :key="item.id"
          @click="$router.push({path: '/myorderlist', query: {id: item.id,}})">
        {{item.f_name}}
      </li>
    </ul>
    <!-- 底部加号 -->
    <i class="add" @click="$router.push('/ordersubmit')">+</i>
  </div>
</template>

<script>
export default {
  name: "myorder",
  data() {
    return {
      list: [],
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != '/myorderlistitem' && to.path != '/ordersubmit') this.$store.commit('NavIndex', 0);
    next()
  },
  computed: {
    index() {
      return this.$store.state.navIndex;
    }
  },
  watch: {
    index(newVal, oldVal) {
      this.getMyorder(newVal)
    }
  },
  mounted() {
    this.getMyorder(0)
  },
  methods: {
    // 获取我的工单信息
    getMyorder(index) {
      let url = ''
      if (index === 0) {
        url = 'equmentType/findUnfinishedOrderEqumentType.do'
      } else if (index === 1) {
        url = 'equmentType/findFinishedOrderEqumentType.do'
      } else if (index === 2) {
        url = 'equmentType/findCanceledOrderEqumentType.do'
      }
      this.axios
        .get(url)
        .then(res => {
          console.log(res)
          const {status} = res
          if (status !== 200) return false;
          const {rows} = res.data
          this.list = rows
        })
    }
  }
}
</script>

<style scoped>
i.iconfont.icon-jiahao {
  position: absolute;
  z-index: 1000;
  right: 20px;
  top: 3px;
  font-size: 28px;
  color: #fff;
}
.item-content {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #01AAED;
  border-radius: 5px;
  margin-top: 6px;
  padding: 0 10px;
  color: #ac5978;
  line-height: 40px;
  list-style: none;
}
.add {
  display: block;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: lightgreen;
  position: fixed;
  right: 30px;
  bottom: 70px;
  font-style: normal;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
}
/*i.add::before {*/
  /*content: '点击上报问题';*/
  /*display: block;*/
  /*width: 100px;*/
  /*height: 20px;*/
  /*font-size:12px;*/
  /*color: red;*/
  /*position: absolute;*/
  /*top: -40px;*/
  /*left: -30px;*/
/*}*/
</style>
