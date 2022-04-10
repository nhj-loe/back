import Vue from 'vue'
import App from './App.vue'
//引入ElementUI组件
// import ElementUI from 'element-ui';
//引入ElementUI全部样式
// import 'element-ui/lib/theme-chalk/index.css';
import '../src/less/index.less'
import router from './router'
import './api/mock'
import store from './store/index'
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message 
} from 'element-ui';
Vue.config.productionTip = false
Vue.use(Button),
Vue.use(Radio),
Vue.use(Container),
Vue.use(Main),
Vue.use(Header),
Vue.use(Aside),
Vue.use(Menu),
Vue.use(Submenu),
Vue.use(MenuItem),
Vue.use(MenuItemGroup),
Vue.use(Dropdown),
Vue.use(DropdownItem),
Vue.use(DropdownMenu),
Vue.use(Row),
Vue.use(Col),
Vue.use(Card),
Vue.use(Table),
Vue.use(TableColumn),
Vue.use(Breadcrumb),
Vue.use(BreadcrumbItem),
Vue.use(Tag),
Vue.use(Form),
Vue.use(FormItem),
Vue.use(Input),
Vue.use(Select),
Vue.use(Option),
Vue.use(Switch),
Vue.use(DatePicker),
Vue.use(Dialog),
Vue.use(Pagination),
Vue.prototype.$confirm= MessageBox.confirm,
Vue.prototype.$message= Message 
// 配置前置路由守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token =store.state.user.token
  if(!token && to.name !=='login'){
    next({name:'login'})
  }else if(token && to.name==='login'){
      next({name:'home'})
  } else{
    next()
  }
})
new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)
  },
  beforeCreate(){
    Vue.prototype.$bus=this//安装全局事件总线
  }
}).$mount('#app')
