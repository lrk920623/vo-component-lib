// 导入组件，组件必须声明 name
import SearchBox from './SearchBox.vue'

// 为组件提供 install 安装方法，供按需引入
SearchBox.install = function(Vue) {
  Vue.component(SearchBox.name, SearchBox)
}

// 默认导出组件
export default SearchBox
