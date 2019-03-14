<template>
  <a-spin
    :spinning="spinning"
    :delay="delay"
    :tip="tip"></a-spin>
</template>

<script>
export default {
  name: 'VoSpin',

  props: {
    spinning: {
      type: Boolean,
      required: true
    },

    tip: {
      type: String,
      required: false,
      default: '正在加载中...'
    },

    delay: {
      type: Number,
      required: false,
      default: 500
    }
  }
}
</script>
<style lang="less">
  @import "~ant-design-vue/lib/spin/style/index.css";
</style>
