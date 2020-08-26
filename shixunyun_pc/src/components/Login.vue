<template>
  <div class="log_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" label-width="0px"
        class="login_from">

        <!-- uuid(唯一编码) -->
        <el-form-item prop="uuid" id="uuid">
          <el-input v-model="loginForm.uuid">
          </el-input>
        </el-form-item>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input id="username" v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" width="100px">
          <el-input  prefix-icon="el-icon-picture" v-model="loginForm.code" style="width: 260px;"
            placeholder="请输入图形码">
          </el-input>
          <img :src="datasrc" width="120" height="38" id="captchaImg" alt="验证码" title="点击刷新验证码" @click="test" :onerror="defaultImg" />

        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">

          <el-button type="primary" @click="loginToggle" id="loginBtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import {
  v4 as uuidv4
} from 'uuid';
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      loginFormRules: {
        // 验证用户名是否合法
        username: [{
            required: true,
            message: '请输入登录名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [{
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ]
      },
      datasrc: '',
      defaultImg: 'this.src="' + require('../assets/errorimg.png') + '"',
      testa:""
    }
  },
  created: function() {
    //window.open(this.$location.getPower)
    this.test()
  },
  methods: {
    test() {
      
      let id = "captcha:" + uuidv4();
      this.loginForm.uuid = id;
      axios.get(this.$location.captcha, {
        params: {
          'uuid': id
        },
        responseType: 'blob'
      }).then(response => {
        console.log(response);
        //window.URL.createObjectURL = response.data;
        let reader = new FileReader()
        reader.onload = (e) => {
          this.datasrc = e.target.result
        }
        reader.readAsDataURL(response.data)
      }).catch(error=>{console.log(error)})
    },
    loginToggle() {
      if ('' == this.loginForm.username) {
        this.$message('请输入用户名~');
        return;
      } else {
        if (this.loginForm.username.length < 5 || this.loginForm.username.length > 12) {
          this.$message('用户名在6-12位之间~');
          return;
        }
      }
      if ('' == this.loginForm.password) {
        this.$message('请输入密码~');
        return;
      } else {
        if (this.loginForm.password.length < 5 || this.loginForm.password.length > 12) {
          this.$message('密码在6-12位之间~');
          return;
        }
      }
      if ('' == this.loginForm.code) {
        this.$message('请输入图形验证码~');
        return;
      } else {
        if (this.loginForm.code.length != 4) {
          this.$message('图形验证码有4位~');
          return;
        }
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 8000);
      const codedata = this.$qs.stringify({
        'code': this.loginForm.code,
        'uuid': this.loginForm.uuid
      })
      axios.post(this.$location.checkCaptCha, codedata).then(response => {
        console.log(response);
        if (response.data.errorCode == '4001') {
          this.$message("验证码过期或不正确~")
          this.test();
          setTimeout(() => {
            loading.close();
          }, 500);
        }
        if (response.data.errorCode == '0') {
          const data = this.$qs.stringify({
            'username': this.loginForm.username,
            'password': this.loginForm.password
          })
          this.$axios.post(this.$location.loginPath, data).then(response => {
            console.log(response)
            // this.$message(response.data.errorCode);

            if (response.data.errorCode == '0') {
              if (response.data.data.token) {
                this.$store.commit("set_token", response.data.data.token);
                //localStorage.setItem('userToken', response.data.data.token)
                axios.defaults.headers.common['Authentication-Token'] = localStorage.getItem("userToken");
                this.loginForm.password = "";
                this.loginForm.code = "";
                this.$router.push('/Stu');
                setTimeout(() => {
                  loading.close();
                }, 500);
              } else {
                setTimeout(() => {
                  loading.close();
                }, 500);
                this.$message('系统出错了,请稍后重试~');
                this.test();
              }
            } else if (response.data.errorCode == '4001') {
              setTimeout(() => {
                loading.close();
              }, 500);
              this.$message(response.data.msg);
              this.test();
            }
          }).catch(error => {
            setTimeout(() => {
              loading.close();
            }, 500);
            this.$message.error("网络异常,请稍后重试~");
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .log_container {
    background: #2b4b6b;
    height: 100%;
  }

  .login_box {
    border-radius: 40px;
    width: 450px;
    height: 350px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }

    .btns {
      // display: flex;
      // justify-content: flex-end;
      text-align: center;
    }

    .login_from {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

  }

  #loginBtn {
    width: 260px;
    border-radius: 1.25rem;
  }

  #captchaImg {
    display: inline-block;
    cursor: pointer;
    position: relative;
    left: 30px;
    top: 12px;
  }

  #uuid {
    display: none;
  }
  // #iframe{
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  // }
</style>
