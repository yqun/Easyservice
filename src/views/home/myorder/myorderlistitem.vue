<template>
  <div style="height: 100%;">
    <scroller lock-x height="100%" ref="scroller" @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="200"
              style="box-sizing: border-box; padding-top: 0px;padding-bottom: 15px;">
      <ul>
        <li class="clearfix"
            @click="$router.push({path: `/myorderlistiteminfo/${item.id}`, query: {id: id}})"
            v-for="item in list" :key="item.id">
          <div class="item-content">
            <h3>问题：{{item.f_description}}</h3>
            <p>客户：{{item.f_customer_name}}({{item.f_customer_phnum}})</p>
            <p>地址：{{item.f_address}}</p>
            <span>{{item.f_create_time}}</span>
            <div>
              <i v-if="navIndex != 2" @click.stop="evaluate(item,1)">评价工单</i>
              <i v-if="navIndex != 2" @click.stop="evaluate(item,0)">投诉</i>
            </div>
          </div>
          <div class="item-state">
            {{item.f_work_order_state}}
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "myorderlistitem",
  props:['id'],
  data() {
    return {
      list: [],
      pageTotal: 0, //总页数
      page: 1, // 第几页
      rows: 10, // 条数
      status: '未指派',
      flag: true,
    }
  },
  computed: {
    ...mapState(['navIndex'])
  },
  watch: {
    navIndex(newVal, oldVal) {
      this.getIndex(newVal)
    }
  },
  mounted () {
    this.getIndex(this.navIndex)
  },
  methods: {
    getIndex(index) {
      this.list.length = 0;
      this.page = 1;
      if (index == 0) {
        this.status = '待完成'
        this.getWait()
      } else if (index == 1) {
        this.status = '已完成'
        this.getWait()
      } else if (index == 2) {
        this.status = '已取消'
        this.getWait()
      }
    },
    onScrollBottom() {
      if (!this.flag || this.pageTotal < this.page) return false;
      this.flag = false
      this.getWait()
      setTimeout(() => {
        this.flag = true
      }, 2000)
    },
    // 获取待指派
    getWait() {
      const data = {
        f_equmentType_id: this.id,
        f_work_order_state: this.status,
        page: this.page,
        rows: this.rows
      }
      this.axios
        .get(`workOrder/findEntityByPage.do`, {params: data})
        .then(res => {
          console.log(res)
          const {status} = res
          if (status !== 200) return false;
          const {rows, total} = res.data
          rows.forEach(item => {
            this.list.push(item)
          })
          this.pageTotal = Math.ceil(total/10)
          this.page++;
        })
    },
    // 评价e
    evaluate(item,state) {
      this.$router.push({
        path: '/estimate',
        query: {
          id: this.id,
          orderId: item.id,
          state: state
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/assignedperformlist.css';
.content {
  padding-bottom: 40px;
  box-sizing: border-box;
}
</style>
