<template>
  <div id="app">
    <div id="nav">
      <vo-card>
        <h2>vo-input</h2>
        <vo-input></vo-input>
      </vo-card>
      <vo-card>
        <h2>vo-select</h2>
        <vo-select
          v-model="selected"
          :list="selectList"
          style="width: 300px"></vo-select>
      </vo-card>
      <vo-card>
        <h2>vo-spin</h2>
        <vo-spin
          :spinning="true"
          :delay="0"></vo-spin>
      </vo-card>
      <vo-card>
        <h2>vo-pager</h2>
        <vo-pager
          :total="1000"
          :page-no="1"></vo-pager>
      </vo-card>
      <vo-card style="width: 100%">
        <h2>条件检索</h2>
        <vo-search-box>
          <vo-single-control :label="'品牌'">
            <vo-param-show
              :types="types.brand"
              :click-box="() => changeVisible(types.brand)"
              :data="select[types.brand.sign]"
              @clear="(data) => {}"></vo-param-show>
          </vo-single-control>

          <vo-single-control :label="types.class.title">
            <vo-param-show
              :click-box="() => changeVisible(types.class, true)"
              :data="select[types.class.sign]"
              :types="types.class"
              @clear="(data) => selectedItems(types.class.sign, data)"></vo-param-show>
          </vo-single-control>

          <vo-single-control :label="types.category.title">
            <vo-param-show
              :click-box="() => changeVisible(types.category, true)"
              :data="select[types.category.sign]"
              :types="types.category"
              @clear="(data) => selectedItems(types.category.sign, data)"></vo-param-show>
          </vo-single-control>
        </vo-search-box>
      </vo-card>
    </div>

    <vo-common-modal
      v-if="openCommon"
      :types="types"
      :promise="promise"
      :type="types[activeModal]"
      :selected="select[activeModal]"
      @close="changeVisible(types[activeModal])"
      @ok="(data) => selectedItems(activeModal, data)"></vo-common-modal>

    <vo-class-modal
      v-if="open[types.class.sign]"
      :types="types"
      :promise="promise"
      :selected="select[activeModal]"
      @close="changeVisible(types.class, true)"
      @ok="(data) => selectedItems(types.class.sign, data)"></vo-class-modal>

    <vo-category-modal
      v-if="open[types.category.sign]"
      :types="types"
      :promise="promise"
      :selected="select[activeModal]"
      @close="changeVisible(types.category, true)"
      @ok="(data) => selectedItems(types.category.sign, data)"></vo-category-modal>
  </div>
</template>

<script>
import VoInput from 'packages/base/input'
import VoSelect from 'packages/base/select'
import VoCard from 'packages/base/card'
import VoSpin from 'packages/base/spin'
import VoPager from 'packages/base/pager'
import VoSearchBox from 'packages/business/searchBox'
import VoSingleControl from 'packages/business/singleControl'
import VoParamShow from 'packages/business/paramShow'
import VoCommonModal from 'packages/business/commonModal'
import VoClassModal from 'packages/business/classModal'
import VoCategoryModal from 'packages/business/categoryModal'

import { getUrlByType, buildPromise } from './common'
import { types } from './constant'

export default {
  components: {
    VoInput,
    VoSelect,
    VoCard,
    VoSpin,
    VoPager,
    VoSearchBox,
    VoSingleControl,
    VoParamShow,
    VoCommonModal,
    VoClassModal,
    VoCategoryModal
  },

  data() {
    return {
      selectList: [],
      selected: '',
      types,
      select: {},
      open: {},
      openCommon: false,
      activeModal: '',
      promise: function () {}
    }
  },

  methods: {
    selectedItems(type, data) {
      this.$set(this.select, type, data)
    },

    changeVisible(type, isCat) {
      const sign = type.sign

      isCat
        ? this.$set(this.open, sign, !this.open[sign])
        : (this.openCommon = !this.openCommon)

      if (type) {
        this.activeModal = sign
        this.promise = buildPromise(getUrlByType(sign))
      }
    },
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f0f2f5;

  #nav {
    padding: 30px;
    display: flex;
    flex-wrap: wrap;

    .ant-card {
      background: #fff;
      padding: 20px;
      margin-bottom: 20px;
      min-width: 48%;
      margin-right: 10px;
      margin-left: 10px;

      h2 {
        margin: 0 0 30px 0;
        font-weight: bold;
      }
    }
  }
}

</style>
