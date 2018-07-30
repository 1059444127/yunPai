<template>
    <div class="breadcrumb">
        <span class="breadcrumb-title">位置：</span>
        <el-breadcrumb class="breadcrumb-detail" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadList" 
                                :key="item"
                                :to="{ name: item.name }">
                                {{item.title}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Breadcrumb extends Vue {
  // todo: 控制权限
  breadList: any = [];

  get _activeRoute() {
    return this.$route.path;
  }

  @Watch("_activeRoute", { immediate: true })
  onRouteChanged() {
    this.breadList = this.$route.meta.routeList;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.breadcrumb {
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  color: #787878;
  font-size: 14px;

  .breadcrumb-title {
    float: left;
  }

  .breadcrumb-detail {
    float: left;
    height: 44px;
    line-height: 44px;
    margin-left: 5px;
  }
}
</style>