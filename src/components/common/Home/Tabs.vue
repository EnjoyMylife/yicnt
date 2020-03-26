<template>
  <div class="yc-tab">
    <v-contextmenu ref="tabmenu">
      <v-contextmenu-item
        v-for="item of list"
        :key="item.id"
        @click="handleClick(item.id)"
        >{{ item.label }}</v-contextmenu-item
      >
    </v-contextmenu>
    <div class="yc-tab-links">
      <ul>
        <transition-group name="tabs">
          <li
            v-contextmenu:tabmenu
            v-for="(item, index) in tabs.data"
            :key="item.id"
            :index="index"
            :tabid="item.id"
            :class="tabs.active == item.id ? 'active' : ''"
            @click.stop="activeTab(item)"
            @mouseenter="handlerEnter(item, index)"
          >
            <a href="javscript:void(0)">{{ item.text }}</a>
            <div
              class="tab-close"
              v-if="!item.hidden"
              @click.stop="removeTab(item)"
            >
              <i class="fa fa-close"></i>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
    <div class="yc-tab-content">
      <transition name="pages" mode="out-in">
        <keep-alive :include="keepAliveList" :exclude="keepAliveListByEx">
          <router-view ref="pages" v-if="isRouterAlive"></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="yc-tab-footer">
      <a href="https://www.yicnt.com" target="_blank">
        Copyright
        <i class="fa fa-copyright" aria-hidden="true"></i>
        苏州宜创网络科技有限公司
      </a>
      |
      <a href="http://www.beian.miit.gov.cn/" target="_blank"
        >苏ICP备18070891号</a
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { homeTabData } from '@/constants/homeTabData'
export default {
  data() {
    return {
      list: [
        {
          id: 0,
          label: '关闭当前'
        },
        {
          id: 1,
          label: '关闭其他'
        },
        {
          id: 2,
          label: '关闭全部'
        },
        {
          id: 3,
          label: '刷新'
        }
      ],
      tab: [],
      keepAliveMap: {},
      keepAliveList: [],
      keepAliveListByEx: [],
      isRouterAlive: true,

      currentData: {},
      currentIndex: null
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'tabs'])
  },
  watch: {
    $route(to) {
      this.setTabs(to)
    }
  },
  created() {
    this.setTabs(this.$route)
    this.pushIndex()
  },
  methods: {
    setTabs(route) {
      // console.log(route.matched)
      const name = route.matched[1].components.default.name
      // console.log(name)
      if (!name || name == '') return
      this.keepAliveMap[route.path] = name
      this.restKeepAlive()
    },
    restKeepAlive() {
      this.keepAliveList = []
      for (var k in this.keepAliveMap) {
        this.keepAliveList.push(this.keepAliveMap[k])
      }
    },
    pushIndex() {
      this.$store.dispatch('AddTabData', homeTabData)
      this.activeTab(homeTabData)
    },
    handlerEnter(item, index) {
      this.currentData = item
      this.currentIndex = index
    },
    handleClick(id) {
      switch (id) {
        case 0:
          this.removeTab(this.currentData)
          break
        case 1:
          this.removeTabOther(this.currentData)
          break
        case 2:
          this.removeTabAll()
          break
        case 3:
          this.reloadTab(this.currentData, this.currentIndex)
          break
      }
    },
    activeTab(data) {
      if (!data || data.id == null) return
      this.$store.dispatch('ToggleTabActive', data.id)
      this.$router.push(data.attributes.url)
    },
    removeTab(data) {
      let _this = this
      if (data.id == homeTabData.id) return
      _this.$store.dispatch('DelTabData', data).then(next => {
        delete this.keepAliveMap[data.attributes.url]
        _this.restKeepAlive()
        _this.activeTab(next)
      })
    },
    removeTabOther(data) {
      let _this = this
      this.$store.dispatch('DelTabOther', data).then(([next, data]) => {
        for (var k in data) {
          let item = data[k]
          if (
            item.attributes.url == next.attributes.url ||
            item.attributes.url == homeTabData.attributes.url
          ) {
            continue
          }
          delete this.keepAliveMap[item.attributes.ulr]
        }
        _this.restKeepAlive()
        _this.activeTab(next)
      })
    },
    removeTabAll() {
      let _this = this
      this.$store.dispatch('DelTabAll').then(() => {
        _this.keepAliveMap = {}
        _this.restKeepAlive()
        _this.activeTab(homeTabData)
      })
    },
    reloadTab(data, index) {
      let _this = this
      _this.activeTab(data)
      console.log(this.keepAliveMap, this.keepAliveList)
    }
  }
}
</script>

<style lang="scss">
.v-contextmenu {
  font-size: 12px;
  padding: 5px;
}
.v-contextmenu .v-contextmenu-item {
  padding: 8px 14px;
}
/*tab过渡动画*/
.tabs-enter-active,
.tabs-leave-active {
  transition: all 0.3s;
}
.tabs-enter,
.tabs-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.tabs-move {
  transition: all 0.3s;
}
.tabs-leave-active {
  position: absolute;
}

/*页面过渡动画*/
.pages-enter-active,
.pages-leave-active {
  transition: all 0.1s;
}
.pages-enter,
.pages-leave-active {
  opacity: 0;
  /*transform: translateX(20px);*/
}
.yc-main {
  overflow: hidden;
  height: 100%;
  transition: 0.1s;
  -webkit-transition: 0.1s;
  .yc-tab {
    height: 100%;
    position: relative;
    .yc-tab-links {
      position: relative;
      height: 40px;
      border-bottom: 1px solid #ebebeb;
      ul {
        margin: 0px;
        list-style: none;
        width: 9999px;
        height: 40px;
        position: absolute;
        padding: 0 6px 0 6px;
        li {
          float: left;
          margin: 5px -1px 0 0;
          padding: 0 20px;
          display: inline;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: #fff;
          letter-spacing: 0.02em;
          height: 34px;
          line-height: 33px;
          border: 1px solid #ebebeb;
          border-bottom: 0;
          transition: 0.3s;
          -moz-transition: 0.3s;
          -webkit-transition: 0.3s;
          -o-transition: 0.3s;
          min-width: 80px;
          text-align: center;
          &.active {
            height: 35px;
            background-color: #fff;
            a {
              color: #409eff;
              font-weight: bold;
            }
          }
          a {
            display: inline-block;
            font-size: 12px;
            text-decoration: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            color: #898989;
          }
          .tab-close {
            width: 12px;
            height: 12px;
            display: inline-block;
            cursor: pointer;
            line-height: 0;
            font-size: 12px;
            color: #ccc;
            position: absolute;
            top: 11px;
            right: 5px;
          }
        }
      }
    }
    .yc-tab-content {
      height: calc(100% - 65px);
      overflow-y: auto;
      padding: 10px;
    }
    .yc-tab-footer {
      color: #999;
      font-size: 13px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      border-top: 1px solid #ebebeb;
      a {
        color: #999;
      }
    }
  }
}
</style>
