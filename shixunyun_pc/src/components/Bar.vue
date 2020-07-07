<template>
  <div class="height_100">
    <h3 class="headerTitle"><i class="el-icon-s-home"></i></h3>
    <el-menu
      default-active="/Stu/class"
      class="el-menu-vertical-demo barBg"
      @open="handleOpen"
      @close="handleClose"
      :collapse="idCollapse"
      router
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409eff"
    >
    <BarZi :navMenus="barContent"></BarZi>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BarZi from './BarZi'
export default {
  name: 'Bar',
  data () {
    return {
      // 折叠效果变量 --暂时没写
      idCollapse: this.idCollapseState,
      // Bar 数据参数
      barContent: [
        {
          entity: {
            id: 1,
            parentMenuId: 0,
            name: '学生基础信息',
            icon: 'el-icon-s-custom\r\n',
            alias: '学生基础信息',
            state: 'ENABLE',
            sort: 0,
            value: null,
            type: 'NONE',
            discription: '用于系统管理的菜单',
            createUserId: 1
          },
          childs: [
            {
              entity: {
                id: 2,
                parentMenuId: 1,
                name: 'authManage',
                icon: 'el-icon-medal-1',
                alias: '班级管理',
                state: 'ENABLE',
                sort: 0,
                value: '/Stu/Class',
                type: 'LINK',
                discription: '用于权限管理的菜单',
                createUserId: 1,
                titleCon: ['学生基础信息', '班级管理']
              },
              childs: null
            },
            {
              entity: {
                id: 3,
                parentMenuId: 1,
                name: 'roleManage',
                icon: 'el-icon-s-opportunity',
                alias: '学生管理',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/Stu',
                type: 'LINK',
                discription: '用于角色管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 4,
                parentMenuId: 1,
                name: 'Zhuan',
                icon: 'el-icon-star-on',
                alias: '专业管理',
                state: 'ENABLE',
                sort: 2,
                value: '/Stu/Zhuan',
                type: 'LINK',
                discription: '用于菜单管理的菜单',
                createUserId: 1
              },
              childs: [
                {
                  entity: {
                    id: 5,
                    parentMenuId: 2,
                    name: 'Zhuan',
                    icon: 'el-icon-paperclip',
                    alias: '专业',
                    state: 'ENABLE',
                    sort: 2,
                    value: '/Stu/Zhuan',
                    type: 'LINK',
                    discription: '用于菜单管理的菜单',
                    createUserId: 1
                  },
                  childs: null
                },
                {
                  entity: {
                    id: 6,
                    parentMenuId: 2,
                    name: 'xiFen',
                    icon: 'el-icon-thumb',
                    alias: '科目',
                    state: 'ENABLE',
                    sort: 2,
                    value: '/Stu/KeMu',
                    type: 'LINK',
                    discription: '用于菜单管理的菜单',
                    createUserId: 1
                  },
                  childs: null
                }
              ]
            }
          ]
        },
        {
          entity: {
            id: 7,
            parentMenuId: 0,
            name: 'userManage',
            icon: 'el-icon-location',
            alias: '教师基础信息',
            state: 'ENABLE',
            sort: 1,
            value: null,
            type: 'NONE',
            discription: '用于用户管理的菜单',
            createUserId: 1
          },
          childs: [
            {
              entity: {
                id: 8,
                parentMenuId: 6,
                name: '教师管理',
                icon: 'el-icon-price-tag',
                alias: '教师管理',
                state: 'ENABLE',
                sort: 0,
                value: '/Stu/Teacher',
                type: 'NONE',
                discription: '用于帐号管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 9,
                parentMenuId: 6,
                name: '教师关联班级',
                icon: 'el-icon-connection',
                alias: '教师关联班级',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/TeacherGuan',
                type: 'LINK',
                discription: '用于积分管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 10,
                parentMenuId: 6,
                name: '教师权限管理',
                icon: 'el-icon-turn-off',
                alias: '教师权限管理',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/TeaQuan',
                type: 'LINK',
                discription: '用于积分管理的菜单',
                createUserId: 1
              },
              childs: null
            }
          ]
        },
        {
          entity: {
            id: 11,
            parentMenuId: 0,
            name: 'jiuYe',
            icon: 'el-icon-data-line',
            alias: '就业训练管理',
            state: 'ENABLE',
            sort: 2,
            value: null,
            type: 'NONE',
            discription: '用于内容管理的菜单',
            createUserId: 1
          },
          childs: [
            {
              entity: {
                id: 12,
                parentMenuId: 9,
                name: 'ShiFan',
                icon: 'el-icon-star-off',
                alias: '示范学习',
                state: 'ENABLE',
                sort: 0,
                value: '/Stu/ShiFan',
                type: 'LINK',
                discription: '用于分类管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 13,
                parentMenuId: 9,
                name: 'MeiRi',
                icon: 'el-icon-edit-outline',
                alias: '每日一练',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/MeiRi',
                type: 'LINK',
                discription: '用于文章管理的菜单',
                createUserId: 1
              },
              childs: null
            }
          ]
        },
        {
          entity: {
            id: 14,
            parentMenuId: 0,
            name: 'jiShu',
            icon: 'el-icon-set-up',
            alias: '技术训练管理',
            state: 'ENABLE',
            sort: 2,
            value: null,
            type: 'NONE',
            discription: '用于内容管理的菜单',
            createUserId: 1
          },
          childs: [
            {
              entity: {
                id: 15,
                parentMenuId: 9,
                name: 'MeiRiTwo',
                icon: 'el-icon-edit-outline',
                alias: '每日一练',
                state: 'ENABLE',
                sort: 0,
                value: '/Stu/MeiRiTwo',
                type: 'LINK',
                discription: '用于分类管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 16,
                parentMenuId: 9,
                name: '错题本',
                icon: 'el-icon-document-delete',
                alias: '错题本',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/CuoTi',
                type: 'LINK',
                discription: '用于文章管理的菜单',
                createUserId: 1
              },
              childs: null
            }
          ]
        },
        {
          entity: {
            id: 17,
            parentMenuId: 0,
            name: 'biYe',
            icon: 'el-icon-edit',
            alias: '毕业考核管理',
            state: 'ENABLE',
            sort: 2,
            value: null,
            type: 'NONE',
            discription: '用于内容管理的菜单',
            createUserId: 1
          },
          childs: [
            {
              entity: {
                id: 18,
                parentMenuId: 9,
                name: 'JieYekaoHe',
                icon: 'el-icon-coordinate',
                alias: '就业考核',
                state: 'ENABLE',
                sort: 0,
                value: '/Stu/JiuYe',
                type: 'LINK',
                discription: '用于分类管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 19,
                parentMenuId: 9,
                name: 'articleManage',
                icon: 'el-icon-collection-tag',
                alias: '技术考核',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/JiShu',
                type: 'LINK',
                discription: '用于文章管理的菜单',
                createUserId: 1
              },
              childs: null
            }
          ]
        },
        {
          entity: {
            id: 20,
            parentMenuId: 0,
            name: 'tongJi',
            icon: 'el-icon-document-checked',
            alias: '统计分析',
            state: 'ENABLE',
            sort: 2,
            value: null,
            type: 'NONE',
            discription: '用于内容管理的菜单',
            createUserId: 1
          },
          childs: [
            {
              entity: {
                id: 21,
                parentMenuId: 9,
                name: '重点关注学生',
                icon: 'el-icon-service',
                alias: '重点关注学生',
                state: 'ENABLE',
                sort: 0,
                value: '/Stu/ZhongDianStu',
                type: 'LINK',
                discription: '用于分类管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 22,
                parentMenuId: 9,
                name: '班级考核通过率',
                icon: 'el-icon-data-analysis',
                alias: '班级考核通过率',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/ClassKaoHe',
                type: 'LINK',
                discription: '用于文章管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 23,
                parentMenuId: 9,
                name: '班级训练合格率',
                icon: 'el-icon-s-order',
                alias: '班级训练合格率',
                state: 'ENABLE',
                sort: 2,
                value: '/Stu/ClassXunLian',
                type: 'LINK',
                discription: '用于评论管理的菜单',
                createUserId: 1
              },
              childs: null
            }
          ]
        },
        {
          entity: {
            id: 24,
            parentMenuId: 0,
            name: 'system',
            icon: 'el-icon-s-tools',
            alias: '系统设置',
            state: 'ENABLE',
            sort: 2,
            value: null,
            type: 'NONE',
            discription: '用于内容管理的菜单',
            createUserId: 1
          },
          childs: [
            {
              entity: {
                id: 25,
                parentMenuId: 9,
                name: '用户管理',
                icon: 'el-icon-user-solid',
                alias: '用户管理',
                state: 'ENABLE',
                sort: 0,
                value: '/Stu/User',
                type: 'LINK',
                discription: '用于分类管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 26,
                parentMenuId: 9,
                name: '权限管理',
                icon: 'el-icon-warning',
                alias: '权限管理',
                state: 'ENABLE',
                sort: 1,
                value: '/Stu/Quan',
                type: 'LINK',
                discription: '用于文章管理的菜单',
                createUserId: 1
              },
              childs: null
            },
            {
              entity: {
                id: 27,
                parentMenuId: 9,
                name: '数据字典',
                icon: 'el-icon-collection',
                alias: '数据字典',
                state: 'ENABLE',
                sort: 2,
                value: '/Stu/ZiDian',
                type: 'LINK',
                discription: '用于评论管理的菜单',
                createUserId: 1
              },
              childs: null
            }
          ]
        }
      ],
      alias: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      this.alias = keyPath
    },
    handleClose (key, keyPath) {
    }
  },
  computed: {
    ...mapState(['idCollapseState'])
  },
  components: {
    BarZi
  }
}
</script>
<style scoped>
.el-submenu__title {
  background-color: red !important;
}
.el-submenu {
  text-align: left !important;
}
.barBg {
  background: #304156;
  height: 90.5%;
  overflow: auto;
}
.height_100 {
  height: 100%;
}
.barBg::-webkit-scrollbar {
    width: 4px
}

.barBg::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px
}

.barBg:hover::-webkit-scrollbar-thumb {
    background: hsla(0,0%,53%,1)
}

.barBg:hover::-webkit-scrollbar-track {
    background: hsla(0,0%,53%,.1)
}
.your-table .el-table__body-wrapper::-webkit-scrollbar {
width: 10px;
height: 10px;
}
.headerTitle{
    font-size: 30px;
    line-height: 60px;
    background: #2b2f3a;
    color: white;
    text-align: center
}
</style>
