<template>
  <div class="login_main">
    <div class="login_content">
      <div class="loginbox">
        <h2 style="text-align: center">{{ slogan }}</h2>
        <div class="formbox">
          <!--用户名-->
          <div class="bdbox">
            <h4>手机号</h4>
            <el-input placeholder="用户名" prefix-icon="el-icon-user" style="width:220px" v-model="lgusername"></el-input>
          </div>

          <!--密码-->
          <div class="bdbox">
            <el-input
              type="password"
              placeholder="密码"
              v-model="lguserpwd"
              autocomplete="off"
              prefix-icon="el-icon-c-scale-to-original"
            ></el-input>
          </div>
          <el-button type="primary" v-debounce="loginajax" :loading="isLoging" class="login_btn">登录</el-button>
          <p class="login-tips" @click="close = true">没有账号? 立即注册</p>
        </div>
      </div>
    </div>
    <overlay :close.sync="close" title="账号注册" owidth="380px">
      <sign-up v-if="close"></sign-up>
    </overlay>
  </div>
</template>
<script>
import { setToken } from '@/utils/auth'
import { login } from '@/api'
import { title } from '@/settings'
import signUp from './widgets/sign-up.vue'
export default {
  data: function() {
    return {
      slogan: title,
      lgusername: '',
      lguserpwd: '',
      lgButton: false,
      lgtoken: '',
      isLoging: false,
      close: false
    }
  },
  components: { signUp },
  watch: {
    lgusername: function() {
      var a = this.lgusername.slice(this.lgusername.length - 1, this.lgusername.length)
      var re = /[A-Za-z]|[\u4e00-\u9fa5]|[0-9]/
      if (!re.test(a)) {
        this.lgusername = this.lgusername.slice(0, this.lgusername.length - 1)
      }
      if (this.lgusername !== '' && this.lguserpwd !== '') {
        this.lgButton = true
      } else {
        this.lgButton = false
      }
    },
    lguserpwd: function() {
      if (this.lgusername !== '' && this.lguserpwd !== '') {
        this.lgButton = true
      } else {
        this.lgButton = false
      }
    }
  },
  methods: {
    loginajax() {
      // 登录验证返回token
      if (!this.lgusername || !this.lguserpwd) {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
        })
        return
      }
      // 6小时失效
      setToken('token', 'token', { expires: 0.25 })
      setToken('userName', 'admin')
      this.$router.push('/')
      this.isLoging = true
      const params = {
        userName: this.lgusername,
        password: this.lguserpwd
      }
      login(params)
        .then(res => {
          this.isLoging = false
          // 6小时失效
          setToken('token', res.data.token, { expires: 0.25 })
          setToken('userName', res.data.userName)
          this.$router.push('/')
        })
        .catch(() => {
          this.isLoging = false
        })
    },
    enterLoginajax(e) {
      // 检测密码是否为空之后进行enter事件的监控
      if (e.keyCode === 13) {
        if (this.lgusername !== '' && this.lguserpwd !== '') {
          this.loginajax()
        }
      }
    },
    debounce(fn, wait) {
      let timer
      return function() {
        const that = this
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function() {
          fn.apply(that, args)
        }, wait)
      }
    }
  }
}
</script>
<style lang="scss">
.login_main {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  @include base-background();
  background: url(../../assets/img/bg.jpg) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @include font_color(null);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($color: #000, $alpha: 0.4);
    backdrop-filter: blur(26px);
    z-index: 0;
  }
}
.login_content {
  width: 50%;
  height: 60%;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  background: url(../../assets/img/bg.jpg) no-repeat;
  background-size: cover;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    border-radius: 50%;
    top: -45%;
    left: -138%;
    @include content-background();
    z-index: -1;
  }
  .loginbox {
    box-sizing: border-box;
    padding: 10px;
    width: 40%;
    @include content-background();
    z-index: 10;
    position: relative;
    padding: 30px 20px;
  }
  .login-tips {
    text-align: end;
    font-size: 12px;
    line-height: 28px;
    cursor: pointer;
    color: #1989fa;
  }
}

.loginbox h2 {
  width: 100%;
  height: 50px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  line-height: 50px;
  font-size: 24px;
  @include font_color(null);
  font-weight: normal;
  letter-spacing: 2px;
  img {
    float: left;
    padding-right: 20px;
    vertical-align: middle;
  }
}
.formbox {
  width: 55%;
  margin: 0 auto;
}

.bdbox {
  margin-top: 15px;
}

.login_btn {
  width: 100%;
  border-radius: 4px;
  margin-top: 15px;
  transition: all 500ms;
  @include font_color(null);
  cursor: pointer;
  font-size: 16px;
}
</style>
