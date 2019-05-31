import Personal from '@/views/home/personal' // 个人中心
import Userinfo from '@/views/home/personal/userinfo' // 个人中心 主页
import Updatephone from '@/views/home/personal/updatephone' // 修改手机号
import Updatepassword from '@/views/home/personal/updatepassword' // 修改密码


export default [
  {
    path: '/personal',
    name:'personal',
    component: Personal,
    redirect: {path: '/userinfo', name:'userinfo', component: Userinfo},
    children: [
      {path: '/userinfo', name:'userinfo', component: Userinfo},
      {path: '/updatephone', name:'updatephone', component: Updatephone},
      {path: '/updatepassword', name:'updatepassword', component: Updatepassword},
    ]
  }
  ]

