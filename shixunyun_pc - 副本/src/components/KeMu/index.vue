<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item>
        <el-button type="primary" size="small" @click="insertBool=true">新增科目</el-button>
         <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="insertBool" class="insert">
          <el-form :model="form">
          <el-form-item label="专业名称" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="form.opt" placeholder="请选择专业名称">
              <el-option v-for="(item, index) in professionalData" :key="index" :label="item.professionalName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
    </el-form>
          <!-- 取消or保存 -->
           <div slot="footer" class="dialog-footer">
            <el-button @click="insertBool = false">取 消</el-button>
            <el-button type="primary" @click="insertFun">保 存</el-button>
          </div>
        </el-dialog>
    </el-form-item>
    </el-form>
    <!-- 数据 -->
    <div class="main">
        <el-table
        :data="tableData"
         max-height="458"
        align="center"
        :cell-style='cellStyle'
        :header-cell-style='rowClass'
        stripe
        style="width: 100%">
        <el-table-column
        prop="id"
        label="ID"
        width="230">
        </el-table-column>
        <el-table-column
        prop="professional.professionalName"
        label="专业名称">
        </el-table-column>
        <el-table-column
        prop="courseName"
        label="科目名称">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="400">
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
        <el-dialog title="修改" :visible.sync="updateBool" class="insert">
          <el-form :model="form">
          <el-form-item label="专业名称" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="updateData.opt" placeholder="请选择专业名称">
              <el-option v-for="(item, index) in professionalData" :key="index" :label="item.professionalName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目名称" :label-width="formLabelWidth">
            <el-input v-model="updateData.name" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
    </el-form>
          <!-- 取消or保存 -->
           <div slot="footer" class="dialog-footer">
            <el-button @click="updateBool = false">取 消</el-button>
            <el-button type="primary" @click="updateFun">保 存</el-button>
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
  :total="total">
</el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Zhuan',
  data () {
    return {
      form: {
        name: '',
        opt: ''
      },
      tableData: [],
      pagesize: 2,
      currentPage: 1,
      insertBool: false,
      insertFrom: false,
      formLabelWidth: '120px',
      total: 0,
      // 专业信息
      professionalData: [],
      // 修改的参数
      updateBool: false,
      updateData: {
        id: '',
        name: '',
        opt: ''
      }
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
    handleSizeChange: function (val) {
      this.currentPage = val
      this.selAxios()
    },
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.selAxios()
    },
    selAxios () {
      this.$axios.get(this.$location.courseForPage, {
        params: {
          pageSize: this.pagesize,
          currentPage: this.currentPage
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.data
        this.total = res.data.data.total
      })
    },
    deleteRow (id) {
      // 删除代码
      const that = this
      console.log('id' + id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get(this.$location.deleteCourse, {
              params: {
                id: id
              }
            })
            .then(response => {
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
    insertFun () {
      console.log(this.$location.addCourse)
      this.insertBool = false
      this.$axios.post(this.$location.addCourse, this.$qs.stringify({
        professionalId: this.form.opt,
        courseName: this.form.name
      })).then(res => {
        console.log(res)
        if (res.data.success === 'true') {
          this.$message(res.data.msg)
          this.selAxios()
        } else {
          this.$message(res.data.msg)
        }
      })
        .catch(function (error) {
        // 请求失败处理
          console.log(error)
          this.$message('错误')
        })
    },
    updateRow (data) {
      this.updateBool = true
      console.log(data)
      this.updateData.id = data.id
      this.updateData.opt = data.professional.id
      this.updateData.name = data.courseName
    },
    updateFun () {
      this.updateBool = false
      this.$axios.post(this.$location.updateCourse, this.$qs.stringify({
        id: this.updateData.id,
        professionalId: this.updateData.opt,
        courseName: this.updateData.name
      })).then(res => {
        console.log(res)
        if (res.data.success === 'true') {
          this.$message(res.data.msg)
          this.selAxios()
        } else {
          this.$message(res.data.msg)
        }
      })
        .catch(function (error) {
        // 请求失败处理
          console.log(error)
        })
    }
  },
  mounted () {
    this.selAxios()
    this.$axios
      .get(this.$location.getProfessionalNoPage, {
        params: {
          positionName: '教员'
        }
      })
      .then(response => {
        console.log(response.data.data)
        this.professionalData = response.data.data
      })
      .catch(function (error) {
        // 请求失败处理
        console.log('请求处理失败')
        console.log(error)
      })
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
