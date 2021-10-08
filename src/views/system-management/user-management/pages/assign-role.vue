<template>
  <div class="assign-role">
    <el-transfer v-model="roleId" :data="data" :titles="['未分配', '已分配']"></el-transfer>
    <div class="form_btn" style="margin-top: 10px;">
      <el-button type="primary" @click="submitForm" round size="small" v-throttle>确定</el-button>
      <el-button type="info" @click="resetForm" round size="small" v-throttle>重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roleId: [],
      data: [
        { label: '管理员', key: 1 },
        { label: '地市用户', key: 2 },
        { label: '测试用户', key: 3 },
        { label: '厂站管理员', key: 4 }
      ]
    }
  },
  methods: {
    submitForm () {},
    resetForm () {}
  }
}
</script>

<style>
.assign-role {
  padding: 20px 0;
}
</style>
