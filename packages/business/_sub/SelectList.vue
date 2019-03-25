<template>
  <div class="selected-box">
    <div class="label">
      <span>已选择（{{ selected.length }} 条）</span>
    </div>
    <div class="select-show">
      <a-select
        v-model="selectShow"
        mode="multiple"
        style="width: 100%"
        placeholder=""
        not-found-content=""
        :get-popup-container="getContainer"
        @deselect="deselect">
      </a-select>
      <div class="clear">
        <a-button @click="clear">
          清除
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoSelectList',

  props: {
    selected: {
      type: Array,
      required: true
    },

    type: {
      type: Object,
      required: true
    }
  },

  computed: {
    selectShow: {
      get: function() {
        return this.selected.map(s => {
          return `[${s.showCode || s[this.type.code]}]${s[this.type.name]}`
        })
      },
      set: function() {}
    }
  },

  methods: {
    clear() {
      this.selectShow.splice(0)

      this.$emit('selectDelete')
    },

    deselect(val) {
      // 更新当前展示的list
      this.selectShow.splice(this.selectShow.indexOf(val), 1)

      const code = val.substr(val.indexOf('[') + 1, val.indexOf(']') - 1)
      this.$emit('selectDelete', code)
    },

    getContainer(node) {
      return node.parentNode
    }
  }
}
</script>

<style lang='less'>
.selected-box {
  .label {
    font-size: 13px;
    height: 32px;
    line-height: 32px;
  }

  .select-show {
    display: flex;

    .clear {
      margin-left: 10px;
    }
  }

  .ant-select-dropdown,
  .ant-select-search__field {
    display: none !important;
  }

  .ant-select-selection {
    box-shadow: none !important;
    border-color: @border-color !important;
    max-height: 102px;

    &:hover {
      border-color: @border-hover-color !important;
    }

    .ant-select-selection__rendered {
      line-height: 4px;
      margin-right: 0;

      ul {
        max-height: 100px;
        overflow-y: auto;
      }
    }
  }
}
</style>
