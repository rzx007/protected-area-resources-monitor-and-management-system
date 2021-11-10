<template>
  <el-select v-model="userId" placeholder="部署人员" @change="getUserId">
    <el-option v-for="item in options" :key="item.userId" :label="item.username" :value="item.userId"> </el-option>
  </el-select>
</template>

<script>
import { listUser } from '@/api'
export default {
  data() {
    return {
      userId: null,
      options: []
    }
  },
  props: ['userId'],
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      listUser().then((res) => {
        if (res.code === 0) {
          this.options = res.data.list
        }
      })
    },
    getUserId(id) {
      this.$emit('change', id)
    }
  }
}
</script>
<style lang="scss"></style>
