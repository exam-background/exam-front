<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="delTechnologyDayExercises">批量删除</el-button>
        <el-dialog title="新增" :visible.sync="insert" class="insert" width="65%">
          <el-form :model="form">
            <el-form-item label="专业" :label-width="formLabelWidth">
              <el-select v-model="insertTechnologyDayExercise.professionalId" placeholder="请选择">
                <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科目" :label-width="formLabelWidth">
              <el-select v-model="insertTechnologyDayExercise.courseId" placeholder="请选择">
                <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题目" :label-width="formLabelWidth">
              <el-input v-model="insertTechnologyDayExercise.title" placeholder="请输入内容" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item label="分值" :label-width="formLabelWidth">
              <el-input v-model="insertTechnologyDayExercise.setScore" placeholder="请输入内容" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item label="题型" :label-width="formLabelWidth">
              <el-select v-model="insertTechnologyDayExercise.types" placeholder="请选择" @change="selRedio">
                <el-option v-for="(dictionary, dictionaryindex) in dictionarys" :key="dictionaryindex" :label="dictionary.dictionaryName" :value="dictionary.id"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="selectRedio != 2">
              <el-form-item label="答案" :label-width="formLabelWidth">
                <ue v-model="insertTechnologyDayExercise.standardAnswer"></ue>
              </el-form-item>
              <el-form-item label="题目解析" :label-width="formLabelWidth">
                <ue v-model="insertTechnologyDayExercise.analysis"></ue>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="正确选项" :label-width="formLabelWidth">
                <el-radio-group v-model="insertTechnologyDayExercise.radio">
                  <el-radio :label="1" selected>A</el-radio>
                  <el-radio :label="2">B</el-radio>
                  <el-radio :label="3">C</el-radio>
                  <el-radio :label="4">D</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item id="" label="添加按钮选项" :label-width="formLabelWidth">
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="A" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="redioItem.contentA"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="B" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="redioItem.contentB"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="C" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="redioItem.contentC"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="D" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="redioItem.contentD"/>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="题目解析" :label-width="formLabelWidth">
                <ue v-model="insertTechnologyDayExercise.analysis"></ue>
              </el-form-item>
            </div>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="addTechnologyDayExercise">保 存</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-row class="inputRow">
        <el-col :span="5">
          <el-form-item label="专业">
            <el-select v-model="technologyDayExercise.profesionalId" placeholder="请选择">
              <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="科目">
            <el-select v-model="technologyDayExercise.courseId" placeholder="请选择">
              <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="题目">
            <el-input v-model="technologyDayExercise.title" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="题型">
            <el-select v-model="technologyDayExercise.types" placeholder="请选择">
              <el-option v-for="(dictionary, dictionaryindex) in dictionarys" :key="dictionaryindex" :label="dictionary.dictionaryName" :value="dictionary.id"></el-option>
            </el-select>
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
      <el-table-column prop="professional.professionalName" label="专业"></el-table-column>
      <el-table-column prop="course.courseName" label="科目" show-overflow-tooltip></el-table-column>
      <el-table-column prop="title" label="题目"></el-table-column>
      <el-table-column prop="sysDictionary.dictionaryName" label="题型"></el-table-column>
      <el-table-column prop="standardAnswer" label="标准答案"></el-table-column>
      <el-table-column prop="analysis" label="题目解析"></el-table-column>
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
    <el-dialog title="修改" :visible.sync="update" class="insert" width="65%">
          <el-form :model="form">
            <el-form-item label="专业" :label-width="formLabelWidth">
              <el-select v-model="updateTechnologyDayExercise.professionalId" placeholder="请选择">
                <el-option v-for="(professional, professionalindex) in professionals" :key="professionalindex" :label="professional.professionalName" :value="professional.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科目" :label-width="formLabelWidth">
              <el-select v-model="updateTechnologyDayExercise.courseId" placeholder="请选择">
                <el-option v-for="(course, courseindex) in courses" :key="courseindex" :label="course.courseName" :value="course.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题目" :label-width="formLabelWidth">
              <el-input v-model="updateTechnologyDayExercise.title" placeholder="请输入内容" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item label="分值" :label-width="formLabelWidth">
              <el-input v-model="updateTechnologyDayExercise.setScore" placeholder="请输入内容" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item label="题型" :label-width="formLabelWidth">
              <el-select v-model="updateTechnologyDayExercise.types" placeholder="请选择" @change="upRedio">
                <el-option v-for="(dictionary, dictionaryindex) in dictionarys" :key="dictionaryindex" :label="dictionary.dictionaryName" :value="dictionary.id"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="updateRedio != 2">
              <el-form-item label="答案" :label-width="formLabelWidth">
                <ue v-model="updateTechnologyDayExercise.standardAnswer"></ue>
              </el-form-item>
              <el-form-item label="题目解析" :label-width="formLabelWidth">
                <ue v-model="updateTechnologyDayExercise.analysis"></ue>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="正确选项" :label-width="formLabelWidth">
                <el-radio-group v-model="updateTechnologyDayExercise.radio">
                  <el-radio :label="1" selected>A</el-radio>
                  <el-radio :label="2">B</el-radio>
                  <el-radio :label="3">C</el-radio>
                  <el-radio :label="4">D</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item id="" label="添加按钮选项" :label-width="formLabelWidth">
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="A" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="updateredioItem.contentA"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="B" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="updateredioItem.contentB"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="C" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="updateredioItem.contentC"/>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-input placeholder="请输入选项" value="D" disabled/>
                  </el-col>
                  <el-col :span="16" :offset="1">
                    <el-input placeholder="请输入内容" v-model="updateredioItem.contentD"/>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="题目解析" :label-width="formLabelWidth">
                <ue v-model="updateTechnologyDayExercise.analysis"></ue>
              </el-form-item>
            </div>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="update = false">取 消</el-button>
            <el-button type="primary" @click="updateTechnologyDayExercises">修 改</el-button>
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
  name: 'MeiRiTwo',
  data () {
    return {
      tableData: [
        {
          id: '0',
          zhuanYe: '前端',
          kemu: '生命周期函数',
          timu: '生命周期函数有几个',
          tiXing: '选择题',
          daAn: '8个',
          pingfen: '...'
        }],
      form: {
        name: '',
        region: ''
      },
      courses: {
        id: '',
        courseName: ''
      },
      dictionarys: {
        id: '',
        dictionaryName: ''
      },
      technologyDayExercise: {
        title: '',
        types: '',
        standardAnswer: '',
        setScore: '',
        analysis: '',
        profesionalId: '',
        courseId: ''
      },
      insertTechnologyDayExercise: {
        title: '',
        types: '',
        standardAnswer: '',
        setScore: '',
        analysis: '',
        profesionalId: '',
        radio: '',
        courseId: ''
      },
      updateTechnologyDayExercise: {
        id: '',
        title: '',
        types: '',
        standardAnswer: '',
        setScore: '',
        analysis: '',
        profesionalId: '',
        courseId: '',
        radio: ''
      },
      professionals: {
        id: '',
        professional_name: '',
        professional_desc: ''
      },
      redioItem: {
        contentA: '',
        contentB: '',
        contentC: '',
        contentD: ''
      },
      updateredioItem: {
        idA: '',
        contentA: '',
        idB: '',
        contentB: '',
        idC: '',
        contentC: '',
        idD: '',
        contentD: ''
      },
      pagesize: 10,
      currentPage: 1,
      insert: false,
      insertFrom: false,
      update: false,
      selectRedio: '',
      updateRedio: '',
      formLabelWidth: '120px',
      delTechnologyDayExercise: ''
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
      this.delTechnologyDayExercise = val
    },
    insertFun () {
      console.log(1)
      this.insert = true
    },
    getDate () {
      var that = this
      that.currentPage = 1
      this.$axios
        .post(this.$location.getTechnologyDayExercise, this.$qs.stringify(
          {
            title: this.technologyDayExercise.title,
            types: this.technologyDayExercise.types,
            profesionalId: this.technologyDayExercise.profesionalId,
            courseId: this.technologyDayExercise.courseId
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
    getDictionary () {
      var that = this
      this.$axios
        .get(this.$location.getDictionaryBytype)
        .then(response => {
          console.log('题型查询结果---->' + JSON.stringify(response.data.data))
          that.dictionarys = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    },
    addTechnologyDayExercise () {
      this.insert = false
      const data = this.$qs.stringify(
        {
          title: this.insertTechnologyDayExercise.title,
          types: this.insertTechnologyDayExercise.types,
          standardAnswer: this.insertTechnologyDayExercise.standardAnswer,
          analysis: this.insertTechnologyDayExercise.analysis,
          professionalId: this.insertTechnologyDayExercise.professionalId,
          courseId: this.insertTechnologyDayExercise.courseId,
          setScore: this.insertTechnologyDayExercise.setScore,
          radio: this.insertTechnologyDayExercise.radio,
          redioItem: [this.redioItem.contentA, this.redioItem.contentB, this.redioItem.contentC, this.redioItem.contentD]
        }
      )
      console.log('data:' + data)
      this.$axios
        .post(this.$location.insertTechnologyDayExercise, data)
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
      console.log(JSON.stringify(data))
      this.update = true
      this.updateRedio = data.types
      this.updateTechnologyDayExercise.id = parseInt(data.id)
      this.updateTechnologyDayExercise.title = data.title
      this.updateTechnologyDayExercise.types = parseInt(data.types)
      this.updateTechnologyDayExercise.standardAnswer = data.standardAnswer
      this.updateTechnologyDayExercise.analysis = data.analysis
      this.updateTechnologyDayExercise.professionalId = data.professional.id
      this.updateTechnologyDayExercise.courseId = data.course.id
      this.updateTechnologyDayExercise.setScore = data.setScore
      for (let index = 0; index < data.exerciseItems.length; index++) {
        const TechnologyDayExerciseItem = data.exerciseItems[index];
        switch (TechnologyDayExerciseItem.orderNum) {
          case 'A':
            this.updateredioItem.contentA = TechnologyDayExerciseItem.content
            this.updateredioItem.idA = TechnologyDayExerciseItem.id
            if (TechnologyDayExerciseItem.content === data.standardAnswer) {
              this.updateTechnologyDayExercise.radio = 1
            }
            break
          case 'B':
            this.updateredioItem.contentB = TechnologyDayExerciseItem.content
            this.updateredioItem.idB = TechnologyDayExerciseItem.id
            if (TechnologyDayExerciseItem.content === data.standardAnswer) {
              this.updateTechnologyDayExercise.radio = 2
            }
            break
          case 'C':
            this.updateredioItem.contentC = TechnologyDayExerciseItem.content
            this.updateredioItem.idC = TechnologyDayExerciseItem.id
            if (TechnologyDayExerciseItem.content === data.standardAnswer) {
              this.updateTechnologyDayExercise.radio = 3
            }
            break
          case 'D':
            this.updateredioItem.contentD = TechnologyDayExerciseItem.content
            this.updateredioItem.idD = TechnologyDayExerciseItem.id
            if (TechnologyDayExerciseItem.content === data.standardAnswer) {
              this.updateTechnologyDayExercise.radio = 4
            }
            break
        }
      }
    },
    updateTechnologyDayExercises () {
      this.update = false
      const data = this.$qs.stringify(
        {
          id: this.updateTechnologyDayExercise.id,
          title: this.updateTechnologyDayExercise.title,
          types: this.updateTechnologyDayExercise.types,
          standardAnswer: this.updateTechnologyDayExercise.standardAnswer,
          analysis: this.updateTechnologyDayExercise.analysis,
          professionalId: this.updateTechnologyDayExercise.professionalId,
          courseId: this.updateTechnologyDayExercise.courseId,
          setScore: this.updateTechnologyDayExercise.setScore,
          radio: this.updateTechnologyDayExercise.radio,
          redioItem: [this.updateredioItem.contentA, this.updateredioItem.contentB, this.updateredioItem.contentC, this.updateredioItem.contentD],
          redioId: [this.updateredioItem.idA, this.updateredioItem.idB, this.updateredioItem.idC, this.updateredioItem.idD]
        }
      )
      console.log(data)
      this.$axios
        .post(this.$location.updateTechnologyDayExercise, data)
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
            .post(this.$location.deleteTechnologyDayExercise, this.$qs.stringify(
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
              this.getDate()
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
    delTechnologyDayExercises () {
      console.log('即将删除总长度为：' + this.delTechnologyDayExercise.length + '的数据：' + JSON.stringify(this.delTechnologyDayExercise))
      if (this.delTechnologyDayExercise.length === 0) {
        this.$message({
          type: 'info',
          message: '至少选择一个需要删除的用户'
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
              .post(this.$location.deleteTechnologyDayExercises, this.delTechnologyDayExercise)
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
    selRedio (id) {
      this.selectRedio = id
    },
    upRedio (id) {
      this.updateRedio = id
    }
  },
  mounted () {
    this.getDate()
    this.getProfessional()
    this.getCourse()
    this.getDictionary()
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
