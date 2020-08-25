import axios from 'axios'
import location from './location.js'
export default {
  getMenus() {
    let menus = [];
    axios.post(location.userMenu + "/" + localStorage.getItem('userToken'))
      .then(res => {
        console.log(res.data.data)
        let data = res.data.data;
       // alert(data.length)
        for (let i = 0; i < data.length; i++) {
          let childs = [];
          if (null != data[i]) {
           // console.log("test:" + data[i].id);
            if (data[i].parent_id == 0) {
              for (let o = 0; o < data.length; o++) {
               // alert(data[o].parent_id);
                if (data[i].id == data[o].parent_id) {
                  childs.push({
                    entity: {
                      id: data[o].id,
                      parentMenuId: data[o].parent_id,
                      name: data[o].name,
                      icon: data[o].icon,
                      alias: data[o].alias,
                      state: data[o].state,
                      sort: data[o].sort,
                      value: data[o].value,
                      type: data[o].type,
                      discription: data[o].discription,
                      createUserId: 1,
                      titleCon: [data[i].name, data[o].name]
                    },
                    childs: null
                  })
                }
              }
              menus.push({
                entity: {
                  id: data[i].id,
                  parentMenuId: data[i].parent_id,
                  name: data[i].name,
                  icon: data[i].icon,
                  alias: data[i].alias,
                  state: data[i].state,
                  sort: data[i].sort,
                  value: data[i].value,
                  type: 'NONE',
                  discription: data[i].discription,
                  createUserId: 1
                },childs
              });
              childs = [];
            }
          }
        }

      }).catch(error => {
        console.log(error)
      });
    return menus;
  }
}
