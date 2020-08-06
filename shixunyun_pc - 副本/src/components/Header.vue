<template>
  <div class="yunClear">
    <div class="yunLeft">
      <i class="el-icon-menu" @click="topQie"></i>
    </div>
    <div class="yunLeft">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">实训云</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $router.meta" :key="index">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="yunRight">
        <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar :size="40" :src="circleUrl"></el-avatar>
          </div>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided @click.native="tui">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      circleUrl: 'http://www.htxystar.com/upfiles/2019041719254018388.jpg'
    }
  },
  methods: {
    topQie () {
      this.$store.commit('topQieM')
    },
    tui () {
      // localStorage.setItem('loginName', undefined)
      localStorage.clear()
      this.$router.push('/login')
      console.log('点击退出')
    }
  },
  mounted () {}
}
</script>
<style scoped>
.block span {
  cursor: pointer;
  margin: 0px 30px 0 0 !important;
}
.HeaderCss span {
  margin: 10px 0px;
  line-height: 20px;
}
.HeaderCss {
  padding-left: 20px;
  height: 60px;
  box-sizing: border-box;
}
.yunClear {
  box-shadow: 0px 0px 4px -1px #ccc;
}
.yunClear > div {
  margin: 10px 0px;
  line-height: 35px;
}
.yunClear > div:first-of-type {
  font-size: 25px;
  margin-right: 5px;
}
</style>
