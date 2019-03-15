<template>
  <a-col
    :md="md"
    :sm="sm">
    <a-form-item :label="label">
      <slot />
    </a-form-item>
  </a-col>
</template>

<script>
export default {
  name: 'VoSingleControl',
  props: {
    md: {
      type: Number,
      required: false,
      default: 8
    },

    sm: {
      type: Number,
      required: false,
      default: 24
    },

    label: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
