<!--
 * @Author: 阮志雄
 * @Date: 2021-10-22 18:39:58
 * @LastEditTime: 2021-11-11 20:18:04
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\role-management\pages\add-role.vue
-->
<template>
  <div class="signup-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="normal" label-width="80px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="ruleForm.roleCode" placeholder="请输入编码名称"></el-input>
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
        ],
        roleNroleCodeame: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1 到 15 个字符', trigger: 'blur' }
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
