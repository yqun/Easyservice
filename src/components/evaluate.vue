<template>
  <div v-if="btn && state">
    <group :title="`服务态度　${attitude}`"> <!--服务态度-->
      <cell title=" " primary="content">
        <range v-model="attitude" minHTML="不耐烦(0)" maxHTML="热情服务(100)" disabled></range>
      </cell>
    </group>
    <group :title="`响应速度　${response}`">
      <cell title=" " primary="content">
        <range v-model="response" minHTML="拖沓(0)" maxHTML="迅速及时(100)" disabled></range>
      </cell>
    </group>
    <group :title="`解决程度　${solve}`">
      <cell title=" " primary="content">
        <range v-model="solve" minHTML="未解决(0)" maxHTML="彻底解决(100)" disabled></range>
      </cell>
    </group>
  </div>
</template>

<script>
import { Range, Cell  } from 'vux'
export default {
  name: "evaluate",
  components: {Range, Cell },
  props:['attitude', 'response', 'solve', 'btn', 'state'],
}
</script>

<style scoped>

</style>
