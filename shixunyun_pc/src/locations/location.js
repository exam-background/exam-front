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
// 查询每日一练
var getTechnologyDayExercise = examsystemPath + '/getTechnologyDayExercise'
// 查询所有专业分类
var getProfessionalNoPage = examsystemPath + '/getProfessionalNoPage'
// 查询所有科目
var getAllCourse = examsystemPath + '/getAllCourse'
// 查询字典表信息
var getDictionaryBytype = examsystemPath + '/getDictionaryBytype'
// 增加每日一练
var insertTechnologyDayExercise = examsystemPath + '/insertTechnologyDayExercise'
// 修改每日一练
var updateTechnologyDayExercise = examsystemPath + '/updateTechnologyDayExercise'
// 删除每日一练
var deleteTechnologyDayExercise = examsystemPath + '/deleteTechnologyDayExercise'
// 批量删除每日一练
var deleteTechnologyDayExercises = examsystemPath + '/deleteTechnologyDayExercises'

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
  getSysUserByPage,
  getTechnologyDayExercise,
  getProfessionalNoPage,
  getAllCourse,
  getDictionaryBytype,
  insertTechnologyDayExercise,
  updateTechnologyDayExercise,
  deleteTechnologyDayExercise,
  deleteTechnologyDayExercises
}
