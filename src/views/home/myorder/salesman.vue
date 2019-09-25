<template>
  <div style="height: 100%; width: 100%; background-color: #fff;">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>选择指派人员</span>
      <x-icon slot="overwrite-left"
              type="ios-arrow-left"
              size="30"
              @click="$router.go(-1)"
              style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <div style="padding: 10px;">
      <el-tree
        :data="data"
        show-checkbox
        lazy
        :load="loadNode"
        @check="chooseCheck"
        node-key="id"
        ref="tree"
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
      orderId: 0,
      userId: 0, // 判断进来的是通过业务员按钮 还是
      btncolor: ['dodgerblue', 'dodgerblue'],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      newData: [],
      chooseUser: [], // 选择的业务员
      prohibitBtn: false, // 禁用按钮
    }
  },
  created() {
    this.getquery()
  },
  computed: {

  },
  methods: {
    // 获取参数
    getquery() {
      this.orderId = this.$route.query.id
      this.userId = this.$route.query.userId
    },
    // 返回设置
    senduser() {
      // 工单类别
      if (this.userId == 3) {
        this.sendOrderType()
      }

      // 业务员
      if (this.userId == 1 || this.userId == 2) {
        if (this.chooseUser.length > 1 && this.userId == 1) return this.$vux.toast.text('最多选择一个业务员');
        const jsonData = JSON.stringify(this.chooseUser)
        // console.log(jsonData)
        // 页面跳转
        setTimeout(() => {
          this.$router.push({
            path: this.$router.path,
            query: {id: this.orderId, user: jsonData, userId: this.userId}
          })
        }, 800)
      }

    },
    // 判断 是工单类别 发送数据
    sendOrderType() {
      if (this.chooseUser.length == 0) return false;
      let data = []
      this.chooseUser.forEach(item => {data.push(item.id)})
      this.prohibitBtn = true;
      this.axios
        .post(`workOrder/updateWordOrderType.do?id=${this.orderId}&typeIds=${data}`)
        .then(res => {
          // console.log(res)
          if (res.data.res == 1) {
            this.$vux.toast.text('指定工单类型成功')
            setTimeout(() => {
              this.$router.push({
                path: this.$router.path,
                query: {id: this.orderId}
              })
            }, 800)
          } else {
            this.prohibitBtn = false;
            this.$vux.toast.text(res.data.error || '指定工单类型失败')
          }
        })
    },
    loadNode(node, resolve) {
      this.getUser(node, resolve);
    },
    // 获取 业务员
    getUser(node, resolve) {
      let flag = true
      console.log(this.newData.length)
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
      // 判断是 业务员还是工单类型
      // console.log(this.userId)
      let url;
      if (this.userId == 1 || this.userId == 2) {
        url = 'org/findOrgsAndUsers.do'
      } else if (this.userId == 3) {
        url = 'workOrderType/findWorkOrderTypesByPage.do'
      }
      this.axios
        .get(`${url}?id=${id || ''}`)
        .then(res => {
          console.log(res)
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
    chooseCheck(data) {
      // console.log(data)
      this.chooseUser = this.$refs.tree.getCheckedNodes()
      let userArr = [];
      this.chooseUser.forEach(item => {
        if (item.state == "closed") return false;
        userArr.push({name: item.text, id: item.id})
      })
      this.chooseUser = userArr
      if (this.chooseUser.length > 1 && this.userId == 1) return this.$vux.toast.text('最多选择一个业务员');
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
