<template>
  <a-select
    :value="select"
    :placeholder="title"
    @change="selectChange">
    <a-select-option
      v-for="item in list"
      :key="item[code]"
      :value="item[code]">
      {{ item[name] }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'VoSelect',
  model: {
    prop: 'selected',
    event: 'change'
  },

  props: {
    list: {
      type: Array,
      required: true
    },

    selected: {
      type: String,
      required: false,
      default: ''
    },

    placeholder: {
      type: String,
      default: '请选择',
      required: false
    },

    type: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    }
  },

  data: function() {
    return {
      code: this.type.code || 'code',
      name: this.type.name || 'name',
      title: this.type.title || this.placeholder
    }
  },

  computed: {
    select: {
      get() {
        return this.selected || (this.list.length && this.list[0][this.code])
      },
      set() {}
    }
  },

  methods: {
    selectChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="less">
  @import "~ant-design-vue/lib/select/style/index";
</style>
