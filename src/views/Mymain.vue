<template>

<!-- container容器组件 -->
    <el-container style="border: none;">
        <!-- 侧边栏内容 -->
        <el-aside width="auto">
            <!-- 侧边栏通用组件 -->
            <common-aside/>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <el-header>
                <myheader/>
            </el-header>
            <!-- 主体 -->
            <el-main style="padding-bottom:5px; height:100vh">
                <keep-alive :include="['Home','Mall','User']">
                    <router-view></router-view>
                </keep-alive>                                               
            </el-main>
        </el-container>
    </el-container>
  
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import Myheader from '../components/Myheader.vue'
export default {
    name:'Mymain',
    components:{
        CommonAside,
        Myheader
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
.el-header{
    background-color: #333;
}
.el-main{
    padding-top: 0;
}
</style>