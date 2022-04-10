<template>
    <el-menu default-active="1-4-0" class="el-menu-vertical-demo" background-color="#545c64"
    text-color="#fff"  active-text-color="rgb(201, 165, 4)"
    @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{isCollapse? '后台':'后台管理系统'}}</h3>

        <el-menu-item  v-for="item in noChildren" :key="item.path" :index="item.path"
            @click="clickMenu(item)">             
        <i :class="'el-icon-'+item.icon"></i>
        <!-- 读取侧边栏内容 -->
        <span slot="title" >{{item.label}}</span>
        </el-menu-item>

        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">  <!--其它项-->        
            <template slot="title">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span><!--其它--> 
            </template>
                <el-menu-item-group v-for="subitem in item.children" :key="subitem.path">
                <el-menu-item :index="subitem.path">{{subitem.label}}</el-menu-item>
                
                </el-menu-item-group>
        </el-submenu>

    </el-menu>
</template>

<script>
export default {
    name:'CommonAside',
    data() {
        return {
             isCollapse: false,//控制侧边栏展开收起
             
             menu:[
    /*     {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',//路由标识
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        } */
      ],
        }
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
          name:item.name
        }).catch(err=>{})
      }
    },
    mounted(){
      //绑定isCollapse事件
      this.$bus.$on('isCollapse',()=>{
        this.isCollapse=!this.isCollapse
      })
    },
    beforeDestroy() {
      // 解绑
      this.$off('isCollapse')
    },
    computed:{
      noChildren(){
        // 过滤出没有children的数组

        const item= this.asyncMenu.filter(item=> !item.children)
        console.log('没有子菜单',item);
        return item
      },
      hasChildren(){
        const item= this.asyncMenu.filter(item=> item.children)
        console.log('有子菜单',item);
        return item       
      },
      asyncMenu(){
        return this.$store.state.tab.menu
      }
    }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
    
  }
  .el-menu>h3{
    color:#fff;
    text-align: center;
    line-height: 48px;
    font-weight: normal;
  }
</style>