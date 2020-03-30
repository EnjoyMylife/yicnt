<template>
  <div class="yc-sidebar" v-loading="loading">
    <div
      :class="'yc-sidebar-toggle ' + (sidebar.opend ? '' : 'close')"
      @click.stop="toggleSideBar"
    >
      <i class="fa-fw fa fa-bars"></i>
    </div>
    <el-menu
      :collapse="!sidebar.opend"
      :default-openeds="sidebar.openList"
      :default-active="tabs.active"
      active-text-color="#20a0ff"
      class="yc-sidebar-menu"
    >
      <el-menu-item v-show="false" index="index"></el-menu-item>
      <template v-for="item in sidebar.data" :index="item.id">
        <el-menu-item
          v-if="!item.hasChild"
          :key="item.text"
          :index="item.id"
          @click="addTab(item)"
        >
          <template slot="title">
            <i :class="item.attributes.icon"></i>&nbsp;
            <span :title="item.text">{{ item.text }}</span>
          </template>
        </el-menu-item>
        <el-submenu v-else :key="item.text" :index="item.id">
          <template slot="title">
            <i :class="item.attributes.icon"></i>&nbsp;
            <span :title="item.text">{{ item.text }}</span>
          </template>
          <template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.text"
              :index="child.id"
              @click="addTab(child)"
              :title="child.text"
              >{{ child.text }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'tabs'])
  },
  mounted() {
    console.log(this.sidebar.opend)
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    addTab (data) {
      this.$store.dispatch('AddTabData', data)
      this.$router.push(data.attributes.url)
    }
  }
}
</script>
<style lang="scss">
.el-submenu__title {
  background-color: #f1f0f0;
}
.yc-sidebar {
  float: left;
  height: 100%;
  margin: 0;
  top: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
}
.yc-sidebar-toggle {
  border-bottom: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
  color: #ccc;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  i {
    transition: 0.3s;
    -moz-transition: 0.3s;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
  }
  &.close i {
    transition: 0.3s;
    -moz-transition: 0.3s;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transform: rotateZ(90deg);
    -ms-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    -webkit-transform: rotateZ(90deg);
    -o-transform: rotateZ(90deg);
  }
}

// .yc-sidebar-menu>.el-menu-item {
//   background-color: #efefef;
// }
.el-menu-item,
.el-submenu__title {
  height: 50px;
  line-height: 50px;
}
.yc-sidebar-menu.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.yc-sidebar-menu.el-menu.el-menu--collapse {
  width: 65px;
}
.yc-sidebar-menu.el-menu {
  height: calc(100% - 40px);
  overflow-x: hidden;
  overflow-y: auto;
  border-right: solid 1px #ebebeb;
}
</style>
