<template>
  <div>
    <el-form label-width="80px">
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="insert=true">新增</el-button>

        <!-- <el-button>师范</el-button> -->
        <!--新增角色-->
        <el-dialog title="新增角色" :visible.sync="insert" class="insert" width="65%">
          <el-form v-model="insertForm">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input placeholder="请输入角色名称" style="width:217px" v-model="insertForm.roleName" @input="inputUpdate($event)"></el-input>
            </el-form-item>
            <el-form-item label="角色唯一标识" :label-width="formLabelWidth">
              <el-input placeholder="请输入角色标识" style="width:217px" v-model="insertForm.roleMark" @input="inputUpdate($event)"></el-input>
            </el-form-item>
            <el-form-item label="角色权限" :label-width="formLabelWidth">
              <el-tree :data="roleMenu" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps"
                icon-class="el-icon-s-custom">
              </el-tree>
            </el-form-item>

            <el-form-item label="描述(可不填)" :label-width="formLabelWidth">
              <el-input placeholder="角色描述" v-model="insertForm.roleDescription"></el-input>
            </el-form-item>
          </el-form>
          <!-- 取消or保存 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="insert = false">取 消</el-button>
            <el-button type="primary" @click="insert = false;addSysRole()">保 存</el-button>
          </div>
        </el-dialog>
      </el-form-item>

      <!-- 查询角色-->
      <el-row class="inputRow">
        <el-col :span="6" :offset="12">
          <el-form-item label="查询角色">
            <el-input placeholder="请输入角色名称" v-model="roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item style="text-align:right;">
            <el-button type="primary" @click="searchRole">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" max-height="395"
      tooltip-effect="dark" style="width: 100%" align="center" :cell-style='cellStyle' :header-cell-style='rowClass'>
      <el-table-column prop="roleName" label="专业" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="roleMark" label="角色标识" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="roleDescription" width="200" label="角色描述">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.row.id)" type="danger" size="small">
            删除
          </el-button>
          <el-button @click.native.prevent="updateRow(scope.row.id)" @click="updateDialog = true" type="infor" size="small">
            修改
          </el-button>
          <!-- <el-button>详情</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :page-size="pagesize" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <!-- 修改角色 -->
    <el-dialog title="修改角色信息" :visible.sync="updateDialog" width="65%">

      <el-form v-model="updateForm">
        <el-input v-model="updateForm.id" type="hidden"></el-input>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input placeholder="请输入角色名称" v-model="updateForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色唯一标识" :label-width="formLabelWidth">
          <el-input placeholder="请输入角色标识" v-model="updateForm.roleMark"></el-input>
        </el-form-item>
        <el-form-item label="角色说明" :label-width="formLabelWidth">
          <el-input v-model="updateForm.roleDescription" placeholder="请输入角色说明" autocomplete="off"></el-input>
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
    data() {
      return {
        roleMenu: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        tableData: [],
        searchForm: {
          csName: '',
          proName: '',
          title: '',
          pageSize: 4,
          currentPage: 1
        },
        pagesize: 4,
        currentPage: 1,
        total: 0,
        insert: false,
        formLabelWidth: '120px',
        updateDialog: false,
        updateForm: {
          id: 0,
          roleName: '',
          roleMark: '',
          roleDescription: '',
        },
        insertForm: {
          id: 0,
          roleName: '',
          roleMark: '',
          roleDescription: '',
        },
        roleName: '',
      }
    },

    methods: {
      getMenuTree() {
        let menus = [];
        this.$axios
          .get(this.$location.getAllMenu)
          .then(res => {
            console.log(res.data)
            console.log(res.data.data)
            let data = res.data.data;
            // alert(data.length)
            for (let i = 0; i < data.length; i++) {
              let children = [];
              if (null != data[i]) {
                // console.log("test:" + data[i].id);
                if (data[i].parent_id == 0) {
                  for (let o = 0; o < data.length; o++) {
                    // alert(data[o].parent_id);
                    if (data[i].id == data[o].parent_id) {
                      children.push({
                        id: data[o].id,
                        parentMenuId: data[o].parent_id,
                        label: data[o].name,
                        icon: data[o].icon,
                        alias: data[o].alias,
                        disable: data[o].state,
                        sort: data[o].sort,
                        value: data[o].value,
                        type: data[o].type,
                      })
                    }
                  }
                  menus.push({
                    id: data[i].id,
                    parentMenuId: data[i].parent_id,
                    label: data[i].name,
                    icon: data[i].icon,
                    alias: data[i].alias,
                    disable: data[i].state,
                    sort: data[i].sort,
                    value: data[i].value,
                    type: 'NONE',
                    children
                  });
                  children = [];
                }
              }
            }

          }).catch(error => {
            console.log(error)
          });
        return menus;
      },
      addSysRole() {
        let data = this.$qs.stringify(this.insertForm)
        //alert(JSON.stringify(this.insertForm))
        this.$axios
          .post(this.$location.addSysRole, data)
          .then(response => {
            if (response.data.status == 200) {
              let menuIdArray = this.$qs.stringify({
                "menus": this.$refs.tree.getCheckedKeys(),
                "roleMark": this.insertForm.roleMark
              }, {
                indices: false
              })
              this.$axios
                .post(this.$location.addRoleMenu, menuIdArray)
                .then(response => {
                  // alert(response);
                }).catch(error=>alert("error"+error))
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.getData()
              this.insertForm = []
            } else {
              //console.log(response);
              this.$message.error(response.data.msg)
              this.getData()
              this.insertForm = []
            }
          }).catch(function(error) {
            this.$message({
              type: 'info',
              message: '出现错误，添加失败'
            })
          })
        // alert(this.$refs.tree.getCheckedKeys())


      },
      updateAction() {
        let data = this.$qs.stringify(this.updateForm)
        // alert(JSON.stringify(this.updateForm))
        this.$confirm('确认修改？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$axios
            .post(this.$location.updateSysRole, data)
            .then(response => {
              if (response.data.status == 200) {
                this.$message({
                  type: 'success',
                  message: '已成功修改'
                })
                this.getData()
              } else {
                this.$message({
                  type: 'info',
                  message: '修改失败，可能该修改对象不存在或ID为空'
                })
              }
            }).catch(function(error) {
              this.$message({
                type: 'info',
                message: '出现错误，修改失败'
              })
            })
        })
      },

      searchRole() {
        const data = this.$qs.stringify({
          roleName: this.roleName
        })
        // alert(this.roleName)
        this.$axios
          .post(this.$location.getSysRoleList, data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {
            // alert("查询结果---->"+JSON.stringify(response.data.data))
            this.tableData = response.data.data
            this.total = response.data.data.length
          }).catch(function(error) {
            this.$message({
              type: 'info',
              message: '请求错误'
            })
            console.log(error)
          })

      },

      updateRow(id) {
        // alert(id)
        var that = this
        if (id <= 0 || id == null) return;
        this.$axios
          .get(this.$location.getSysRoleById + '/' + id)
          .then(response => {
            // alert("返回的对象---->"+JSON.stringify(response.data))
            this.updateForm.id = response.data.data.id
            this.updateForm.roleName = response.data.data.roleName
            this.updateForm.roleMark = response.data.data.roleMark
            this.updateForm.roleDescription = response.data.data.roleDescription
          }).catch(function(error) {
            that.$message({
              type: 'info',
              message: '未知错误！'
            })
          })

      },

      deleteRow(id) {
        var that = this
        // alert('id:'+id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .get(this.$location.deleteSysRole + '/' + id)
            .then(response => {
              if (response.data.status == 200) {
                that.$message({
                  type: 'info',
                  message: response.data.msg
                })
                this.getData()
              } else {
                that.$message({
                  type: 'error',
                  message: response.data.msg
                })
              }
            }).catch(function(error) {
              that.$message({
                type: 'info',
                message: '出现未知错误，删除失败'
              })
            })
        })
      },

      cellStyle({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        // 表格文字居中
        return 'text-align:center'
      },
      rowClass({
        row,
        rowIndex
      }) {
        return 'text-align:center'
      },
      inputUpdate(e) {
        this.$forceUpdate()
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function(size) {
        this.pagesize = size
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage
      },
      getData: function() {
        // let data = this.$qs.stringify(this.searchForm)
        var that = this
        this.$axios
          .get(this.$location.getSysRoleList)
          .then(response => {
            // console.log("结果------>"+JSON.stringify(response.data.data))
            this.tableData = response.data.data
            this.total = response.data.data.length
          }).catch(function(error) {
            // 请求失败处理
            console.log('请求处理失败')
            console.log(error)
          })

      }
    },
    mounted() {
      this.roleMenu = this.getMenuTree();
      this.getData()
    },
    activated() {

    },
    components: {
      ue
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
    width: 4px
  }

  .StuData::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px
  }

  .StuData:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 53%, 1)
  }

  .StuData:hover::-webkit-scrollbar-track {
    background: hsla(0, 0%, 53%, .1)
  }

  .your-table .el-table__body-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
</style>
