<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row class="inputRow">
        <el-col :span="5">
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select v-model="selPapers.classId" placeholder="请选择">
              <el-option v-for="(classA, index) in classList" :key="index" :label="classA.className" :value="classA.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="试卷名称" :label-width="formLabelWidth">
            <el-input v-model="selPapers.papersName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13">
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
      <el-table-column prop="aClass.className" label="班级"></el-table-column>
      <el-table-column prop="name" label="试卷名称"></el-table-column>
      <el-table-column prop="papersPass" label="考核通过人数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="studentList.length" label="总人数"></el-table-column>
      <el-table-column prop="percentOfPass" label="通过率">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="show(scope.row)"
            type="text"
            size="small"
          >查看信息</el-button>
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
    <el-dialog title="查看考试学生" :visible.sync="showStudent" class="insert" width="65%">
      <el-form :model="form">
        <el-row style="margin-top:10px;">
          <el-col :span="6"><h2>学生</h2></el-col>
          <el-col :span="6"><h2>考试分数</h2></el-col>
          <el-col :span="6"><h2>是否通过考核</h2></el-col>
          <el-col :span="6"><h2>操作</h2></el-col>
        </el-row>
        <el-row style="margin-top:10px;" v-for="(student, index) in showStudentData" :key="index">
          <el-col :span="6"><div class="grid-content" style="width:100%;height:40px;line-height: 40px;">{{student.studentName}}</div></el-col>
          <el-col :span="6"><div class="grid-content" style="width:100%;height:40px;line-height: 40px;padding-left:10px;">{{student.studentScore}}</div></el-col>
          <el-col :span="6"><div class="grid-content" style="width:100%;height:40px;line-height: 40px;padding-left:10px;">{{student.studentPass}}</div></el-col>
          <el-col :span="6"><el-button type="info" round @click="showPaper(student.studentId, student.papersId)">查看试卷</el-button></el-col>
        </el-row>
      </el-form>
      <!-- 取消or保存 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="showStudent = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看考试试卷" :visible.sync="showPapers" class="insert" width="65%">
      <div v-if="papers !== undefined">
        <el-form :model="form">
          <el-row>
              <center>
                  <h1>{{papers.name}}</h1>
              </center>
          </el-row>
        </el-form>
        <el-row>
            <center>
                <h4>开始时间：{{papers.papersStartDate}}</h4>
                <div>
                    <el-tag size="large" class="tag" type="primary" v-if="papers.type == 0">就业训练</el-tag>
                    <el-tag size="large" class="tag" type="primary" v-else>技术训练</el-tag>
                </div>
            </center>
        </el-row>
        <el-row style="margin:10px;" v-for="(papersTitle, indexs) in papers.papersTitleList" :key="indexs">
          <h3>{{indexs+1}}.{{papersTitle.title}}({{papersTitle.setScore}}/{{papers.papersUserResultList[indexs].mark}}分)<span style="margin-left:5px;"></span></h3>
          <div style="padding:10px;">
            <div style="height:52px;">
                <textarea style="width:100%;height:100%;resize: none" v-model="insertPapers[indexs].userExercise" disabled></textarea>
            </div>
            <div style="margin-top:20px;"><h4>正确答案：</h4></div>
            <div style="width:100%;height:100px;overflow:auto;border:1px solid #f0f0f0;">
                <div v-html="insertPapers[indexs].standardAnswer">

                </div>
            </div>
          </div>
        </el-row>
      </div>
      <div v-else>
        <h1>学生暂未考试</h1>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ClassXunLian',
  data () {
    return {
      tableData: [],
      classList: [],
      papers: [],
      insertPapers: [],
      showStudentData: [],
      form: {
        name: '',
        region: ''
      },
      selPapers: {
        papersName: '',
        classId: ''
      },
      pagesize: 10,
      currentPage: 1,
      showStudent: false,
      showPapers: false,
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
    getClass () {
      var that = this
      this.$axios
        .get(this.$location.getAllClassNoPage)
        .then(response => {
          that.classList = response.data.data
          console.log('班级查询结果---->' + JSON.stringify(this.classList))
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
        .get(this.$location.getPapersByType, {
          params: {
            type: 0,
            papersName: this.selPapers.papersName,
            classId: this.selPapers.classId
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
    show (data) {
      this.showStudent = true
      this.showStudentData = []
      for (let i = 0; i < data.papersUserList.length; i++) {
        let pass
        if (data.papersUserList[i].studentScore < 90) {
          pass = '考核未通过'
        }
        this.showStudentData.push({
          papersId: data.id,
          studentId: data.papersUserList[i].userId,
          studentName: data.papersUserList[i].student.stuName,
          studentScore: data.papersUserList[i].studentScore,
          studentPass: pass
        })
      }
      console.log(this.showStudentData)
    },
    showPaper (id, papersId) {
      this.showStudent = false
      this.showPapers = true
      this.getPaper(id, papersId)
    },
    getPaper (userId, papersId) {
      this.$axios
        .get(this.$location.getPapersByUserIdAndTypeFinish, {
          params: {
            userId: userId,
            type: 0
          }
        })
        .then(res => {
          this.papers = res.data.data[0]
          if (this.papers !== undefined) {
            for (let a = 0; a < this.papers.papersTitleList.length; a++) {
              this.insertPapers.push({
                papersId: papersId,
                exerciseId: this.papers.papersTitleList[a].id,
                userId: userId,
                userExercise: this.papers.papersUserResultList[a].userExercise,
                standardAnswer: this.papers.papersTitleList[a].standardAnswer
              })
            }
          }
        })
        .catch(function (error) {
          this.$message({
            type: 'success',
            message: error
          })
        })
    }
  },
  mounted () {
    this.getClass()
    this.getData()
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
