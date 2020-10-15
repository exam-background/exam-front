<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteUser">删除</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="insert" class="insert">
          <el-form :model="form">
          <el-form-item label="登录名称" :label-width="formLabelWidth">
            <el-input v-model="insertDate.loginName" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" :label-width="formLabelWidth">
            <el-input v-model="insertDate.login_password" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="insertDate.department" placeholder="请选择专业">
              <span v-for="Professional in Professionals"><el-option  :label="Professional.professionalName" :value="Professional.professionalName"></el-option></span>
            </el-select>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="insertDate.position" placeholder="请选择职位">
              <span v-for="role in roleList"><el-option  :label="role.roleName" :value="role.roleMark"></el-option></span>
            </el-select>
          </el-form-item>
          <el-form-item label="真实名称" :label-width="formLabelWidth">
            <el-input v-model="insertDate.real_name" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="insertDate.mobilePhone" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
         <!-- <el-form-item label="创建日期" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="insertDate.createTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item> -->
    </el-form>
          <!-- 取消or保存 -->
           <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="insertFroms">保 存</el-button>
          </div>
        </el-dialog>
    </el-form-item>
    <el-row class="inputRow">
        <el-col :span="5">
            <el-form-item label="部门">
            <el-input v-model="form.department" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="5">
            <el-form-item label="职位">
            <el-select v-model="form.position" placeholder="请选择">
              <span><el-option  label="所有" value=""></el-option></span>


              <span v-for="role in roleList"><el-option  :label="role.roleName" :value="role.roleMark"></el-option></span>
            </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="13" >
            <el-form-item  style="text-align:right;">
                <el-button type="primary" @click="selData">查询</el-button>
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
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="用户编号">
    </el-table-column>
    <el-table-column
      prop="loginName"
      label="用户名称">
    </el-table-column>
    <el-table-column
      prop="department"
      label="部门">
    </el-table-column>
    <el-table-column
      prop="position"
      label="职位">
    </el-table-column>
    <el-table-column
      prop="mobilePhone"
      label="手机号码">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.row.id)"
          type="text"
          size="small">
          移除
        </el-button>
        <el-button
          @click.native.prevent="updateRow(scope.row)"
          type="text"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改 -->
  <el-dialog title="修改" :visible.sync="update" class="insert">
    <el-form :model="updataData">
      <el-form-item  label="登录名称" :label-width="formLabelWidth">
        <el-input v-model="updataData.loginName" autocomplete="off" style="width:217px" placeholder="请输入登录名称"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" :label-width="formLabelWidth">
        <el-input v-model="updataData.login_password" autocomplete="off" style="width:217px" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item label="部门" :label-width="formLabelWidth" style="width:80%">
        <el-select v-model="updataData.department" placeholder="请选择部门">
              <span v-for="Professional in Professionals"><el-option  :label="Professional.professionalName" :value="Professional.professionalName"></el-option></span>

        </el-select>
      </el-form-item>
      <el-form-item label="职位" :label-width="formLabelWidth" style="width:80%">
        <el-select v-model="updataData.position" placeholder="请选择职位">
              <span v-for="role in roleList"><el-option  :label="role.roleName" :value="role.roleMark"></el-option></span>
        </el-select>
      </el-form-item>
      <el-form-item label="真实名称" :label-width="formLabelWidth">
        <el-input v-model="updataData.real_name" autocomplete="off" style="width:217px" placeholder="请输入真实名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="updataData.mobilePhone" autocomplete="off" style="width:217px" placeholder="请输入手机号码"></el-input>
      </el-form-item>
     <!-- <el-form-item label="创建日期" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="updataData.createTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item> -->
    </el-form>
    <!-- 取消or保存 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="update = false">取 消</el-button>
      <el-button type="primary" @click="updateDataFun">修 改</el-button>
    </div>
  </el-dialog>
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
  import axios from 'axios'
export default {
  name: 'User',
  activated() {

},
created() {
  this.getProfessionalNoPage()
  this.getRoleList();
  console.log(this.Professionals);
},
  data () {
    return {
      tableData: [],
      form: {
        department: '',
        position: ''
      },
      insertDate: {
        loginName: '',
        login_password: '',
        department: '',
        position: '',
        createTime: '',
        mobilePhone: '',
        real_name: ''
      },
      updataData: {
        id: '',
        loginName: '',
        login_password: '',
        department: '',
        position: '',
        createTime: '',
        mobilePhone: '',
        real_name: ''
      },
      update: false,
      pagesize: 10,
      currentPage: 1,
      insert: false,
      insertFrom: false,
      formLabelWidth: '120px',
      department: '',
      position: '',
      deleteUsers: '',
      Professionals :[],
      roleList :[]
    }
  },
  methods: {
    getProfessionalNoPage(){
      axios.get(this.$location.getProfessionalNoPage)
      .then(res=>{
        this.Professionals= res.data.data;
        })
      },
      getRoleList(){
        axios.get(this.$location.getSysRoleList)
        .then(res=>{
          this.roleList= res.data.data;
          })
      }
      ,
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
      console.log(JSON.stringify(val))
      this.deleteUsers = val
    },
    getDate () {
      var that = this
      console.log('当前页数：' + that.currentPage + ';显示行数：' + that.pagesize + ';部门：' + that.department + ';职位：' + that.position)
      this.$axios
        .post(this.$location.getSysUserByPage, this.$qs.stringify(
          {
            department: that.department,
            position: that.position
          }
        ))
        .then(response => {
        if(null != response.data.data){
            console.log('初始化结果---->' + JSON.stringify(response.data.data))
                    that.tableData = response.data.data
        }else{
          that.tableData = [];
        }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('初始化数据请求处理失败')
          console.log(error)
        })
    },
    selData () {
      var that = this
      that.currentPage = 1
      console.log('当前页数：' + that.currentPage + ';显示行数：' + that.pagesize + ';部门：' + this.form.department + ';职位：' + this.form.position)
      this.$axios
        .post(this.$location.getSysUserByPage, this.$qs.stringify(
          {
            department: this.form.department,
            position: this.form.position
          }
        ))
        .then(response => {
         if(null != response.data.data){
             console.log('初始化结果---->' + JSON.stringify(response.data.data))
                     that.tableData = response.data.data
         }else{
           that.tableData = [];
         }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    deleteRow (id) {
      console.log('id:' + id)
      const that = this
      this.$confirm('是否执行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post(this.$location.deleteSysUser, this.$qs.stringify(
              {
                id: id
              }
            ))
            .then(response => {
              console.log(response.data)
              if (response.data.status === 200) {
                that.$message({
                  type: 'success',
                  message: response.data.msg
                })
              } else {
                that.$message({
                  type: 'info',
                  message: response.data.msg
                })
              }
              that.selData()
            })
            .catch(function (error) {
              // 请求失败处理
              console.log(error)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    insertFroms () {
      this.insert = false
      const data = this.$qs.stringify({
        loginName: this.insertDate.loginName,
        login_password: this.insertDate.login_password,
        real_name: this.insertDate.real_name,
        department: this.insertDate.department,
        position: this.insertDate.position,
        mobilePhone: this.insertDate.mobilePhone,
        createTime: this.insertDate.createTime
      })
      console.log('data:' + data)
      this.$axios
        .post(this.$location.insertSysUser, data)
        .then(response => {
          if (response.data.status === 200) {
            console.log('插入成功---->' + response.data.msg)
          } else {
            console.log('插入失败---->' + response.data.msg)
          }
          this.getDate()
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    updateRow (data) {
      console.log(data)
      this.update = true
      this.updataData.id = data.id
      this.updataData.loginName = data.loginName
      this.updataData.login_password = data.login_password
      this.updataData.department = data.department
      this.updataData.position = data.position
      this.updataData.createTime = data.createTime
      this.updataData.mobilePhone = data.mobilePhone
      this.updataData.real_name = data.real_name
    },
    updateDataFun () {
      this.update = false
      const that = this
      const data = this.$qs.stringify({
        id: this.updataData.id,
        loginName: this.updataData.loginName,
        login_password: this.updataData.login_password,
        real_name: this.updataData.real_name,
        department: this.updataData.department,
        position: this.updataData.position,
        mobilePhone: this.updataData.mobilePhone,
        createTime: this.updataData.createTime
      })
      console.log(data)
      this.$axios
        .post(this.$location.updateSysUser, data)
        .then(response => {
          if (response.data.status === 200) {
            console.log('修改成功---->' + response.data.msg)
          } else {
            console.log('修改失败---->' + response.data.msg)
          }
          this.getDate()
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    deleteUser () {
      console.log('即将删除总长度为：' + this.deleteUsers.length + '的数据：' + JSON.stringify(this.deleteUsers))
      if (this.deleteUsers.length === 0) {
        this.$message({
          type: 'info',
          message: '至少选择一个需要删除的用户'
        })
      } else {
        var that = this
        this.$confirm('是否执行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$axios
              .post(this.$location.deleteSysUsers, this.deleteUsers)
              .then(response => {
                console.log('操作结果---->' + response.data.msg)
                this.selData()
              })
              .catch(function (error) {
                // 请求失败处理
                console.log('初始化数据请求处理失败')
                console.log(error)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  },
  mounted () {
    this.getDate()
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
