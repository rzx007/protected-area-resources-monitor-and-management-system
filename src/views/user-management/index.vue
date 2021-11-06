<template>
  <div class="content">
    <div class="primary-border-color sys-management">
      <curd-view :tableOptions="tableOptions" :fromOptions="fromOptions" @params-change="getParams" ref="table">
        <template v-slot:panel>
          <el-button icon="el-icon-plus" size="mini" type="success" @click="isAdd = true">新增用户</el-button>
          <!-- <el-button icon="el-icon-plus" size="mini" type="primary" @click="isUpdate = true">用户审批</el-button> -->
        </template>
        <template v-slot:operation="{ rowData }">
          <!-- <el-button type="primary" v-if="rowData.row.roleId === 1" title="关联保护区">关联保护区</el-button> -->
          <el-button type="primary" plain @click="editUser(rowData.row)" title="编辑">编辑</el-button>
          <el-button @click="updateStatus(rowData.row)" v-if="rowData.row.state == 1" plain title="停用用户">停用</el-button>
          <el-button type="success" @click="updateStatus(rowData.row)" v-else plain title="启用用户">启用</el-button>
          <el-popconfirm
            icon="el-icon-info"
            iconColor="red"
            title="确定删除该用户吗?"
            @confirm="deleteUser(Props.rowData.row)"
            style="margin: 0 5px;"
          >
            <el-button type="danger" slot="reference" title="删除" plain>删除</el-button>
          </el-popconfirm>
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
    <overlay :close.sync="isArea" title="关联保护区" owidth="380px">
      <areaz v-if="isUpdate"></areaz>
    </overlay>
  </div>
</template>

<script>
const fromOptions = [{ name: 'mobile', label: '账号', type: 'text' }]
import { deleteUser, updateUserStatus } from '@/api'
import signUp from './pages/sign-up.vue'
import areaz from './pages/area.vue'
import UpdateUser from './pages/update-user.vue'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      fromItem: [],
      tableOptions: {
        limit: 20,
        showPanelTool: true,
        defaultPanel: [],
        height: '70vh',
        params: { reserveId: getToken('reserveId') },
        dataUrl: '/reserve/appUser/list',
        responseName: 'list',
        columns: [
          { type: 'index', label: '序号', align: 'center', width: 80 },
          { label: '账号', align: 'center', prop: 'mobile' },
          { label: '用户名称', align: 'center', prop: 'username' },
          { label: '角色权限', align: 'center', prop: 'roleName' },
          { label: '注册时间', align: 'center', prop: 'createTime' },
          {
            label: '状态',
            align: 'center',
            prop: 'state',
            enum: [
              { value: '启用中', id: 1 },
              { value: '已停用', id: 0, type: 'danger' }
            ]
          },
          { label: '操作', align: 'end', slot: 'operation', width: 320 }
        ]
      },
      fromOptions,
      isAdd: false,
      isUpdate: false,
      isArea: false,
      userInfo: {}
    }
  },
  components: { signUp, UpdateUser, areaz },
  methods: {
    getParams(data) {
      this.tableOptions.params.consName = data.consName
    },
    updateStatus(row) {
      updateUserStatus({ userIds: row.userId, state: row.state === 1 ? 2 : 1 }).then(res => {
        res.code === 0 && this.$refs.table.refresh()
      })
    },
    editUser(row) {
      this.userInfo = row
      this.isUpdate = true
      console.log(row)
    },
    deleteUser(row) {
      deleteUser({ userId: row.userId }).then(res => {
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
