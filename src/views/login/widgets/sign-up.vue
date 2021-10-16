<template>
  <div class="signup-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="normal" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入用手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="ruleForm.code" placeholder="请输入验证码">
          <template slot="append">
            <span v-show="!isTry" class="a" @click="getCode">获取验证码</span>
            <span v-show="isTry">{{ count }}秒重新获取验证码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwords">
        <el-input type="passwords" v-model="ruleForm.passwords" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="passwords" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:0"> </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('ruleForm')" class="signup_btn">立即注册</el-button>
  </div>
</template>

<script>
import { loginByMobile, getCaptcha, checkCaptcha } from '@/api'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.passwords) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      const mobileReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
      if (value === '') {
        this.isValidPhone = false
        callback(new Error('手机号码不能为空'))
      } else if (!mobileReg.test(value)) {
        this.isValidPhone = false
        callback(new Error('请输入正确的手机号码'))
      } else {
        this.isValidPhone = true
        callback()
      }
    }
    return {
      ruleForm: {
        username: '',
        passwords: '',
        checkPass: '',
        mobile: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        code: [{ required: true, min: 4, max: 4, trigger: 'blur', message: '验证码长度为4' }],
        passwords: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      },
      isValidPhone: false, // 手机号是否正确
      isTry: false, // 60秒 是否重新获取验证码
      count: 60,
      timer: null
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.checkCode().then(vaild => {
            if (vaild) {
              delete this.ruleForm['checkPass']
              loginByMobile(this.ruleForm).then(res => {
                this.$message.success('注册成功, 等待管理员审核!')
              })
            } else { this.$message.warning('验证码不匹配')}
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCode() {
      //获取验证码
      if (this.isValidPhone) {
        this.isTry = true
        this.subtracCount()
        getCaptcha({ mobile: this.ruleForm.mobile, type: 0 })
      }
    },
    checkCode() {
      return checkCaptcha({ mobile: this.ruleForm.mobile, code: this.ruleForm.code })
        .then(res => true)
        .catch(err =>false)
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
  }
}
</script>
<style lang="scss">
.signup-main {
  box-sizing: border-box;
  padding: 24px;
  width: 100%;
  .signup_btn {
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    @include font_color(null);
    cursor: pointer;
    font-size: 16px;
  }
}
</style>
