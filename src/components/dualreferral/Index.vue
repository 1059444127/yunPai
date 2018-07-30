<template>
  <div class="main">
      <div class="menu">
        <!-- <div class="menu-title">双向转诊</div> -->
        <navMenu :menutype="menuType"></navMenu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../vuex/store";
import * as types from "./../../vuex/types";
import * as apiConfig from "./../../api/config";
import NavMenu from "@/components/common/NavMenu.vue";

@Component({
  components: {
    navMenu: NavMenu
  }
})
export default class Index extends Vue {
  menuType: string = "Referral";

  mounted() {
    this.$emit("web-title-change", "分级转诊平台");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width: 100%;
  overflow: hidden;
  height: 100%;

  .menu {
    float: left;
    width: 220px;
    height: 100%;
    border: 1px solid #d8dde3;
    background: #fff;
    overflow-y: auto;

    .menu-title {
      width: 100%;
      height: 46px;
      line-height: 46px;
      background: #1bd0a1 url("./../../assets/image/first_menu_icon.png")
        no-repeat 16px;
      padding-left: 50px;
      color: #fffefe;
      font-size: 14px;
    }
  }

  .content {
    float: right;
    position: relative;
    border: 1px solid #d8dde3;
    background: #fff;
    width: calc(100% - 240px);
    height: 100%;
    overflow-y: auto;
  }
}
</style>
