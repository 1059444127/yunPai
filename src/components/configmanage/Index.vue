<template>
  <div class="main">
      <div class="menu">
        <!-- <ul class="my-nav-menu">
          <li v-for="item in configManageMenu"
                        v-bind:key="item.index"
                        v-bind:index="item.index"
                        :class="[isCurPath(item.root)?'open':'close']">
              <router-link class="link" 
                           :to="item.path"
                           active-class="active">
                    <span :class="item.icon">{{item.name}}</span>
              </router-link>
              <ul>
                <li v-for="subitem in item.submenus"
                              v-bind:key="subitem.index"
                              v-bind:index="subitem.index">
                    <router-link class="link" 
                                :to="subitem.path"
                                active-class="active">
                          <span :class="subitem.icon">{{subitem.name}}</span>
                    </router-link>
                </li>
              </ul>
          </li>
        </ul> -->
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
  menuType: string = "ConfigManage";

  mounted() {
    this.$emit("web-title-change", "医联体云平台-运营管理");
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
  }

  .content {
    float: right;
    position: relative;
    border: 1px solid #d8dde3;
    background: #fff;
    width: calc(100% - 240px);
    height: 100%;
    overflow-x: auto;
    // overflow-y: auto;
  }
}
</style>
