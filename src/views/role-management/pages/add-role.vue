<template>
  <div class="signup-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="normal" label-width="80px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('ruleForm')" class="signup_btn">创建角色</el-button>
  </div>
</template>

<script>
import { addRole } from '@/api'
import md5 from 'md5-js'
export default {
  data() {
    return {
      ruleForm: {
        roleName: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addRole(this.ruleForm).then(res => {
            this.$emit('success')
            this.$message.success('新增角色成功!')
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
