// 导入组件，组件必须声明 name
import SingleControl from './SingleControl.vue'

// 为组件提供 install 安装方法，供按需引入
SingleControl.install = function(Vue) {
  Vue.component(SingleControl.name, SingleControl)
}

// 默认导出组件
export default SingleControl
