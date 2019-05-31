<template>
  <div>
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>工单详情</span>
      <x-icon slot="overwrite-left"
              type="ios-arrow-left"
              size="30"
              @click="$router.push({path: '/assignedorderinfo', query: {id: orderId}})"
              style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <group>
      <x-input title="问题　　　" :show-clear="false" v-model="f_description"></x-input>
      <x-input title="客户名称　" :show-clear="false" disabled v-model="f_customer_name"></x-input>
      <x-input title="客户电话　" :show-clear="false" disabled v-model="f_customer_phnum"></x-input>
      <x-input title="客户单位　" :show-clear="false" disabled v-model="f_customer_org"></x-input>
      <!-- 业务员 -->
      <!--<x-input type="text"-->
               <!--v-model="usernameinfo"-->
               <!--text-align="right"-->
               <!--title="业务员"-->
               <!--@on-focus="$router.push({path: '/salesman', query: {id: orderId, userId: 1}})"></x-input>-->
      <x-input title="服务地址　" disabled v-model="address">
        <x-button slot="right" mini :gradients="btncolor" :link="`/oftenaddress?id=${orderId}`">选择</x-button>
      </x-input>
      <x-input title="详细地址　" :show-clear="false" v-model="f_address"></x-input>
     <selector title="资产类别　" :options="assets" v-model="assestkey" placeholder="请选择资产类别"></selector>
      <x-input title="备注　　　" :show-clear="false" v-model="f_remark"></x-input>
      <x-input title="已指派人员" v-model="f_name"
               @on-focus="$router.push({path: '/salesman', query: {id: orderId, userId: 2}})">
      </x-input>
    </group>
    <x-button :gradients="btncolor" class="btnsubmit" @click.native="saveF_name()" :disabled="prohibitBtn">保存修改</x-button>
  </div>
</template>

<script>
export default {
  name: "savechangeorder",
  data() {
    return{
      orderId: 0,
      btncolor: ['dodgerblue', 'dodgerblue'],
      // 数据
      f_description: '',
      f_customer_name: '',
      f_customer_phnum: '',
      f_customer_org: '',
      usernameId: '', // 业务员id
      address: '',
      addressId: 0,
      f_address: '',
      assestkey: null,
      assets: [],
      f_remark: '',
      f_name: '',
      f_nameId:[],
      prohibitBtn: false, // 禁用按钮
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != '/oftenaddress') {
      this.$store.commit('Address')
    }
    next()
  },
  created() {
    this.getquery()

    this.getassets()
    this.getUser()
  },
  mounted() {
    this.getOrderInfo()
  },
  activated() {
    if (this.$store.state.address) {
      const addessArr = this.$store.state.address;
      this.addressId = addessArr[addessArr.length - 1].id
      this.address = ''
      addessArr.forEach(item => {
        this.address+=item.text + '/'
      })
      this.address = this.address.substr(0, this.address.length - 1)
    }
    this.userId = this.$route.query.userId
    const userArr = this.$route.query.user
    if (!userArr) return false;
    const jsonData = JSON.parse(userArr)
    // 业务员
    // if (this.userId == 1) {
    //   this.usernameinfo = jsonData[0].name
    //   this.usernameId = jsonData[0].id
    // }
    if (this.userId == 2) {
      this.f_name = '';
      this.f_nameId = [];
      jsonData.forEach(item => {
        this.f_name += " " + item.name
        this.f_nameId.push(item.id)
      })
    }
  },
  methods: {
    // 获取参数
    getquery() {
      this.orderId = this.$route.query.id
    },
    // 获取资产类别
    getassets() {
      this.axios
        .get('equmentType/findEqumentTypeOfOrg.do')
        .then(res => {
          // console.log(res)
          const {rows} = res.data
          if (!rows.length) return false;
          rows.forEach(item => {
            this.assets.push({key:item.id, value:item.f_name})
          })
        })
    },
    // 获取工单详情
    getOrderInfo() {
      this.axios
        .get(`workOrder/findEntityById.do?id=${this.orderId}`)
        .then(res => {
          console.log(res)
          const {status, data} = res
          if (status != 200) return false;
          this.f_description = data.f_description
          this.f_customer_name = data.f_customer_name
          this.f_customer_phnum = data.f_customer_phnum
          this.f_customer_org = data.f_customer_org
          this.address = data.f_village_path
          this.f_address = data.f_address
          this.f_remark = data.f_remark
          this.usernameId = data.f_salesman_id
          this.assestkey = data.f_equmentType_id
          // console.log(this.assestkey)
        })
    },
    // 获取指派人员
    getUser() {
      this.axios
        .get(`workOrder/getWorkersByWorkOrder.do?id=${this.orderId}`)
        .then(res => {
          // console.log(res)
          const {status, data} = res
          if (status != 200) return false;
          if (data.length != 0) {
            data.forEach(item => {
              this.f_name += "　" + item.f_name
              this.f_nameId.push(item.id)
            })

          }
        })
    },
    // 保存修改
    savechange() {
        // 获取数据  发送请求
        // 资产类别 value
      let assestval;
      this.assets.forEach(item => {
        if (this.assestkey == item.key) return assestval = item.value
      })
      const data = {
        id: this.orderId, // 工单id
        f_description: this.f_description, // 问题
        f_village_id: this.addressId,
        f_address: this.f_address, // 服务地址
        f_equmentType_id: this.assestkey, //资产类别
        f_equmentType_name: assestval,
        f_remark: this.f_remark, // 备注
      }
      console.log(data)
      this.prohibitBtn = true
      this.axios
        .post('workOrder/updateWorkOrderByDis.do', data)
        .then(res => {
          // console.log(res)
          if (res.data.res == 'true') {
            this.$vux.toast.text('保存成功')
            setTimeout(() => {this.$router.push('/listItem')}, 800)
          } else {
            this.prohibitBtn = false
            this.$vux.toast.text('保存失败')
          }

        })
    },
    // 指派人员 保存
    saveF_name() {
      if (!this.f_address) return this.$vux.toast.text('请选择服务地址');
      if (!this.assestkey) return this.$vux.toast.text('请选择资产类别');
      if (!this.f_nameId.length) return this.$vux.toast.text('请选择指派人员')
      const data = {id: this.orderId, ids: this.f_nameId}
      console.log(data)
      this.axios
        .post('workOrder/updateWorkers.do',data)
        .then(res => {
          // console.log(res)
          if (res.data.res == 'true') {
            this.savechange()
          } else {
            this.prohibitBtn = false
            this.$vux.toast.text('保存失败');
          }
        })
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
