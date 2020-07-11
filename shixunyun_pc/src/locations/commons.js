import axios from 'axios'

const commons = {
  getProfressionals:function(){
    axios.get('http://localhost:8081/examsystem/courseForPage',{
      params:{
        pageSize:10,
        currentPage:1
      }
    })
    .then(response =>{
      // alert(JSON.stringify(response.data.data.data))
      alert(111)
      return "123456"
      // return response.data.data.data;
    })
    .catch(function(error){ 
      alert("错误请求。。。")
    })
  }


}

export default commons;
