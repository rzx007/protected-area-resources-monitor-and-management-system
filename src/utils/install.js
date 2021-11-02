// import foot from '@/components/footer.vue';
import svgIcon from '@/components/Svg-icon.vue'
// import sideTree from '@/components/Side-tree.vue';
import overlay from '@/components/overlay'
import CurdView from '@/components/CurdViews/index'
import BreadNav from '@/components/Bread_nav'
import FromData from '@/components/FromData/index'
const components = { svgIcon, overlay, CurdView, BreadNav, FromData }

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
export default plugin
