<!--
 * @Author: 阮志雄
 * @Date: 2021-10-08 17:30:04
 * @LastEditTime: 2021-10-22 19:02:25
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\role-management\index.vue
-->
<template>
  <div class="content">
    <div class="primary-border-color sys-management">
      <curd-view :tableOptions="tableOptions" :fromOptions="fromOptions" @params-change="getParams" ref="table">
        <template v-slot:panel>
          <el-button icon="el-icon-plus" size="mini" type="success" @click="isAdd = true">新增角色</el-button>
          <!-- <el-button icon="el-icon-plus" size="mini" type="primary" @click="isUpdate = true">用户审批</el-button> -->
        </template>
        <template v-slot:operation="Props">
          <el-button type="primary" plain @click="editUser(Props.rowData.row)" title="编辑">编辑</el-button>
          <el-popconfirm
            icon="el-icon-info"
            iconColor="red"
            title="确定删除该用户吗?"
            @confirm="deleteRole(Props.rowData.row)"
            style="margin: 0 5px;"
          >
            <el-button type="danger" slot="reference" title="删除" plain>删除</el-button>
          </el-popconfirm>
          <el-button type="success" plain title="分配权限">分配权限</el-button>
        </template>
        <template v-slot:region="Props">
          <p>{{ Props.rowData.row.divisionCodeName ? Props.rowData.row.divisionCodeName : '所有地区' }}</p>
        </template>
      </curd-view>
    </div>
    <overlay :close.sync="isAdd" title="新增用户" owidth="380px">
      <sign-up
        v-if="isAdd"
        @success="
          $refs.table.refresh()
          isAdd = false
        "
      ></sign-up>
    </overlay>
    <overlay :close.sync="isUpdate" title="更新用户" owidth="380px">
      <update-user
        v-if="isUpdate"
        :info="userInfo"
        @success="
          $refs.table.refresh()
          isUpdate = false
        "
      ></update-user>
    </overlay>
  </div>
</template>

<script>
const fromOptions = [{ name: 'mobile', label: '账号', type: 'text' }]
import { deleteRole } from '@/api'
import signUp from './pages/add-role.vue'
import UpdateUser from './pages/update-role.vue'
export default {
  data() {
    return {
      fromItem: [],
      tableOptions: {
        limit: 20,
        showPanelTool: true,
        defaultPanel: [],
        height: '70vh',
        params: {},
        dataUrl: '/reserve/appRole/list',
        responseName: 'list',
        columns: [
          { type: 'index', label: '序号', align: 'center', width: 80 },
          { label: '角色名称', align: 'center', prop: 'roleName' },
          { label: '角色编号', align: 'center', prop: 'roleId' },
          { label: '操作', align: 'center', slot: 'operation' }
        ]
      },
      fromOptions,
      isAdd: false,
      isUpdate: false,
      userInfo: {}
    }
  },
  components: { signUp, UpdateUser },
  methods: {
    getParams(data) {
      this.tableOptions.params.consName = data.consName
    },

    editUser(row) {
      this.userInfo = row
      this.isUpdate = true
      console.log(row)
    },
    deleteRole(row) {
      deleteRole({ roleId: row.roleId }).then(res => {
        res.code === 0 && this.$refs.table.refresh()
      })
    }
  }
}
</script>
<style lang="scss">
.sys-management {
  height: 100%;
  border-radius: 12px;
  @include content-background();
}
</style>
