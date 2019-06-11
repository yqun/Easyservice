<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
      注册
    </div>
    <group :gutter="0">
      <x-input title="用户名　" :show-clear="false" placeholder="用户名" ></x-input>
      <x-input title="手机号　" :show-clear="false" placeholder="手机号" type="number"></x-input>
      <x-input title="密码　　" :show-clear="false" placeholder="密码"   ></x-input>
      <x-input title="重复密码" :show-clear="false" placeholder="重复密码"></x-input>
      <x-input title="验证码　" :show-clear="false" placeholder="验证码" >
        <img src="11" alt="" slot="right-full-height">
      </x-input>
    </group>
    <div class="register">
      <x-button @click.native="registerUser()">注册</x-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {

    }
  },
  methods: {
    registerUser() {
      console.log(0)
    }
  }
}
</script>

<style scoped>
.header {
   height: 46px;
   width: 100%;
   background-color: dodgerblue;
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
div.register {
  margin-top: 20px;
  box-sizing: border-box;
  /*padding: 0 10px;*/
}
</style>
