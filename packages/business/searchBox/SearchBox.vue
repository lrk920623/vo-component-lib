<template>
  <a-form
    layout="inline"
    class="vo-search-box">
    <a-row :gutter="48">
      <slot />
    </a-row>
  </a-form>
</template>

<script>
import SingleControl from './SingleControl'
export default {
  name: 'VoSearchBox',
  Item: SingleControl
}
</script>

<style lang="less">
.vo-search-box.ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        height: 32px;
        min-width: 0;
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }
</style>
