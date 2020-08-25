<template>
  <div>
    <el-form ref="form" label-width="80px">
    <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增权限</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="getPermissionMap">查看权限图</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete">删除权限</el-button>

       <el-dialog title="新增权限" :visible.sync="insert" class="insert">
             <el-form v-model="addForm">
             <el-form-item label="权限名称" :label-width="formLabelWidth">
               <el-button type="infor" size="small" icon="el-icon-plus" @click="addLevel1">新增一级权限</el-button>
               <el-button type="infor" size="small" icon="el-icon-plus" @click="addLevel2">新增二级权限</el-button>
               <el-button type="infor" size="small" icon="el-icon-plus" @click="addLevel3">新增三级权限</el-button>
             </el-form-item>
       </el-form>
             <!-- 取消or保存 -->
              <div slot="footer" class="dialog-footer">
               <el-button @click="insertFrom = false">取 消</el-button>
               <el-button type="primary" @click="insertFrom = false">保 存</el-button>
             </div>
           </el-dialog>

        <!-- 新增弹窗 -->
        <el-dialog title="新增权限" :visible.sync="insert" class="insert">
          <el-form v-model="addForm">
          <el-form-item label="权限名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.permissionName" autocomplete="off" placeholder="请输入权限名称" ></el-input>
          </el-form-item>
    </el-form>
          <!-- 取消or保存 -->
           <div slot="footer" class="dialog-footer">
            <el-button @click="insertFrom = false">取 消</el-button>
            <el-button type="primary" @click="insertFrom = false">保 存</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改权限" :visible.sync="update" class="insert">
              <el-form v-model="addForm">
              <el-form-item label="权限名称" :label-width="formLabelWidth">
                <el-input v-model="updateForm.permissionName" autocomplete="off" placeholder="请输入权限名称" ></el-input>
              </el-form-item>
        </el-form>
              <!-- 取消or保存 -->
               <div slot="footer" class="dialog-footer">
                <el-button @click="insertFrom = false">取 消</el-button>
                <el-button type="primary" @click="insertFrom = false">保 存</el-button>
              </div>
            </el-dialog>
    </el-form-item>
    <el-row class="inputRow">
        <el-col :span="7" :offset="10">
            <el-form-item label="搜索权限名称" :label-width="formLabelWidth">
              <el-input v-model="permissionName" placeholder="请输入权限名称"></el-input>
            </el-form-item>
        </el-col>

        <el-col :span="3" >
            <el-form-item  style="text-align:right;">
                <el-button type="primary" @click="searchPermission">查询</el-button>
            </el-form-item>
        </el-col>
    </el-row>
    </el-form>
      <el-table
    ref="multipleTable"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
     max-height="395"
    tooltip-effect="dark"
    style="width: 100%"
    align="center"
    :cell-style='cellStyle'
    :header-cell-style='rowClass'
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="120">
    </el-table-column>
    <el-table-column
      prop="id"
      label="权限编号">
    </el-table-column>
    <el-table-column
      prop="permissionName"
      label="权限名称">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.row.id)"
          type="danger"
          size="small">
          移除
        </el-button>
        <el-button
          @click.native.prevent="updatePermission(scope.row.id)"
          type="warning"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
  background
:page-size="pagesize"
@size-change="handleSizeChange"
@current-change="handleCurrentChange"
:current-page="currentPage"
  layout="total, prev, pager, next"
  :total="tableData.length">
</el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Quan',
  data () {
    return {
      tableData: [],
      permissionName:'',
      pagesize: 6,
      currentPage: 1,
      addForm:{
        permissionName:'',
        level1:0,
        level2:0,
        level3:0
      },
      insert: false,
      update:false,
      insertFrom: false,
      formLabelWidth: '120px',
      updateForm:{
        id:0,
        parentId:0,
        permissionTag:'',
        permissionName:'',
        permissionUrl:'',
      },
      level1PermissionSelect:[]
    }
  },
  methods: {
    addLevel2(){
      
    },
    getPermissionMap(){
      
    },
    updateAction(){

    },
    updatePermission(id){
      this.update=true
      this.$axios
      .get(this.$location.getSysPermissionById+'/'+id)
      .then(response =>{
        // alert("返回的对象---->"+JSON.stringify(response.data))
        this.updateForm.id = response.data.data.id
        this.updateForm.parentId = response.data.data.parentId
        this.updateForm.permissionTag = response.data.data.permissionTag
        this.updateForm.permissionName = response.data.data.permissionName
        this.updateForm.permissionUrl = response.data.data.permissionUrl
      }).catch(function(error){
        that.$message({
          type: 'info',
          message: '未知错误！'
        })
      })
    },
    deleteRow(id){

    },
    searchPermission(){
      const data  = this.$qs.stringify({permissionName:this.permissionName})
      this.$axios
      .post(this.$location.getSysPermission,data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
      .then(response =>{
        // alert("查询结果---->"+JSON.stringify(response.data.data))
        if(response.data.status == 200){
          this.tableData=response.data.data
          this.total = response.data.data.length
        }
      }).catch(function(error){
        this.$message({
          type:'info',
          message:'请求错误'
        })
        console.log(error)
      })
    },
    getData:function(){
      // let data = this.$qs.stringify(this.searchForm)
      var that = this
      this.$axios
      .get(this.$location.getSysPermission)
      .then( response => {
          if(response.data.status == 200){
            // console.log("结果------>"+JSON.stringify(response.data))
            this.tableData=response.data.data
             this.total = response.data.data.length
          }
      }).catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })

    },
    cellStyle ({ row, column, rowIndex, columnIndex }) {
    // 表格文字居中
      return 'text-align:center'
    },
    rowClass ({ row, rowIndex }) {
      return 'text-align:center'
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleSelectionChange (val) {
      console.log(val)
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>
.el-form-item{
    margin: 10px 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.inputRow{
  margin-top: 20px;
}
.StuData::-webkit-scrollbar {
    width: 4px
}

.StuData::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px
}

.StuData:hover::-webkit-scrollbar-thumb {
    background: hsla(0,0%,53%,1)
}

.StuData:hover::-webkit-scrollbar-track {
    background: hsla(0,0%,53%,.1)
}
.your-table .el-table__body-wrapper::-webkit-scrollbar {
width: 10px;
height: 10px;
}
</style>
