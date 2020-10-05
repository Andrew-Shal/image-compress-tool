import Vue from "vue"
import CxltToastr from "cxlt-vue2-toastr"

var toastrConfigs = {
  position: "top right",
  showDuration: 500,
  timeOut: 3000,
  showMethod: "slideInRight",
  hideMethod: "slideInRight",
}
Vue.use(CxltToastr, toastrConfigs)
