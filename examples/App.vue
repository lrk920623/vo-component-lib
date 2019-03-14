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
        </vo-search-box>
      </vo-card>
    </div>

    <vo-common-modal
      v-if="openCommon"
      :promise="promise"
      :type="types[activeModal]"
      :selected="select[activeModal]"
      @close="changeVisible(types[activeModal])"
      @ok="(data) => selectedItems(activeModal, data)"></vo-common-modal>
  </div>
</template>

<script>
import VoInput from 'packages/base/input'
import VoSelect from 'packages/base/select'
import VoCard from 'packages/base/card'
import VoSpin from 'packages/base/spin'
import VoPager from 'packages/base/pager'
import VoSearchBox from 'packages/business/searchBox/SearchBox'
import VoSingleControl from 'packages/business/searchBox/SingleControl'
import VoParamShow from 'packages/business/paramShow'
import VoCommonModal from 'packages/business/commonModal'


import { types } from '../packages/business/_util/constant'

function build(arr, code, name) {
  return arr.map((s, i) => {
    return {
      [code || 'code']: i,
      [name || 'name']: i * 1000
    }
  })
}

const array = []
for (let i = 0; i < 100; i++) {
  array.push(i)
}
const list = build(array)
const brands = build(array, 'brandId', 'brandName')

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
    VoCommonModal
  },

  data() {
    return {
      selectList: list,
      selected: '',
      types,
      select: {
        brand: brands
      },
      openCommon: false,
      activeModal: 'brand',
      promise: function () {
        return new Promise(resolve => {
          resolve({ data: brands })
        })
      }
    }
  },

  methods: {
    changeVisible(type, isCat) {
      const sign = type.sign

      isCat
        ? this.$set(this.open, sign, !this.open[sign])
        : (this.openCommon = !this.openCommon)
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
