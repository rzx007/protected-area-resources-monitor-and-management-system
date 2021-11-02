<template>
  <div class="assign-menu">
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedKeys"
      :props="defaultProps"
      defaultExpandAll
      class="menu-tree"
      ref="tree"
    >
    </el-tree>
    <div class="form_btn">
      <el-button
        type="primary"
        @click="saveConfirm"
        round
        size="small"
        v-throttle
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { getRoleOwnMenu, roleGrantMenu } from '@/api'
export default {
  props: ['info', 'treeData'],
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      ownTreeList: [],
      allMenuList: [],
      checkedKeys: []
    }
  },
  created () {
    this.getRoleOwnMenu()
  },
  methods: {
    saveConfirm () {
      const menuArr = this.$refs.tree.getCheckedNodes(false, true)
      const menuIds = []
      if (menuArr.length > 0) {
        menuArr.forEach(item => {
          menuIds.push(item.id)
        })
      }
      roleGrantMenu({
        systemFunctionIds: menuIds,
        roleId: this.info.roleId
      }).then(res => {
        if (res.code === 1) {
          this.$message.success(res.msg)
          this.$emit('close', true)
        }
      })
    },
    getRoleOwnMenu () {
      getRoleOwnMenu({ roleId: this.info.roleId }).then(res => {
        if (res.code === 1) {
          if ('children' in res.data.roleSystemFunctions) {
            const menuIds = []
            const data = res.data.roleSystemFunctions.children
            const handleMenuIds = function (menu) {
              menu.forEach(item => {
                if (item.children && item.children.length) {
                  handleMenuIds(item.children)
                } else {
                  menuIds.push(item.id)
                }
              })
              return menuIds
            }
            this.checkedKeys = handleMenuIds(data)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.assign-menu {
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: hidden;
  .menu-tree {
    max-height: 50vh;
    margin-bottom: 10px;
    overflow-y: auto;
  }
}
</style>
