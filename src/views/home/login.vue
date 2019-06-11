<template>
  <div class="content">
    <h2>Welcome</h2>
    <input type="text" placeholder="手机号" v-model="useriphone">
    <input type="password" placeholder="密码" v-model="userpwd">
    <div style="text-align: left; margin-top: 10px; font-size: 16px;">
      <check-icon :value.sync="remember" type="plain">记住用户名</check-icon>
    </div>
    <x-button :gradients="['#8acffe', '#2A91D8']" @click.native="login()" :disabled="prohibitBtn">登录</x-button>
    <div class="register"><span @click="$router.push('/register')">注册</span></div>
    <div class="footer">北京金山顶尖科技股份有限公司</div>
  </div>
</template>

<script>
import { CheckIcon } from 'vux'
export default {
  name: "login",
  components: {
    CheckIcon
  },
  data() {
    return {
      useriphone: '',
      userpwd: '',
      remember: false,
      prohibitBtn: false, // 禁用按钮
    }
  },
  created() {
    const userStr = window.localStorage.getItem('user')
    if (userStr) {
      const userInfo  = JSON.parse(userStr)
      this.useriphone = userInfo.useriphone
      this.userpwd    = userInfo.userpwd
      this.remember   = userInfo.remember
    }
  },
  methods: {
    // 登录
    login() {
      // const reg_id = uexJPush.getRegistrationID();
      if (!this.useriphone) return this.$vux.toast.text('请输入用户名')
      if (!this.userpwd) return this.$vux.toast.text('请输入密码')
      const data = {f_phone_num: this.useriphone, f_pwd: this.userpwd, reg_id: 1111}
      this.prohibitBtn = true;
      this.axios
        .post('user/mobile_logIn.do', data)
        .then(res => {
          // console.log(res)
          const {state, token, roles} = res.data
          if (state !== 1) return this.prohibitBtn = false, this.$vux.toast.text(res.data.info)
          // 成功
          const {id} = res.data
          window.localStorage.setItem('token', token)
          window.localStorage.setItem('id', id)
          window.localStorage.setItem('roles', JSON.stringify(roles))

          // 用户名  密码
          if(this.remember) {
            const user = {useriphone: this.useriphone, userpwd: this.userpwd, remember: true}
            window.localStorage.setItem('user', JSON.stringify(user))
          } else {
            const userStr = window.localStorage.getItem('user')
            if (userStr) window.localStorage.removeItem('user')
          }
          this.$router.push('/myorder')
        })
    }
  }
}
</script>

<style scoped>
html, body, #app {
  height: 100%;
}
.content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(left, #2A91D8 , #8acffe); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #2A91D8, #8acffe); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #2A91D8, #8acffe); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #2A91D8 , #8acffe); /* 标准的语法 */
  text-align: center;
  padding: 100px 20px 0;
}
h2 {
  font-size: 40px;
  color: #fff;
}
input {
  width: 100%;
  display: block;
  box-sizing: border-box;
  height: 40px;
  outline: none;
  border: 1px solid #fff;
  background-color: transparent;
  margin-top: 20px;
  padding: 0 10px;
  border-radius: 14px;
  color: #fff;
}
.vux-check-icon > /deep/ span {
  font-size: 16px;
}
button {
  margin-top: 80px;
}
.register {
  margin-top: 10px;
}
.register span {
  margin-right: 10px;
  float: right;
  color: #fff;
}
.footer {
  font-size: 20px;
  margin-top: 100px;
  color: #fff;
}
</style>
