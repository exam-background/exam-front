<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
        <el-button type="primary" size="small" icon="el-icon-s-data" @click="bili">科目/题目分数占比</el-button>
        <!-- 新增弹窗 -->
        <el-dialog title="新增" :visible.sync="insert" class="insert">
          <el-form :model="form">
          <el-form-item label="考试时间" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="班级名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="form.a" placeholder="请选择活动区域">
              <el-option label="java" value="java"></el-option>
              <el-option label="前端" value="js"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="form.b" placeholder="请选择活动区域">
              <el-option label="选择题" value="xuanze"></el-option>
              <el-option label="填空题" value="tiankongti"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目分数" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="题目" :label-width="formLabelWidth" style="width:80%">
            <el-select v-model="form.b" placeholder="请选择活动区域">
              <el-option label="选择题" value="xuanze"></el-option>
              <el-option label="填空题" value="tiankongti"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目分数" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width:217px"></el-input>
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
        <el-col :span="7">
          <el-form-item label="考试时间" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="专业">
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="4">
            <el-form-item label="班级">
            <el-select v-model="form.region" placeholder="请选择">
                <el-option label="JAVA" value="S1"></el-option>
                <el-option label=".NET" value="S2"></el-option>
                <el-option label="前端" value="Y2"></el-option>
            </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="5">
            <el-form-item label="科目">
            <el-select v-model="form.region" placeholder="请选择">
                <el-option label="JAVA" value="S1"></el-option>
                <el-option label=".NET" value="S2"></el-option>
                <el-option label="前端" value="Y2"></el-option>
            </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="3" >
            <el-form-item  style="text-align:right;">
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
    :cell-style='cellStyle'
    :header-cell-style='rowClass'
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="zhuanYe"
      label="考试时间">
    </el-table-column>
    <el-table-column
      prop="zhuanYe"
      label="班级">
    </el-table-column>
    <el-table-column
      prop="zhuanYe"
      label="专业">
    </el-table-column>
    <el-table-column
      prop="kemu"
      label="科目"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="kemufenshu"
      label="科目分数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="timu"
      label="题目">
    </el-table-column>
    <el-table-column
      prop="timufenshu"
      label="题目分数"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          修改
        </el-button>
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
  :total="tableData.length">
</el-pagination>
<!-- 抽屉 -->
<el-drawer
  title="我是标题"
  size="65%"
  :visible.sync="drawer"
  direction="btt"
  :with-header="false">
  <div class="yunClear">
  <div class="yunLeft" style="width:50%">
    <h3>科目分数占比</h3>
    <ve-pie :data="chartData"></ve-pie>
  </div>
  <div class="yunLeft" style="width:50%">
    <h3>题目分数占比</h3>
    <ve-pie :data="chartData2"></ve-pie>
  </div>
  </div>
</el-drawer>
  </div>
</template>
<script>
export default {
  name: 'JiShu',
  data () {
    return {
      tableData: [
        {
          id: '0',
          zhuanYe: '前端',
          kemu: '生命周期函数',
          kemufenshu: 30,
          timu: '生命周期函数有几个',
          timufenshu: 30,
          daAn: '8个',
          pingfen: '...'
        },
        {
          id: '1',
          zhuanYe: '前端',
          kemu: '组件',
          kemufenshu: 50,
          timu: '组件传值',
          timufenshu: 50,
          daAn: '8个',
          pingfen: '...'
        },
        {
          id: '2',
          zhuanYe: '前端',
          kemu: '路由',
          kemufenshu: 40,
          timu: '路由有哪几种形式',
          timufenshu: 40,
          daAn: '8个',
          pingfen: '...'
        },
        {
          id: '3',
          zhuanYe: '前端',
          kemu: '状态管理',
          kemufenshu: 40,
          timu: '说说你对状态管理的理解',
          timufenshu: 40,
          daAn: '8个',
          pingfen: '...'
        }
      ],
      form: {
        name: '',
        region: ''
      },
      pagesize: 10,
      currentPage: 1,
      // 抽屉
      drawer: false,
      chartData: {
        // 饼图1
        columns: ['kemu', 'kemufenshu'],
        rows: []
      },
      chartData2: {
        // 饼图2
        columns: ['timu', 'timufenshu'],
        rows: []
      },
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
    },
    bili () {
      this.drawer = true
      const arr = []
      const arr2 = []
      for (var i = 0; i < this.tableData.length; i++) {
        arr2.push({ timu: this.tableData[i].timu, timufenshu: this.tableData[i].timufenshu })
        arr.push({ kemu: this.tableData[i].kemu, kemufenshu: this.tableData[i].kemufenshu })
      }
      this.chartData.rows = arr
      this.chartData2.rows = arr2
    }
  }
}
</script>

<style scoped>
.insert .el-form-item {
  margin: 20px 0;
}
.el-drawer__body h3{
    font: 700 16px '宋体';
    text-indent: 2em;
    line-height: 40px;
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
.inputRow{
  margin-top: 20px;
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
