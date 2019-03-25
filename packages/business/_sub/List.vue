<template>
  <div class="hs-modal-list-box">
    <div class="list-content">
      <div class="header">
        <div class="title">
          <span class="name">
            {{ type.title }}列表
          </span>
          <span class="count">
            （共有 {{ total }} 条）
          </span>
        </div>
        <div
          v-if="!single"
          class="checked-button">
          <a-button @click="reverse">
            <a-icon type="check"></a-icon>反选
          </a-button>
          <a-button @click="all">
            <a-icon type="check"></a-icon>全选
          </a-button>
        </div>
      </div>
      <vo-spin
        v-show="spinning"
        :spinning="true"
        :delay="delay"></vo-spin>
      <div class="list-body">
        <a-row
          v-show="!spinning"
          :gutter="16">
          <a-col
            v-for="(item) in list"
            :key="item[type.code]"
            :span="type.span || 6"
            @click="choose(item)">
            <div
              :class="{ selectLike: single ? singleSelected === item[type.code] : item.selected }">
              <div :title="item.child || item[type.name]">
                [{{ item[type.showCode || type.code] }}] {{ item[type.name] }}
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <vo-page
      v-if="!hidePager"
      :total="total"
      :page-no="currentPage"
      @pageNoChange="pageChange"></vo-page>
    <vo-select-list
      :type="type"
      :selected="selectList"
      @selectDelete="selectRemove"></vo-select-list>
  </div>
</template>

<script>
import {
  control,
  allChoose,
  reverseChoose,
  isLimit,
  allValid,
  reverseValid
} from '../_util/utils'
import VoPage from 'packages/base/pager'
import VoSelectList from 'packages/business/_sub/SelectList'
import VoSpin from 'packages/base/spin'

export default {
  name: 'VoShowList',

  components: {
    VoSpin,
    VoPage,
    VoSelectList
  },

  props: {
    child: {
      type: Array,
      required: false,
      default: function() {
        return null
      }
    },

    level: {
      type: Number,
      required: false,
      default: 0
    },

    // "unLimit" 表示不限制个数
    max: {
      type: Number,
      required: false,
      default: 200
    },

    // 已选中的元素集合
    selected: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    },

    // 业务类型
    type: {
      type: Object,
      required: true
    },

    record: {
      type: [Object, Array],
      required: true
    },

    getList: {
      type: Function,
      required: false,
      default: null
    },

    spinDelay: {
      type: Number,
      required: false,
      default: 0
    },

    activePage: {
      type: Number,
      required: false,
      default: 1
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      list: [],
      total: 0,
      single: false,
      singleSelected: '',
      selectList: this.selected,
      delay: this.spinDelay || 0,
      hidePager: this.type.noPage
    }
  },

  computed: {
    spinning() {
      return this.loading
    },
    currentPage: {
      get: function() {
        return this.activePage
      },
      set: () => {}
    }
  },

  watch: {
    selectList(val) {
      this.$emit('selected-list', val)
    },

    record(val) {
      const d = val.data || val.result || val

      d.forEach(b => {
        // 根据selectList里的值更新list的active
        b.selected = this.selectList
          .map(a => String(a[this.type.code]))
          .includes(b[this.type.code].toString())

        // child存在的场合 需要向item里添加hover时显示的内容
        if (this.child) {
          const [code, name, type] = this.child
          const child = b[type]
            .map(s => {
              return `[${s[code]}]${s[name]}`
            })
            .join(' , ')

          this.$set(b, 'child', child)
        }
      })

      this.list = d
      this.total = val instanceof Array ? val.length : val.total || val.count || 0
    }
  },

  methods: {
    pageChange(pageNo) {
      this.currentPage = pageNo

      this.$emit('pageChange', pageNo)
    },

    /**
     * 点击selectList里删除元素时更新list的active
     * @param remove
     * null|undefined: 表示将所有的选中状态重置,
     * String: 表示重置当前其中一个的选中状态
     * }
     */
    selectRemove(remove) {
      if (!remove) {
        this.list.forEach(s => (s.selected = false))
        this.selectList = []
        return
      }

      this.selectList.splice(this.selectList.findIndex(s => s[this.type.code] == remove), 1)
      this.list.find(s => s[this.type.code] == remove).selected = false
    },

    /**
     * 反选
     */
    reverse() {
      this.selectList.forEach(
        i => (i[this.type.code] = String(i[this.type.code]))
      )

      if (
        isLimit(this.max) &&
        reverseValid(this.list, this.selectList, this.max)
      )
        return

      this.selectList = reverseChoose(
        this.list,
        this.selectList,
        this.type,
        this.level
      )
    },

    /**
     * 全选
     */
    all() {
      if (isLimit(this.max) && allValid(this.list, this.selectList, this.max))
        return

      this.selectList = allChoose(
        this.list,
        this.selectList,
        this.type,
        this.level
      )

    },

    /**
     * 点击列表其中一个触发
     * @param curr 当前点击的
     */
    choose(curr) {
      let content = {
        [this.type.code]: String(curr[this.type.code]),
        [this.type.name]: curr[this.type.name]
      }

      if (this.type.level) content.level = curr.level
      if (this.type.showCode) content.showCode = curr[this.type.showCode]

      // 判断是单选或者多选
      if (this.single) {
        this.singleSelected = content.code

        this.selectList = []
        this.selectList.push(content)
      } else {
        const i = curr.selected ? -1 : 1
        const result = control(i, this.selectList.length, this.max)
        if (result) return

        curr.selected = !curr.selected

        curr.selected
          ? this.selectList.push(content)
          : this.selectList.splice(this.selectList.findIndex(n => n[this.type.code] === content[this.type.code]), 1)
      }

    }
  }
}
</script>

<style scoped lang="less">
.hs-modal-list-box {
  position: relative;

  .ant-spin-spinning {
    width: 100%;
    position: absolute;
    margin-top: 20px;
  }

  .list-content {
    border: 1px solid @border-color;
    border-radius: 4px;

    > .list-body {
      margin: 0 !important;
      width: 100%;
      height: 200px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 5px;
    }

    > .header {
      height: 40px;
      line-height: 40px;
      padding-left: 8px;
      display: flex;
      justify-content: space-between;
      background-color: @background-color;
      border-bottom: 1px solid @border-color;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      .title {
        .name {
          font-weight: bold;
        }

        .count {
          font-size: 12px;
        }
      }

      .checked-button {
        margin-right: 18px;

        button {
          border: 0;
          color: #000;
          padding: 0 8px;
          font-size: 13px;
          background-color: @background-color;
          box-shadow: none;
          line-height: 35px;
          margin-right: 3px;

          &:hover {
            border: 0;
            box-shadow: 2px 2px 2px #888888;
            color: #000;
          }

          i {
            color: @element-selected-color;
          }
        }
      }
    }
  }

  > .selected-box {
    margin-top: 10px;
  }
}

.hs-modal-list-box [class^='ant-col-'] {
  margin: 0;
  border: 0;
  padding: 8px 10px 1px 10px;
  background: transparent;

  > div {
    height: 35px;
    padding: 5px 5px 0 5px;
    border: 1px solid #fff;
    border-radius: 5px;

    &:hover {
      position: relative;
      background: #aab0b8;
      color: #fff;
      cursor: pointer;
    }

    div {
      position: relative;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  }

  pre {
    background: #f9f9f9;
    border-radius: 6px;
    font-size: 13px;
    padding: 8px 16px;
  }

  .selectLike {
    background: @element-selected-color;
    color: #fff !important;
  }
}
</style>
