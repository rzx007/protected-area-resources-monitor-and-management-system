<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
        <div style="margin-bottom: 14px">
          <introduce :remark='remark'></introduce>
        </div>
        <div style="margin-bottom: 14px">
          <weather></weather>
        </div>
        <div style="margin-bottom: 14px">
          <device></device>
        </div>
      </el-col>
      <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
        <div class="grid-content bg-purple-light">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14">
              <div style="margin-bottom: 14px">
                <map-item :path="polygonPath" :center="center"></map-item>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10">
              <div style="margin-bottom: 14px">
                <lastest-gallery></lastest-gallery>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
              ><div class="grid-content bg-purple"><animals-info></animals-info></div
            ></el-col>
            <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"
              ><div class="grid-content bg-purple-light">
                <animals-hotpoint></animals-hotpoint></div
            ></el-col> -->
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { findAreaByDoMain } from '@/api'
import { getToken } from '@/utils/auth'
import weather from './widgets/weather.vue'
import mapItem from './widgets/map.vue'
import lastestGallery from './widgets/lastest-gallery.vue'
import introduce from './widgets/introduce.vue'
import device from './widgets/device.vue'
import animalsInfo from './widgets/animals-info.vue'
import animalsHotpoint from './widgets/animals-hotpoint.vue'
import animalsAnalysis from './widgets/animals-analysis.vue'
export default {
  components: { weather, mapItem, lastestGallery, introduce, device, animalsInfo, animalsHotpoint, animalsAnalysis },
  data() {
    return {
      remark:'',
      polygonPath: [],
      center: []
    }
  },
  created() {
    this.getMapData()
  },
  methods: {
    getMapData() {
      findAreaByDoMain({ domainName: getToken('domainName') }).then((res) => {
        this.remark = res.data.remark
        this.polygonPath = res.data.lngLat ? JSON.parse(res.data.lngLat) : []
        this.center = JSON.parse(res.data.centerLnglat)
      })
    }
  }
}
</script>
<style lang="scss"></style>
