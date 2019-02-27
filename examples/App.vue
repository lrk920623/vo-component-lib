<template>
  <div id="app">
    <div id="nav">
      <div>
        <h2>vo-input</h2>
        <vo-input></vo-input>
      </div>
      <div>
        <h2>vo-select</h2>
        <vo-select :list="selectList"></vo-select>
      </div>
    </div>
  </div>
</template>

<script>
import VoInput from "packages/base/input";
import VoSelect from "packages/base/select";

export default {
  components: {
    VoInput,
    VoSelect
  },

  data() {
    return {
      selectList: [1, 2, 3, 4]
    };
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
