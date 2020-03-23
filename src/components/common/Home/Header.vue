<template>
  <header class='yc-main-header'>
    <div class='yc-header-logo'>
      <div class='logo-img' @click='logoClick'>
        <img src='@/assets/images/logo.svg' />
      </div>
      <div class='logo-info'>宜创联合办公</div>
    </div>
    <div class='yc-header-menu-left'>
      <template v-for='item in navbarList'>
        <div
          class='topbar-item fl'
          :checked='item.id == navbarActive ? true : false'
          :key='item.id'
          @click.stop='changeNavbar(item)'
        >
          <span class='topbar-item-btn'
            ><i :class='item.attributes.icon'></i> {{ item.text }}</span
          >
        </div>
      </template>
    </div>
    <div class='yc-header-menu-right'>
      <v-topbar></v-topbar>
    </div>
  </header>
</template>

<script>
import vTopbar from './Topbar.vue'
// import narbarApi from '@/api/navbar'
import { homeTabData } from '@/constants/homeTabData'

export default {
  data () {
    return {
      navbarActive: null,
      navbarList: []
    }
  },
  components: {
    vTopbar
  },
  computed: {},
  mounted () {
    this.getMenuData()
  },
  methods: {
    // 获取
    getMenuData () {
      const _this = this
      // narbarApi.getMenuData().then((res) => {
      // _this.navbarList = res.data
      _this.navbarList = [
        {
          id: '1',
          attributes: { icon: 'fa fa-battery-0' },
          text: '联合办公',
          children: [
            {
              id: '7',
              text: '这是文字你懂的1',
              hasChild: true,
              attributes: { icon: 'fa fa-battery-0' },
              children: [
                { id: '11', text: '这是文字1', attributes: { url: '/page1' } },
                { id: '12', text: '这是文字2', attributes: { url: '/page2' } }
              ]
            },
            {
              id: '8',
              text: '这是文字你懂的2',
              hasChild: true,
              attributes: { icon: 'fa fa-battery-0' },
              children: [
                { id: '13', text: '这是文字11', attributes: { url: '/page11' } }
              ]
            },
            {
              id: '9',
              text: '这是文字你懂的3',
              hasChild: false,
              attributes: { icon: 'fa fa-battery-0', url: '/page3' }
            }
          ]
        },
        {
          id: '2',
          attributes: { icon: 'fa fa-battery-1' },
          text: '产业园',
          children: [
            {
              id: '10',
              text: '这是文字你懂的4',
              hasChild: true,
              attributes: { icon: 'fa fa-battery-0' },
              children: [
                { id: '14', text: '这是文字11', attributes: { url: '/page11' } }
              ]
            }
          ]
        },
        { id: '3', attributes: { icon: 'fa fa-battery-2' }, text: '公寓' },
        { id: '4', attributes: { icon: 'fa fa-battery-3' }, text: '市场' },
        { id: '5', attributes: { icon: 'fa fa-battery-4' }, text: '财务' },
        { id: '6', attributes: { icon: 'fa fa-battery' }, text: '基础' }
      ]
      if (_this.navbarList != null && _this.navbarList.length > 0) {
        _this.changeNavbar(_this.navbarList[0])
      }
      // })
    },
    logoClick () {
      this.$store.dispatch('AddTabData', homeTabData)
      this.$router.push('/')
    },
    changeNavbar (item) {
      this.navbarActive = item.id
      this.$store.dispatch('ToggleSideBarData', item.children)
    }
  }
}
</script>
<style lang="scss" scoped>
.yc-main-header {
  background-color: #008de1;
  height: 50px;
  box-shadow: 12px 3px 5px rgba(1, 1, 1, 0.2);
  position: fixed;
  top: 0;
  z-index: 666;
  width: 100%;
}
.yc-header-logo {
  width: 200px;
  height: inherit;
  float: left;
  .logo-img {
    float: left;
    width: 65px;
    height: inherit;
    padding: 10px;
    border-right: 1px solid rgba(225, 225, 225, 0.3);
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .logo-info {
    float: left;
    line-height: 50px;
    // padding: 0 15px;
    width: 135px;
    text-align: center;
    font-weight: 800;
    letter-spacing: 0.1em;
    font-size: 14px;
    color: #fff;
  }
}
.yc-header-menu-left {
  float: left;
}
.yc-header-menu-right {
  float: right;
  width: 305px;
  height: inherit;
  position: relative;
}
</style>
