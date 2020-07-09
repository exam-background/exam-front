// 考核
var examsystemPath = 'http://localhost:8081/examsystem'
// 班级管理
var classForPage = examsystemPath + '/classForPage'

var deleteClass = examsystemPath + '/deleteClass'

var addClass = examsystemPath + '/addClass'

var updateClass = examsystemPath + '/updateClass'

var getAllTeacherNoPage = examsystemPath + '/getAllTeacherNoPage'
// 删除用户
var deleteSysUser = examsystemPath + '/deleteSysUser'
// 批量删除用户
var deleteSysUsers = examsystemPath + '/deleteSysUsers'
// 新增用户
var insertSysUser = examsystemPath + '/insertSysUser'
// 修改用户
var updateSysUser = examsystemPath + '/updateSysUser'
// 查询用户
var getSysUserByPage = examsystemPath + '/getSysUserByPage'

export default {
  examsystemPath,
  classForPage,
  addClass,
  updateClass,
  getAllTeacherNoPage,
  deleteClass,
  deleteSysUser,
  deleteSysUsers,
  insertSysUser,
  updateSysUser,
  getSysUserByPage
}
