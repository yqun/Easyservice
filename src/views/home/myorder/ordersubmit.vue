<template>
  <div class="fixedpadding" :key="index">
    <x-header style="background-color:dodgerblue;color:#fff;">
      <span>工单提交</span>
      <x-icon slot="overwrite-left" type="ios-arrow-left" size="30" @click="routerLink()"
              style="fill:#fff;position:relative;top:-5px;left:-3px;"></x-icon>
    </x-header>
    <group>
      <selector title="资产类别"
                direction="rtl"
                :options="assets"
                v-model="assetskey"
                placeholder="请选择资产类别">
      </selector>
      <selector title="服务单位"
                direction="rtl"
                :options="service"
                v-model="servicekey"
                placeholder="请选择单位">
      </selector>
    </group>
    <p class="person" v-for="item in serviceStaffers" :key="item.id">{{item.f_name}} {{item.f_phone_num}}</p>
    <!-- 上传图片 -->
    <group>
      <!-- 查看图片 -->
      <div v-transfer-dom>
        <previewer :list="filesImg" ref="previewer" :options="options"></previewer>
      </div>
      <!-- vux-uploader 图片上传 -->
      <uploader
        :max="5"
        :handle-click="false"
        :autoUpload="true"
        :show-header="true"
        :upload-url= 'axiosUrl + "system/uploadFile.do?token=" + token'
        name="file"
        :images="images"
        size="small"
        :previmg="filesImg"
        @preview="show"
      ></uploader>
    </group>
    <group style="margin-bottom: 42px;">
      <x-textarea title="备注" v-model="remarksvalue" :rows="5" :cols="10"></x-textarea>
    </group>
    <x-button :gradients="btncolor" class="btnsubmit" @click.native="orderinfo()" :disabled="prohibitBtn">提交</x-button>
  </div>
</template>

<script>
import Uploader from '../../../components/vux-uploader/src/main'
import { TransferDom } from 'vux'
export default {
  components: {Uploader,},
  directives: {TransferDom},
  name: "ordersubmit",
  data() {
    return {
      token: '',
      index: 0,
      assetskey: null,
      assets: [],
      servicekey: null,
      service: [],
      serviceStaffers: [], // 公司负责人数组
      btncolor: ['dodgerblue', 'dodgerblue'],
      remarksvalue: '',
      // 图片上传配置
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      },
      /* vux-uploader */
      images: [],
      filesId: [],
      filesImg: [],
      prohibitBtn: false, // 禁用按钮
    }
  },
  watch: {
    assetskey(newVal, oldVal) {
      if (newVal == oldVal) return false;
      this.getservice()
    },
    servicekey(newVal, oldVal) {
      if (newVal == oldVal) return false;
      this.service.forEach(item => {
        if (item.key == newVal) {
          this.serviceStaffers = item.serviceStaffers
        }
      })
    },
  },
  created() {
    this.token = window.localStorage.getItem('token')
    this.getassets()
  },
  activated () {
    this.$forceUpdate();
  },
  methods: {
    routerLink() {
      this.$router.path == '/oftenaddress'? this.$router.push('/myorder'):this.$router.push(this.$router.path)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    // 获取资产类别
    getassets() {
      this.axios
        .get('equmentType/findEntityByPage.do')
        .then(res => {
          // console.log(res)
          const {rows} = res.data
          if (!rows.length) return false;
          rows.forEach(item => {
            this.assets.push({
              key:item.id,
              value:item.f_name,
              f_unit_id: item.f_unit_id
            })
          })
        })
    },
    // 获取服务单位
    getservice() {
      this.service.length = 0;
      this.servicekey = null;
      this.axios
        .get(`equmentType/findSuppliesByEqumentType.do?id=${this.assetskey}`)
        .then(res => {
          // console.log(res)
          const {rows} = res.data
          if (!rows.length) return false;
          rows.forEach(item => {
            this.service.push({
              key:item.id,
              value:item.f_name,
              serviceStaffers: item.serviceStaffers
            })
          })
          if (this.service.length == 1) {
            this.servicekey = this.service[0].key
          }
        })
    },
    // 点击提交按钮
    orderinfo() {
      if (!this.assetskey) return this.$vux.toast.text('请填写资产类别');
      if (!this.servicekey) return this.$vux.toast.text('请填写服务单位');
      // service
      // assets
      let servicevalue,assetsvalue;
      this.assets.forEach(item => {
        if (this.assetskey == item.key) return assetsvalue = item.value
      })
      this.service.forEach(item => {
        if (this.servicekey == item.key) return servicevalue = item.value
      })
      // 获取图片id
      this.images.forEach(item => {
        // console.log(item)
        this.filesId.push(item.id)
      })
      const data = {
        ids: this.filesId,
        f_equmentType_id: this.assetskey,
        f_equmentType_name: assetsvalue,
        f_handler_org_id: this.servicekey,
        f_handler_org_name: servicevalue,
        f_remark: this.remarksvalue,
      }
      this.prohibitBtn = true
      this.axios
        .post('/workOrder/saveCustomerWorkOrder.do', data)
        .then(res => {
          console.log(res)
          if(res.data.res != 'true') {
            this.prohibitBtn = false
            this.$vux.toast.text(res.data.error);
          } else {
            this.$vux.toast.text('提交完成')
            setTimeout(() => {this.$router.push('/')}, 800)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.vux-header {
  position:fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
.btnsubmit {
  position: fixed;
  bottom: 0;
  border-radius: 0;
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
.person {
  text-align: center;
}
</style>
