<template>
  <div class="layout">
    <v-slidebar v-if="mode" :mode="mode"></v-slidebar>
    <div class="right_container">
      <el-header>
        <v-header :mode="mode">
          <!-- <switch-area></switch-area> -->
        </v-header>
      </el-header>
      <div class="dashborad">
        <!-- <v-tags class="tag-nav-wrapper" v-if="tagsBar && $route.path != '/home'"></v-tags> -->
        <div class="content-wrapper-layout">
          <!-- <Bread-nav v-if="$route.path != '/home'"></Bread-nav> -->
          <div class="content-main">
            <template>
              <keep-alive v-if="isShow">
                <router-view v-if="$route.meta.isCache"></router-view>
              </keep-alive>
            </template>
            <template>
              <router-view v-if="!$route.meta.isCache"></router-view>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import vSlidebar from '@/components/Mini-slidebar.vue'
import vTags from '@/components/Tags.vue'
import vHeader from '@/components/Header.vue'
import SwitchArea from '@/components/Switch-area.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  data() {
    return {
      isMini: false,
      tagsList: [],
      isShow: false // 控制router-view的隐藏与展示,达到刷新效果
    }
  },
  // 提供可注入子组件属性
  provide() {
    return { reload: this.reload }
  },
  components: { vTags, vHeader, vSlidebar, SwitchArea },
  computed: { ...mapGetters(['mode', 'showThemeBar', 'tagsBar']) }, // mode为true时，侧边栏菜单
  methods: {
    reload() {
      this.isShow = false
      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  },
  created() {
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      console.log(msg)
      const arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
    // 出发mini菜单
    bus.$on('showMini', bol => {
      this.isMini = !bol
    })
  },
  mounted() {
    console.log(this.tagsBar)
    bus.$on('showMini', bol => {
      this.isMini = !bol
    })
  }
}
</script>
<style lang="scss">
.layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
}
.right_container {
  flex: 1;
  overflow-x: hidden;
  .dashborad {
    height: calc(100vh - 80px);
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .tag-nav-wrapper {
      z-index: 10;
      width: 100%;
    }
    .content-wrapper-layout {
      // height: calc(100% - 36px);
      width: 100%;
      overflow: auto;
      overflow-x: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      // padding: 0 18px;
      .content-main {
        box-sizing: border-box;
        flex: 1;
        overflow: auto;
        height: calc(100% - 40px);
      }
    }
  }
}

.el-header {
  // background: #272451;
  color: #333;
  // text-align: center;
  height: 80px !important;
  box-sizing: border-box;
  padding: 0;
  // line-height: 60px;
}
.el-layout {
  @include base-background();
  @include font-color(#666);
  padding: 0 !important;
}

.full-content-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
