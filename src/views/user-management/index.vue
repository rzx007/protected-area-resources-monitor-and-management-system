<template>
  <div class="content">
     <div class="primary-border-color">
        <curd-view :tableOptions="tableOptions" :fromOptions="fromOptions"  @params-change="getParams" ref="table" >
          <template v-slot:panel>
            <el-button icon="el-icon-plus" size="mini" type="success" @click="isShow=true">新增用户</el-button>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="isNew=true">用户审批</el-button>
          </template>
          <template v-slot:operation="Props">
            <el-button type="primary" @click="editUser(Props.rowData.row)"
            icon="el-icon-edit" circle title="编辑"></el-button>
            <el-button type="warning" @click="updateStatus(Props.rowData.row)"
              v-if="Props.rowData.row.active"
              icon="el-icon-video-pause" circle title="停用用户"></el-button>
            <el-button type="success" @click="updateStatus(Props.rowData.row)"
              v-else icon="el-icon-video-play" circle title="启用用户"></el-button>
            <el-popconfirm
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该用户吗?"
              @confirm="deleteStatus(Props.rowData.row)"
              style="margin: 0 5px;"
            >
              <el-button type="danger" icon="el-icon-delete" slot="reference" title="删除" circle></el-button>
            </el-popconfirm>
          </template>
          <template v-slot:region="Props">
            <p>{{ Props.rowData.row.divisionCodeName ? Props.rowData.row.divisionCodeName : '所有地区' }}</p>
          </template>
        </curd-view>
      </div>
    <overlay :close.sync='isShow' title="新增用户" owidth="380px">
      <sign-up></sign-up>
    </overlay>
    <overlay :close.sync='isNew' title="用户审批" owidth="80vw">
    </overlay>
  </div>
</template>

<script>
const fromOptions = [{ name: 'name', label: '用户名称', type: 'text' }]
import signUp from './pages/sign-up.vue'
export default {
  data () {
    return {
      fromItem: [],
      tableOptions: {
        pageSize: 20,
        showPanelTool: true,
        defaultPanel: [],
        params: {},
        dataUrl: '/systemManagementService/userService/getUserListPage',
        responseName: 'users',
        columns: [
          { type: 'index', label: '序号', align: 'center', width: 80 },
          { label: '注册时间', align: 'center', prop: 'userId' },
          { label: '账号', align: 'center', prop: 'userName' },
          { label: '备注', align: 'center', prop: 'userAlias' },
          { label: '角色权限', align: 'center', prop: 'userAlias' },
          {
            label: '状态',
            align: 'center',
            prop: 'active',
            enum: [
              { value: '启用', id: true },
              { value: '停用', id: false, type: 'danger' }
            ]
          },
          { label: '操作', align: 'center', slot: 'operation' }
        ]
      },
      fromOptions,
      isShow: false,
      isNew: false,
      title: '',
    }
  },
  components: { signUp },
  methods: {
    getParams (data) {
      this.tableOptions.params.consName = data.consName
    },
    updateStatus (row) { },

    addUser () {
      
    },
    editUser (row) {
      console.log(row);
    
    },
    deleteStatus (row) { }
  },
}
</script>
<style>
</style>
