<template>
  <div class="sec_content primary-border-color">
    <div class="sec_view">
      <div class="tool_bar">
        <div class="tool_content">
          <div class="tools"></div>
          <div class="btns">
            <el-button type="success" size="mini" @click="changelist(true)" round>新增</el-button>
            <el-button type="warning" size="mini" @click="changelist(false)" round>修改</el-button>
            <!-- <el-button type="danger" size="mini" @click="delelist()" round v-throttle>删除</el-button> -->
          </div>
        </div>
      </div>
      <div class="table_main">
        <el-table
          :data="datalist"
          border
          style="width: 100%"
          size="mini"
          @selection-change="handleSelectionChange"
          height="600"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="userName" label="用户名称" width="180"></el-table-column>
          <el-table-column prop="userId" label="用户ID" width="180"></el-table-column>
          <el-table-column prop="userAlias" label="用户昵称"></el-table-column>
          <el-table-column prop="passwordAES" label="用户密码"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" >
              <!-- <el-button type="primary" size="small" @click="changelist(false)">编辑</el-button> -->
              <el-button type="primary" size="small" @click="changeuserstatus(scope.$index, datalist)">{{scope.row.active?'停用':'启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_pagination">
          <el-pagination
            :small="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCount"
          ></el-pagination>
        </div>
      </div>
      <overlay :close.sync="close" title="用户信息配置">
        <div class="form_content" v-if="overstatu">
          <div class="form_view">
            <el-form :model="formlist" :rules="rules" ref="formlist" label-width="80px">
              <el-form-item label="用户名称" size="mini" prop="userName">
                <el-input v-model="formlist.userName" placeholder="用户名称" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" size="mini" prop="userAlias">
                <el-input v-model="formlist.userAlias" placeholder="用户昵称" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="电话" size="mini" prop="phone">
                <el-input v-model="formlist.phone" placeholder="电话" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" size="mini" prop="email">
                <el-input v-model="formlist.email" placeholder="邮箱" size="mini"></el-input>
              </el-form-item>
              <el-form-item v-show="changestatute" label="用户密码" size="mini" prop="password">
                <el-input v-model="formlist.password" placeholder="用户密码" auto-complete="off" size="mini"></el-input>
              </el-form-item>
              <el-form-item v-show="changestatute" label="确认密码" size="mini" prop="passwordag">
                <el-input v-model="formlist.passwordag" placeholder="确认密码" auto-complete="off" size="mini"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="form_btn">
            <el-button type="primary" @click="submitForm('formlist')" round size="small" v-throttle>确定</el-button>
            <el-button type="info" @click="submitForm('formlist')" round size="small" v-throttle>取消</el-button>
          </div>
        </div>
      </overlay>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10,}$/
        var val = reg.test(value)
        if (!val) {
          callback(new Error('输入9位以上由数字和字母组成的密码'))
        } else {
          if (this.formlist.password !== '') {
            this.$refs.formlist.validateField('passwordag')
          }
          callback()
        }
      }
    }
    var validatePass2 = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10,}$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('输入9位以上由数字和字母组成的密码'))
      } else if (value !== this.formlist.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      close: false,
      currentPage: 1,
      tableData: [],
      input: '',
      pageIndex: 1,
      pageSize: 10,
      pageCount: null,
      overstatu: true,
      datalist: [], // 表格数据源
      multipleSelectionid: [], // 多选
      multipleSelection: [], // 多选
      changestatute: true, // 新增或修正状态项
      formlist: {
        userName: null,
        userAlias: null,
        phone: null,
        email: null,
        password: null,
        passwordag: null
      },
      rules: {
        userName: [
          { required: true, message: '值不能为空', trigger: 'blur' },
          { min: 1, max: 99, message: '', trigger: 'blur' }
        ],
        userAlias: [
          { required: true, message: '值不能为空' },
          { min: 1, max: 99, message: '' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        passwordag: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]

      }
    }
  },
  mounted: function () {
    this.getlist(this.pageIndex, this.pageSize)
  },
  methods: {
    handleSizeChange (val) {
      console.log(val)
      this.pageSize = val
      this.getlist(this.pageIndex, val)
    },
    handleCurrentChange (val) {
      this.getlist(val, this.pageSize)
    },
    // 选择
    handleSelectionChange (val) {
      this.multipleSelectionid = []
      this.multipleSelection = []
      // 处理选择项
      val.forEach(item => {
        this.multipleSelection.push(item)
        this.multipleSelectionid.push(item.userId)
      })
    },
    // 获取列表
    getlist (value, size) {
      this.$store.commit('set_loading', true)
      const obj = {
        pageIndex: value,
        pageSize: size
      }
      this.GlobalService.getuser(obj).then(res => {
        this.datalist = res.data.users
        this.pageCount = res.pageCount
        this.$store.commit('set_loading', false)
      })
    },
    // 新增or修改
    changelist (type) {
      this.overstatu = false
      this.$nextTick(() => {
        this.overstatu = true
      })
      if (type) {
        this.changestatute = type
        this.resetForm(this.formlist)
        this.close = true
      } else if (this.multipleSelectionid.length === 1) {
        this.changestatute = type
        this.close = true
        // + 数据写入
        this.pretreatmentObj(this.formlist, this.multipleSelection[0])
      } else {
        this.$notify({
          title: '警告',
          message: '请选择要修改的项',
          type: 'warning'
        })
      }
    },
    // 修改数据传参预处理
    // objchange 要修改的对象
    // dataobj   数据对象
    pretreatmentObj (objchange, dataobj) {
      const changekey = []
      for (var keyname in objchange) {
        // eslint-disable-next-line no-prototype-builtins
        if (objchange.hasOwnProperty(keyname)) changekey.push(keyname)
      }
      this.resetForm(objchange)
      for (const key in changekey) {
        const name = changekey[key]
        objchange[name] = dataobj[name]
      }
      console.log(dataobj, '修改处理完数据节点')
      console.log(objchange, '修改处理完数据节点')
    },
    // 表单校验
    submitForm (formName) {
      console.log(this.formlist, '新增接口调试')
      if (this.changestatute) {
        this.$refs[formName].validate(valid => {
          if (valid) {
          // 在验证通过时时不返回callback()时 这一步进不来
            delete this.formlist.passwordag
            this.addsubmit()
          } else {
            this.$notify({
              title: '警告',
              message: '提交项有误请检查',
              type: 'warning'
            })
          }
        })
      } else {
        delete this.formlist.password
        delete this.formlist.passwordag
        this.upadtasubmit()
      }
    },
    // 新增列表
    addsubmit () {
      this.close = false
      this.$store.commit('set_loading', true)
      this.GlobalService.adduser(this.formlist).then(res => {
        if (res.data.code === 1) {
          this.getlist(this.pageIndex, this.pageSize)
          this.resetForm(this.formlist)
          this.$store.commit('set_loading', false)
          this.$notify({
            title: '成功',
            message: '成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '失败',
            message: '失败',
            type: 'warning'
          })
        }
      })
    },

    // 修改列表
    upadtasubmit () {
      this.close = false
      this.$store.commit('set_loading', true)
      let dataobj = {}
      dataobj = this.formlist
      dataobj.userId = this.multipleSelection[0].userId
      console.log(dataobj, '修改查看')
      this.GlobalService.updateuser(dataobj).then(res => {
        if (res.data.code === 1) {
          this.getlist(this.pageIndex, this.pageSize)
          this.resetForm(this.formlist)
          this.$store.commit('set_loading', false)
          this.$notify({
            title: '成功',
            message: '成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '失败',
            message: '失败',
            type: 'warning'
          })
        }
      })
    },

    // 清空表单信息按钮
    resetForm (obj) {
      for (const key in obj) {
        obj[key] = null
      }
    },
    // 用户状态
    changeuserstatus (index, rows) {
      const changeobj = {
        userId: rows[index].userId,
        active: !rows[index].active
      }
      this.$confirm('是否确认更改', {
        closeOnClickModal: false
      })
      // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.$store.commit('set_loading', true)
          this.GlobalService.changeuserstatus(changeobj).then(res => {
            this.$store.commit('set_loading', false)
            // console.log(res.data,'查看返回');
            if (res.data.code === 1) {
              this.$store.commit('set_loading', false)
              this.getlist(this.pageIndex, this.pageSize)
            } else {
              this.$confirm(res.data.msg, {
                closeOnClickModal: false
                // eslint-disable-next-line no-unused-vars
              }).then(res => {
                this.$store.commit('set_loading', false)
                this.getlist(this.pageIndex, this.pageSize)
              })
            }
          })
        })
    },
    // 删除列表
    delelist () {
      if (this.multipleSelection.length > 0) {
        console.log(this.multipleSelection, '删除逻辑')
        const obj = {
          userId: this.multipleSelectionid.join(',')
        }

        this.$confirm('是否确认删除', {
          closeOnClickModal: false
        })
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            this.$store.commit('set_loading', true)
            this.GlobalService.deleteuser(obj).then(res => {
              if (res.data.code === 1) {
                this.$store.commit('set_loading', false)
                this.getlist(this.pageIndex, this.pageSize)
              } else {
                this.$confirm(res.data.msg, {
                  closeOnClickModal: false
                // eslint-disable-next-line no-unused-vars
                }).then(res => {
                  this.$store.commit('set_loading', false)
                  this.getlist(this.pageIndex, this.pageSize)
                })
              }
            })
          })
      } else {
        this.$notify({
          title: '警告',
          message: '请选择要删除的项',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang='scss'>
.form_content {
  width: 320px;
  min-width: 400px;
  padding: 12px 8px;
}
.form_btn {
  text-align: center;
}
.form_view {
  box-sizing: border-box;
  padding: 8px;
  .form_item {
    border: 1px solid transparent;
    border-bottom: none;
    padding: 10px 8px;
    &:last-child {
      border-bottom: 1px solid transparent;
    }
    .label {
      display: inline-block;
      font-size: 12px;
      color: #797373;
      margin-right: 8px;
      width: 100px;
    }
    //电表配置ctpt / 样式  @yangchun
    .spancolor {
      font-size: 12px;
      color: #000000;
    }

    .el-input {
      width: 200px;
    }
  }
}
</style>
