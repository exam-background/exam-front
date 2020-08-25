<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="insert" class="insert">
          <el-form :model="form">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>
            <el-form-item label="学期" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="form.a" placeholder="请选择活动区域">
                <el-option label="java" value="java"></el-option>
                <el-option label="前端" value="js"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班主任" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="form.b" placeholder="请选择活动区域">
                <el-option label="选择题" value="xuanze"></el-option>
                <el-option label="填空题" value="tiankongti"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教员" :label-width="formLabelWidth" style="width:80%">
              <el-select v-model="form.b" placeholder="请选择活动区域">
                <el-option label="选择题" value="xuanze"></el-option>
                <el-option label="填空题" value="tiankongti"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开班时间" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </div>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="insertFrom = false">取 消</el-button>
            <el-button type="primary" @click="insertFrom = false">保 存</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-row class="inputRow">
        <el-col :span="5">
          <el-form-item label="字典名称">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="字典类型">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="正常" value="root"></el-option>
              <el-option label="停用" value="admin"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item style="text-align:right;">
            <el-button type="primary">查询</el-button>
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
      <el-table-column prop="id" label="字典编号"></el-table-column>
      <el-table-column prop="name" label="字典名称"></el-table-column>
      <el-table-column prop="type" label="字典类型"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="rem" label="备注"></el-table-column>
      <el-table-column prop="datetime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
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
  </div>
</template>
<script>
export default {
  name: 'ZiDain',
  data () {
    return {
      tableData: [
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        },
        {
          id: '0',
          name: '用户性别',
          type: 'sys_user_sex',
          state: '正常',
          rem: '用户性别列表',
          datetime: '2020-05-02'
        }
      ],
      form: {
        name: '',
        region: ''
      },
      pagesize: 10,
      currentPage: 1,
      insert: false,
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
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin: 10px 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
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
