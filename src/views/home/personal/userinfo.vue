<template>
  <div>
    <group>
      <x-input title="　用户名:" v-model="userName" :show-clear="false" text-align="right"></x-input>
     <selector title="　　性别:" v-model="userSex" :options="list" direction="rtl"></selector>
      <x-input title="　手机号:" v-model="userPhone" disabled text-align="right"></x-input>
     <datetime title="出生日期:" v-model="userDatetime" :min-year="1950"></datetime>
      <x-input title="　　备注:" v-model="userRemark" :show-clear="false" text-align="right"></x-input>
    </group>
    <!-- 保存  修改手机号  修改密码 -->
    <flexbox :gutter="20" class="content">
      <flexbox-item>
        <div class="flex-demo" :style="bgColor" @click="saveUserInfo()">保存</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo" @click="$router.push('/updatephone')">修改手机号</div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo" @click="$router.push('/updatepassword')">修改密码</div>
      </flexbox-item>
    </flexbox>
    <!-- 退出登录 -->
    <div class="content">
      <x-button class="btn" type="warn" @click.native="deleteSession()">退出登录</x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data() {
    return {
      bgColor: {backgroundColor: '#aaa'},
      list: [],
      userId: '',
      userName: '',
      userSex: '',
      userPhone: '',
      userRemark: '',
      userDatetime: '',
      f_name: "",
      f_remark: "",
      f_birthday: "",
      f_order: "",
    }
  },
  computed: {
    saveColor() {
      return this.f_name == this.userName &&
        this.f_remark == this.userRemark &&
        this.f_birthday == this.userDatetime &&
        this.f_order == this.userSex
    }
  },
  watch: {
    saveColor(newVal, oldVal) {
      if (!newVal) {
        this.bgColor.backgroundColor = '#2A91D8'
      } else {
        this.bgColor.backgroundColor = '#aaa'
      }
    }
  },
  created() {
    this.getSex()
  },
  methods: {
    // 获取性别字典项
    getSex() {
      this.axios
        .post('dic/getDicValues.do', {f_name: '性别'})
        .then(res => {
          const {data} = res
          data.forEach(item => {
            this.list.push({key: item.id, value: item.f_value})
          })
          // 获取用户信息
          this.getUserInfo()
        })
    },
    // 获取用户信息
    getUserInfo() {
      this.userId = window.localStorage.getItem('id')
      this.axios
        .get(`user/findUserById.do?id=${this.userId}`)
        .then(res => {
          // console.log(res)
          // token 与后台不符
          const {code} = res.data
          if (code == -1) return this.$router.push('/login')
          //
          const { status } = res
          if (status === 200) {
            const { f_name, f_phone_num, f_birthday, f_remark, f_sex:{id} } = res.data
            this.userName = f_name
            this.userPhone = f_phone_num
            this.userRemark = f_remark
            this.userDatetime = f_birthday
            this.userSex = id

            // 需要判断保存颜色
            this.f_name = f_name
            this.f_remark = f_remark
            this.f_birthday = f_birthday
            this.f_order = id
          }
        })
    },
    // 点击保存 保存信息
    saveUserInfo() {
      if (this.bgColor.backgroundColor == '#2A91D8') {
        const data = {
          id: this.userId,
          f_name: this.userName,
          f_sex_id: this.userSex,
          f_birthday: this.userDatetime,
          f_remark: this.userRemark
        }
        this.axios
          .post('/user/updateUser.do', data)
          .then(res => {
            // console.log(res)
            if (res.data == "success") return this.getUserInfo();
          })
      }
    },
    // 退出登陆
    deleteSession() {
      window.localStorage.removeItem('token')
      // this.getUserInfo()
      this.$router.push('/login')
    }
  },

}
</script>

<style scoped>
.content {
  padding: 0 10px;
  box-sizing: border-box;
}
.flex-demo {
  margin-top: 16px;
  background-color: #2A91D8;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.btn {
  margin-top: 100px;
}
</style>
