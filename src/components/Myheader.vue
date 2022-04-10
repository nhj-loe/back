<template>
  <header>
      <div class="l-content">
          <el-button @click="Collapse" plain icon="el-icon-menu" size="mini"></el-button>
          <h4>首页</h4>
      </div>
      <div class="r-content">
        <el-dropdown trigger="click" size="mini">
            <span >  
                <img class="user" :src="userImg">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>

  </header>
</template>

<script>
export default {
    name:'Myheader',
    data() {
        return {
            userImg:require('../assets/imgs/user.png')
        }
    },
    methods: {
        Collapse(){
            this.$bus.$emit('isCollapse')
        },
        logOut(){
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            this.$router.push({name:'login'})
        }
    },
}
</script>

<style scoped>

header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;

}
.l-content h4{
    color: #fff;
    margin-left: 20px;
    font-weight:normal;
}
.r-content img{
    width: 40px;
    height: 40px;
    border-radius: 50;
}

</style>

