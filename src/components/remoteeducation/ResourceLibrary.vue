<template>
    <div class="remoteeducation-resourcelibrary-content">
        <div class="content-title">{{pageTitle}}</div>
        <div class="content-list">
          <div class="list-detail">
            <router-view></router-view>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as apiConfig from "./../../api/config";
import RemoteEducationMenu from "./../../utils/RemoteEducationMenu";

@Component({
  components: {}
})
export default class ResourceLibrary extends Vue {
  pageTitle: string = "资源库";

  get remoteEducationMenu() {
    return RemoteEducationMenu[0].menus;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.remoteeducation-resourcelibrary-content {
  position: relative;
  width: 100%;
  height: 100%;

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

  .content-list {
    .list-detail {
      width: 100%;
    }
  }
}
</style>
