<template>
    <div class="mrd-content">
        <div class="content-title">
            {{pageTitle}}
            <span class="refresh-info">- 最后更新：2017-11-30 13:33 <el-button type="text">刷新</el-button></span>
        </div>
        <div class="content-detail">
            <el-table
                :data="dataList"
                class="list-detail"
                stripe>
                <el-table-column
                    type="index"
                    label="序号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="项目名称"
                    width="540">
                </el-table-column>
                <el-table-column
                    prop="summary"
                    label="结果"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="referenceValue"
                    label="参考值"
                    width="285">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";

@Component({
  components: {}
})
export default class MRDStudy extends Vue {
  pageTitle: string = "检验     2017-11-30 肝功能、肾功能";

  // 检验记录数据
  dataList: {}[] = [
    {
      name: "丙氨酸氨基转移酶（ALT）",
      summary: "22.7",
      unit: "IU/L",
      referenceValue: "9--501"
    },
    {
      name: "天门冬氨酸氨基转移酶（AST）",
      summary: "25.4",
      unit: "IU/L",
      referenceValue: "15--402"
    },
    {
      name: "碱性磷酸酶（ALP）",
      summary: "63.7",
      unit: "IU/L",
      referenceValue: "45--1253"
    },
    {
      name: "γ-谷氨酰转肽酶（GGT）",
      summary: "20.7",
      unit: "IU/L",
      referenceValue: "10-604"
    }
  ];

  Init() {}

  mounted() {
    this.Init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mrd-content {
  position: relative;
  width: 100%;

  .content-title {
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
    font-size: 18px;
    color: #42e0b7;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-weight: bold;

    .refresh-info {
      margin-left: 20px;
      color: #bbb;
      font-weight: normal;
      font-size: 14px;
    }
  }

  .content-detail {
    width: 100%;
    background: #7f7f7f;
  }
}
</style>
