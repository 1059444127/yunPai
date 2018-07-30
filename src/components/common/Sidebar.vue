<template>
  <div class="sidebar">
    <ul class="sidebar-list">
      <li class="sidebar-item" 
          v-for="item in sidebarList" 
          v-bind:key="item.index"
          v-bind:class="[item.index===subMenuIndex?'on':'',item.icon]">
          <router-link class="link" :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RoleMenu from "./../../utils/RoleMenu";
@Component
export default class SideBar extends Vue {
  @Prop() menuIndex: string;
  @Prop() subMenuIndex: string;

  get sidebarList() {
    const _this = this;
    const list: any = RoleMenu[0].menus.find(function(item) {
      return item.index === _this.menuIndex;
    });

    if (list !== null) {
      return list.subMenus;
    } else {
      return null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  width: 100%;
  height: 100%;
  padding: 25px 10px;

  .sidebar-list {
    .sidebar-item {
      height: 30px;
      line-height: 30px;
      padding-left: 40px;

      .link {
        color: #707272;
      }
    }
  }
}
</style>
