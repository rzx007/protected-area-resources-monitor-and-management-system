<template>
  <div class="permission-menu">
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="menuId"
      :default-checked-keys="checkedKeys"
      :props="defaultProps"
      defaultExpandAll
      class="menu-tree"
      ref="tree"
    >
    </el-tree>
    <div class="form_btn">
      <el-button type="primary" @click="saveConfirm" round size="small" v-throttle>保存</el-button>
    </div>
  </div>
</template>

<script>
import { getRoleOwnMenu, getMenuTree, roleGrantMenu } from '@/api'
export default {
  props: ['info'],
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      ownTreeList: [],
      allMenuList: [],
      checkedKeys: [],
      treeData: []
    }
  },
  async created() {
    await this.getMenuTree()
    await this.getRoleOwnMenu()
  },
  methods: {
    saveConfirm() {
      const menuArr = this.$refs.tree.getCheckedNodes(false, true)
      const menuIds = []
      if (menuArr.length > 0) {
        menuArr.forEach(item => {
          menuIds.push(item.menuId)
        })
      }
      roleGrantMenu({
        menuIds: menuIds.join(','),
        roleId: this.info.roleId
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.$emit('close', true)
        }
      })
    },
    async getMenuTree() {
      getMenuTree({ start: 0, limit: 100 }).then(res => {
        this.treeData = res.data.list.filter(item => {
          return item.linkUrl !== '/permission'
        })
        return  res.data.list
      })
    },
    async getRoleOwnMenu() {
      getRoleOwnMenu({ roleId: this.info.roleId }).then(res => {
        if (res.code === 0) {
          const menuIds = []
          const data = res.data.list
          const handleMenuIds = function(menu) {
            menu.forEach(item => {
              if (item.children && item.children.length) {
                handleMenuIds(item.children)
              } else {
                menuIds.push(item.menuId)
              }
            })
            return menuIds
          }
          this.checkedKeys = handleMenuIds(data)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.permission-menu {
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: hidden;
  .menu-tree {
    min-height: 30vh;
    max-height: 50vh;
    margin-bottom: 10px;
    overflow-y: auto;
  }
}
</style>
