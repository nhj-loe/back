<template>
  <div style="">
    <el-dialog
    :title="operateType==='add'?'新增用户':'更新用户'"
    :visible.sync="isShow">
      <commonfrom
      :formLabel="opertateFormLabel"
      :form="operateForm"
      :inline="true"
      ref="form"
      ></commonfrom>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="mange-header" style="margin-top:30px">
        <el-button type="primary" @click="addUser" style="width:70px;height:40px">+ 新增</el-button>
        <commonfrom
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
        >
        <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
        </commonfrom>
    </div>
    <!-- table组件 -->
    <commontable
    :tableData="tableData"
    :tableLabel="tableLabel"
    :config="config"
    @changePage="getList()"
    @edit="editUser"
    @del="delUser"
    ></commontable>
  </div>
</template>

<script>
import axios from 'axios'
import commonfrom from '../components/Commonfrom.vue'//表单组件
import commontable from '../components/CommonTable.vue'//表格组件
export default {
    name:'User',
    components:{
      commonfrom,
      commontable
    },
    data() {
      return {
        operateType:'add',
        isShow:false,
        opertateFormLabel:[
                    {
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'addr',
                        label: '地址',
                        type: 'input'
                    }
                ],
        operateForm:{
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
        },
        formLabel:[
          {
            model:"keyword",
            label:'',
            type:'input'
          }
        ],
        searchFrom:{
          keyword: ''
        },
        tableData:[],
        tableLabel:[
          {
            prop:'name',
            label:'姓名'
          },
          {
            prop:'age',
            label:'年龄'
          },
          {
            prop:'sexLabel',
            label:'性别'
          },
          {
            prop:'birth',
            label:'出生日期',
            width:200
          },
          {
            prop:'addr',
            label:'地址',
            width:320
          },
        ],
        config:{
          page:1,
          total:30,
          loading:''
        }

      }
    },
    methods: {
      // 新增用户方法
      confirm(){
        if(this.operateType==='edit'){
          axios.post('/user/getUser/edit',this.operateForm).then(res=>{
            console.log(res);
            this.isShow=false
            this.getList()
          })
        }else{
          axios.post('/user/getUser/add',this.operateForm).then(res=>{
            console.log(res);
            this.isShow=false
            this.getList()
          })
        }
      },
      addUser(){
        this.isShow=true
        this.operateType='add'
        this.operateForm={
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
        }
       
      },
      editUser(row){
        this.operateType='edit'
        this.isShow=true
        this.operateForm=row//接收table组件数据
      },
      delUser(row){
        this.$confirm("此操作将删除该用户数据，是否继续","提示",{
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          const id=row.id
          axios.get('/user/del',{params:{id}}).then(()=>{
            this.$message({
              type:'success',
              message:'删除成功'
            })
           this.getList()
          })
        })
      },
      // 遍历用户方法 请求mock模拟的用户数据
      getList(name=''){ 

        this.config.loading=true
        name ? (this.config.page=1) : '',
        axios.get('/user/getUser',{
          params:{
          page:this.config.page,
          name}          
        }).then(({data:res})=>{
          this.tableData= res.list.map(item=>{
              item.sexLabel=item.sex ===0 ?'女':'男'
              return item
          })
          this.config.total=res.count
          this.config.loading=false
          console.log('用户',res);
          console.log('姓名',name);
        })
      }
    },
    created() {
      this.getList()
    },
}
</script>

<style scoped>
.mange-header{
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>