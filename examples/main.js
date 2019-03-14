import Vue from 'vue'
import App from './App.vue'
import { Input, Select, Card, Row, Col, Spin, Pagination, Form, Modal, Button, Icon } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Input)
Vue.use(Select)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Spin)
Vue.use(Form)
Vue.use(Modal)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Pagination)

new Vue({
  render: h => h(App)
}).$mount('#app')
