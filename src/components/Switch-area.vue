<template>
  <div class="switcharea">
    <span>当前位置:</span>
    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
      <div class="user-block">
        <span class="el-dropdown-link">
          当前位置
          <i class="el-icon-caret-bottom"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-mouse" command="updataPassword">密码修改</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command="loginout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.switcharea {
  width: 100%;
  text-align: end;
  box-sizing: border-box;
  padding-right: 30px;
}
</style>
