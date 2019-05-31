<template>
  <div class="content">
    <group>
      <x-input title="　当前密码:"
               v-model="oldPassword"
               type="password"
               :show-clear="false"
               placeholder="当前密码"
                text-align="center">
      </x-input>
      <x-input title="　　新密码:"
               v-model="newPassword"
               type="password"
               :show-clear="false"
               placeholder="新密码"
                text-align="center">
      </x-input>
      <x-input title="重复新密码:"
               v-model="againNewPassword"
               type="password"
               :show-clear="false"
               placeholder="重复新密码"
                text-align="center">
      </x-input>
    </group>
    <div class="footerBtn">
      <x-button :gradients="btncolor" class="btn" @click.native="changePaswword()" :disabled="prohibitBtn">保存</x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "updatepssword",
  data() {
    return {
      btncolor: ['#2A91D8', '#2A91D8'],
      oldPassword: '',
      newPassword: '',
      againNewPassword: '',
      prohibitBtn:　false, // 保存按钮
    }
  },
  methods: {
    // 保存更改
    changePaswword() {
      // 判断 密码  必须填写
      if (!this.oldPassword || !this.newPassword || !this.againNewPassword) return this.$vux.toast.text('请完整填写信息');
      // 判断 旧密码 新密码  不相同
      if (this.oldPassword == this.newPassword) return this.$vux.toast.text('旧密码与新密码不能相同');
      // 判断 新密码 重复正确
      if (this.newPassword != this.againNewPassword) return this.$vux.toast.text('重复新密码不同')
      // 判断条件成立 更改密码
      this.judgeOldPassword()
    },
    // 判断旧密码是否正确
    judgeOldPassword() {
      this.prohibitBtn = true;
      const data = {pwdCu: this.oldPassword, newPwd: this.newPassword}
      this.axios
        .post('/user/updatePwd.do', data)
        .then(res => {
          // console.log(res)
          const state = res.data.res
          if (state != 'success') return this.prohibitBtn = false, this.$vux.toast.text(res.data.error);
          // 旧密码输入正确 提示信息
          this.$vux.toast.text('密码修改成功')
          // 重新设置token 页面跳转
          const {token} = res.data
          window.localStorage.setItem('token', token)
          setTimeout(() => {this.$router.push('/userinfo')}, 800)
        })
    }
  }
}
</script>

<style scoped>
.footerBtn {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.btn {
  margin-top: 30px;
}
</style>
