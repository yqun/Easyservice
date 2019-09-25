<template>
  <div class="content">
    <!-- 头部 -->
    <div class="header">
      <i class="iconfont icon-fanhui" @click="$router.push('/login')"></i>
      注册
    </div>
    <!--f_name   f_pwd f_pwdr f_phone_num-->
    <group :gutter="150" class="registerInfo">
      <x-input title="　用户名：" :show-clear="false" v-model="f_name" placeholder="用户名" ></x-input>
      <x-input title="　手机号：" :show-clear="false" v-model="f_phone_num" placeholder="手机号" type="tel"></x-input>
      <x-input title="　　密码：" :show-clear="false" v-model="f_pwd" placeholder="密码" type="password"></x-input>
      <x-input title="重复密码：" :show-clear="false" v-model="f_pwdr" placeholder="重复密码" type="password"></x-input>
    </group>
    <div class="register">
      <x-button @click.native="registerUser()">注　册</x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      f_name: '',
      f_phone_num: '',
      f_pwd: '',
      f_pwdr: '',
    }
  },
  methods: {
    registerUser() {
      // /^[!@#$%^&*()_+|~`]$/
      const reg = /^[!@#$%^&*()_+|！@#￥%……&*（）——+|\[\]-]+$/
      if (reg.test(this.f_name)) return this.$vux.toast.text('用户名不能含有特殊字符')
      if (!this.f_name) return this.$vux.toast.text('用户名不能为空')
      if (this.f_name.indexOf(' ') !== -1) return this.$vux.toast.text('请不要在用户名中输入空格')
      if (this.f_name.length < 2 || this.f_name.length >8) return this.$vux.toast.text('用户名长度2-8位')
      // if (!/^[1][3-9][0-9]{9}$/.test(this.f_phone_num)) return this.$vux.toast.text('手机号格式不正确')
      if (!this.f_pwd) return this.$vux.toast.text('密码不能为空')
      if (this.f_pwd.indexOf(' ') !== -1) return this.$vux.toast.text('请不要在密码中输入空格')
      if (!this.f_pwdr || this.f_pwd !== this.f_pwdr) return this.$vux.toast.text('密码不一致')
      const data = {
        f_name: this.f_name,
        f_phone_num: this.f_phone_num,
        f_pwd: this.f_pwd,
        f_pwdr: this.f_pwdr
      }
      this.axios
        .post(`user/registerUser.do`, data)
        .then(res => {
          console.log(res)
          const {state} = res.data
          if (state) {
            this.$vux.toast.text('注册成功')
            this.$router.push('/login')
            // this.$router.go(-1)
          } else {
            this.$vux.toast.text(res.data.error)
          }
        })
    }
  }
}
</script>

<style scoped>
.content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(left, #2A91D8 , #8acffe); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #2A91D8, #8acffe); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #2A91D8, #8acffe); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #2A91D8 , #8acffe); /* 标准的语法 */
  text-align: center;
}
.header {
  height: 46px;
  width: 100%;
  background-color: transparent;
  box-sizing: border-box;
  border-bottom: 1px solid #cdcdcd;
  color: #fff;
  font-size: 18px;
  line-height: 46px;
  text-align: center;
  position: relative;
}
i.iconfont.icon-fanhui {
  position: absolute;
  left: 20px;
}
.registerInfo {
  box-sizing: border-box;
  margin: 0 20px;
  border-radius: 10px;
  box-shadow: -4px 4px 18px #505050;
}
div.register {
  margin-top: 20px;
  box-sizing: border-box;
  padding: 0 40px;
}
div.register button {
  background-color: #34d231;
  font-weight: 700;
  font-size: 20px;
}
.weui-btn {
  line-height: 2;
}
/deep/ .weui-cells::before, /deep/ .weui-cells::after {
  border: none;
}
.weui-cell:before {
  right: 15px;
}
/deep/ .weui-cells.vux-no-group-title {
  border-radius: 10px;
}
</style>
