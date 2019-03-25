<template>
  <vo-modal
    :open="open"
    :title="type.title || ''"
    @close="$emit('close')"
    @handle-ok="ok">
    <div class="condition-box">
      <vo-input
        v-if="!type.noInput"
        v-model="search"
        class="search"
        @change="inputChange"></vo-input>
      <template v-if="isStore">
        <vo-select
          v-model="param.operation"
          :type="types.operation"
          :list="operations"></vo-select>
        <vo-select
          v-model="param.district"
          :type="types.district"
          :list="districts"></vo-select>
      </template>
    </div>
    <vo-show-list
      :type="type"
      :loading="loading"
      :record="record"
      :selected="list"
      :active-page="activePage"
      :child="isGroup ? ['storeCode', 'storeName', 'stores'] : null"
      @pageChange="getList"
      @selected-list="getSelectedList"></vo-show-list>
  </vo-modal>
</template>

<script>
import VoModal from 'packages/base/modal'
import VoShowList from 'packages/business/_sub/List'
import VoInput from 'packages/base/input'
import VoSelect from 'packages/base/select'
import { buildParam, _debounce } from '../_util/utils'

export default {
  name: 'VoCommonModal',
  components: {
    VoModal,
    VoShowList,
    VoInput,
    VoSelect
  },

  props: {
    open: {
      type: Boolean,
      required: true
    },

    types: {
      type: Object,
      required: true
    },

    type: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },

    promise: {
      type: [Function, Object],
      required: false,
      default: function() {
        return null
      }
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
      search: '',
      list: Object.assign([], this.selected),
      activePage: 1,
      record: {},
      loading: false,
      param: {
        operation: '',
        district: ''
      },
      operations: [],
      districts: []
    }
  },

  computed: {
    isStore() {
      return this.type && this.type.sign === this.types.store.sign
    },

    isGroup() {
      return this.type && this.type.sign === this.types.group.sign
    }
  },

  watch: {
    open(val) {
      if (!val) return
      this.init()
    },

    ['param.operation']() {
      this.getList()
    },

    ['param.district']() {
      this.getList()
    }
  },

  methods: {
    init() {
      this.search = ''
      this.param = {
        operation: '',
        district: ''
      }

      this.list = Object.assign([], this.selected)

      if (!Object.keys(this.type).length) return

      this.getList()

      if (this.isStore) {
        this.getOperations()
        this.getDistricts()
      }
    },

    ok() {
      this.$emit('ok', this.list)
    },

    inputChange() {
      this.getList(1)
    },

    async getList(page) {
      this.loading = true
      this.activePage = page

      let payload = {}

      // 接口参数情况太多样了
      if (this.isStore) {
        payload = this.buildStoreParam()
      } else if (this.type.noInput) {
        payload = { moduleId: this.moduleId }
      } else {
        payload = buildParam(this.moduleId, this.search, page, {
          hidePager: this.type.noPage
        })
      }

      const promise = this.isStore ? this.promise.store : this.promise
      const { data } = await promise(payload)

      this.record = data
      this.loading = false
    },

    buildStoreParam() {
      let param = this.param
      return {
        operationCodes: param.operation ? [param.operation] : [],
        districtCodes: param.district ? [param.district] : [],
        key: this.search,
        keyType: /,/g.test(this.search) ? 1 : 0,
        moduleId: this.moduleId
      }
    },

    async getOperations() {
      const { data } = await this.promise.operation({
        moduleId: this.moduleId
      })

      data.splice(0, 0, {
        businessOperationCode: 0,
        businessOperationName: '全部业态'
      })
      this.operations = data
    },

    async getDistricts() {
      const { data } = await this.promise.district({
        moduleId: this.moduleId
      })

      data.splice(0, 0, { districtCode: 0, districtName: '全部地区' })
      this.districts = data
    },

    getSelectedList(list) {
      this.list = list
    }
  }
}
</script>
