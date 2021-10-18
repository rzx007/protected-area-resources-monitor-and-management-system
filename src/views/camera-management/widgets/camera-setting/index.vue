<!--
 * @Author: 阮志雄
 * @Date: 2021-10-15 11:36:17
 * @LastEditTime: 2021-10-18 09:59:25
 * @LastEditors: 阮志雄
 * @Description: 相机任务下发(相机设置)
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\views\camera-management\widgets\camera-setting\index.vue
-->
<template>
  <div class="camera-sub-block">
    <back-bar @back="goBack" title="配置下发"></back-bar>
    <div class="anas-block">
      <p class="sub-title">
        设备编号：<span>{{ info.id }}</span>
      </p>
      <p class="sub-title">
        布设时间：<span>{{ info.inUseTime }}</span>
      </p>
    </div>
    <div class="config-block">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="图片大小">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="5M" value="1"></el-option>
            <el-option label="10M" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频清晰度">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="720p" value="1"></el-option>
            <el-option label="1089p" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连拍张数">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拍照间隔">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作方式">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="视频" name="type"></el-checkbox>
            <el-checkbox label="照片" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="录像时长">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="附件大小">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PIR灵敏度">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PIR触发间隔">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送方式">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送模式">
          <el-select v-model="form.size" placeholder="请选择活动区域">
            <el-option label="10" value="1"></el-option>
            <el-option label="20" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="GPS开关">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="循环存储">
          <el-radio-group v-model="form.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作时间">
          <el-date-picker
            v-model="value1"
            style="width:280px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作时段">
          <el-time-picker
            is-range
            style="width:280px"
            v-model="value1"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import backBar from '../../components/backBar.vue'
export default {
  components: { backBar },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  props: {
    info: {
      type: Object,
      default: function() {
        return { id: '' }
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('click-back')
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss"></style>
