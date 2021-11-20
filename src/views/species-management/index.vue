<template>
  <div class="content">
    <div class="primary-border-color sys-management">
      <curd-view :tableOptions="tableOptions" :fromOptions="fromOptions" ref="table">
        <template v-slot:panel>
          <el-button icon="el-icon-plus" size="mini" type="success" @click="isAdd = true">新增物种</el-button>
        </template>
        <template v-slot:operation="{ rowData }">
          <el-button type="primary" plain @click="editUser(rowData.row)" title="编辑">编辑</el-button>
          <el-popconfirm
            icon="el-icon-info"
            iconColor="red"
            title="确定删除该用户吗?"
            @confirm="deleteUser(Props.rowData.row)"
            style="margin: 0 5px"
          >
            <el-button type="danger" slot="reference" title="删除" plain>删除</el-button>
          </el-popconfirm>
        </template>
        <template v-slot:region="Props">
          <p>{{ Props.rowData.row.divisionCodeName ? Props.rowData.row.divisionCodeName : '所有地区' }}</p>
        </template>
      </curd-view>
    </div>
    <overlay :close.sync="isAdd" title="新增物种" owidth="380px">
      <sign-up
        v-if="isAdd"
        @success="
          $refs.table.refresh()
          isAdd = false
        "
      ></sign-up>
    </overlay>
    <overlay :close.sync="isUpdate" title="更新物种" owidth="380px">
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
const fromOptions = [{ name: 'title', label: '物种名称', type: 'text' }]
import { speciesDelete } from '@/api'
import signUp from './pages/sign-up.vue'
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
        params: {},
        dataUrl: '/reserve/appSpecies/list',
        responseName: 'list',
        columns: [
          { type: 'index', label: '序号', align: 'center', width: 80 },
          { label: '物种名称', align: 'center', prop: 'title' },
          { label: '编号', align: 'center', prop: 'id' },
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
  components: { signUp, UpdateUser },
  methods: {
    editUser(row) {
      this.userInfo = row
      this.isUpdate = true
      console.log(row)
    },
    deleteUser(row) {
      speciesDelete({ speciesId: row.id }).then((res) => {
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
