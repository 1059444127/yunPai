<template>
  <div class="remotediagnosis">
      <div class="diagnosis-menu">
        <ul>
          <li v-for="item in remoteDiagnosisMenu"
                        v-bind:key="item.index"
                        v-bind:index="item.index">
              <router-link class="link" 
                           :to="item.path"
                           :class="item.icon"
                           active-class="active">
                    <span class="menu-title">{{item.name}}</span>
              </router-link>
          </li>
        </ul>
      </div>
      <div class="diagnosis-content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as apiConfig from "./../../api/config";
import RemoteDiagnosisMenu from "./../../utils/RemoteDiagnosisMenu";

@Component
export default class Index extends Vue {
  menuIndex: string = "1";

  created() {
    this.$router.push({ name: "remoteimage" });
  }

  get remoteDiagnosisMenu() {
    return RemoteDiagnosisMenu[0].menus;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.remotediagnosis {
  width: 100%;
  min-height: 900px;
  background: #fff;
  overflow: hidden;
  padding: 10px;

  .diagnosis-menu {
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
          padding: 0 15px 0 40px;
          color: #fff;

          &.image {
            background: url("./../../assets/image/common_menu_icon_image.png")
              no-repeat 15px;
            background-size: 25px 25px;

            &.active {
              background: #00b050
                url("./../../assets/image/common_menu_icon_image.png") no-repeat
                15px;
              background-size: 25px 25px;
            }
          }

          &.ecg {
            background: url("./../../assets/image/common_menu_icon_ecg.png")
              no-repeat 15px;
            background-size: 25px 25px;

            &.active {
              background: #00b050
                url("./../../assets/image/common_menu_icon_ecg.png") no-repeat
                15px;
              background-size: 25px 25px;
            }
          }

          &.pathology {
            background: url("./../../assets/image/common_menu_icon_pathology.png")
              no-repeat 15px;
            background-size: 25px 25px;

            &.active {
              background: #00b050
                url("./../../assets/image/common_menu_icon_pathology.png")
                no-repeat 15px;
              background-size: 25px 25px;
            }
          }

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

  .diagnosis-content {
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
