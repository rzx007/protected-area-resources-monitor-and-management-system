<template>
  <div class="min-slide-mian">
    <div class="slide-logo">
      <img src="@/assets/img/logo1.png" />
    </div>
    <div class="menu-content">
      <ul class="menu-list">
        <li
          @click="pushRoute(item)"
          :class="[$route.path === item.path ? 'activeClass' : '', 'menu-item']"
          v-for="(item, index) in menuData"
          :key="index"
        >
          <div class="icon-block">
            <svg-icon type="css" :icon="item.icon" class="icon"></svg-icon>
          </div>
          <span class="menu-title">{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import routeArr from '@/mock/router.js'
import { mapGetters } from 'vuex'
import SvgIcon from './Svg-icon.vue'
export default {
  components: { SvgIcon },
  data() {
    return {
      // menuData: [...routeArr]
    }
  },
  computed: {
    ...mapGetters({
      menuData: 'routes'
    })
  },
  methods: {
    pushRoute(item) {
      this.$router.push({ path: item.path, query: { title: item.title } })
    }
  }
}
</script>
<style lang="scss">
$activeColor: #409eff;
.min-slide-mian {
  @include header-background();
  // padding-bottom: 30px;
  height: 100%;
  width: 96px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .slide-logo {
    text-align: center;
  }
  .menu-content {
    height: calc(100% - 85px);
    position: relative;
    overflow: auto;
    .menu-list {
      // position: relative; /*脱离文档流*/
      // top: 50%;
      // transform: translateY(-50%);
      // width: 100%;
      // height: 90%;
      // min-height: 500px;
      // overflow-y: auto;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      
      .menu-item {
        cursor: pointer;
        text-align: center;
        position: relative;
        margin-bottom: 38px;
        .icon-block {
          text-align: center;
          margin-bottom: 6px;
          .icon {
            font-size: 30px;
          }
        }
        .menu-title {
          letter-spacing: 2px;
          font-size: 14px;
        }
        &:hover {
          .icon-block,
          .menu-title {
            color: $activeColor;
          }
        }
      }
      .activeClass {
        .icon-block,
        .menu-title {
          color: $activeColor;
        }
        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          border-right: 4px solid $activeColor;
        }
      }
    }
  }
}
</style>
