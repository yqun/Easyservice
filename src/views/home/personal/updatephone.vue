<template>
  <div class="content">
    <group>
      <x-input title="　新手机:"
               v-model="phone"
               text-align="center"
               :show-clear="false"
               placeholder="请输入手机号">
      </x-input>
      <x-input title="当前密码:"
               type="password"
               v-model="password"
               text-align="center"
               :show-clear="false"
               placeholder="请输入密码">
      </x-input>
    </group>
    <div class="footerBtn">
      <x-button :gradients="btncolor" class="btn" @click.native="savePhone()" :disabled="prohibitBtn">保存</x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "updatephone",
  data() {
    return {
      btncolor: ['#2A91D8', '#2A91D8'],
      phone: '',
      password: '',
      prohibitBtn: false, // 禁用按钮
    }
  },
  methods: {
    savePhone() {
      if (!(/^1[34578]\d{9}$/.test(this.phone)) || !this.password) return this.$vux.toast.text('请填写正确信息');
      this.prohibitBtn = true;
      this.axios
        .post('/user/checkPhoneNum.do', {f_phone_num: this.phone})
        .then(res => {
          const state = res.data.res
          console.log(res)
          if (state == "true") return this.prohibitBtn = false, this.$vux.toast.text('电话号码已被注册，请使用其他号码')
          this.sendInfo()
        })
    },
    sendInfo() {
      const data = {f_phone_num: this.phone, f_pwd: this.password}
      this.axios
        .post('/user/updatePhone.do', data)
        .then(res => {
          console.log('res', res)
          const state = res.data.res
          if (state == "fail") return this.prohibitBtn = false, this.$vux.toast.text(res.data.error);
          if (state == 'success') {
            window.localStorage.setItem('token', res.data.token)
            this.$vux.toast.text('手机号修改成功')
            setTimeout(() => {this.$router.push('/userinfo')}, 800)
          }
        })
    }
  }

}
</script>

<style scoped>
.footerBtn{
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.btn {
  margin-top: 30px;
}
</style>
