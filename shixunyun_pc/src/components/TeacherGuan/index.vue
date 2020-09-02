<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item>
        <el-button type="primary" size="small" @click="insert=true">关联班级</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="insert" class="insert">
          <el-form :model="form">
          <el-form-item label="教师" :label-width="formLabelWidth">
            <el-select v-model="insertTeacherClass.teacherId" placeholder="请选择">
              <el-option v-for="(Teacher, index) in teacher" :key="index" :label="Teacher.teacherName" :value="Teacher.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select v-model="insertTeacherClass.classId" placeholder="请选择">
              <el-option v-for="(ClassList, index) in classList" :key="index" :label="ClassList.className" :value="ClassList.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="insertTeacherClass.profesionalId" placeholder="请选择">
              <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
            </el-select>
          </el-form-item>
    </el-form>
          <!-- 取消or保存 -->
           <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="insertTeacher()">保 存</el-button>
          </div>
        </el-dialog>
    </el-form-item>
    <el-row>
      <el-col :span="5">
            <el-form-item label="教师名称">
                <el-input v-model="selectTeacherClass.teacherName" placeholder="请输入内容" style="width:217px"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="5">
            <el-form-item label="专业">
              <el-select v-model="selectTeacherClass.profesionalId" placeholder="请选择">
                <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="13" >
            <el-form-item  style="text-align:right;">
                <el-button type="primary" @click="getData">查询</el-button>
            </el-form-item>
        </el-col>
    </el-row>
    </el-form>
    <!-- 数据 -->
    <div class="main">
        <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
         max-height="418"
        align="center"
        :cell-style='cellStyle'
        :header-cell-style='rowClass'
        stripe
        style="width: 100%">
        <el-table-column
        prop="teacher.teacherName"
        label="姓名"
        width="180">
        </el-table-column>
        <el-table-column
        prop="classList.className"
        label="班级">
        </el-table-column>
        <el-table-column
        prop="professional.professionalName"
        label="专业">
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
    </div>
    <el-pagination
  background
:page-size="pagesize"
@size-change="handleSizeChange"
@current-change="handleCurrentChange"
:current-page="currentPage"
  layout="total, prev, pager, next"
  :total="tableData.length">
</el-pagination>
<el-dialog title="修改" :visible.sync="update" class="insert">
  <el-form :model="form">
  <el-form-item label="教师" :label-width="formLabelWidth">
    <el-select v-model="updateTeacherClass.teacherId" placeholder="请选择" @change="$forceUpdate()">
      <el-option v-for="(Teacher, index) in teacher" :key="index" :label="Teacher.teacherName" :value="Teacher.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="班级" :label-width="formLabelWidth">
    <el-select v-model="updateTeacherClass.classId" placeholder="请选择" @change="$forceUpdate()">
      <el-option v-for="(ClassList, index) in classList" :key="index" :label="ClassList.className" :value="ClassList.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="专业" :label-width="formLabelWidth" style="width:80%">
    <el-select v-model="updateTeacherClass.profesionalId" placeholder="请选择" @change="$forceUpdate()">
      <el-option v-for="(professional, index) in professionals" :key="index" :label="professional.professionalName" :value="professional.id"></el-option>
    </el-select>
  </el-form-item>
</el-form>
  <!-- 取消or保存 -->
    <div slot="footer" class="dialog-footer">
    <el-button @click="update = false">取 消</el-button>
    <el-button type="primary" @click="updateTeacher()">修 改</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  name: 'TeacherGuan',
  data () {
    return {
      form: {
        name: ''
      },
      tableData: [],
      teacher: [],
      classList: [],
      professionals: [],
      insertTeacherClass: [{
        teacherId: '',
        classId: '',
        profesionalId: ''
      }],
      selectTeacherClass: [{
        teacherName: '',
        profesionalId: 0
      }],
      updateTeacherClass: [{
        id: '',
        teacherId: '',
        classId: '',
        profesionalId: ''
      }],
      pagesize: 10,
      currentPage: 1,
      insert: false,
      update: false,
      insertFrom: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
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
    getClass () {
      var that = this
      this.$axios
        .get(this.$location.getAllClassNoPage)
        .then(response => {
          console.log('班级查询结果---->' + JSON.stringify(response.data.data))
          that.classList = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    getTeacher () {
      var that = this
      this.$axios
        .get(this.$location.getAllTeacherNoPage)
        .then(response => {
          console.log('教师查询结果---->' + JSON.stringify(response.data.data))
          that.teacher = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    getProfessional () {
      var that = this
      this.$axios
        .get(this.$location.getProfessionalNoPage)
        .then(response => {
          console.log('专业查询结果---->' + JSON.stringify(response.data.data))
          that.professionals = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    getData () {
      var that = this
      that.currentPage = 1
      this.$axios
        .get(this.$location.selectTeacherClass, {
          params: {
            professionalId: this.selectTeacherClass.profesionalId,
            teacherName: this.selectTeacherClass.teacherName
          }
        })
        .then(response => {
          console.log('信息查询结果---->' + JSON.stringify(response.data.data))
          that.tableData = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    insertTeacher () {
      this.insert = false
      var that = this
      const data = this.$qs.stringify(
        {
          teacherId: this.insertTeacherClass.teacherId,
          classId: this.insertTeacherClass.classId,
          professionalId: this.insertTeacherClass.profesionalId
        }
      )
      this.$axios
        .post(this.$location.insertTeacherClass, data)
        .then(response => {
          if (response.data.status === 200) {
            that.$message({
              type: 'success',
              message: response.data.msg
            })
            this.getData()
          } else {
            that.$message({
              type: 'info',
              message: response.data.msg
            })
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('新增请求处理失败')
          console.log(error)
        })
    },
    deleteRow (id) {
      console.log('id:' + id)
      const that = this
      this.$confirm('此操作将永久删除该关系, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .delete(this.$location.deleteTeacherClass + '?id=' + id)
            .then(response => {
              console.log(response.data)
              if (response.data.status === 0) {
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
              this.getData()
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
    updateRow (data) {
      this.update = true
      this.updateTeacherClass.id = data.id
      this.updateTeacherClass.teacherId = data.teacherId
      this.updateTeacherClass.classId = data.classId
      this.updateTeacherClass.profesionalId = data.professionalId
    },
    updateTeacher () {
      this.update = false
      var that = this
      this.$axios
        .get(this.$location.updateTeacherClass, {
          params: {
            id: this.updateTeacherClass.id,
            teacherId: this.updateTeacherClass.teacherId,
            classId: this.updateTeacherClass.classId,
            professionalId: this.updateTeacherClass.profesionalId
          }
        })
        .then(response => {
          if (response.data.status === 200) {
            that.$message({
              type: 'success',
              message: response.data.msg
            })
            this.getData()
          } else {
            that.$message({
              type: 'info',
              message: response.data.msg
            })
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('修改请求处理失败')
          console.log(error)
        })
    }
  },
  mounted () {
    this.getData()
    this.getProfessional()
    this.getTeacher()
    this.getClass()
  }
}
</script>
<style scoped>
.el-form-item{
    margin: 10px 0;
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
