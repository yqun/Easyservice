import Vue from 'vue'

import { Tabbar, TabbarItem } from 'vux'
import { Tab, TabItem } from 'vux'
import { XHeader } from 'vux'
import { Group } from 'vux'
import { XInput } from 'vux'
import { Datetime } from 'vux'
import { Selector } from 'vux'
import { Flexbox, FlexboxItem } from 'vux'
import { XButton } from 'vux'
import { XTextarea } from 'vux'
import { Timeline } from 'vux'
import { TimelineItem } from 'vux'
import { Previewer } from 'vux'
import { Checker, CheckerItem } from 'vux'
import { XAddress } from 'vux'
import { Scroller } from 'vux'
import { LoadMore  } from 'vux'
import { Toast } from 'vux'
import { Confirm } from 'vux'
import { Alert } from 'vux'
import { ToastPlugin } from 'vux'
import  { ConfirmPlugin } from 'vux'
// 自定义全局组件
import NavBar from './navBar'



Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-header', XHeader)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('datetime', Datetime)
Vue.component('selector', Selector)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-button', XButton)
Vue.component('x-textarea', XTextarea)
Vue.component('timeline', Timeline)
Vue.component('timeline-item', TimelineItem)
Vue.component('previewer', Previewer)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('x-address', XAddress)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('toast', Toast)
Vue.component('confirm', Confirm)
Vue.component('alert', Alert)
Vue.component('navBar', NavBar)
Vue.use(ToastPlugin, {position: 'middle'})
Vue.use(ConfirmPlugin)
