<template>
  <div class="signup-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="normal" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入用手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwords">
        <el-input type="passwords" v-model="ruleForm.passwords" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="passwords" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="ruleForm.roleId" filterable>
          <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('ruleForm')" class="signup_btn">更新</el-button>
  </div>
</template>

<script>
import { updateUser } from '@/api'
import md5 from 'md5-js'
export default {
  props: {
    info: {
      type: Object
    }
  },
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
        roleId: null
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        passwords: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      },
      isValidPhone: false, // 手机号是否正确
      roleOptions: []
    }
  },
  created() {
    this.ruleForm = Object.assign({}, this.ruleForm, JSON.parse(JSON.stringify(this.info)))
    console.log(this.ruleForm)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.ruleForm['checkPass']
          const { username, mobile, passwords, roleId, userId } = this.ruleForm
          const params = { username, mobile, roleId, userId, passwords: md5(passwords) }
          updateUser(params).then(res => {
            this.$emit('success')
            this.$message.success('更新用户成功!')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    // @include font_color(null);
    cursor: pointer;
    font-size: 16px;
  }
}
</style>
