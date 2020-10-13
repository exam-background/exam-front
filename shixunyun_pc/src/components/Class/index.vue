<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-button type="primary" size="small" @click="insert=true">新增班级</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="insert" class="insert">
          <el-form :model="insertData">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="insertData.className" autocomplete="off" style="width:217px" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item label="学期" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="insertData.grade" placeholder="请选择学期">
                <el-option label="S1" value="S1"></el-option>
                <el-option label="S2" value="S2"></el-option>
                <el-option label="Y2" value="Y2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班主任" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="insertData.classTea" placeholder="请选择班主任">
                <el-option v-for="(item, index) in classTeaData" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教员" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="insertData.jiaoTea" placeholder="请选择教员">
                <el-option v-for="(item, index) in pfiTeaData" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开班时间" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="insertData.openTime" type="datetime" placeholder="请选择开班时间"></el-date-picker>
              </div>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="insertDataFun">新 增</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="学期">
            <el-select v-model="form.grade" clearable="" placeholder="请选择">
              <el-option label="S1" value="S1"></el-option>
              <el-option label="S2" value="S2"></el-option>
              <el-option label="Y2" value="Y2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="班主任">
            <el-select v-model="form.classTeacher" clearable="" placeholder="请选择">
              <el-option v-for="(item, index) in classTeaData" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="教员">
            <el-select v-model="form.professionalTeacher" clearable="" placeholder="请选择">
              <el-option v-for="(item, index) in pfiTeaData" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item style="text-align:right;">
            <el-button type="primary" @click="selData">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 数据 -->
    <div class="main">
      <el-table
        :data="tableData"
        max-height="418"
        align="center"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="班级编号" width="180"></el-table-column>
        <el-table-column prop="grade" label="学期" width="180"></el-table-column>
        <el-table-column prop="className" label="班级名称" width="180"></el-table-column>
        <el-table-column prop="openTime" label="开班时间" width="180">
          <!-- <template slot-scope="scope">
            <p>{{ scope.row.openTime | openTime('') }}</p>
          </template> -->
        </el-table-column>
        <el-table-column prop="professionalTeacher.teacherName" label="教员"></el-table-column>
        <el-table-column prop="classTeacher.teacherName" label="班主任"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateRow(scope.row,scope.$index)"
              type="warning"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row.id)"
               type="danger"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改 -->
        <el-dialog title="修改" :visible.sync="update" class="insert">
          <el-form :model="updataData">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="updataData.className" autocomplete="off" style="width:217px" placeholder="请输入班级名称"></el-input>
            </el-form-item>
            <el-form-item label="学期" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="updataData.grade" placeholder="请选择学期">
                <el-option label="S1" value="S1"></el-option>
                <el-option label="S2" value="S2"></el-option>
                <el-option label="Y2" value="Y2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班主任" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="updataData.classTeacherId" placeholder="请选择班主任">
                <el-option v-for="(item, index) in classTeaData" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教员" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="updataData.professionalTeacherId" placeholder="请选择教员">
                <el-option v-for="(item, index) in pfiTeaData" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开班时间" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="updataData.openTime" type="datetime" placeholder="请选择开班时间"></el-date-picker>
              </div>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="update = false">取 消</el-button>
            <el-button type="primary" @click="updateDataFun">修 改</el-button>
          </div>
        </el-dialog>
    </div>

    <el-pagination
      background
      :page-size="pagesize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <!-- <el-button @click="getData">点击获取数据</el-button> -->
  </div>
</template>
<script>
export default {
  name: 'Class',
  data () {
    return {
      form: {
        name: '',
        grade: '',
        professionalTeacher: undefined,
        classTeacher: undefined
      },
      // 班主任的下拉框数据
      classTeaData: [],
      // 教员的下拉框数据
      pfiTeaData: [],
      // 所有班级数据
      tableData: [],
      // 每页显示多少条
      pagesize: 6,
      // 默认所有班级总数
      total: 0,
      // 分页所在页数
      currentPage: 1,
      // 新增弹出框显示隐藏的判断变量
      insert: false,
      // 长度样式
      formLabelWidth: '120px',
      insertData: {
        className: '',
        grade: '',
        classTea: '',
        jiaoTea: '',
        openTime: ''
      },
      update: false,
      updataData: {
        id: 0,
        className: '',
        grade: '',
        classTeacherId: '',
        professionalTeacherId: '',
        openTime: ''
      }
    }
  },
  methods: {

    getData(){
      var that = this
      this.$axios.get(this.$location.getJobExampleStudyForPage,{
        params: {
          pageSize: that.pagesize,
          currentPage: that.currentPage
        }
      }).then( response => {
          console.log("结果------>"+JSON.stringify(response.data))
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
    handleSizeChange: function (val) {
      this.currentPage = val
      this.selData()
    },
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.selData()
    },
    selAxios () {
      var that = this
      // http://192.168.43.108:8081/examsystem/classForPage
      this.$axios
        .get(this.$location.classForPage, {
          params: {
            pageSize: that.pagesize,
            currentPage: that.currentPage
          }
        })
        .then(response => {
          console.log("结果---->"+JSON.stringify(response.data.data.data))
          that.tableData = response.data.data.data
          that.total = response.data.data.total
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    deleteRow (id) {
      // 删除代码
      const that = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get(this.$location.deleteClass, {
              params: {
                id: id
              }
            })
            .then(response => {
              console.log(response)
              if (response.data.success === 'true') {
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
              that.selAxios()
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
    selData () {
      var that = this
      this.$axios
        .get(this.$location.classForPage, {
          params: {
            grade: this.form.grade,
            classTeacherId: this.form.classTeacher,
            professionalTeacherId: this.form.professionalTeacher,
            pageSize: that.pagesize,
            currentPage: that.currentPage
          }
        })
        .then(response => {
          console.log(response)
          that.tableData = response.data.data.data
          that.total = response.data.data.total
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    insertDataFun () {
      // 新增
      this.insert = false
      const that = this
      const data = this.$qs.stringify({
        className: this.insertData.className,
        grade: this.insertData.grade,
        openTime: this.insertData.openTime,
        classTeacherId: this.insertData.classTea,
        professionalTeacherId: this.insertData.jiaoTea
      })
      console.log(data)
      this.$axios
        .post(this.$location.addClass, data)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            that.$message('新增成功')
            this.selAxios()
          } else {
            that.$message('新增失败')
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
      this.insertData.className = ''
      this.insertData.grade = ''
      this.insertData.openTime = ''
      this.insertData.classTea = ''
      this.insertData.jiaoTea = ''
    },
    updateRow (data, index) {
      console.log(this.tableData)
      this.update = true
      this.updataData.id = data.id
      this.updataData.grade = data.grade
      this.updataData.className = data.className
      this.updataData.classTeacherId = data.classTeacher.id
      this.updataData.professionalTeacherId = data.professionalTeacher.id
      this.updataData.openTime = data.openTime
    },
    updateDataFun () {
      console.log(this.updataData)
      this.update = false
      const data = this.$qs.stringify(this.updataData)
      this.$axios.post(this.$location.updateClass, data).then(res => {
        if (res.data.success === 'true') {
          this.$message('修改成功')
          this.selAxios()
        } else {
          this.$message('修改失败')
        }
        console.log(res)
      })
    }
  },
  mounted () {
    this.selAxios()
    this.$axios
      .get(this.$location.getAllTeacherNoPage, {
        params: {
          positionName: '班主任'
        }
      })
      .then(response => {
        console.log(response.data)
        const content = response.data.data
        var classTeaCon = []
        for (let i = 0; i < content.length; i++) {
          classTeaCon.push({ id: content[i].id, name: content[i].teacherName })
        }
        this.classTeaData = classTeaCon
      })
      .catch(function (error) {
        // 请求失败处理
        console.log('请求处理失败')
        console.log(error)
      })
    this.$axios
      .get(this.$location.getAllTeacherNoPage, {
        params: {
          positionName: '教员'
        }
      })
      .then(response => {
        // console.log(response.data)
        const content = response.data.data
        var jiaoTeaCon = []
        for (let i = 0; i < content.length; i++) {
          jiaoTeaCon.push({ id: content[i].id, name: content[i].teacherName })
        }
        this.pfiTeaData = jiaoTeaCon
      })
      .catch(function (error) {
        // 请求失败处理
        console.log('请求处理失败')
        console.log(error)
      })
  },
  filters: {
    openTime (val, patten) {
      var dt = new Date(val)
      // yyyy-mm-dd
      var yy = dt.getFullYear()
      var mm = dt.getMonth() + 1
      var dd = dt.getDate()

      if (patten.toLowerCase() === 'yyyy-mm-dd') {
        return `${yy}-${mm}-${dd}`
      } else {
        var hh = dt.getHours()
        var ll = dt.getMinutes()
        var ss = dt.getSeconds()
        return `${yy}-${mm}-${dd} ${hh}:${ll}:${ss}`
      }
    }
  }
}
</script>
<style scoped>
.el-form-item {
  margin: 10px 0;
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
