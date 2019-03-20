<template>
  <vo-modal
    :open="true"
    :title="type.title"
    @close="$emit('close')"
    @handle-ok="ok">
    <div class="category-modal">
      <vo-modal-button-group
        :types="allType"
        :level="currentLevel"
        @chooseType="chooseType"></vo-modal-button-group>
      <vo-modal-tree
        v-show="multi && currentLevel > 1"
        :tree-data="tree"
        :level="currentLevel"
        :level-type="categoryTypes"
        :promise="promise.tree"
        :type="type"
        @getListByCode="getListByCode"></vo-modal-tree>
      <div>
        <vo-input
          v-model="search"
          class="search"
          :placeholder="currentLevel !== 0 ? '请输入关键字搜索类别' : '请输入类别代码（多个用 ，分割）'"
          @change="inputChange"></vo-input>
        <span class="error">{{ error }}</span>
        <vo-show-list
          :type="type"
          :level="currentLevel"
          :selected="list"
          :loading="loading"
          :record="record"
          :active-page="activePage"
          @pageChange="getList"
          @selected-list="getSelectedList"></vo-show-list>
      </div>
    </div>
  </vo-modal>
</template>

<script>
  import VoModalButtonGroup from 'packages/business/_sub/ButtonGroup'
  import VoModalTree from 'packages/business/_sub/Tree'
  import VoModal from 'packages/base/modal'
  import VoShowList from 'packages/business/_sub/List'
  import VoInput from 'packages/base/Input'
  import { buildParam, invalid, _debounce } from '../_util/utils'
  import { categoryTypes, types } from '../_util/constant'

  let allType = Object.assign([], categoryTypes)
  allType.unshift({ id: 0, name: '编码', code: 'all' })

  export default {
    name: 'VoCategoryModal',
    components: {
      VoModal,
      VoShowList,
      VoInput,
      VoModalButtonGroup,
      VoModalTree
    },

    props: {
      multi: {
        type: Boolean,
        required: false,
        default: true
      },

      promise: {
        type: Object,
        required: true
      },

      selected: {
        type: Array,
        required: false,
        default: function() {
          return []
        }
      }
    },

    data() {
      this.inputChange = _debounce(this.inputChange)

      return {
        type: types.category,
        currentLevel: 0,
        search: '',
        list: this.selected,
        allType,
        categoryTypes,
        tree: [],
        activeCode: '',
        activePage: 1,
        record: {},
        loading: false,
        error: ''
      }
    },

    mounted() {
      this.getTree()
    },

    methods: {
      ok() {
        this.$emit('ok', this.list)
      },

      inputChange(val) {
        this.error = invalid(val)
        this.getList()
      },

      async getTree() {
        const payload = {
          moduleId: this.moduleId,
          categoryCode: this.activeCode
        }

        const { data } = await this.promise.tree(payload)
        this.tree = [
          {
            level: data.level,
            list: data.categories
          }
        ]

        this.initMultiCat()
      },

      async getList(page, code) {
        this.activePage = page
        this.loading = true

        const extra = { level: this.currentLevel }
        if (code) extra.categoryCode = code

        const payload = buildParam(this.moduleId, this.search, page)
        payload.condition = { ...extra, ...payload.condition }

        const { data } = await this.promise.list(payload)

        this.record = data
        this.loading = false
      },

      getListByCode(code) {
        this.getList(1, code)
      },

      initMultiCat() {
        // 初始化选中全部
        this.tree[0].selectedCat = '全部'

        const all = {
          categoryCode: '',
          categoryName: '全部',
          level: 0
        }

        if (!this.tree[0].list) this.tree[0].list = []
        this.tree[0].list.splice(0, 0, all)
      },

      getSelectedList(list) {
        this.list = list
      },

      chooseType(id) {
        this.currentLevel = id

        // 清空搜索框内容
        this.search = ''

        // 清空已选择品类组
        this.list = []

        // 获取当前level(?或者加上选中的品类)下的品类列表
        id ? this.getList() : (this.record = { data: [] })
      }
    }
  }
</script>

<style lang="less">
  .category-modal {
    .single-tree-box {
      width: 20%;
    }
  }
</style>
