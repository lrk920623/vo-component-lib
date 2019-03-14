<template>
  <a-button-group>
    <template v-for="item in types">
      <a-button
        :key="item.id"
        :type="item.id === level ? 'primary' : 'default'"
        @click="$emit('chooseType', item.id)">
        {{ item.name }}
      </a-button>
    </template>
  </a-button-group>
</template>

<script>
export default {
  name: 'VoModalButtonGroup',

  props: {
    level: {
      type: Number,
      required: true
    },

    types: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.ant-btn-group {
  margin-bottom: 15px;

  > button {
    width: 90px;
  }
}
</style>
