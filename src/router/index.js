import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入Luyou 组件
import Mymain from '../views/Mymain.vue'


Vue.use(VueRouter)
//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes:[
		{
			path:'/',
            name:'Mymain',
			component:Mymain,
			redirect:'/home',
			children:[
/* 				{
				path:'Home',
				name:'home',
				component:()=>import('../views/Home.vue'),
				},
				{
				path:'Mall',
				name:'mall',
				component:()=>import('../views/Mall.vue'),
				},
				{
				path:'User',
				name:'user',
				component:()=>import('../views/User.vue')

				} */
		]
		},
		{
			path:'/login',
			name:'login',
			component:()=>import('../views/login.vue')
		}

	]
})



//暴露router
export default router