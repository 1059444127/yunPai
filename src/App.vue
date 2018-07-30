<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import "babel-polyfill";
export default {
  name: "app"
};
</script>



<style>
@import "./assets/style/common.scss";
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#app {
  font-family: "Microsoft Yahei", "Arial Normal", "Arial";
  height: 100%;
  width: 100%;
  //min-width: 1200px;
}
</style>
