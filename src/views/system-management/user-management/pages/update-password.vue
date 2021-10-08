<!--
 * @Author: rzx007
 * @Date: 2021-03-08 12:49:23
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-09 11:35:54
 * @FilePath: \vue-tgp-with-elementui\src\views\system-management\user-management\pages\update-password.vue
 * @Description: Do not edit
-->
<template>
  <div class="user-info">
    <div class="form-view">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
      >
        <el-form-item label="原密码" size="mini" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="原密码"
            auto-complete="off"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" size="mini" prop="passwordag">
          <el-input
            v-model="ruleForm.passwordag"
            placeholder="新密码"
            auto-complete="off"
            size="mini"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="form_btn">
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        round
        size="small"
        v-throttle
        >确定</el-button
      >
      <el-button
        type="info"
        @click="resetForm('ruleForm')"
        round
        size="small"
        v-throttle
        >重置</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data () {
    return {
      ruleForm: {
        password: '',
        passwordag: ''
      },
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        passwordag: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // this.$emit("close");
    },
    confirmSubmit () { }
  }
}
</script>

<style lang="scss">
.common-width {
  width: 180px;
}
.user-info {
  padding: 20px 0;
}
.el-select-dropdown {
  z-index: 2010 !important;
}
</style>
