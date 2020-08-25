<template>
  <div class="height_100">
    <h3 class="headerTitle"><i class="el-icon-s-home"></i></h3>
    <el-menu default-active="/Stu/class" class="el-menu-vertical-demo barBg" @open="handleOpen" @close="handleClose"
      :collapse="idCollapse" router background-color="#304156" text-color="#fff" active-text-color="#409eff">
      <BarZi :navMenus="barContent"></BarZi>
    </el-menu>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import BarZi from './BarZi'
  import request from '../locations/request.js'
  export default {
    name: 'Bar',
    data() {
      return {
        // 折叠效果变量 --暂时没写
        idCollapse: this.idCollapseState,
        // Bar 数据参数
        barContent: [

        ],
        alias: []
      }
    },
    activated() {
      let data = request.getMenus();
      //alert("fdsfsd" );
      console.log(data)
      this.barContent = data;
    },
    methods: {
      handleOpen(key, keyPath) {
        this.alias = keyPath
      },
      handleClose(key, keyPath) {}
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
    background: hsla(0, 0%, 53%, 1)
  }

  .barBg:hover::-webkit-scrollbar-track {
    background: hsla(0, 0%, 53%, .1)
  }

  .your-table .el-table__body-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .headerTitle {
    font-size: 30px;
    line-height: 60px;
    background: #2b2f3a;
    color: white;
    text-align: center
  }
</style>
