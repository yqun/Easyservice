<template>
  <div class="fixedpadding">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>工单提交</span>
      <x-icon slot="overwrite-left"
              type="ios-arrow-left"
              size="30"
              @click="$router.push({path: '/myorderlistitem', query: {id:id}})"
              style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <group>
      <selector title="服务人员" :options="servicePersonalList"
                placeholder="请选择服务人员"
                v-model="servicePersonal" @on-change="chooseServiceUnit">
      </selector>
      <x-input class="service" title="服务单位" v-model="serviceUnit" disabled></x-input>
    </group>
    <evaluate :attitude="attitude" :response="response" :solve="solve" :btn="btn" :state="state"></evaluate>
    <div v-if="!btn" class="estimate">
      <group :title="`服务态度　${attitude}`" v-if="state*1"> <!--服务态度-->
        <cell title=" " primary="content">
          <range v-model="attitude" minHTML="不耐烦(0)" maxHTML="热情服务(100)"></range>
        </cell>
      </group>
      <group :title="`响应速度　${response}`" v-if="state*1">
        <cell title=" " primary="content">
          <range v-model="response" minHTML="拖沓(0)" maxHTML="迅速及时(100)"></range>
        </cell>
      </group>
      <group :title="`解决程度　${solve}`" v-if="state*1">
        <cell title=" " primary="content">
          <range v-model="solve" minHTML="未解决(0)" maxHTML="彻底解决(100)"></range>
        </cell>
      </group>
    </div>

    <group title="附言">
      <x-textarea :max="200"
                  v-model="textareaval"
                  title="附言"
                  :show-counter="false"
                  :readonly="btn"
                  :rows="5" :cols="30">
      </x-textarea>
    </group>
    <x-button class="btn" @click.native="submitBtn()" :disabled="prohibitBtn">提交</x-button>
  </div>
</template>

<script>
import evaluate from '../../../components/evaluate'
import { Range, Cell  } from 'vux'
export default {
  name: "estimate",
  components: {Range, Cell, evaluate },
  data() {
    return {
      id: 0,
      orderId: 0,
      state: 0,

      servicePersonal: '',
      servicePersonalList: [],
      serviceUnit: '',
      serviceUnitList: [],
      btncolor: ['dodgerblue', 'dodgerblue'],
      prohibitBtn: false, // 禁止按钮
      attitude: 0, // 服务态度
      response: 0, // 响应速度
      solve: 0, // 解决程度
      textareaval: '',
      btn: false, // 禁止评价
      Aattitude: 0,
      Aresponse: 0,
      Asolve: 0,
    }
  },
  mounted() {
    this.getquery()
    this.getAppraise()
  },
  methods: {
    // 获取参数
    getquery() {
      this.id = this.$route.query.id
      this.orderId = this.$route.query.orderId
      this.state = this.$route.query.state
    },
    // 获取评价
    getAppraise() {
      if (this.state == 1) {
        this.axios
          .get(`appraise/findUserAndAppraiseByWorkOrder.do?id=${this.orderId}`)
          .then(res => {
            console.log(res)
            const {users} = res.data
            if (!users || !users.length) return false;
            users.forEach(item => {
              this.servicePersonalList.push({
                key: item.id,
                value: item.f_name,
                serviceUnit: item.f_unit_name,
                appraise: item.appraise
              })
            })
          })
      } else if (this.state == 0) {
        this.axios
          .get(`workOrder/getWorkersByWorkOrder.do?id=${this.orderId}`)
          .then(res => {
            // console.log(res)
            const {data} = res
            if (!data || !data.length) return false;
            data.forEach(item => {
              this.servicePersonalList.push({
                key: item.id,
                value: item.f_name,
                serviceUnit: item.f_org_name,
              })
            })
          })
      }

    },
    chooseServiceUnit (value) {
      const servicePersonalInfo = this.servicePersonalList.filter(item => {
        return item.key == value
      })[0]
      // 评价
      if ( this.state == 1 && servicePersonalInfo.appraise.f_attitude != undefined
        && servicePersonalInfo.appraise.f_response_speed != undefined
        && servicePersonalInfo.appraise.f_treatment_degree != undefined) {
        this.serviceUnit = servicePersonalInfo.serviceUnit
        this.attitude = servicePersonalInfo.appraise.f_attitude
        this.response = servicePersonalInfo.appraise.f_response_speed
        this.solve = servicePersonalInfo.appraise.f_treatment_degree
        this.textareaval = servicePersonalInfo.appraise.f_content
        this.btn = true;
        this.prohibitBtn = true;
      } else {
        this.btn = false;
        this.prohibitBtn = false;
      }
      // 投诉
      if (this.state == 0) {
        this.serviceUnit = servicePersonalInfo.serviceUnit
      }
    },
    // 点击提交
    submitBtn () {
      if (!this.servicePersonal) return this.$vux.toast.text('请选择服务人员')
      this.prohibitBtn = true;
      if (this.state == 1) {
        const data = {
          f_work_order_id: this.orderId,
          f_worker_id: this.servicePersonal,
          f_content: this.textareaval,
          f_treatment_degree: this.solve,
          f_response_speed: this.response,
          f_attitude: this.attitude,
          type: 1
        }
        this.evaluate(data)
      } else if (this.state == 0){
        const data = {
          f_work_order_id: this.orderId,
          f_servicer_id: this.servicePersonal,
          f_content: this.textareaval,
        }
        this.complaint(data)
      }
    },
    // 评价
    evaluate(data) {
      // console.log(data)
      this.axios
        .post('appraise/saveAppraise.do', data)
        .then(res => {
          // console.log(res)
          const {status, data:{state}} = res
          if (state != 1) {
            this.prohibitBtn = false;
            this.$vux.toast.text(res.data.error);
          } else {
            this.$vux.toast.text('评价成功')
            setTimeout(() => {
              this.$router.push({path: '/myorderlistitem', query: {id:this.id}})
            }, 800)
          }
        })
    },
    // 投诉
    complaint(data) {
      // console.log(data)
      this.axios
        .post('complain/saveComplain.do', data)
        .then(res => {
          console.log(res)
          if (res.data.res != 1) {
            this.prohibitBtn = false;
            this.$vux.toast.text('保存失败');
          } else {
            this.$vux.toast.text('保存成功')
            setTimeout(() => {
              this.$router.push({path: '/myorderlistitem', query: {id:this.id}})
            }, 800)
          }
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
.radio {
  margin-top: 16px;
}
.radio > div {
  display: inline-block;
  width: 32%;
  text-align: center;
}
.radio-item {
  width: 18px;
  height: 18px;
  border: 3px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  vertical-align: bottom;
  margin-right: 4px;
}
.radio-item-selected {
  border-color: green;
  position: relative;
}
.radio-item-selected::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: green;
  position: absolute;
  left: 6px;
  top: 6px;
}
.estimate .weui-cell {
  line-height: 1;
  height: 26px;
}

.btn {
  position: fixed;
  bottom: 0;
  border-radius: 0px;
}
.service /deep/ .weui-label {
  width: 105px !important;
}
/deep/ .range-min,
/deep/ .range-max {
  width: unset;
}
/deep/ .range-min {
  left: -60px;
}
/deep/ .range-max {
  right: -84px;
}
/deep/ .range-handle {
  height: 20px;
  width: 20px;
  top: -8.5px !important;
}
/deep/ .range-bar {
  width: 70%;
  left: 15px;
}
</style>
