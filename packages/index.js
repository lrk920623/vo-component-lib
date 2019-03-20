import Input from './base/input'
import Select from './base/select'
import Card from './base/card'
import Modal from './base/modal'
import Pager from './base/pager'
import Spin from './base/spin'
import CommonModal from './business/commonModal'
import ParamShow from './business/paramShow'
import SearchBox from './business/searchBox'
import SingleControl from './business/singleControl'

import { types } from './business/_util/constant'

// 存储组件列表
const components = [
  Input,
  Select,
  Card,
  Modal,
  Pager,
  Spin,
  CommonModal,
  ParamShow,
  SearchBox,
  SingleControl
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,

  // 以下是具体的组件列表
  ...components
}

export {
  types
}


