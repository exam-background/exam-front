
//考核

var  examsystemPath = 'http://localhost:8081/examsystem'

//班级管理
var classForPage = examsystemPath + '/classForPage'

var deleteClass=examsystemPath+'/deleteClass'

var addClass=examsystemPath+'/addClass'

var updateClass=examsystemPath+'/updateClass'

var getAllTeacherNoPage=examsystemPath+'/getAllTeacherNoPage'

export default {
  examsystemPath,
  classForPage,
  addClass,
  updateClass,
  getAllTeacherNoPage
}
