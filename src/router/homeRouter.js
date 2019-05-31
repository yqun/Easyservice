import Home from '@/views/home'

import Myorder from '@/views/home/myorder' // 我的工单
import Assignedorder from '@/views/home/assignedorder' // 指派工单
import ListItem from '@/views/home/assignedorder/listitem'

import Performorder from '@/views/home/performorder' // 执行工单
import Performlist from '@/views/home/performorder/Performlist' // 执行工单

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {path: '/myorder',name:'myorder',component: Myorder},
    children: [
      {path: '/myorder',name:'myorder',component: Myorder},
      {
        path: '/assignedorder',
        name:'assignedorder',
        component: Assignedorder,
        redirect: {path: '/listItem', name:'listitem', component: ListItem},
        children: [
          {path: '/listItem', name: 'listitem', component: ListItem}
        ]
      },
      {
        path: '/performorder',
        name:'performorder',
        component: Performorder,
        redirect: {path: '/performlist', name: 'performlist', component: Performlist},
        children: [
          {path: '/performlist', name: 'performlist', component: Performlist}
        ]
      },
    ]
  },
]
