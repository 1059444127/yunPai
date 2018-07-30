<template>
  <div class="medicaldata">
      <div class="data-menu">
        <div class="user-name">
          赵自林
        </div>
        <div class="return-btn" @click="returnRecord">
          < 返回检验记录列表
        </div>
      </div>
      <div class="data-content">
            <div class="content-title">
              {{pageTitle}}
              <span class="refresh-info">- 最后更新：2017-11-30 13:33 <el-button type="text">刷新</el-button></span>
            </div>
            <div class="content-list">
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
export default class InspectionRecordDetail extends Vue {
  pageTitle: string = "检验     2017-11-30 肝功能、肾功能";
  dateVal: any = null;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;

  // 检验记录数据
  dataList: {}[] = [
    {
      name: "丙氨酸氨基转移酶（ALT）",
      summary: "22.7",
      unit: "IU/L",
      referenceValue: "9--50"
    },
    {
      name: "天门冬氨酸氨基转移酶（AST）",
      summary: "25.4",
      unit: "IU/L",
      referenceValue: "15--40"
    },
    {
      name: "碱性磷酸酶（ALP）",
      summary: "63.7",
      unit: "IU/L",
      referenceValue: "45--125"
    },
    {
      name: "γ-谷氨酰转肽酶（GGT）",
      summary: "20.7",
      unit: "IU/L",
      referenceValue: "10-60"
    }
  ];

  Init() {}

  mounted() {
    this.Init();
  }

  returnRecord() {
    this.$emit(
      "page-redirect",
      "/remotediagnosis/remoteimage/medicaldata/inspectionrecord"
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.medicaldata {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding: 10px;

  .data-menu {
    float: left;
    width: 200px;

    .user-name {
      text-align: center;
      font-size: 20px;
      height: 40px;
      line-height: 40px;
    }

    .return-btn {
      color: #fff;
      background: #42e0b7;
      padding: 10px 20px;
      cursor: pointer;
    }
  }

  .data-content {
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

      .refresh-info {
        margin-left: 20px;
        color: #bbb;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
}
</style>
