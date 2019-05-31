import Ordersubmitview from '@/views/home/myorder/ordersubmitview' // 工单提交
import Ordersubmit from '@/views/home/myorder/ordersubmit'   // 工单提交
import Savechangeorder from '@/views/home/assignedorder/savechangeorder' //
import Oftenaddress from '@/views/home/myorder/oftenaddress' // 常用地址
import Salesman from '@/views/home/myorder/salesman'  // 业务员

export default [
  {
    path: '/ordersubmitview', name:'ordersubmitview',
    component: Ordersubmitview,
    // redirect: {path: '/ordersubmit', name:'ordersubmit', component: Ordersubmit},
    children: [
      {path: '/ordersubmit', name:'ordersubmit', component: Ordersubmit, meta: {keepAlive: true}},
      {path: '/savechangeorder', name:'savechangeorder', component: Savechangeorder, meta: {keepAlive: true}},
      {path: '/oftenaddress', name:'oftenaddress',component: Oftenaddress}, // 常用地址
      {path: '/salesman', name:'salesman', component: Salesman}, // 业务员
    ]
  },
]
