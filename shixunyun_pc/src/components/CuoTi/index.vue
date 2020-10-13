<template>
  <div>
    <el-form ref="form" :model="selErrorExercise" label-width="80px">
      <el-form-item>
        <el-dialog title="查看学生" :visible.sync="selStudent" class="insert" width="65%">
          <el-form :model="selErrorExercise">
            <el-form-item label="" :label-width="formLabelWidth">
              <el-row>
                <el-col :span="8"><div class="grid-content">学生姓名</div></el-col>
                <el-col :span="8"><div class="grid-content"></div></el-col>
                <el-col :span="8"><div class="grid-content">答题时间</div></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth" v-for="(student, index) in errorStudent" :key="index">
              <el-row>
                <el-col :span="8"><div class="grid-content">{{student.student.stuName}}</div></el-col>
                <el-col :span="8"><div class="grid-content"></div></el-col>
                <el-col :span="8"><div class="grid-content">{{student.submitDate}}</div></el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="selStudent = false">关 闭</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-row class="inputRow">
        <el-col :span="5">
          <el-form-item label="专业">
              <el-select v-model="selErrorExercise.professionalId" placeholder="请选择" @change="selProfesional">
                <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="科目">
            <el-select v-model="selErrorExercise.courselId" placeholder="请选择">
              <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="题目">
            <el-input v-model="selErrorExercise.titleName" placeholder="请输入内容"></el-input>
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
      <el-table-column prop="technologyDayExercise.professional.professionalName" label="专业"></el-table-column>
      <el-table-column prop="technologyDayExercise.course.courseName" label="科目" show-overflow-tooltip></el-table-column>
      <el-table-column prop="technologyDayExercise.title" label="题目"></el-table-column>
      <el-table-column prop="exerciseCount" label="做题人数"></el-table-column>
      <el-table-column prop="errorExerciseCount" label="错误人数"></el-table-column>
      <el-table-column prop="exercisePercent" label="错误率"></el-table-column>
      <el-table-column prop="technologyDayExercise.standardAnswer" label="标准答案" show-overflow-tooltip>
        <template slot-scope="scope">
              <div v-html="scope.row.technologyDayExercise.standardAnswer"></div>
        </template>
      </el-table-column>
      <el-table-column prop="technologyDayExercise.analysis" label="题目解析" show-overflow-tooltip>
        <template slot-scope="scope">
              <div v-html="scope.row.technologyDayExercise.analysis"></div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="showRow(scope.row.technologyDayExercise.id)"
            type="text"
            size="small"
          >查看</el-button>
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
  </div>
</template>
<script>
import ue from '@/components/ue.vue'
export default {
  name: 'CuoTi',
  data () {
    return {
      tableData: [],
      courses: [],
      errorStudent: [],
      professionals: [],
      selErrorExercise: {
        professionalId: '',
        courseId: '',
        titleName: ''
      },
      pagesize: 10,
      currentPage: 1,
      selStudent: false,
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
    handleSelectionChange (val) {
      console.log(val)
    },
    insertFun () {
      console.log(1)
      this.insert = true
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
    selProfesional () {
      this.$axios
        .get(this.$location.getCourseByProfessionalId, {
          params: {
            professionalId: this.selErrorExercise.professionalId
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
    },
    getData () {
      var that = this
      that.currentPage = 1
      this.$axios
        .get(this.$location.getErrorTechnologyDayExercise, {
          params: {
            professionalId: this.selErrorExercise.professionalId,
            courseId: this.selErrorExercise.courseId,
            titleName: this.selErrorExercise.titleName
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
    showRow (id) {
      this.selStudent = true
      this.$axios
        .get(this.$location.getErrorTechnologyDayExerciseStudentByExercise, {
          params: {
            exerciseId: id
          }
        })
        .then(response => {
          console.log('学生查询结果---->' + JSON.stringify(response.data.data))
          this.errorStudent = response.data.data
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
