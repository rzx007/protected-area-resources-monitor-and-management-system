<template>
  <div class="content">
    <div class="view">
      <div class="primary-border-color">
        <CurdView :tableOptions="tableOptions" :fromOptions="fromOptions"  @params-change="getParams" ref="table" >
          <template v-slot:panel>
            <el-button icon="el-icon-plus" size="mini" type="success" @click="addUser">新增用户</el-button>
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
        </CurdView>
      </div>
    </div>
  </div>
</template>

<script>
const fromOptions = [{ name: 'name', label: '用户名称', type: 'text' }]
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请入密码！'))
      } else {
        if (this.$refs.formRule.fromData.passwordag !== '') {
          this.$refs.formRule.$refs.ruleForm.validateField('passwordag')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      console.log('rule', rule, this.$refs.formRule)
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== this.$refs.formRule.fromData.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
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
          { label: '用户ID', align: 'center', prop: 'userId' },
          { label: '用户名称', align: 'center', prop: 'userName' },
          { label: '用户昵称', align: 'center', prop: 'userAlias' },
          { label: '所属地区', align: 'center', slot: 'region' },
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
      title: '',
      isRole: false,
      detailInfo: {},
      isPassword: false,
      selectedRow: {},
      postParams: { password: '' },
      postUrl: ''
    }
  },
  methods: {
    getParams (data) {
      this.tableOptions.params.consName = data.consName
    },
    updateStatus (row) { },

    addUser () {
      this.postUrl = '/systemManagementService/userService/addUser'
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
