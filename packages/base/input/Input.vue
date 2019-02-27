<template>
  <a-input
    v-model="input"
    :placeholder="placeholder"
    @change="change"></a-input>
</template>

<script>
  export default {
    name: 'VoInput',

    model: {
      prop: 'value',
      event: 'change'
    },

    props: {
      value: {
        type: String,
        default: ''
      },

      placeholder: {
        type: String,
        default: '请输入',
        required: false
      }
    },

    data() {
      return {
        input: this.value
      }
    },

    methods: {
      change(event) {
        this.$emit('change', event.target.value)
      }
    }
  }
</script>

<style lang='less'>
</style>
