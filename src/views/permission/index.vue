<template>
  <div>
    <div class="tabs-wrap">
      <el-tabs v-model="currentCom" @tab-click="handleClick">
      <el-tab-pane label="权限管理" name="Role"></el-tab-pane>
      <el-tab-pane label="菜单管理" name="Menu"></el-tab-pane>
      <el-tab-pane label="物种管理" name="Species"></el-tab-pane>
    </el-tabs>
    </div>
    <component :is="currentCom"></component>
  </div>
</template>

<script>
import Role from '../role-management/index.vue'
import Menu from '../menu-management/index.vue'
import Species from '../species-management/index.vue'
export default {
  components: { Role, Menu, Species },
  data() {
    return {
      currentCom: 'Role'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss">
  .tabs-wrap {
    box-sizing: border-box;
    padding: 0 18px;
  }
</style>
