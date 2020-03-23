<template>
  <div class="home">
    <v-head></v-head>
    <div class="yc-container">
      <v-sidebar></v-sidebar>
      <div class="yc-main">
        <v-tabs></v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import vTabs from './Tabs.vue'
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'

export default {
  data () {
    return {}
  },
  components: {
    vHead,
    vSidebar,
    vTabs
  }
}
</script>
<style>
  .yc-container{
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
