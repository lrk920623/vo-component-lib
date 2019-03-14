<template>
  <div class="pager">
    <a-pagination
      v-model="current"
      show-quick-jumper
      :default-page-size="pageSize"
      :total="total"
      @change="onChange"></a-pagination>
  </div>
</template>

<script>
export default {
  name: 'VoPager',
  props: {
    total: {
      type: Number,
      required: true
    },

    pageSize: {
      type: Number,
      required: false,
      default: 100
    },

    pageNo: {
      type: Number,
      required: true
    }
  },

  computed: {
    current: {
      get: function() {
        return this.pageNo
      },
      set: () => {}
    }
  },

  methods: {
    onChange(pageNo) {
      this.$emit('pageNoChange', pageNo)
    }
  }
}
</script>

<style scoped>
@import "~ant-design-vue/lib/pagination/style/index.css";
.pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.ant-pagination li {
  height: 30px;
  line-height: 30px;
}
</style>
