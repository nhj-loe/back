import  Mock  from "mockjs";
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

Mock.mock('/home/getData','get',homeApi.getStatisticalData)
Mock.mock('/user/getUser/add','post', userApi.createUser)//新增接口
Mock.mock('/user/getUser/edit','post', userApi.updateUser)//编辑接口
Mock.mock(/user\/getUser/,'get', userApi.getUserList)
Mock.mock(/user\/del/,'get', userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)

