<template>
  <div class="fixedpadding">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>工单详情</span>
      <x-icon slot="overwrite-left" type="ios-arrow-left" size="30"
              @click="$router.push('/assignedorder')" style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <group title="基本信息">
      <x-input type="text" disabled :value="orderInfo.f_description" text-align="right" title="问题"></x-input>
      <div style="padding: 0 10px;">
        <img :src="url.imgUrl" alt="" style="height: 100px;" v-for="url in orderInfo.imgIds" :key="url.id">
      </div>
      <x-input type="text" disabled :value="orderInfo.f_work_order_state" text-align="right" title="工单状态"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_handler_org_name" text-align="right" title="处理单位名称"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_org_phnum" text-align="right" title="联系方式"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_create_time" text-align="right" title="创建时间"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_customer_name" text-align="right" title="客户名称"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_customer_phnum" text-align="right" title="客户电话"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_customer_org" text-align="right" title="客户单位"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_address" text-align="right" title="服务地址"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_work_order_type" text-align="right" title="工单类别"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_equmentType_name" text-align="right" title="资产类别"></x-input>
      <x-input type="text" disabled :value="f_name" text-align="right" title="指派人员"></x-input>
      <x-input type="text" disabled :value="orderInfo.f_remark" text-align="right" title="备注"></x-input>
    </group>
    <group title="进度信息" v-if="count.length">
      <timeline class="timeline-demo" v-for="(item,index) in count" :key="index">
        <!--<timeline-item v-for="value in item" :key="value"><p>{{value}}</p></timeline-item>-->
        <timeline-item><p class="recent">{{item.name}}</p></timeline-item>
        <timeline-item><p>{{item.f_work_house}}</p></timeline-item>
        <timeline-item><p>{{item.f_work_content}}</p></timeline-item>
        <timeline-item><p>{{item.f_remark}}</p></timeline-item>
        <img :src="i.imagesUrl" alt="" v-for="i in item.images" :key="i.id" style="width: 100%;">
      </timeline>
    </group>
    <x-button :gradients="btncolor" class="btnsubmit"
              v-if="$store.state.navIndex != 2"
              @click.native="$router.push({path: '/savechangeorder', query: {id: orderId}})">
      指派工单
    </x-button>
  </div>
</template>

<script>
export default {
  name: "orderinfo",
  data () {
    return {
      token: '',
      orderId: 0,
      orderInfo: {},
      f_name: '',
      count: [],
      btncolor: ['dodgerblue', 'dodgerblue'],
    }
  },
  computed: {
    f_confirmed() {
      if (this.orderInfo.f_confirmed == true) {
        return '已确认'
      } else {
        return '待确认'
      }
    }
  },
  created() {
    this.getquery()
    this.getOrderInfo()
    this.getUser()
    this.getSchedule()
  },
  methods: {
    // 获取参数
    getquery() {
      this.orderId = this.$route.query.id
      this.token = window.localStorage.getItem('token')
    },
    // 获取工单详情
    getOrderInfo() {
      this.axios
        .get(`workOrder/findEntityById.do?id=${this.orderId}`)
        .then(res => {
          // console.log(res)
          const {status, data} = res
          this.orderInfo = data
          if (data.imgIds) {
            data.imgIds.forEach(item => {
              item.imgUrl = `${this.axiosUrl}system/getImage.do?id=${item.id}&token=${this.token}`
            })
          } // end if
          // console.log(this.orderInfo)
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
            })
          }
        })
    },
    // 获取进度信息
    getSchedule() {
      this.axios
        .get(`workOrder/findWorkOrerLogs.do?id=${this.orderId}`)
        .then(res => {
          // console.log(res)
          const {status, data} = res
          if (data.length == 0) return false;
          data.forEach(item => {
            // 处理图片路径
            if (item.images) {
              item.images.forEach(item => {
                item.imagesUrl = `${this.axiosUrl}system/getImage.do?id=${item.id}&token=${this.token}`
              })
            }
            this.count.push({
              name: item.f_handler_name + '　' + item.f_handle_time,
              f_work_house: '工时：' + (item.f_work_house || 0) + '(小时)',
              f_remark: '备注：' + (item.f_remark || ''),
              f_work_content: item.f_work_content || '',
              images: item.images
            })
          })
        })
    }
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
.timeline-demo p {
  color: #666;
  font-weight: normal;
}
.timeline-demo .recent {
  color: deepskyblue;
}
.btnsubmit {
  position: fixed;
  bottom: 0;
  z-index:999;
  border-radius: 0px;
}
</style>
