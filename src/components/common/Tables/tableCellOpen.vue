<template>
  <div @click='handlerEdit' ref='openBox' class="tableGoods">
    <div v-show='!isOpen' class="shows">{{ cellData || '' }}</div>
    <div v-show='isOpen' class="shows">
      <el-input v-model="inputValue" size="mini" ref="openInput"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
      inputValue: ''
    }
  },
  created () {
    document.addEventListener('click', e => {
      if (!this.$refs.openBox.contains(e.target)) {
        this.isOpen = false
      }
    })
  },
  props: {
    cellData: [String, Number, undefined, null]
  },
  methods: {
    handlerEdit () {
      this.isOpen = true
      // this.$refs.openInput.focus()
      this.$nextTick(() => {
        this.$refs.openInput.focus()
      })
    }
  }
}
</script>

<style>
  .show{
    height: '100%'
  }
</style>
