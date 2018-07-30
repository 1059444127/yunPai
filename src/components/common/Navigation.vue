<template>
  <div class="navigation">
      <ul class="menu-list">
          <li class="menu-item" 
              v-for="item in menuList" 
              v-bind:key="item.index"
              v-show="item.show">
              <router-link class="link" 
                           :to="item.path"
                           active-class="active">
                           {{item.name}}
              </router-link>
          </li>
      </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RoleMenu from "./../../utils/RoleMenu";
@Component
export default class Navigation extends Vue {
  // todo: 控制权限
  @Prop() admin: string;

  get menuList() {
    return RoleMenu[0].menus;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.navigation {
  width: 100%;
  height: 100%;

  .menu-list {
    clear: both;

    .menu-item {
      float: left;
      height: 72px;
      line-height: 72px;
      width: 120px;
      text-align: center;
      color: #fff;
      font-family: "SimHei";
      font-size: 18px;

      .link {
        color: #fff;
      }

      &:hover,
      .active {
        background: #00c2a3;
      }
    }
  }
}
</style>
