<template>
  <div class='yc-open-wrap' @click='handlerEdit' ref='openBox'>
    <div v-show='!isOpen'>{{ cellData }}</div>
    <div v-show='isOpen' style='height:100%'>
      <el-input v-model="inputValue"></el-input>
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
      // console.log(e.target)
      if (!this.$refs.openBox.contains(e.target)) {
        this.isOpen = false
      }
    })
  },
  props: {
    cellData: String
  },
  methods: {
    handlerEdit () {
      this.isOpen = true
      // console.log(this.$refs.openBox)
      // console.log(this.myData)
    }
  }
}
</script>

<style lang="scss">
.yc-open-input{
  input {
    border: none
  }
}
</style>
