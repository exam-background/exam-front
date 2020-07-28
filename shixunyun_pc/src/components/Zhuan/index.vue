<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-button type="primary" size="small" @click="insert=true">新增专业</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="insert" class="insert">
          <el-form :model="form">
            <el-form-item label="专业名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="prese">保 存</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-form-item label="条件查询" :label-width="formLabelWidth">
        <el-input v-model="Pname" placeholder="请输入内容" style="width:217px" size="small"></el-input>
        <el-button type="primary" @click="toggle" size="small" style="margin-left: 10px;">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据 -->
    <div class="main">
      <el-table
        :data="tableData"
        max-height="458"
        align="center"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="230"></el-table-column>
        <el-table-column prop="professionalName" label="专业名称" width="500"></el-table-column>
        <el-table-column fixed="right" label="操作" width="400">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">移除</el-button>
            <el-button @click.native.prevent="updateRow(scope.row.professionalName,scope.row.id)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改弹窗 -->
            <el-dialog title="修改" :visible.sync="updinsert" class="upd">
              <el-form :model="updateForm">
                <el-form-item label="专业名称" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.name" autocomplete="off" style="width:217px"></el-input>
                </el-form-item>
              </el-form>
              <!-- 取消or保存 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="updinsert = false">取 消</el-button>
                <el-button type="primary" @click="updateF">保 存</el-button>
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
  </div>
</template>
<script>

export default {
  name: 'Zhuan',
  data () {
    return {
      form: {
        name: ''
      },
      updateForm: {
        name: ''
      },
      tableData: [],
      // 每页条数
      pagesize: 2,
      // 分页 默认起始页
      currentPage: 1,
      // 新增弹窗显示隐藏参数
      insert: false,
      formLabelWidth: '120px',
      Pname: '',
      total: 0,
      updinsert: false,
      updId: 0
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
            .get(this.$location.deleteProfessional, {
              params: {
                id: id
              }
            })
            .then(response => {
              console.log(response.status)
              if (response.status === 200) {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
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
    updateRow (val, id) {
      this.updateForm.name = val
      this.updId = id
      this.updinsert = true
    },
    prese () {
      // 新增
      this.insert = false
      const that = this
      const data = this.$qs.stringify({ professionalName: this.form.name })
      this.$axios
        .post(this.$location.addProfessional, data)
        .then(response => {
          console.log(response.status)
          if (response.status === 200) {
            that.$message('新增成功')
            this.selAxios()
          } else {
            that.$message('新增失败')
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error)
          that.$message('新增失败')
        })
    },
    updateF () {
      this.updinsert = false
      const that = this
      const data = this.$qs.stringify({ id: that.updId, professionalName: that.updateForm.name })
      this.$axios
        .post(this.$location.updateProfessional, data)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            that.$message('修改成功')
            this.selAxios()
          } else {
            that.$message('修改失败')
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error)
          that.$message('错误' + error)
        })
      this.selAxios()
    },
    toggle () {//查询
    console.log(this.Pname)
      this.$axios
        .get(this.$location.professionalForPage, {
          params: {
            pname: this.Pname,
            pageSize: this.pagesize,
            currentPage: this.currentPage
          }
        })
        .then(response => {

          this.tableData = response.data.data.data
          this.total = response.data.data.total
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    },
    selAxios () {
      this.$axios
        .get(this.$location.professionalForPage, {
          params: {
            pagesize: this.pagesize,
            currentPage: this.currentPage
          }
        })
        .then(response => {
          this.tableData = response.data.data.data
          this.total = response.data.data.total
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })
    }
  },
  mounted () {
    this.selAxios()
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
