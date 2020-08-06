<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="addclick">新增</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="delPapers('', $event)">批量删除</el-button>
                    <el-dialog title="新增" :visible.sync="insert" class="insert" width="65%">
                      <el-form :model="form">
                        <el-form-item label="试卷名称" :label-width="formLabelWidth">
                          <el-input placeholder="请输入名称" style="width:217px" v-model="insertPapers.name" @input="inputUpdate($event)"></el-input>
                        </el-form-item>
                        <el-form-item label="考核类型" :label-width="formLabelWidth">
                          <el-select v-model="insertPapers.type" placeholder="请选择专业">
                            <el-option value=0 label='就业训练'></el-option>
                            <el-option value=1 label='技术考核'></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="题目数量" :label-width="formLabelWidth">
                          <el-select v-model="insertPapers.sum" placeholder="请选择题目数量">
                            <el-option value="2" label="2题"></el-option>
                            <el-option value="10" label="10题"></el-option>
                            <el-option value="50" label="50题"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="考试班级" :label-width="formLabelWidth">
                          <el-select v-model="selData.name" placeholder="请选择" clearable="" @change="selClass">
                            <el-option v-for="(item, index) in classSelect" :key="index" :label="item.className" :value="item.id"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="考试用户" :label-width="formLabelWidth" >
                          <el-transfer v-model="stuValue" :data="stuData" :titles="['班级学生', '考试学生']" v-if="stuData!=''"></el-transfer>
                          <h2 v-text="stuText" v-else></h2>
                        </el-form-item>
                        <el-form-item label="考试专业" :label-width="formLabelWidth">
                          <el-select v-model="selData.professionalId" placeholder="请选择" @change="selProfessionals">
                            <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="考试科目" :label-width="formLabelWidth" >
                          <el-transfer v-model="pValue" :data="pData" :titles="['未选科目', '已选科目']" v-if="pData!=''"></el-transfer>
                          <h2 v-text="pText" v-else></h2>
                        </el-form-item>
                        <el-form-item label="出题人" :label-width="formLabelWidth">
                          <el-input placeholder="请输入名称" style="width:217px" v-model="insertPapers.papersName" @input="inputUpdate($event)"></el-input>
                        </el-form-item>
                        <el-form-item label="考试开始时间" :label-width="formLabelWidth">
                          <div class="block">
                            <el-date-picker  value-format="yyyy-MM-dd HH:mm:ss" v-model="insertPapers.papersStartDate" type="datetime" placeholder="请选择开班时间"></el-date-picker>
                          </div>
                        </el-form-item>
                        <el-form-item label="考试结束时间" :label-width="formLabelWidth">
                          <div class="block">
                            <el-date-picker  value-format="yyyy-MM-dd HH:mm:ss" v-model="insertPapers.papersOverDate" type="datetime" placeholder="请选择开班时间"></el-date-picker>
                          </div>
                        </el-form-item>
                      </el-form>
                      <!-- 取消or保存 -->
                      <div slot="footer" class="dialog-footer">
                          <el-button @click="insert = false">取 消</el-button>
                          <el-button type="primary" @click="addPapers">添 加</el-button>
                      </div>
                    </el-dialog>
            </el-form-item>
            <el-row class="inputRow">
                <el-col :span="5">
                <el-form-item label="试卷名称">
                    <el-input v-model="selPapers.name" placeholder="请输入试卷名称"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="5">
                <el-form-item label="考核类型">
                    <el-select v-model="selPapers.type" placeholder="请选择">
                      <el-option value="0" label="就业训练">就业训练</el-option>
                      <el-option value="1" label="技术考核"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="5">
                <el-form-item label="科目">
                  <el-select v-model="selPapers.courseId" placeholder="请选择">
                    <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="5">
                <el-form-item label="出题人">
                    <el-input v-model="selPapers.papersName" placeholder="请输入出题人"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="3">
                <el-form-item style="text-align:right;">
                    <el-button type="primary" @click="getDate">查询</el-button>
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
      <el-table-column prop="name" label="试卷名称"></el-table-column>
      <el-table-column prop="typeString" label="考核类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sum" label="题目数量"></el-table-column>
      <el-table-column prop="course" label="科目"></el-table-column>
      <el-table-column prop="papersName" label="出题人"></el-table-column>
      <el-table-column prop="buildPapersDate" label="试卷生成时间"></el-table-column>
      <el-table-column prop="papersStartDate" label="考试开始时间"></el-table-column>
      <el-table-column prop="papersOverDate" label="考试结束时间"></el-table-column>
      <el-table-column prop="ispublishString" label="是否发布"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="delPapers(scope.row.id, $event)"
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
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="update" class="insert" width="65%">
      <el-form :model="form">
        <el-form-item label="试卷名称" :label-width="formLabelWidth">
          <el-input placeholder="请输入名称" style="width:217px" v-model="updatePapers.name" @input="inputUpdate($event)"></el-input>
        </el-form-item>
        <el-form-item label="考核类型" :label-width="formLabelWidth">
          <el-select v-model="updatePapers.type" placeholder="请选择专业">
            <el-option v-for="(t, index) in types" :key="index" :label="t.lab" :value="t.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目数量" :label-width="formLabelWidth">
          <el-select v-model="updatePapers.sum" placeholder="请选择题目数量">
            <el-option v-for="(item, index) in sumArray" :key="index" :label="item.lab" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试班级" :label-width="formLabelWidth">
          <el-select v-model="selData.name" placeholder="请选择" clearable="" @change="selClass">
            <el-option v-for="(item, index) in classSelect" :key="index" :label="item.className" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试用户" :label-width="formLabelWidth" >
          <el-transfer v-model="stuValueUp" :data="stuDataUp" :titles="['班级学生', '考试学生']" v-if="stuDataUp!=''"></el-transfer>
          <h2 v-text="stuText" v-else></h2>
        </el-form-item>
        <el-form-item label="出题人" :label-width="formLabelWidth">
          <el-input placeholder="请输入名称" style="width:217px" v-model="updatePapers.papersName" @input="inputUpdate($event)"></el-input>
        </el-form-item>
        <el-form-item label="考试开始时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker  value-format="yyyy-MM-dd HH:mm:ss" v-model="updatePapers.papersStartDate" type="datetime" placeholder="请选择开班时间"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="考试结束时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker  value-format="yyyy-MM-dd HH:mm:ss"  v-model="updatePapers.papersOverDate" type="datetime" placeholder="请选择开班时间"></el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <!-- 取消or保存 -->
      <div slot="footer" class="dialog-footer">
          <el-button @click="update = false">取 消</el-button>
          <el-button type="primary" @click="updatePapersCkick">修 改</el-button>
      </div>
    </el-dialog>
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
  name: 'KaoShi',
  data () {
    return {
      stuData: '',
      stuValue: [],
      pData: '',
      pValue: [],
      stuDataUp: '',
      stuValueUp: [],
      tableData: [],
      form: {
        name: '',
        region: ''
      },
      papersDate: {
        id: '',
        name: '',
        type: '',
        sum: '',
        papersName: '',
        buildPapersDate: '',
        papersStartDate: '',
        papersOverDate: '',
        course: ''
      },
      insertPapers: {
        name: '',
        type: '',
        sum: '',
        papersName: '',
        buildPapersDate: '',
        papersStartDate: '',
        papersOverDate: '',
        course: ''
      },
      updatePapers: {
        name: '',
        type: '',
        sum: '',
        papersName: '',
        buildPapersDate: '',
        papersStartDate: '',
        papersOverDate: '',
        course: ''
      },
      selPapers: {
        name: '',
        type: '',
        papersName: '',
        courseId: ''
      },
      courses: {
        id: '',
        courseName: ''
      },
      selData: {
        name: '',
        professionalId: ''
      },
      professionals: {
        id: '',
        professional_name: '',
        professional_desc: ''
      },
      types: [{ lab: '就业训练', val: 0 }, { lab: '技术考核', val: 1 }],
      sumArray: [{ lab: '2题', id: 2 }, { lab: '10题', id: 10 }, { lab: '50题', id: 50 }],
      pagesize: 10,
      currentPage: 1,
      insert: false,
      insertFrom: false,
      update: false,
      selectRedio: '',
      updateRedio: '',
      stuText: '请选择班级',
      pText: '请选择专业',
      formLabelWidth: '120px',
      classSelect: [],
      delPapersJSON: [],
      selDataClass: []
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
      this.delPapersJSON = []
      for (let i = 0; i < val.length; i++) {
      console.log(val[i].id)
        this.delPapersJSON.push(val[i].id)
      }
      console.log(JSON.stringify(this.delPapersJSON))
    },
    insertFun () {
      console.log(1)
      this.insert = true
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
    getDate () {
      var that = this
      that.currentPage = 1
      this.$axios
        .post(this.$location.getPapars, this.$qs.stringify(
          {
            name: this.selPapers.name,
            type: this.selPapers.type,
            papersName: this.selPapers.papersName,
            course_id: this.selPapers.courseId
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
    delPapers (delPapersOne, event) {
      console.log(delPapersOne)
      console.log(delPapersOne !== '')
      if (delPapersOne !== '') {
        this.delPapersJSON.push(delPapersOne)
      }
      console.log(JSON.stringify(this.delPapersJSON))
      if (this.delPapersJSON.length === 0) {
        this.$message({
          type: 'info',
          message: '至少选择一个需要删除的用户'
        })
      } else {
        var that = this
        this.$confirm('此操作将永久删除该试卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$axios
              .post(this.$location.delPapars, this.delPapersJSON)
              .then(response => {
                console.log('操作结果---->' + response.data.msg)
                this.getDate()
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
    getClassAndProfessional () {
      this.$axios
        .get(this.$location.getAllClassNoPage)
        .then(response => {
          // console.log(JSON.stringify(response.data))
          this.classSelect = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    selClass () {
      this.stuData = ''
      this.stuValue = []
      this.$axios
        .get(this.$location.selectStudent, {
          params: {
            classId: this.selData.name
          }
        })
        .then(response => {
          const responseData = response.data.data
          const date = []
          console.log(JSON.stringify(responseData))
          for (let i = 0; i < responseData.length; i++) {
            date.push({
              key: responseData[i].id,
              label: responseData[i].stuName
            })
          }
          if (responseData.length > 0) {
            if (this.updatePapers.userId !== '') {
              this.stuDataUp = date
              // for(let i=0;i<this.updatePapers.userId.length;i++){
              //   this.stuValueUp.push(this.updatePapers.userId[i])
              // }
              // alert(this.stuValueUp)
              let a = '9,15'
              alert(a)
              // for(let i = 0 ; i<this.updatePapers.userId.length ; i++){
                
              //   if(i !== (this.updatePapers.userId.length-1)){
                  
              //   }
              // }
              this.stuValueUp = [a]
            }
            this.stuData = date
          } else {
            this.stuText = '当前班级暂无学生'
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    addPapers () {
      alert(this.selData.professionalId)
      this.insert = false
      const that = this
      this.$axios
        .post(this.$location.insertPapers, JSON.stringify(
          {
            name: this.insertPapers.name,
            type: this.insertPapers.type,
            sum: this.insertPapers.sum,
            papersName: this.insertPapers.papersName,
            papersStartDate: this.insertPapers.papersStartDate,
            papersOverDate: this.insertPapers.papersOverDate,
            courseId: this.pValue,
            professionalId: this.selData.professionalId,
            userId: this.stuValue
          }), {headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          console.log('科目查询结果---->' + JSON.stringify(response.data.data))
          that.courses = response.data.data
          this.getDate()
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
    selProfessionals () {
      this.pData = ''
      this.pValue = []
      this.$axios
        .get(this.$location.getCourseByProfessionalId, {
          params: {
            professionalId: this.selData.professionalId
          }
        })
        .then(response => {
          const responseData = response.data.data
          const date = []
          console.log(JSON.stringify(responseData))
          for (let i = 0; i < responseData.length; i++) {
            date.push({
              key: responseData[i].id,
              label: responseData[i].courseName
            })
          }
          if (responseData.length > 0) {
            this.pData = date
          } else {
            this.pText = '当前专业暂无科目'
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    updateRow (data) {
      this.update = true
      this.updatePapers.name = data.name
      this.updatePapers.type = data.type
      this.updatePapers.sum = data.sum
      this.updatePapers.papersName = data.papersName
      this.updatePapers.papersStartDate = data.papersStartDate
      this.updatePapers.papersOverDate = data.papersOverDate
      this.updatePapers.userId = data.userId
      this.selData.name = data.studentList[0].classId
      this.selData.professionalId = data.professional.id
      this.selClass()
      this.selProfessionals()
    },
    updatePapersCkick () {
      this.update = false
      const that = this
      this.$axios
        .post(this.$location.updatePapers, JSON.stringify(
          {
            name: this.updatePapers.name,
            type: this.updatePapers.type,
            sum: this.updatePapers.sum,
            papersName: this.updatePapers.papersName,
            papersStartDate: this.updatePapers.papersStartDate,
            papersOverDate: this.updatePapers.papersOverDate,
            userId: this.stuValueUp
          }), { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          console.log('删除结果：' + response.msg)
          this.getDate()
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('删除请求处理失败')
          console.log(error)
        })
    },
    addclick () {
      this.insert = true
      this.selData.name = ''
      this.selData.professionalId = ''
      this.updatePapers.courseId = ''
      this.updatePapers.userId = ''
      this.pData = ''
      this.stuData = ''
    }
  },
  mounted () {
    this.getDate()
    this.getCourse()
    this.getClassAndProfessional()
    this.getProfessional()
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
