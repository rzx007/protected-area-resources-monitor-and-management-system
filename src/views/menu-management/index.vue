<template>
  <div class="content">
    <div class="primary-border-color sys-management">
      <CurdView :tableOptions="tableOptions" :fromOptions="fromOptions" @getTableData="getTableData" ref="table">
        <template v-slot:panel>
          <el-button icon="el-icon-plus" size="mini" type="success" @click="appendMenu">新增</el-button>
        </template>
        <template v-slot:menuIcon="{ rowData }">
          <p style="font-size:18px">
            <i :class="rowData.row.attributes.menuIcon"></i>
          </p>
        </template>
        <template v-slot:actions="{ rowData }">
          <el-button type="primary" icon="el-icon-edit" @click="editMenu(rowData.row)" circle title="编辑"> </el-button>
          <el-popconfirm title="是否将停用此菜单？" @confirm="deleteMenu(rowData.row)">
            <el-button type="danger" icon="el-icon-delete" circle title="删除" slot="reference"></el-button>
          </el-popconfirm>
        </template>
      </CurdView>
    </div>
    <overlay :close.sync="close" size="mini" :title="tips + '菜单'">
      <FromData
        :fromItem="fromItem"
        @from-change="fromChange"
        @submit="closeDialog"
        :postUrl="postUrl"
        :postParams="postParams"
        :rowData="editRow"
        v-if="close"
      >
        <template v-slot:icons>
          <!-- <i class="el-icon-s-grid"></i> -->
          <el-popover placement="right" width="310" trigger="click" class="pointer">
            <iocns v-model="editRow.menuIcon"></iocns>
            <i slot="reference" class="el-icon-s-grid "></i>
          </el-popover> </template
      ></FromData>
    </overlay>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import iocns from './widgets/iocns.vue'
import { delSystemFunction } from '@/api'
const tableOptions = {
  stripe: false,
  pageSize: 20,
  showPanelTool: true,
  defaultPanel: [],
  params: { }, // params的改变都会触发，表格的重新查询
  dataUrl: '/reserve/appMenu/list',
  responseName: 'list',
  columns: [
    { label: '菜单名称', prop: 'menuName', align: 'start' },
    { label: '菜单图标', prop: 'linkUrl', align: 'center' },
    { label: '菜单地址', prop: 'linkUrl', align: 'center' },
    { label: '组件地址', prop: 'componentPath', align: 'center' },
    { label: '操作', slot: 'actions', align: 'center', width: '130px' }
  ]
}
export default {
  data() {
    return {
      tips: '新增',
      tableOptions,
      fromOptions: [{ name: 'menuName', label: '菜单名称', type: 'text' }],
      close: false,
      selectedRow: {},
      aclnId: '',
      date: '',
      fromItem: [
        {
          name: 'menuName',
          label: '菜单名称',
          type: 'text',
          width: '220',
          rules: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
        },
        { name: 'parentId', label: '上级菜单', type: 'select', width: '220', default:-1, options: [{ label: '菜单', value: -1 }], invaild: true },
        { name: 'linkUrl', label: '菜单地址', type: 'text', width: '220' },
        { name: 'componentPath', label: '组件地址', type: 'text', width: '220', disabled: true, invaild: true },
        {
          name: 'menuIcon',
          label: '菜单图标',
          type: 'text',
          default: 'el-icon-star-on',
          width: '220',
          append: 'icons',
          disabled: true,
          invaild: true
        }
      ],
      postUrl: '',
      postParams: {},
      editRow: {},
      parentMenu: []
    }
  },
  components: { iocns },
  methods: {
    closeDialog(data, res) {
      this.$refs.table.refresh()
      this.$emit('refreshHeader')
      this.$store.dispatch('GetUserMenu').then(routes => {
        this.$message.success('菜单更新成功！')
        bus.$emit('refreshTags')
      })
      this.close = false
    },
    editMenu(row) {
      console.log('edit', row)
      this.close = true
      this.tips = '编辑'
      this.menuInfo = row
      this.editRow = {
        menuName: row.menuName,
        // sysfuncCode: row.code,
        linkUrl: row.linkUrl,
        componentPath: row.componentPath,
        menuIcon: row.menuIcon,
        parentId: Number(row.parentId)
        // ...row
      }
      this.postUrl = '/reserve/appMenu/update'
      this.postParams = {
        menuId: row.menuId
      }
    },
    // 添加菜单
    appendMenu(data) {
      this.close = true
      this.tips = '新增'
      this.menuInfo = {}
      this.postUrl = '/reserve/appMenu/add'
      this.postParams.menuId = ''
      this.editRow = {}
    },
    getTableData(tableData) {},
    fromChange(params) {
      console.log(params)
      this.editRow.menuIcon = params.menuIcon
    },
    deleteMenu(row) {
      delSystemFunction({ menuId: row.menuId }).then(res => {
        if (res.code == 0) {
          this.$message({ type: 'success', message: res.msg })
          this.$refs.table.query()
        }
      })
    }
  }
}
</script>
<style lang="scss"></style>
