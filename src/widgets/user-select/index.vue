<template>
  <span>
    <el-select v-if="type === 'sp'" v-model="userId" placeholder="物种类别" @change="getUserId">
      <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id"> </el-option>
    </el-select>
    <el-select v-else v-model="userId" placeholder="部署人员" @change="getUserId">
      <el-option v-for="item in options" :key="item.userId" :label="item.username" :value="item.userId"> </el-option>
    </el-select>
  </span>
</template>

<script>
import { listUser, speciesList } from '@/api'
export default {
  data() {
    return {
      userId: null,
      options: []
    }
  },
  watch: {
    id: function (val) {
      this.userId = val
    }
  },
  props: ['id', 'type'],
  created() {
    if (this.type === 'sp') {
      this.speciesList()
    } else {
      this.getUserList()
    }
  },
  methods: {
    getUserList() {
      listUser().then((res) => {
        if (res.code === 0) {
          this.options = res.data.list
        }
      })
    },
    speciesList() {
      speciesList({limit:100, start:0}).then((res) => {
        if (res.code === 0) {
          this.options = res.data.list
        }
      })
    },
    getUserId(id) {
      this.$emit('input', id)
    }
  }
}
</script>
<style lang="scss"></style>
