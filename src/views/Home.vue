<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧区 -->
    <el-col :span="8" style="margin-top:20px">
      <el-card show="hover">
        <div class="user">
          <img :src="userImg" >
          <div class="userinof">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021.11.25</span></p>
          <p>上次登录地点：<span>南职</span></p>
        </div>
      </el-card>

      <el-card style="margin-top:20px;margin-bottom:0;padding-bottom:0 ;height:457px">
        <el-table :data="tableData">
            <!-- 遍历tablelabel对象 val属性值 key属性名-->
            <el-table-column v-for="(val,key) in tablelabel"
            :key="key"           
            :prop='key'
            :label='val'>
            </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧区 -->
    <el-col :span="16" style="margin-top:20px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <!-- 图表部分 -->
      <el-card style="height:280px">
        <div style="height:280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div style="height:240px" ref="userEcharts"></div>
        </el-card>

        <el-card style="height:260px">
           <div style="height:240px" ref="redeoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
import *as echarts from 'echarts'
export default {
    name:'Home',
    data() {
      return {
      userImg:require('../assets/imgs/user.png'),
      tableData:[],
      tablelabel:{
          name:'课程',
          todayBuy: '今日购买',
          monthBuy: '本月购买',
          totalBuy: '总购买',
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      }
    },
    mounted() {
      // 模拟请求后端数据
      axios.get('/home/getData').then(res=>{
        const{code,data}=res.data//解构
        // 判断状态码
        if(code===20000){
          this.tableData=data.tableData
          const order=data.orderData
          const xData=order.date
          const keyArray=Object.keys(order.data[0])
          const series=[]
          keyArray.forEach(key=>{
            series.push({
                name:key,
                data:order.data.map(item=>item[key]),
                type:'line'
            })
          })
          const opion={
            xAxis:{
              data:xData
            },
            yAxis:{},
            legend:{
              data:keyArray
            },
            series
          }
          const E=echarts.init(this.$refs.echarts)
          E.setOption(opion)
          //用户柱状图
          const userOption={
            legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map(item=>item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name:'新增用户',
              data:data.userData.map(item=>item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.userData.map(item=>item.active),
              type:'bar'
            },
          ],
          }
          const u=echarts.init(this.$refs.userEcharts)
          u.setOption(userOption)
          //饼图
          const redeoOption= {
              tooltip: {
                trigger: "item",
              },
              color: [
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3ed1cf",
              ],
              series: [
                {
                  data:data.videoData,
                  type:'pie'
                }
              ],
            }
            
          const v =echarts.init(this.$refs.redeoEcharts)
          
          v.setOption(redeoOption)
        }
        console.log(res);
      })
    },
}
</script>

<style scoped>

</style>