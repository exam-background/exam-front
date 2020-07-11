<template>
  <div>
    <el-form label-width="80px">
      <el-form-item>
        <el-button type="primary" size="small" @click="insert=true">新增学员</el-button>
        <!-- 新增学员 -->
        <el-dialog title="新增" :visible.sync="insert" class="insert">
          <el-form :model="insertData">
            <el-form-item label="学生姓名" :label-width="formLabelWidth">
              <el-input v-model="insertData.name" autocomplete="off" style="width:217px" placeholder="请输入学生姓名"></el-input>
            </el-form-item>
            <el-form-item label="开班时间" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="insertData.openTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="班级" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="insertData.class" placeholder="请选择班级">
                <el-option
                v-for="(item, index) in classSelect"
                :key="index"
                :label="item.className"
                :value="item.id"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="insertData.professional" placeholder="请选择专业">
                <el-option
                v-for="(item, index) in professionalSelect"
                :key="index"
                :label="item.professionalName"
                :value="item.id"
              ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="insertFun">保 存</el-button>
          </div>
        </el-dialog>
      </el-form-item>

      <!--查询学员-->
      <el-row>
        <el-col :span="6" :offset="1">
          <el-form-item label="学员名称">
            <el-input v-model="searchForm.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="班级">
            <el-select v-model="searchForm.class" placeholder="请选择" clearable="">
              <el-option
                v-for="(item, index) in classSelect"
                :key="index"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="专业">
            <el-select v-model="searchForm.professional" placeholder="请选择" clearable="">
              <el-option
                v-for="(item, index) in professionalSelect"
                :key="index"
                :label="item.professionalName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item style="text-align:right;">
            <el-button type="primary" @click="selClick">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


    <!-- 表格数据 -->
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
        <el-table-column prop="stuName" label="姓名"></el-table-column>
        <el-table-column label="开班时间">
          <template slot-scope="scope">
            <p>{{ scope.row.openClassTime | openTime('') }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="clazz.className" label="班级"></el-table-column>
        <el-table-column prop="professional.professionalName" label="专业"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.row.id)"
              type="text"
              size="small"
            >移除</el-button>
            <el-button
              @click.native.prevent="setUpdData(scope.row.id, scope.row)"
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
        :total="total"
      ></el-pagination>

      <!-- 修改 -->
        <el-dialog title="修改" :visible.sync="update" class="insert">
          <el-form :model="updData">
            <el-form-item label="学生姓名" :label-width="formLabelWidth">
              <el-input v-model="updData.name" autocomplete="off" style="width:217px" placeholder="请输入学生姓名"></el-input>
            </el-form-item>
            <el-form-item label="开班时间" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="updData.openTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="班级" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="updData.class" placeholder="请选择班级">
                <el-option
                v-for="(item, index) in classSelect"
                :key="index"
                :label="item.className"
                :value="item.id"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="updData.zhuan" placeholder="请选择专业">
                <el-option
                v-for="(item, index) in professionalSelect"
                :key="index"
                :label="item.professionalName"
                :value="item.id"
              ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="update = false">取 消</el-button>
            <el-button type="primary" @click="updFun">保 存</el-button>
          </div>
        </el-dialog>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Student',
  data () {
    return {
      searchForm: {
        name: '',
        class: '',
        professional: ''
      },
      tableData: [],
      pagesize: 5,
      currentPage: 1,
      total: 0,
      insert: false,
      formLabelWidth: '120px',
      insertData: {
        name: '',
        openTime: '',
        class: '',
        professional: ''
      },
      update: false,
      updData: {
        id: '',
        name: '',
        openTime: '',
        class: '',
        zhuan: ''
      },
      classSelect:[],
      professionalSelect:[]
    }
  },
  methods: {
    getClassAndProfessional(){
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
        }),
        this.$axios
          .get(this.$location.getProfessionalNoPage)
          .then(response => {
            console.log(JSON.stringify(response.data))
            this.professionalSelect = response.data.data
          })
          .catch(function (error) {
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
    handleSizeChange: function (val) {
      this.currentPage = val
      this.selClick()
    },
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.selClick()
    },
    selAxios () {
      var that = this
      this.$axios
        .get(this.$location.studentForPage, {
          params: {
            pageSize: that.pagesize,
            currentPage: that.currentPage
          }
        })
        .then(response => {
          that.tableData = response.data.data.data
          that.total = response.data.data.total
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    selClick () {
      var that = this
      this.$axios
        .get(this.$location.studentForPage, {
          params: {
            classId: that.searchForm.class,
            professionalId: that.searchForm.professional,
            stuName: that.searchForm.name,
            pageSize: that.pagesize,
            currentPage: that.currentPage
          }
        })
        .then(response => {
          // alert(response.data.data.total)
          that.tableData = response.data.data.data
          that.total = response.data.data.total
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    insertFun () {
      alert(JSON.stringify(this.insertData))
      this.insert = false
      this.$axios.post(this.$location.addStudent, this.$qs.stringify({
        stuName: this.insertData.name,
        professionalId: this.insertData.professional,
        classId: this.insertData.class,
        openClassTime:this.insertData.openTime
      })).then(response => {
        if (response.status === 200) {
          this.$message('新增成功')
          this.selAxios()
        } else {
          this.$message('新增失败')
        }
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
            .get('http://192.168.43.108:8081/examsystem/deleteStudent', {
              params: {
                id: id
              }
            })
            .then(response => {
              if (response.data.success === 'true') {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
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
    setUpdData (id, data) {
      this.update = true
      this.updData.id = id
      this.updData.name = data.stuName
      this.updData.zhuan = data.professional.id
      this.updData.class = data.clazz.id
      this.updData.openTime = data.openClassTime
    },
    updFun () {
      this.update = false
      const data = this.$qs.stringify({
        id: this.updData.id,
        stuName: this.updData.name,
        professionalId: this.updData.zhuan,
        classId: this.updData.class
      })
      this.$axios.post(this.$location.updateStudent, data).then(res => {
        console.log(this.updData)
        console.log(res)
        if (res.data.success === 'true') {
          this.$message('修改成功')
          this.selAxios()
        } else {
          this.$message('修改失败')
        }
      })
    }
  },
  mounted () {
    this.selAxios()
    this.getClassAndProfessional()
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
