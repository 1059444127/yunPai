<template>
  <div class="inspection-record">
      <div class="inspection-record-content">
        <div class="content-title">{{pageTitle}}</div>
        <div class="content-nav">
            检验日期：
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
            检验名称：
            <el-input class="input" size="mini"></el-input>
            <span class="margin-span"></span>
            检验机构：
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
                    label="检验日期"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="检验名称"
                    min-width="230">
                </el-table-column>
                <el-table-column
                    prop="summary"
                    label="检验结论"
                    min-width="450">
                </el-table-column>
                <el-table-column
                    prop="agencyName"
                    label="检验机构名称"
                    min-width="297">
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
export default class InspectionRecord extends Vue {
  pageTitle: string = "检验记录";
  dateVal: any = null;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;

  // 检验记录数据
  dataList: {}[] = [
    {
      time: "2016-04-20",
      name: "血常规",
      summary: "血红蛋白117g/L，红细胞压积34.7%",
      agencyName: "宜宾市第一人民医院"
    },
    {
      time: "2016-01-07 ",
      name: "24小时尿蛋白定量测定",
      summary: "24小时尿量2730，尿白蛋白7.34mg ",
      agencyName: "宜宾市中医院"
    },
    {
      time: "2015-11-30",
      name: "肝功能15项",
      summary: "谷丙转氨酶190U/L，谷草转氨酶113u/L",
      agencyName: "宜宾市第一人民医院"
    },
    {
      time: "2015-04-17",
      name: "血清肌酸激酶测定",
      summary: "肌酸激酶98",
      agencyName: "江安县中医院"
    },
    {
      time: "2014-09-20",
      name: "一般细菌培养",
      summary: "普通培养无细菌生长",
      agencyName: "宜宾市中医院骨科医院"
    }
  ];

  Init() {}

  mounted() {
    this.Init();
  }

  toDetail() {
    this.$emit(
      "page-redirect",
      "/remotediagnosis/remoteimage/inspectionrecorddetail"
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.inspection-record {
  width: 100%;
  background: #fff;

  .inspection-record-content {
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
