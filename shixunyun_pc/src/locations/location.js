//考核

var examsystemPath = 'http://localhost:8081/examsystem'

const location ={
  //更新角色的菜单
updateRoleMenu : examsystemPath + '/updateRoleMenu',
//获取角色的菜单id列表
getMenuIdList : examsystemPath + '/getMenuIdList',
//获取所有菜单
 
addRoleMenu : examsystemPath + '/addRoleMenu',

  //获取所有菜单
getAllMenu : examsystemPath + '/getAllMenu',
  //获取专业列表
  getProfessionalNoPage : examsystemPath + '/getProfessionalNoPage',
  //获取后台https证书测试方法
  getPower : examsystemPath + '/getPower',
//获取用户菜单
userMenu : examsystemPath + '/userMenu',

//获取验证码
captcha : examsystemPath + '/captcha',

//校验用户状态
getUsersState : examsystemPath + '/getUsersState',

//校验验证码
checkCaptCha : examsystemPath + '/checkCaptCha',

  //登录
loginPath : examsystemPath + '/login',
//班级管理
 classForPage : examsystemPath + '/classForPage',

 deleteClass : examsystemPath+'/deleteClass',

 addClass : examsystemPath+'/addClass',

 updateClass : examsystemPath+'/updateClass',

 deleteStudent : examsystemPath + '/deleteStudent',

 teacherForPage : examsystemPath + '/teacherForPage',

 addTeacher : examsystemPath + '/addTeacher',

 deleteTeacher : examsystemPath + '/deleteTeacher',

 updateTeacher : examsystemPath + '/updateTeacher',

 getAllTeacherNoPage : examsystemPath+'/getAllTeacherNoPage',

 getAllClassNoPage : examsystemPath + '/getAllClassNoPage',
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
  // 根据专业id查询科目
  getCourseByProfessionalId: examsystemPath + '/getCourseByProfessionalId',
  // 添加试卷
  insertPapers: examsystemPath + '/insertPapers',
  // 修改试卷
  updatePapers: examsystemPath + '/updatePapers',
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

  // 就业每日一练

  // 删除就业每日一练
  deleteJobDayExercies: examsystemPath + '/deleteJobDayExercise',
  // 批量删除就业每日一练
  deletesJobDayExercise: examsystemPath + '/deletesJobDayExercise',
  // 增加就业每日一练
  addJobDayExercise: examsystemPath + '/addJobDayExercise',
  // 修改就业每日一练
  updateJobDayExercise: examsystemPath + '/updateJobDayExercise',
  // 查询就业每日一练
  getAllJobDayExercise: examsystemPath + '/getAllJobDayExercise',
//示范学习

 getJobExampleStudyForPage : examsystemPath+'/jobExampleStudyForPage',

 deleteJobExampleStudy : examsystemPath + '/deleteJobExampleStudy',

 getJobExampleStudyById : examsystemPath + '/getJobExampleStudyById',

 courseForPage : examsystemPath + '/courseForPage',

 deleteCourse : examsystemPath + '/deleteCourse',

 addCourse : examsystemPath + '/addCourse',

 updateCourse : examsystemPath + '/updateCourse',

 professionalForPage : examsystemPath + '/professionalForPage',

 updateJobExampleStudy : examsystemPath + '/updateJobExampleStudy',

 deleteJobExampleStudys : examsystemPath + '/deleteJobExampleStudys',

 addJobExampleStudy : examsystemPath + '/addJobExampleStudy',

 //学员

 studentForPage : examsystemPath +'/studentForPage',

 addStudent : examsystemPath + '/addStudent',

 updateStudent : examsystemPath + '/updateStudent',

 selectStudent : examsystemPath + '/selectStudent',

//专业
//  getProfessionalNoPage : examsystemPath + '/getProfessionalNoPage',

 deleteProfessional : examsystemPath + '/deleteProfessional',

 addProfessional : examsystemPath + '/addProfessional',

 updateProfessional : examsystemPath + '/updateProfessional',

 // 角色
 getSysRoleList : examsystemPath + '/getSysRoleList',

 addSysRole : examsystemPath + '/addSysRole',

 getSysRoleById : examsystemPath + '/getSysRoleById',

 updateSysRole : examsystemPath + '/updateSysRole',

 deleteSysRole : examsystemPath + '/deleteSysRole',

 //权限
 getSysPermission : examsystemPath + '/getSysPermission',
 
 getSysPermissionById : examsystemPath + '/getSysPermissionById',

  // 音频上传
 uploadVoice: examsystemPath + '/uploadVoice',

 // 加载试卷
 getPapars: examsystemPath + '/getPapers',
 // 加载所有已发布的试卷
 getPapersAllPublish: examsystemPath + '/getPapersAllPublish',
 // 批量删除试卷
 delPapars: examsystemPath + '/delPapars',

 //查看试卷题目
 getPapersTitleByPapersId: examsystemPath + '/getPapersTitleByPapersId',

 //发布试卷
 publishPapers: examsystemPath + '/publishPapers',

 // 查询试卷考试用户的答题
 getPapersUserByUserId: examsystemPath + '/getPapersUserByUserId',

 // 根据试卷id查询考试学生
 getPapersUserByPapersId: examsystemPath + '/getPapersUserByPapersId',
 // 人工阅卷
 updatePapersUserResult: examsystemPath + '/updatePapersUserResult',

 // 错题本
 // 根据条件查询错题记录
 getErrorTechnologyDayExercise: examsystemPath + '/getErrorTechnologyDayExercise',
 // 根据题目id查看错误学生
 getErrorTechnologyDayExerciseStudentByExercise: examsystemPath + '/getErrorTechnologyDayExerciseStudentByExercise',

 // 教师关联班级
 // 增加教师关联班级
 insertTeacherClass: examsystemPath + '/insertTeacherClass',
 // 删除教师关联班级
 deleteTeacherClass: examsystemPath + '/deleteTeacherClass',
 // 修改教师关联班级
 updateTeacherClass: examsystemPath + '/updateTeacherClass',
 // 查询教师关联班级
 selectTeacherClass: examsystemPath + '/selectTeacherClass'
}

export default location
