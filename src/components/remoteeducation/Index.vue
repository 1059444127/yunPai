<template>
  <div class="remoteeducation">
      <div class="education-menu">
        <ul>
          <li v-for="item in RemoteEducationMenu"
                        v-bind:key="item.index"
                        v-bind:index="item.index">
              <router-link class="link" 
                           :to="item.path"
                           active-class="active">
                    <i class="el-icon-menu"></i>
                    <span class="menu-title">{{item.name}}</span>
              </router-link>
          </li>
        </ul>
      </div>
      <div class="education-content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as apiConfig from "./../../api/config";
import Sidebar from "@/components/common/Sidebar.vue";
import RemoteEducationMenu from "./../../utils/RemoteEducationMenu";

@Component({
  components: {
    sidebar: Sidebar
  }
})
export default class Index extends Vue {
  menuIndex: string = "1";

  get RemoteEducationMenu() {
    return RemoteEducationMenu[0].menus;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.remoteeducation {
  width: 100%;
  min-height: 900px;
  background: #fff;
  overflow: hidden;
  padding: 10px;
  
  .education-menu {
    float: left;
    width: 200px;

    ul {
      width: 100%;
      padding: 0;
      margin: 0;

      li {
        width: 100%;
        height: 56px;
        line-height: 56px;
        text-align: -webkit-match-parent;
        background: #42e0b7;
        border-bottom: 1px solid #fff;

        .link {
          width: 100%;
          padding: 0 20px;
          color: #fff;

          .menu-title {
            font-size: 14px;
            margin-left: 10px;
          }
        }

        &:hover,
        .active {
          background: #00b050;
          font-weight: bold;
        }
      }
    }
  }

  .education-content {
    position: relative;
    padding: 20px 30px 30px 30px;
    width: calc(100% - 220px);
    height: 100%;
    float: right;

    .content-title {
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
      font-size: 18px;
      color: #42e0b7;
      width: 100%;
      border-bottom: 1px solid #eee;
      font-weight: bold;
    }

    .content-nav {
      width: 100%;
      padding: 20px 10px 40px 0;
      overflow: hidden;

      .nav-list {
        float: left;
        clear: both;

        .nav-item {
          float: left;
          margin-right: 26px;
        }
      }

      .nav-search {
        float: right;
      }
    }

    .content-list {
      .list-detail {
        width: 100%;
      }
    }
  }
}
</style>