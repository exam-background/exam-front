<template>
  <div>
    <el-form   label-width="80px">
    <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增</el-button>
        <el-button type="danger" size="small" plain icon="el-icon-delete" @click="batchDeleteJobExam">批量删除</el-button>
        <el-button>师范</el-button>
        <!--新增示范-->
        <el-dialog title="新增示范" :visible.sync="insert" class="insert" width="65%">
          <el-form>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-select v-model="insertForm.professionalId" placeholder="请选择专业" @change="selProfesionalIn">
              <el-option  v-for="profress in  professionSelect"
              :key="profress.id" :label="profress.professionalName" :value="profress.id"></el-option>
            </el-select>
            </el-form-item>
          <el-form-item label="科目" :label-width="formLabelWidth">
            <el-select v-model="insertForm.courseId" placeholder="请选择科目">
              <el-option  v-for="cse in courseSelect"
              :key="cse.id" :label="cse.courseName" :value="cse.id"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="题目" :label-width="formLabelWidth">
              <el-input placeholder="请输入题目" style="width:217px" v-model="insertForm.title" @input="inputUpdate($event)"></el-input>
            </el-form-item>
            <el-form-item label="答案" :label-width="formLabelWidth">
              <ue v-model="insertForm.answer"></ue>
            </el-form-item>
            <el-form-item label="备注(可不填)" :label-width="formLabelWidth">
              <el-input placeholder="备注信息" style="width:217px" v-model="insertForm.remark" @input="inputUpdate($event)"></el-input>
            </el-form-item>
    </el-form>
          <!-- 取消or保存 -->
           <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="insert = false;addJobExam()">保 存</el-button>
          </div>
        </el-dialog>
    </el-form-item>

    <!-- 查询示范-->
    <el-row class="inputRow">
        <el-col :span="6" :offset="1">
            <el-form-item label="专业">
            <el-select v-model="searchForm.proName" placeholder="请选择专业" clearable="" @change="selProfesionalTe">
                <el-option v-for="profress in professionSelect" :key="profress.id" :label="profress.professionalName" :value="profress.id"></el-option>
            </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item label="科目">
            <el-select v-model="searchForm.csName" placeholder="请选择科目" clearable="">
                <el-option v-for="(course,index) in courseSelect" :key="course.id" :label="course.courseName"  :value="course.id"></el-option>
            </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="题目">
            <el-input v-model="searchForm.title" placeholder="请输入内容" clearable=""></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="3" >
            <el-form-item  style="text-align:right;">
                <el-button type="primary" @click="searchExam" >查询</el-button>
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
      prop="id"
      width="55">
    </el-table-column>
    <el-table-column
      prop="professional.professionalName"
      label="专业"
      width="200"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="course.courseName"
      label="科目"
      width="200"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="title"
      width="200"
      label="题目">
    </el-table-column>
    <el-table-column
      prop="answer"
      label="标准答案">
      <template slot-scope="scope">
            <div v-html="scope.row.answer"></div>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.row.id)"
          type="danger"
          size="small">
          删除
        </el-button>
        <el-button
          @click.native.prevent="updateRow(scope.row.id, tableData)"
          @click="updateDialog = true"
          type="infor"
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
  :total="total">
</el-pagination>

<!-- 修改示范 -->
<el-dialog title="修改示范" :visible.sync="updateDialog" width="65%" >

  <el-form v-model="updateForm">
    <el-input v-model="updateForm.id" type="hidden"></el-input>
    <el-form-item label="专业" :label-width="formLabelWidth">
        <el-select v-model="updateForm.professionalId" placeholder="请选择专业" @change="selProfesionalUp">
          <el-option  v-for="profress in  professionSelect"
          :key="profress.id" :label="profress.professionalName" :value="profress.id"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="科目" :label-width="formLabelWidth">
        <el-select v-model="updateForm.courseId" placeholder="请选择科目">
          <el-option  v-for="cse in courseSelect"
          :key="cse.id" :label="cse.courseName" :value="cse.id"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="updateForm.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="答案" :label-width="formLabelWidth">
          <!-- <el-input v-model="updateForm.answer" autocomplete="off"></el-input> -->
          <ue v-model="updateForm.answer"></ue>
    </el-form-item>
    <el-form-item label="备注(可为空)" :label-width="formLabelWidth">
          <el-input v-model="updateForm.remark" autocomplete="off"></el-input>
    </el-form-item>


  </el-form>
   <div slot="footer" class="dialog-footer">
      <el-button @click="updateDialog = false">取 消</el-button>
      <el-button type="primary" @click="updateDialog = false,updateAction()">确 定</el-button>
    </div>

</el-dialog>


  </div>
</template>
<script>
import ue from '@/components/ue.vue'
export default {
  name: 'ShiFan',
  data () {
    return {
      tableData: [],
      searchForm: {
        csName: '',
        proName: '',
        title:'',
        pageSize:10,
        currentPage:1
      },
      pagesize: 10,
      currentPage: 1,
      total:0,
      insert: false,
      formLabelWidth: '120px',
      updateDialog:false,
      updateForm:{
        id:0,
        title:'java十大凡事',
        answer:'没有的是你的心',
        remark:'此题超难',
        professionalId:0,
        courseId:0
      },
      insertForm:{
        title:'',
        answer:'',
        remark:'',
        professionalId:'',
        courseId:''
      },
      professionSelect:[],
      courseSelect:[],
      deleteJobExam:[]
    }
  },

  methods: {
   addJobExam(){
     let data = this.$qs.stringify(this.insertForm)
     // alert(JSON.stringify(this.insertForm))

       this.$axios
       .post(this.$location.addJobExampleStudy,data)
       .then(response =>{
         if(response.data.success === 'true'){
           this.$message({
             type:'success',
             message:'添加成功'
           })
           this.getData()
           this.insertForm=[]
         }else{
           this.$message.error('添加失败')
         }
       }).catch(function(error){
         this.$message({
           type:'info',
           message:'出现错误，添加失败'
         })
       })

   },
    batchDeleteJobExam(){
      const deleteArray = this.$qs.stringify(this.deleteJobExam,{ arrayFormat: 'repeat' })
      // const deleteArray = this.deleteJobExam
      // alert(deleteArray)
      if(deleteArray.length<=0){
        this.$message.error('未选择需要删除的信息')
      }else{
       this.$axios
       .get(this.$location.deleteJobExampleStudys,{
         params:{
           deleteArray:deleteArray
         }
       }

       )
       .then(response =>{
         if(response.data.status == 200){
              this.$message.success('已成功删除'+response.data.data+'条信息')
         }else{
           this.$message.info("操作失败")
         }
       })

      }
    },

    updateAction(){
      let data = this.$qs.stringify(this.updateForm)
      this.$confirm('确认修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(()=>{
        this.$axios
        .post(this.$location.updateJobExampleStudy,data)
        .then(response =>{
          if(response.data.success === 'true'){
            this.$message({
              type:'success',
              message:'已成功修改'
            })
            this.getData()
          }else{
            this.$message({
              type:'info',
              message:'修改失败，可能该修改对象不存在或ID为空'
            })
          }
        }).catch(function(error){
          this.$message({
            type:'info',
            message:'出现错误，修改失败'
          })
        })
      })
    },

    searchExam(){
      let data = this.$qs.stringify(this.searchForm)
      // alert(data)
      this.$axios
      .post(this.$location.getJobExampleStudyForPage,data)
      .then(response =>{
        // alert("查询结果---->"+JSON.stringify(response.data.data))
        this.tableData=response.data.data.data
        this.total = response.data.data.total
      }).catch(function(error){
        this.$message({

        })
        console.log(error)
      })

    },

    getCourseAndProfressional(){
     var that = this
      this.$axios
        .get(this.$location.getAllCourse)
        .then(response => {
          console.log('科目查询结果---->' + JSON.stringify(response.data.data))
          that.courseSelect = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })

      this.$axios.get(this.$location.professionalForPage,{
         params:{
           pageSize:10,
           currentPage:1
         }
       })
       .then(response =>{
         // console.log(JSON.stringify(response.data.data.data))
         this.professionSelect=response.data.data.data
       })
       .catch(function(error){
         alert("错误请求。。。")
       })
    },
    updateRow(id){
      var that = this
      if(id<=0 || id == null) return;
      this.$axios
      .get(this.$location.getJobExampleStudyById+'/'+id)
      .then(response =>{
        // alert("返回的对象---->"+JSON.stringify(response.data.data))
        this.updateForm.id=response.data.data.id
        this.updateForm.title=response.data.data.title
        this.updateForm.answer=response.data.data.answer
        this.updateForm.courseId=response.data.data.courseId
        this.updateForm.professionalId=response.data.data.professionalId
        this.updateForm.remark=response.data.data.remark
      }).catch(function(error){
        that.$message({
          type: 'info',
          message: '未知错误！'
        })
      })

    },

    deleteRow(id){
    var that=this
      // alert('id:'+id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$axios
        .get(this.$location.deleteJobExampleStudy+'/'+id)
        .then(response =>{
            if(response.data.success === 'true'){
              that.$message({
                type: 'info',
                message: response.data.msg
              })
              this.getData()
            }else{
              that.$message({
                type: 'success',
                message: response.data.msg
              })
            }
        }).catch(function(error){
          that.$message({
            type:'info',
            message:'出现未知错误，删除失败'
          })
        })
      })
    },

    cellStyle ({ row, column, rowIndex, columnIndex }) {
    // 表格文字居中
      return 'text-align:center'
    },
    rowClass ({ row, rowIndex }) {
      return 'text-align:center'
    },
    inputUpdate(e){
      this.$forceUpdate()
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    handleSelectionChange (val) {
      this.deleteJobExam=[]
      for (let i = 0; i < val.length; i++) {
        this.deleteJobExam.push(val[i].id)
      }

    },
    getData () {
      // let data = this.$qs.stringify(this.searchForm)
      var that = this
      this.$axios
      .get(this.$location.getJobExampleStudyForPage,{
        params:{
          pageSize: that.pagesize,
          currentPage: that.currentPage
        }
      })
      .then( response => {
          // console.log("结果------>"+JSON.stringify(response.data.data))
          this.tableData=response.data.data.data
           this.total = response.data.data.total
      }).catch(function (error) {
          // 请求失败处理
          console.log('请求处理失败')
          console.log(error)
        })

    },
    selProfesionalIn () {
      this.selProfesional(this.insertForm.professionalId)
    },
    selProfesionalUp () {
      this.selProfesional(this.updateForm.professionalId)
    },
    selProfesionalTe () {
      this.selProfesional(this.searchForm.proName)
    },
    selProfesional (id) {
      this.$axios
        .get(this.$location.getCourseByProfessionalId, {
          params: {
            professionalId: id
          }
        })
        .then(response => {
          console.log(JSON.stringify(response.data.data))
          this.courseSelect = response.data.data
        })
        .catch(function (error) {
          // 请求失败处理
          console.log('查询请求处理失败')
          console.log(error)
        })
    }
  },
  mounted () {
    this.getData()
    this.getCourseAndProfressional()
  },
  components: {
    ue
  }
}
</script>

<style scoped>
.el-form-item{
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
