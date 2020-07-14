
//考核

var examsystemPath = 'http://localhost:8081/examsystem'

const location ={

//班级管理
 classForPage : examsystemPath + '/classForPage',

 deleteClass : examsystemPath+'/deleteClass',

 addClass : examsystemPath+'/addClass',

 updateClass : examsystemPath+'/updateClass',

 getAllTeacherNoPage : examsystemPath+'/getAllTeacherNoPage',

 getAllClassNoPage : examsystemPath + '/getAllClassNoPage',

//示范学习

 getJobExampleStudyForPage : examsystemPath+'/jobExampleStudyForPage',

 deleteJobExampleStudy : examsystemPath + '/deleteJobExampleStudy',

 getJobExampleStudyById : examsystemPath + '/getJobExampleStudyById',

 courseForPage : examsystemPath + '/courseForPage',

 professionalForPage : examsystemPath + '/professionalForPage',

 updateJobExampleStudy : examsystemPath + '/updateJobExampleStudy',

 deleteJobExampleStudys : examsystemPath + '/deleteJobExampleStudys',

 addJobExampleStudy : examsystemPath + '/addJobExampleStudy',

 //学员

 studentForPage : examsystemPath +'/studentForPage',

 addStudent : examsystemPath + '/addStudent',

 updateStudent : examsystemPath + '/updateStudent',

//专业
 getProfessionalNoPage : examsystemPath + '/getProfessionalNoPage',

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
 
 getSysPermissionById : examsystemPath + '/getSysPermissionById'




}

export default location
