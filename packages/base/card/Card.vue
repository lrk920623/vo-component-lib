<template>
  <a-card
    :bordered="border"
    :loading="loading">
    <slot />
  </a-card>
</template>

<script>
export default {
  name: 'VoCard',

  props: {
    border: {
      type: Boolean,
      default: false,
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style lang='less'>
  @import "~ant-design-vue/lib/card/style/index";
</style>
