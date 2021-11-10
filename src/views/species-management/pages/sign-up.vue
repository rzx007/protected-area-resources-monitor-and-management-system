<template>
  <div class="signup-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="normal" label-width="80px" class="demo-ruleForm">
      <el-form-item label="物种名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('ruleForm')" class="signup_btn">添加物种</el-button>
  </div>
</template>

<script>
import { speciesAdd } from '@/api'
import md5 from 'md5-js'
export default {
  data() {
    return {
      ruleForm: {
        title: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入物种名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          speciesAdd(this.ruleForm).then(res => {
            this.$emit('success')
            this.$message.success('新增物种成功!')
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
