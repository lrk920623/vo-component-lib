<template>
  <div class="tree-box">
    <div
      v-for="(curr, index) in tree"
      :key="index"
      class="single-tree-box">
      <p>{{ levelNames[getLevelIndex(curr.level)] }}</p>
      <ul>
        <li
          v-for="(item, i) in curr.list"
          :key="i"
          :class="{selected: item[type.code] === curr.selectCode}"
          :title="item[type.name]"
          @click="choose(item, curr)">
          <div>
            <span v-if="item[type.code]">
              [{{ item[type.code] }}]
            </span>
            <span :class="{all: !item[type.code]}">
              {{ item[type.name] }}
            </span>
          </div>
          <a-icon
            v-show="item[type.code]"
            type="right"></a-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoModalTree',

  props: {
    // exp: [{level: ..., list: ...}]
    treeData: {
      type: Array,
      required: true
    },

    type: {
      type: Object,
      required: true
    },

    levelType: {
      type: Array,
      required: true
    },

    level: {
      type: Number,
      required: true
    },

    promise: {
      type: Function,
      required: true
    },

    multi: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data() {
    return {
      tree: {},
      levelNames: this.levelType.map(s => s.name),
      isClass: this.type.sign === 'class'
    }
  },

  watch: {
    treeData(val) {
      if (!val) return
      this.tree = val
    },

    level(val) {
      if (!val) return

      this.tree = this.treeData.splice()
    }
  },

  methods: {
    getLevelIndex(level) {
      return this.levelType.findIndex(s => s.id === level)
    },

    /**
     * 打开一个类目(选定一个类目)
     * 并尝试展示其子类目
     * @param item
     * @param parent
     */
    choose(item, parent) {
      // 保存当前点击的树形结构中的分类
      this.$set(parent, 'selectCode', item[this.type.code])

      if (this.multi) {
        // 清空输入框的过滤值
        this.search = ''

        // 多选模式中 点击树形结构的分类触发获取指定层级子分类
        this.$emit('getListByCode', parent.selectCode)

        // 如果点击的全部或者点击level大于等于this.level 不去获取子分类
        if (!item.level) {
          this.tree = this.tree.slice(0, 1)
          return
        }

        if (item.level >= this.level - 1) return

        if (!item[this.type.code]) {
          _.remove(this.tree, c => c.level > item.level)
          return
        }
      }

      // 获取子分类
      this.getSubTree(item, parent)
    },

    async getSubTree(item, parent) {
      // 查询当前选中的是第几级
      let levelIdx = parent.level - 1
      if (levelIdx >= 3) return

      if (this.tree[levelIdx + 1]) this.tree.splice(levelIdx + 1)

      // 请求后台获取子分类
      const payload = { moduleId: this.moduleId }

      this.isClass
        ? (payload.classCode = item.classCode)
        : (payload.categoryCode = item.categoryCode)

      const { data } = await this.promise(payload)

      item.children = this.isClass ? data.mtClassModels : data.categories
      if (!item.children || !item.children.length) return

      if (this.tree[levelIdx + 2]) this.tree.splice(levelIdx + 2)

      if (this.tree[this.tree.length - 1].level === item.children[0].level) {
        this.tree.splice(this.tree.length - 1, 1)
      }

      this.tree.push({
        level: levelIdx + 2,
        list: item.children
      })
    }
  }
}
</script>

<style lang='less'>
.tree-box {
  background: @background-color;
  display: flex;
  margin-bottom: 10px;

  .single-tree-box {
    border: 1px solid @border-color;
    width: 20%;
    background: #fff;

    > p {
      color: #666666;
      font-weight: 700;
      text-align: center;
      margin: 0;
      height: 26px;
      line-height: 27px;
    }

    > ul {
      height: 155px;
      overflow-y: auto;
      padding: 0 6px 0 6px;
      margin-bottom: 1px;

      li {
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        padding-left: 5px;
        border: 1px solid transparent;
        border-radius: 5px;
        display: flex;

        &.selected {
          background-color: @element-selected-color !important;
          color: #fff;
        }

        > div {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          > .all {
            letter-spacing: 17px;
          }
        }

        > i {
          position: relative;
          top: 8px;
          width: 15px;
          height: 15px;
          color: #cacaca;
          font-size: 10px;
        }

        &:hover {
          cursor: pointer;
          background: @element-hover-color;
        }
      }
    }
  }
}
</style>
