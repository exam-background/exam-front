<template>
  <div class="height_100">
    <el-row class="height_100">
        <el-col :span="4" class="height_100"><bar/></el-col>
        <el-col :span="20">
            <Header class="HeaderCss"></Header>
            <keep-alive class="viewSize">
              <transition name="slide-fade">
                  <router-view></router-view>
              </transition>
            </keep-alive>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import bar from '../components/Bar'
import Header from '../components/Header'
export default {
  components: {
    bar,
    Header
  }
}
</script>

<style scoped>
.slide-fade{
 position: absolute;left:0;right: 0;
}
.slide-fade-enter-active {
 transition: all 1.2s ease;
}
.slide-fade-leave-active {

 transition: all .1s cubic-bezier(2.0, 0.3, 0.5,0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
 left:0;right: 0;
 transform: translateX(50px);
 opacity: 0;
}
</style>
