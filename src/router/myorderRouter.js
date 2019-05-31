import Myorderlist from '@/views/home/myorder/myorderlist'
import Myorderlistitem from '@/views/home/myorder/myorderlistitem'
import Myorderlistiteminfo from '@/views/home/myorder/myorderlistiteminfo'
import Estimate from '@/views/home/myorder/estimate'  // 常用地址

export default [
  {
    path: '/myorderlist',
    name: 'myorderlist',
    component: Myorderlist,
    redirect: {path: '/myorderlistitem', name: 'myorderlistitem', component: Myorderlistitem},
    children: [
      {path: '/myorderlistitem', name: 'myorderlistitem', component: Myorderlistitem}
    ]
  },
  {path: '/myorderlistiteminfo/:id', name:'myorderlistiteminfo', component: Myorderlistiteminfo},
  {path: '/estimate', name:'estimate', component: Estimate},
]
