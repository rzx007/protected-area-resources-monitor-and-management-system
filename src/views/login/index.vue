<template>
  <div class="login_main">
    <div class="login_content">
      <div class="loginbox">
        <h2 style="text-align: center">{{ slogan }}</h2>
        <div class="formbox">
          <div class="sub-title">账号登录</div>
          <div class="bdbox">
            <el-input
              placeholder="请输入11位手机号码"
              prefix-icon="el-icon-user"
              size="default"
              autocomplete="off"
              v-model="mobile"
            ></el-input>
            <span v-show="!isValidPhone" class="color_warning" style="font-size: 12px">*请输入有效号码</span>
          </div>
          <div class="bdbox" v-if="!loginByPwd">
            <el-input v-model="code" size="default" placeholder="请输入6位验证码" prefix-icon="el-icon-c-scale-to-original">
              <template slot="append">
                <span v-show="!isTry" class="a" @click="getCode">获取验证码</span>
                <span v-show="isTry">{{ count }}秒重新获取验证码</span>
              </template>
            </el-input>
          </div>
          <div class="bdbox" v-else>
            <el-input v-model="passwords" size="default" placeholder="请输入密码" type="password" prefix-icon="el-icon-c-scale-to-original">
            </el-input>
          </div>
          <el-button type="primary" size="default" v-debounce="loginHandler" :loading="isLoging" class="login_btn">登录</el-button>
          <p class="login-tips">
            <span @click="loginByPwd = !loginByPwd">{{ loginByPwd ? '短信登录' : '密码登录' }}</span>
            <span v-if="!showSingup" @click="close = true">没有账号? 立即注册</span>
          </p>
        </div>
      </div>
    </div>
    <overlay :close.sync="close" title="账号注册" owidth="380px">
      <sign-up v-if="close" @success="close = false"></sign-up>
    </overlay>
    <div class="load-container" v-if="!isAdmin">
      <div class="loader-bounce"></div>
    </div>
  </div>
</template>
<script>
const { VUE_APP_ADMIN } = process.env
import { setToken, getToken, isAdmin } from '@/utils/auth'
import { loginByMobile, loginByPwd, getCaptcha, findAreaByDoMain } from '@/api'
import { title } from '@/settings'
import signUp from './widgets/sign-up.vue'
import md5 from 'md5-js'
export default {
  data() {
    return {
      showSingup: isAdmin(),
      isAdmin: isAdmin(),
      slogan: title,
      mobile: '',
      passwords: '',
      code: '',
      isLoging: false,
      close: false,
      isTry: false, // 60秒 是否重新获取验证码
      count: 60,
      timer: null,
      loginByPwd: true,
      domainName: window.location.hostname + window.location.pathname
    }
  },
  components: { signUp },
  created() {
    this.getAreaByDomain().then((result) => {
      this.slogan = result.title + '管理系统'
      setToken('slogan', this.slogan)
      setToken('reserveId', result.reserveId)
      this.isAdmin = true
    })
  },
  methods: {
    async loginHandler() {
      this.isLoging = true
      if (isAdmin()) {
        if (this.mobile === '10000000000') {
          console.log('it`s superAdmin')
          const data = await this.loginajax()
          this.isLoging = false
          setToken('token', data.token)
          setToken('userName', data.username)
          setToken('userId', data.userId)
          this.$router.replace('/area-management')
        } else {
          this.$message.error('非管理员账号不能登录')
        }
      } else {
        console.log('it`s areaUser or superAdmin')
        const data = await this.loginajax()
        const { reserveId, domainName } = await this.getAreaByDomain()
        const routes = await this.getUserMenu({ reserveId, userId: data.userId })
        this.isLoging = false
        if (routes.length < 1) {
          this.isLoging = false
          this.$message.warning('该用户未分配任何菜单,请联系站长!')
        } else {
          setToken('roleCode', data.roleCode)
          setToken('token', data.token)
          setToken('domainName', domainName)
          setToken('userName', data.username)
          setToken('userId', data.userId)
          this.$router.replace('/index')
        }
      }
    },
    async loginajax() {
      const params = { mobile: this.mobile, reserveId: getToken('reserveId') }
      this.loginByPwd ? (params.passwords = md5(this.passwords)) : (params.code = this.code)
      const login = this.loginByPwd ? loginByPwd(params) : loginByMobile(params)
      return login
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          this.isLoging = false
        })
    },
    async getAreaByDomain() {
      return findAreaByDoMain({ domainName: this.domainName })
        .then((res) => {
          setToken('center', res.data.centerLnglat)
          return res.data
        })
        .catch((error) => {
          this.isLoging = false
        })
    },
    async getUserMenu(params) {
      return this.$store.dispatch('GetUserMenu', params).then((routes) => {
        console.log(routes)
        return routes
      })
    },
    enterLoginajax(e) {
      // 检测密码是否为空之后进行enter事件的监控
      if (e.keyCode === 13) {
        if (this.mobile !== '' && this.passwords !== '') {
          this.loginajax()
        }
      }
    },
    getCode() {
      if (this.isValidPhone && this.mobile) {
        this.isTry = true
        this.subtracCount()
        getCaptcha({ mobile: this.mobile, type: 0 })
      }
    },
    subtracCount() {
      // 获取验证码倒计时
      this.timer = setInterval(() => {
        this.count--
        if (this.count <= 0) {
          this.isTry = false
          clearInterval(this.timer)
          return
        }
      }, 1000)
    }
  },
  computed: {
    isValidPhone() {
      const phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
      return !phoneReg.test(this.mobile) && this.mobile ? false : true
    }
  }
}
// https://www.showdoc.com.cn/1647563843342425/7782842647927484
</script>
<style lang="scss">
.login_main {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  min-height: 700px;
  @include base-background();
  background: url(../../assets/img/bg.jpg) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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
  .login_content {
    width: 50%;
    height: 64%;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    background: url(../../assets/img/bg.jpg) no-repeat;
    backdrop-filter: blur(26px);
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
      top: -47%;
      left: -137%;
      @include content-background();
      z-index: -1;
    }
    .loginbox {
      box-sizing: border-box;
      padding: 10px;
      width: 47%;
      @include content-background();
      z-index: 10;
      position: relative;
      padding: 50px 20px;
      h2 {
        width: 100%;
        // height: 50px;
        margin-bottom: 12px;
        // line-height: 50px;
        font-size: 27px;
        @include font_color(null);
        font-weight: bolder;
        letter-spacing: 2px;
      }
      .sub-title {
        @include font_color(null);
        text-align: center;
        font-size: 20px;
      }
      .formbox {
        width: 100%;
        margin-top: 30px;
        .bdbox {
          margin-top: 15px;
        }
      }
    }
    .login-tips {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 28px;
      cursor: pointer;
      color: #1989fa;
    }
  }
  .login_btn {
    width: 100%;
    border-radius: 4px;
    margin-top: 15px;
    transition: all 500ms;
    // @include font_color(null);
    cursor: pointer;
    font-size: 16px;
  }
}
</style>
