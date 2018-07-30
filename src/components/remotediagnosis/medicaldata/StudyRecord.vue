<template>
  <div class="study-record">
      <div class="study-record-content">
        <div class="content-title">{{pageTitle}}</div>
        <div class="content-nav">
            检查类别：
            <el-select clearable size="mini" placeholder="请选择">
                <el-option
                v-for="item in ageUnitOptList"
                :key="item.key"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
            <span class="margin-span"></span>
            检查日期：
            <el-select clearable size="mini" placeholder="请选择">
                <el-option
                v-for="item in ageUnitOptList"
                :key="item.key"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                v-model="dateVal"
                size="mini"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
            <br><br>
            检查项目：
            <el-input class="input" size="mini"></el-input>
            <span class="margin-span"></span>
            检查机构：
            <el-input class="input" size="mini"></el-input>
            <span class="margin-span"></span>
            <el-button size="mini">查找</el-button>
        </div>
        <div class="content-list">
            <el-table
                :data="dataList"
                class="list-detail"
                @row-click="toDetail()"
                stripe>
                <el-table-column
                    prop="time"
                    label="检查日期"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="检查类别"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="检查项目名称"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    prop="summary"
                    label="检查结论"
                    min-width="320">
                </el-table-column>
                <el-table-column
                    prop="agencyName"
                    label="检查机构名称"
                    min-width="327">
                </el-table-column>
            </el-table>
            <el-pagination
                class="page-control"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="itemCountPerPage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="itemCount">
            </el-pagination>
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
export default class StudyRecord extends Vue {
  pageTitle: string = "检查记录";
  dateVal: any = null;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;

  // 就诊记录数据
  dataList: {}[] = [
    {
      time: "2016-04-20",
      type: "放射",
      name: "胸部正位片",
      summary: "未见明显异常",
      agencyName: "宜宾市中医院"
    },
    {
      time: "2016-01-07 ",
      type: "超声",
      name: "颈部超声检查",
      summary: "双侧颈总、颈内、颈外动脉走行正",
      agencyName: "宜宾市中医院"
    },
    {
      time: "2014-09-20",
      type: "磁共振",
      name: "头颅MR",
      summary: "颅内未见明显异常",
      agencyName: "宜宾市第一人民医院"
    },
    {
      time: "2012-11-30",
      type: "心电图",
      name: "12导联常规心电图",
      summary: "正常心电图，窦性心率",
      agencyName: "江安县中医院"
    },
    {
      time: "2010-09-20",
      type: "磁共振",
      name: "头颅MR",
      summary: "颅内未见明显异常",
      agencyName: "宜宾市第一人民医院"
    }
  ];

  Init() {}

  mounted() {
    this.Init();
  }

  toDetail() {
    this.$emit(
      "page-redirect",
      "/remotediagnosis/remoteimage/studyrecorddetail"
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.study-record {
  width: 100%;
  background: #fff;

  .study-record-content {
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

    .content-nav {
      width: 100%;
      padding: 20px 10px 40px 0;
      overflow: hidden;

      .input {
        width: 183px;
      }

      .margin-span {
        margin-left: 30px;
      }
    }

    .content-list {
      width: 100%;

      .page-control {
        margin: 30px 0;
        float: right;
      }
    }
  }
}
</style>
