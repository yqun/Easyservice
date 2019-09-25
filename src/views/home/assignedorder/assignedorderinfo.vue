<template>
  <div class="fixedpadding">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>工单详情</span>
      <x-icon slot="overwrite-left" type="ios-arrow-left" size="30"
              @click="$router.push('/assignedorder')" style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <group title="基本信息">
      <div class="orderInfo"><strong>　　　　问题：</strong><span>{{orderInfo.f_description}}</span></div>
      <!--<x-input title="　　　　问题：" disabled :value="orderInfo.f_description"></x-input>-->
      <div class="vux-x-input weui-cell" v-if="orderInfo.imgIds">
        <img :src="url.imgUrl" alt="" style="height: 100px;" v-for="url in orderInfo.imgIds" :key="url.id">
      </div>
      <div class="orderInfo"><strong>　　工单状态：</strong><span>{{orderInfo.f_work_order_state}}</span></div>
      <div class="orderInfo"><strong>处理单位名称：</strong><span>{{orderInfo.f_handler_org_name}}</span></div>
      <div class="orderInfo"><strong>　　联系方式：</strong><span>{{orderInfo.f_org_phnum}}</span></div>
      <div class="orderInfo"><strong>　　创建时间：</strong><span>{{orderInfo.f_create_time}}</span></div>
      <div class="orderInfo"><strong>　　客户名称：</strong><span>{{orderInfo.f_customer_name}}</span></div>
      <div class="orderInfo"><strong>　　客户电话：</strong><span>{{orderInfo.f_customer_phnum}}</span></div>
      <div class="orderInfo"><strong>　　客户单位：</strong><span>{{orderInfo.f_customer_org}}</span></div>
      <div class="orderInfo"><strong>　　服务地址：</strong><span>{{orderInfo.f_address}}</span></div>
      <div class="orderInfo"><strong>　　工单类别：</strong><span>{{orderInfo.f_work_order_type}}</span></div>
      <div class="orderInfo"><strong>　　资产类别：</strong><span>{{orderInfo.f_equmentType_name}}</span></div>
      <div class="orderInfo"><strong>　　指派人员：</strong><span>{{f_name}}</span></div>
      <div class="orderInfo"><strong>　　　　备注：</strong><span>{{orderInfo.f_remark}}</span></div>
      <!--<x-input title="　　工单状态：" disabled :value="orderInfo.f_work_order_state"></x-input>-->
      <!--<x-input title="处理单位名称：" disabled :value="orderInfo.f_handler_org_name"></x-input>-->
      <!--<x-input title="　　联系方式：" disabled :value="orderInfo.f_org_phnum"></x-input>-->
      <!--<x-input title="　　创建时间：" disabled :value="orderInfo.f_create_time"></x-input>-->
      <!--<x-input title="　　客户名称：" disabled :value="orderInfo.f_customer_name"></x-input>-->
      <!--<x-input title="　　客户电话：" disabled :value="orderInfo.f_customer_phnum"></x-input>-->
      <!--<x-input title="　　客户单位：" disabled :value="orderInfo.f_customer_org"></x-input>-->
      <!--<x-input title="　　服务地址：" disabled :value="orderInfo.f_address"></x-input>-->
      <!--<x-input title="　　工单类别：" disabled :value="orderInfo.f_work_order_type"></x-input>-->
      <!--<x-input title="　　资产类别：" disabled :value="orderInfo.f_equmentType_name"></x-input>-->
      <!--<x-input title="　　指派人员：" disabled :value="f_name"></x-input>-->
      <!--<x-input title="　　　　备注：" disabled :value="orderInfo.f_remark"></x-input>-->
    </group>
    <group title="进度信息" v-if="count.length">
      <timeline class="timeline-demo" v-for="(item,index) in count" :key="index">
        <!--<timeline-item v-for="value in item" :key="value"><p>{{value}}</p></timeline-item>-->
        <timeline-item><p class="recent">{{item.name}}</p></timeline-item>
        <timeline-item><p>{{item.f_work_house}}</p></timeline-item>
        <timeline-item><p v-html="item.f_work_content"></p></timeline-item>
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
          console.log(res)
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
              this.f_name += item.f_name + '　'
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
@import '../../../assets/css/orderInfoscroll.css';
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
