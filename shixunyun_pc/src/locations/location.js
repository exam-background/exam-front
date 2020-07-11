var examsystemPath = 'http://localhost:8081/examsystem'

const location = {

  // 班级管理
  classForPage: examsystemPath + '/classForPage',

  deleteClass: examsystemPath + '/deleteClass',

  addClass: examsystemPath + '/addClass',

  updateClass: examsystemPath + '/updateClass',

  getAllTeacherNoPage: examsystemPath + '/getAllTeacherNoPage',

  getAllClassNoPage: examsystemPath + '/getAllClassNoPage',
  // 删除用户
  deleteSysUser: examsystemPath + '/deleteSysUser',
  // 批量删除用户
  deleteSysUsers: examsystemPath + '/deleteSysUsers',
  // 新增用户
  insertSysUser: examsystemPath + '/insertSysUser',
  // 修改用户
  updateSysUser: examsystemPath + '/updateSysUser',
  // 查询用户
  getSysUserByPage: examsystemPath + '/getSysUserByPage',
  // 查询每日一练
  getTechnologyDayExercise: examsystemPath + '/getTechnologyDayExercise',
  // 查询所有专业分类
  getProfessionalNoPage: examsystemPath + '/getProfessionalNoPage',
  // 查询所有科目
  getAllCourse: examsystemPath + '/getAllCourse',
  // 查询字典表信息
  getDictionaryBytype: examsystemPath + '/getDictionaryBytype',
  // 增加每日一练
  insertTechnologyDayExercise: examsystemPath + '/insertTechnologyDayExercise',
  // 修改每日一练
  updateTechnologyDayExercise: examsystemPath + '/updateTechnologyDayExercise',
  // 删除每日一练
  deleteTechnologyDayExercise: examsystemPath + '/deleteTechnologyDayExercise',
  // 批量删除每日一练
  deleteTechnologyDayExercises: examsystemPath + '/deleteTechnologyDayExercises',

  // 示范学习

  getJobExampleStudyForPage: examsystemPath + '/jobExampleStudyForPage',

  deleteJobExampleStudy: examsystemPath + '/deleteJobExampleStudy',

  getJobExampleStudyById: examsystemPath + '/getJobExampleStudyById',

  courseForPage: examsystemPath + '/courseForPage',

  professionalForPage: examsystemPath + '/professionalForPage',

  updateJobExampleStudy: examsystemPath + '/updateJobExampleStudy',

  deleteJobExampleStudys: examsystemPath + '/deleteJobExampleStudys',

  addJobExampleStudy: examsystemPath + '/addJobExampleStudy',

  // 学员

  studentForPage: examsystemPath + '/studentForPage',

  addStudent: examsystemPath + '/addStudent',

  updateStudent: examsystemPath + '/updateStudent',

  deleteProfessional: examsystemPath + '/deleteProfessional',

  addProfessional: examsystemPath + '/addProfessional',

  updateProfessional: examsystemPath + '/updateProfessional'

}

export default location
