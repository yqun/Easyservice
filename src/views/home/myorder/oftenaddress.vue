<template>
  <div style="height: 100%; width: 100%; background-color: #fff;">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>选择服务地址</span>
      <x-icon slot="overwrite-left"
              type="ios-arrow-left"
              size="30"
              @click="$router.go(-1)"
              style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <div style="padding: 10px;">
      <el-tree
        :data="data"
        :show-checkbox="true"
        lazy
        accordion
        :load="loadNode"
        @check-change="chooseCheck"
        node-key="id"
        ref="tree"
        check-strictly
        :props="defaultProps">
      </el-tree>
    </div>
    <x-button class="btnsubmit" :gradients="btncolor" @click.native="senduser()" :disabled="prohibitBtn">确定选择</x-button>
  </div>
</template>

<script>
var  ElTreeGrid  = require('element-tree-grid')
export default {
  name: "salesman",
  components: {
    'ElTreeGrid': ElTreeGrid
  },
  data() {
    return {
      btncolor: ['dodgerblue', 'dodgerblue'],
      data: [],
      defaultProps: {children: 'children', label: 'text'},
      newData: [],
      arr: [],
      chooseUser: [], // 选择的业务员
      prohibitBtn: false, // 禁用按钮
    }
  },
  mounted() {

  },
  methods: {
    // 返回设置
    senduser() {
      if (!this.chooseUser.length) return this.$vux.toast.text('请选择地址');
      let pd = this.chooseUser[0];
      let id;
      while(pd.text !== '北京市') {
        id = pd.id
        pd = this.$refs.tree.getNode(id).parent.data
        this.chooseUser.unshift(pd)
      }
      console.log(this.chooseUser)
      this.$store.commit('Address', this.chooseUser)
      this.$router.push({path: this.$router.path, query:{id: this.$route.query.id}})
    },
    loadNode(node, resolve) {
      this.getUser(node, resolve);
    },
    // 获取 业务员
    getUser(node, resolve) {
      let flag = true
      if(this.newData.length) {
        this.newData.forEach((item,i) => {
          if (node.key != item.id) return false;
          if (this.newData[i].state == 'closed') return false;
          node.isLeaf = true
          flag = false;
        })
      }// end if
      if (!flag) return resolve([]);
      let id = node.key || ''

      this.axios
        .get(`/org/findChildrenByIdTree.do?id=${id || 25}`)
        .then(res => {
          // console.log(res)
          let {data} = res
          this.newData = data

          if (node.level === 0) {
            return resolve(data);
          } else if (node.level > 1) {
            resolve([]);
          }
          // const Sdata = data
          setTimeout(() => {resolve(data);}, 500);
        })
    },
    // 选择多选框
    chooseCheck(data, checked, node) {
      console.log(data, checked);
      if (checked) {
        this.chooseUser.push(data)
      }
      if (this.chooseUser.length > 1) {
        this.$refs.tree.setCheckedKeys([data.id])
        this.chooseUser = [];
        this.chooseUser.push(data)
      }
      console.log(this.chooseUser)
    }
  }
}
</script>

<style scoped>
  .btnsubmit {
    position: fixed;
    bottom: 0;
    z-index:999;
    border-radius: 0px;
  }
</style>
<!--chooseCheck(data, checked, node) {-->
<!--console.log(data, checked);-->
<!--// return false;-->
<!--// 最后一层的数据-->
<!--if (checked) {-->
<!--this.chooseUser.push(data)-->
<!--}-->
<!--if (this.chooseUser.length > 1) {-->
<!--this.$refs.tree.setCheckedKeys([data.id])-->
<!--this.chooseUser = [];-->
<!--this.chooseUser.push(data)-->
<!--}-->
<!--// if (data.state !== 'closed' && checked) {-->
<!--//-->
<!--//   if (this.chooseUser.length > 1) {-->
<!--//     // console.log('data', data)-->
<!--//     this.$refs.tree.setCheckedKeys([data.id])-->
<!--//     this.chooseUser = [];-->
<!--//     this.chooseUser.push(data)-->
<!--//   }-->
<!--// } else if (data.state == 'closed' && checked) {-->
<!--//   this.$refs.tree.setCheckedKeys([data.id])-->
<!--// } else if (data.state !== 'closed' && !checked) {-->
<!--//   this.chooseUser.forEach((item,index) => {-->
<!--//     if (item.id == data.id) {-->
<!--//       console.log(this.chooseUser.splice(index, 1))-->
<!--//     }-->
<!--//   })-->
<!--// }// end if-->
<!--console.log(this.chooseUser)-->
<!--// return false;-->
<!--}-->
