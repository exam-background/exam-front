<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="delRow('')">批量删除</el-button>
                    <el-dialog title="考试学生" :visible.sync="show" class="insert" width="65%">
                      <el-button v-for="(PapersUser, index) in selPapersUser" :key="index" v-text="PapersUser.student.stuName" @click="selPapersUsers(PapersUser.userId)"></el-button>
                    </el-dialog>
                    <el-dialog title="学生答案" :visible.sync="showUser" class="insert" width="65%">
                      <el-row v-for="(PapersUserResult,index) in selPapersUserResult" :key="index">
                          <el-form-item label="" :label-width="formLabelWidth">
                              <h1>{{index+1}}. {{PapersUserResult.papersTitle.title}}({{PapersUserResult.setScore}}/{{PapersUserResult.mark}}分)</h1>
                          </el-form-item>
                          <div v-for="(PapersExercises, index) in PapersUserResult.papersTitle.papersExercises" :key="index">
                            <el-form-item :label-width="formLabelWidth">
                                <el-radio v-model="PapersUserResult.userExercise" :label="PapersExercises.orderNum">{{PapersExercises.orderNum}}：{{PapersExercises.content}}</el-radio>
                            </el-form-item>
                          </div>
                          <el-form-item :label-width="formLabelWidth" v-if="PapersUserResult.papersTitle.papersExercises.length == 0">
                            <div>
                                <textarea style="width:80%;height:50%;resize:none;" disabled v-text="PapersUserResult.userExercise">请输入答案</textarea>
                            </div>
                            <el-row>
                              <el-col el-col :span="4">
                                <h3>修改分数：</h3>
                                <el-input v-model="mark" placeholder="请输入内容"></el-input>
                              </el-col>
                            </el-row>
                            <el-button @click="PapersTitleClick(PapersUserResult.id)">修改</el-button>
                          </el-form-item>
                          <!-- 显示正确答案 -->
                          <!-- <el-form-item label="正确答案：" :label-width="formLabelWidth">
                              <el-input disabled="disabled" style="width:217px" v-model="PapersTitle.standardAnswer" @input="inputUpdate($event)"></el-input>
                          </el-form-item> -->
                          <el-divider></el-divider>
                      </el-row>
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
                    <el-option v-for="(type, index) in types" :key="index" :label="type.lab" :value="type.val"></el-option>
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
            @click.native.prevent="selRow(scope.row.id)"
            type="text"
            size="small"
          >查看所有考生</el-button>
          <el-button
            @click.native.prevent="updateRow(scope.row)"
            type="text"
            size="small"
          >发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="update" class="insert" width="65%">
      <!-- 取消or保存 -->
      <div slot="footer" class="dialog-footer">
          <el-button @click="update = false">取 消</el-button>
          <el-button type="primary" @click="update = false">修 改</el-button>
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
  name: 'PapersUserResult',
  data () {
    return {
      types: [{ lab: '就业训练', val: 0 }, { lab: '技术考核', val: 1 }],
      tableData: [],
      selPapersUser: [],
      selPapersUserResult: [],
      form: {
        name: '',
        region: ''
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
      pagesize: 10,
      currentPage: 1,
      userId: 0,
      papersId: 0,
      mark: '',
      show: false,
      showUser: false,
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
    handleSelectionChange (val) {
      this.delPapersJSON = []
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].id)
        this.delPapersJSON.push(val[i].id)
      }
      console.log(JSON.stringify(this.delPapersJSON))
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
    insertFun () {
      console.log(1)
      this.insert = true
    },
    delRow (data) {

    },
    selRow (id) {
      this.papersId = id
      var that = this
      this.$axios
        .post(this.$location.getPapersUserByPapersId, this.$qs.stringify(
          {
            id: id
          }
        ))
        .then(response => {
          console.log('信息查询结果---->' + JSON.stringify(response.data.data))
          that.selPapersUser = response.data.data
          this.show = true
        })
        .catch(function (error) {
        // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    updateRow (data) {
      if (data.ispublish === 1) {
        this.$confirm('已发布的试卷无法再次发布', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$confirm('此操作将发布试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var that = this
          that.currentPage = 1
          this.$axios
            .post(this.$location.publishPapers, this.$qs.stringify(
              {
                id: data.id
              }
            ))
            .then(response => {
              this.$confirm('试卷发布成功', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              })
              this.getData()
            })
            .catch(function (error) {
            // 请求失败处理
              console.log('修改请求处理失败')
              console.log(error)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
    },
    getData () {
      var that = this
      that.currentPage = 1
      this.$axios
        .post(this.$location.getPapersAllPublish, this.$qs.stringify(
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
    selPapersUsers (id) {
      alert(this.papersId)
      this.show = false
      this.userId = id
      this.$axios
        .post(this.$location.getPapersUserByUserId, this.$qs.stringify(
          {
            id: id,
            papersId: this.papersId
          }
        ))
        .then(response => {
          console.log('信息查询结果---->' + JSON.stringify(response.data.data))
          this.selPapersUserResult = response.data.data
          this.showUser = true
        })
        .catch(function (error) {
        // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    PapersTitleClick (id) {
      if (this.mark === '') {
        this.$message({
          type: 'info',
          message: '请输入修改分数'
        })
      } else {
        this.$axios
          .post(this.$location.updatePapersUserResult, this.$qs.stringify(
            {
              id: id,
              mark: this.mark
            }
          ))
          .then(response => {
            this.selPapersUsers(this.userId)
            alert(response.data.msg)
          })
          .catch(function (error) {
          // 请求失败处理
            console.log('查询请求处理失败')
            console.log(error)
          })
      }
    }
  },
  mounted () {
    this.getData()
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
