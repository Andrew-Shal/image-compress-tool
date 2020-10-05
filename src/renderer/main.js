import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import toastr from "./plugins/toastr"
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"
import LongPress from "vue-directive-long-press"
import clipboard from "./plugins/clipboard"

Vue.config.productionTip = false
Vue.directive("long-press", LongPress)

// bus for communication - publish/subscribe
export const bus = new Vue()

new Vue({
  router,
  store,
  clipboard,
  toastr,
  vuetify,
  render: h => h(App),
}).$mount("#app")
