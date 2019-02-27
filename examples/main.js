import Vue from "vue";
import App from "./App.vue";
import { Input, Select } from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Input);
Vue.use(Select);

new Vue({
  render: h => h(App)
}).$mount("#app");
