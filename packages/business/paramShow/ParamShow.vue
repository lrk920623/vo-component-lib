<template>
  <div style="height: 32px;">
    <div
      class="param-show-box"
      @click="clickBox">
      <div class="param-show-content">
        {{ list }}
      </div>
      <span
        v-show="data.length === 0"
        class="param-show-name">
        {{ name }}
      </span>
      <div
        class="param-show-del"
        @click="del">
        X
      </div>
    </div>
    <div
      v-show="disable"
      class="hide-param-show">
      <input
        type="text"
        disabled>
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoParamShow',

  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false
    },

    clickBox: {
      type: Function,
      required: true
    },

    data: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },

    types: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      name: '请点击选择',
      list: ''
    }
  },

  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        if (!val) val = []

        this.list = val
          .map(b => `[${b.showCode || b[this.types.code]}]${b[this.types.name]}`)
          .join(' , ')
      }
    }
  },

  methods: {
    del(event) {
      event.stopPropagation()

      this.$emit('clear', [])
    }
  }
}
</script>

<style lang='less'>
.param-show-box {
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid @border-color;
  border-radius: 4px;
}

.param-show-box > .param-show-content {
  height: 100%;
  overflow: hidden;
  line-height: 27px;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-height: 30px;
  padding: 0 6px;
  width: 90%;
  float: left;
}

.param-show-box > .param-show-content:hover {
  cursor: pointer;
  height: auto;
  line-height: 27px;
  overflow-y: auto;
  background: #fff;
  max-height: 150px;
  white-space: normal !important;
  border: 1px solid @border-hover-color;
  word-break: break-all;
  position: relative;
  z-index: 40 !important;
}

.param-show-box > .param-show-content:hover + .param-show-name {
  z-index: 50;
}

.param-show-box .param-show-name {
  color: #999;
  position: absolute;
  left: 10px;
  top: 4px;
  font-size: 14px;
  word-break: keep-all;
}

.param-show-box .param-show-del {
  width: 10%;
  height: 100%;
  text-align: center;
  line-height: 27px;
  float: left;
}

.param-show-box .param-show-del:hover {
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid #999;
  background-color: #bdbdbd;
}
</style>
