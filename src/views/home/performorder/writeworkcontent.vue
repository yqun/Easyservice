<template>
  <div class="fixedpadding">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>填报工作内容</span>
      <x-icon slot="overwrite-left"
              type="ios-arrow-left"
              size="30"
              @click="$router.push({path: '/performorderinfo', query: {id: orderId}})"
              style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <!-- 工作内容 -->
    <group>
      <x-textarea placeholder="工作内容" v-model="workContent"></x-textarea>
    </group>
    <!-- 工时 -->
    <group>
      <x-input title="工时(小时)" :show-clear="false" v-model="workDate" :is-type="be2333"></x-input>
    </group>
    <p style="color: red;font-size:12px;margin-left: 10px;">注意：工时必须为0.5的整数倍</p>
    <!-- 图片上传 -->
    <group>
      <!-- 图片展示 -->
      <div v-transfer-dom><previewer :list="filesImg" ref="previewer" :options="options"></previewer></div>
      <!-- vux-uploader 图片上传 -->
      <uploader
        :max="5"
        :handle-click="false"
        :autoUpload="true"
        :show-header="true"
        :upload-url="axiosUrl + 'system/uploadFile.do?token=' + token"
        name="file"
        :images="images"
        size="small"
        :previmg="filesImg"
        @preview="show"
      ></uploader>
    </group>
    <!-- 工单完成情况， 备注 -->
    <group title="工单完成情况">
      <checker v-model="radio" class="radio" default-item-class="radio-item" selected-item-class="radio-item-selected">
        <div><checker-item value="未完成"></checker-item>未完成</div>
        <div><checker-item value="已完成"></checker-item>已完成</div>
      </checker>
      <!-- 备注 -->
      <x-textarea :max="200" v-model="textareaval" placeholder="备注" :show-counter="false"></x-textarea>
    </group>
    <x-button :gradients="btncolor" class="btnsubmit" @click.native="submitData()" :disabled="prohibitBtn">提交</x-button>
  </div>
</template>

<script>
// import Uploader from 'vux-uploader'
import Uploader from '../../../components/vux-uploader/src/main'
import { TransferDom } from 'vux'
export default {
  name: "writeworkcontent",
  components: {Uploader,},
  directives: {TransferDom,},
  data() {
    return {
      be2333: function (value) {
        return {valid: value/0.5%1 === 0, msg: '请输入0.5的整数倍'}
      },
      token: '',
      orderId: 0,
      btncolor: ['dodgerblue', 'dodgerblue'],
      workDate: 0, // 工时
      radio: '未完成', //完成情况
      textareaval: '', // 备注
      workContent: '', // 工作内容
      // 图片上传
      images: [],
      filesId: [],
      filesImg: [],
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll(".previewer-demo-img")[index];
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          let rect = thumbnail.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      }, // options
      prohibitBtn: false, // 禁用按钮
    }
  },
  mounted() {
    this.getquery()
  },
  methods: {
    // 获取参数
    getquery() {
      this.orderId = this.$route.query.id
      this.token = window.localStorage.getItem('token')
    },
    // 展示 图片
    show (index) {
      this.$refs.previewer.show(index)
    },
    // 提交表单
    submitData() {
      // 判断  必选项
      if (!this.workContent)  return this.$vux.toast.text('请填写工作内容');
      // 判断 工时大于0  并且是0.5的倍数
      if (this.workDate <= 0 || this.workDate/0.5%1 !== 0) return this.$vux.toast.text('请正确输入工时');
      if (!this.radio)  return this.$vux.toast.text('请填写工单完成情况');
      // 获取图片id
      this.images.forEach(item => {this.filesId.push(item.id)})
      // console.log(this.filesId)
      const data = {
        f_work_order_id: this.orderId,
        f_work_content: this.workContent, // 工作内容
        f_work_house: this.workDate, // 工时
        f_completed: this.radio, // 工单完成情况
        ids: this.filesId, // 图片id
        f_remark: this.textareaval, // 备注
      }
      this.sendData(data)
    }, // submitData
    // 向后台发送数据
    sendData(data) {
      this.prohibitBtn = true;
      this.axios
        .post(`orderLog/saveOrderLog.do`, data)
        .then(res => {
          console.log(res)
          if (res.data.res == false) {
            this.prohibitBtn = false;
            this.$vux.toast.text('提交失败')
          } else {
            this.$vux.toast.text('提交成功')
            setTimeout(() => {this.$router.push({path:'/performlist'})}, 800)
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
.btnsubmit {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index:999;
  border-radius: 0px;
}
.radio {
  margin-top: 16px;
}
.radio > div {
  display: inline-block;
  width: 32%;
  text-align: center;
  margin-bottom: 10px;
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
/* 文件上传 */
li.previewpic {
  float: left;
  position: relative;
}
li.previewpic i.iconfont.icon-quancha {
  position: absolute;
  right: 4px;
  top: 0;
  color: #ccc;
}
i.iconfont.icon-tianjiatupian {
  font-size: 60px;
}
</style>
