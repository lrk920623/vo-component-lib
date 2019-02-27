<template>
  <div id="app">
    <div id="nav">
      <vo-input></vo-input>
    </div>
  </div>
</template>

<script>
import VoInput from "packages/base/input";

export default {
  components: {
    VoInput
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
