<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="deletesJobDayExercies">批量删除</el-button>
        <el-dialog title="新增" :visible.sync="insert" class="insert" width="65%">
          <el-form :model="form">
            <el-form-item label="专业" :label-width="formLabelWidth">
              <el-select v-model="insertJobDayExercise.professionalId" placeholder="请选择" @change="selProfesionalIn">
                <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科目" :label-width="formLabelWidth">
              <el-select v-model="insertJobDayExercise.courselId" placeholder="请选择">
                <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题目" :label-width="formLabelWidth">
              <el-input v-model="insertJobDayExercise.title" placeholder="请输入内容" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item label="答案" :label-width="formLabelWidth">
              <ue v-model="insertJobDayExercise.answer"></ue>
            </el-form-item>
            <el-form-item label="评分标准" :label-width="formLabelWidth">
              <ue v-model="insertJobDayExercise.setStandard"></ue>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="insertJobDayExercises">保 存</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-row class="inputRow">
        <el-col :span="5">
          <el-form-item label="专业">
            <el-select v-model="jobDayExercise.professionalId" placeholder="请选择" @change="selProfesionalTe">
              <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="科目">
            <el-select v-model="jobDayExercise.courseId" placeholder="请选择">
              <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="题目">
            <el-input v-model="jobDayExercise.title" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item style="text-align:right;">
            <el-button type="primary" @click="getData">查询</el-button>
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
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="professional.professionalName" label="专业"></el-table-column>
      <el-table-column prop="course.courseName" label="科目" show-overflow-tooltip></el-table-column>
      <el-table-column prop="title" label="题目"></el-table-column>
      <el-table-column prop="answer" label="标准答案" show-overflow-tooltip>
        <template slot-scope="scope">
              <div v-html="scope.row.answer"></div>
        </template>
      </el-table-column>
      <el-table-column prop="setStandard" label="评分标准">
        <template slot-scope="scope">
              <div v-html="scope.row.setStandard"></div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
            type="text"
            size="small"
          >移除</el-button>
          <el-button
            @click.native.prevent="updateRow(scope.row)"
            type="text"
            size="small"
          >修改</el-button>
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
      :total="tableData.length"
    ></el-pagination>
    <el-dialog title="修改" :visible.sync="update" class="insert" width="65%">
      <el-form :model="form">
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-select v-model="updateJobDayExercise.professionalId" placeholder="请选择" @change="selProfesionalUp">
            <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" :label-width="formLabelWidth">
          <el-select v-model="updateJobDayExercise.courselId" placeholder="请选择">
            <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="updateJobDayExercise.title" placeholder="请输入内容" style="width:217px"></el-input>
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <ue v-model="updateJobDayExercise.answer"></ue>
        </el-form-item>
        <el-form-item label="评分标准" :label-width="formLabelWidth">
          <ue v-model="updateJobDayExercise.setStandard"></ue>
        </el-form-item>
      </el-form>
      <!-- 取消or保存 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="update = false">取 消</el-button>
        <el-button type="primary" @click="updateJobDayExercises">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ue from '@/components/ue.vue'
export default {
  name: 'MeiRi',
  data () {
    return {
      tableData: [],
      form: {
        name: '',
        region: ''
      },
      courses: {
        id: '',
        courseName: ''
      },
      professionals: {
        id: '',
        professional_name: '',
        professional_desc: ''
      },
      jobDayExercise: {
        title: '',
        professionalId: '',
        courseId: ''
      },
      insertJobDayExercise: {
        title: '',
        answer: '',
        setStandard: '',
        remark: '',
        professionalId: '',
        courselId: ''
      },
      updateJobDayExercise: {
        id: '',
        title: '',
        answer: '',
        setStandard: '',
        remark: '',
        professionalId: '',
        courselId: ''
      },
      pagesize: 10,
      currentPage: 1,
      insert: false,
      insertFrom: false,
      update: false,
      delJobDayExercise: '',
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
    handleSelectionChange (val) {
      console.log(JSON.stringify(val))
      this.delJobDayExercise = val
    },
    insertFun () {
      console.log(1)
      this.insert = true
    },
    getData () {
      var that = this
      that.currentPage = 1
      this.$axios
        .post(this.$location.getAllJobDayExercise, this.$qs.stringify(
          {
            title: this.jobDayExercise.title,
            professionalId: this.jobDayExercise.professionalId,
            courseId: this.jobDayExercise.courseId
          }
        ))
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
    getProfessional () {
      var that = this
      this.$axios
        .get(this.$location.getProfessionalNoPage)
        .then(response => {
          console.log('专业查询结果---->' + JSON.stringify(response.data.data))
          that.professionals = response.data.data
          console.log('专业查询结果---->' + JSON.stringify(this.professionals))
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    getCourse () {
      var that = this
      this.$axios
        .get(this.$location.getAllCourse)
        .then(response => {
          console.log('科目查询结果---->' + JSON.stringify(response.data.data))
          that.courses = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    insertJobDayExercises () {
      this.insert = false
      const data = this.$qs.stringify({
        title: this.insertJobDayExercise.title,
        answer: this.insertJobDayExercise.answer,
        setStandard: this.insertJobDayExercise.setStandard,
        courseId: this.insertJobDayExercise.courselId,
        professionalId: this.insertJobDayExercise.professionalId
      })
      this.$axios
        .post(this.$location.addJobDayExercise, data)
        .then(response => {
          if (response.data.status === 0) {
            console.log('插入成功---->' + response.data.msg)
          } else {
            console.log('插入失败---->' + response.data.msg)
          }
          this.getData()
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    updateRow (data) {
      console.log(JSON.stringify(data))
      this.update = true
      this.updateJobDayExercise.id = parseInt(data.id)
      this.updateJobDayExercise.title = data.title
      this.updateJobDayExercise.answer = data.answer
      this.updateJobDayExercise.setStandard = data.setStandard
      this.updateJobDayExercise.remark = data.remark
      this.updateJobDayExercise.professionalId = data.professional.id
      this.updateJobDayExercise.courselId = data.course.id
      console.log(JSON.stringify(this.updateJobDayExercise))
    },
    updateJobDayExercises () {
      this.update = false
      const data = this.$qs.stringify({
        id: this.updateJobDayExercise.id,
        title: this.updateJobDayExercise.title,
        answer: this.updateJobDayExercise.answer,
        setStandard: this.updateJobDayExercise.setStandard,
        remark: this.updateJobDayExercise.remark,
        professionalId: this.updateJobDayExercise.professionalId,
        courseId: this.updateJobDayExercise.courselId
      })
      console.log(data)
      this.$axios
        .post(this.$location.updateJobDayExercise, data)
        .then(response => {
          if (response.data.status === 0) {
            console.log('修改成功---->' + response.data.msg)
          } else {
            console.log('修改失败---->' + response.data.msg)
          }
          this.getData()
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post(this.$location.deleteJobDayExercies, this.$qs.stringify(
              {
                id: id
              }
            ))
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
    deletesJobDayExercies () {
      console.log('即将删除总长度为：' + this.delJobDayExercise.length + '的数据：' + JSON.stringify(this.delJobDayExercise))
      if (this.delJobDayExercise.length === 0) {
        this.$message({
          type: 'info',
          message: '至少选择一个需要删除的题目'
        })
      } else {
        var that = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$axios
              .post(this.$location.deletesJobDayExercise, this.delJobDayExercise)
              .then(response => {
                console.log('操作结果---->' + response.data.msg)
                this.getData()
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
    },
    selProfesionalIn () {
      alert(1)
      this.selProfesional(this.insertJobDayExercise.professionalId)
    },
    selProfesionalUp () {
      this.selProfesional(this.updateJobDayExercise.professionalId)
    },
    selProfesionalTe () {
      this.selProfesional(this.jobDayExercise.professionalId)
    },
    selProfesional (id) {
      this.$axios
        .get(this.$location.getCourseByProfessionalId, {
          params: {
            professionalId: id
          }
        })
        .then(response => {
          console.log(JSON.stringify(response.data.data))
          this.courses = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    }
  },
  mounted () {
    this.getData()
    this.getProfessional()
    this.getCourse()
  },
  components: {
    ue
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.insert .el-form-item {
  margin: 20px 0;
}
.insert .el-dialog__body {
  padding: 0 20px 30px !important;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.inputRow {
  margin-top: 20px;
}
.StuData::-webkit-scrollbar {
  width: 4px;
}

.StuData::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}

.StuData:hover::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 53%, 1);
}

.StuData:hover::-webkit-scrollbar-track {
  background: hsla(0, 0%, 53%, 0.1);
}
.your-table .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
</style>
