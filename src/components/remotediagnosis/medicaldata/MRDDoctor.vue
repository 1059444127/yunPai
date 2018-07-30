<template>
    <div class="mrd-content">
        <div class="content-title">
            {{pageTitle}}
            <span class="refresh-info">- 最后更新：2017-11-30 13:33 <el-button type="text">刷新</el-button></span>
        </div>
        <div class="content-detail">
            <table>
                <tr>
                  <th width="80">长/临</th>
                  <th width="80">类别</th>
                  <th width="200">医嘱内容</th>
                  <th width="80">剂量</th>
                  <th width="80">单位</th>
                  <th width="100">途径</th>
                  <th width="100">频次</th>
                  <th width="200">医生说明</th>
                  <th width="100">其他备注</th>
                  <th width="120">下达时间</th>
                  <th width="120">停止时间</th>
                </tr>
                <tr v-for="item in dataList"
                    v-bind:key="item.id"
                    :class="tableRowClassName(item)">
                  <td>{{item.deadline}}</td>
                  <td>{{item.type}}</td>
                  <td>{{item.advice}}</td>
                  <td>{{item.dose}}</td>
                  <td>{{item.unit}}</td>
                  <td>{{item.channel}}</td>
                  <td>{{item.frequency}}</td>
                  <td>{{item.explanation}}</td>
                  <td>{{item.note}}</td>
                  <td>{{item.start}}</td>
                  <td>{{item.end}}</td>
                </tr>
            </table>
            <!-- <el-table
                :data="dataList"
                :row-class-name="tableRowClassName"
                class="list-detail"
                stripe>
                <el-table-column
                    type="deadline"
                    label="长/临"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类别"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="advice"
                    label="医嘱内容"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="dose"
                    label="剂量"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="channel"
                    label="途径"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="frequency"
                    label="频次"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="explanation"
                    label="医生说明"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="note"
                    label="其他备注"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="start"
                    label="下达时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="end"
                    label="停止时间"
                    width="200">
                </el-table-column>
            </el-table> -->
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
export default class MRDDoctor extends Vue {
  pageTitle: string = "医嘱";

  // 医嘱记录数据
  dataList: {}[] = [
    {
      id: "1",
      deadline: "长期",
      type: "护理",
      advice: "II级护理",
      dose: "",
      unit: "",
      channel: "",
      frequency: "",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: "2015-04-21 11:24"
    },
    {
      id: "2",
      deadline: "长期",
      type: "药品",
      advice: "0.9%氯化钠注射液",
      dose: "250",
      unit: "ml",
      channel: "静脉滴注",
      frequency: "1次/日",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: "2015-04-21 11:24"
    },
    {
      id: "2",
      deadline: "",
      type: "",
      advice: "注射用复合辅酶",
      dose: "200",
      unit: "IU",
      channel: "",
      frequency: "",
      explanation: "",
      note: "",
      start: "",
      end: ""
    },
    {
      id: "3",
      deadline: "长期",
      type: "药品",
      advice: "0.9%氯化钠注射液",
      dose: "250",
      unit: "ml",
      channel: "静脉滴注",
      frequency: "3次/日",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: "2015-04-21 11:24"
    },
    {
      id: "3",
      deadline: "",
      type: "",
      advice: "注射用丹参多酚酸盐",
      dose: "0.2",
      unit: "g",
      channel: "",
      frequency: "",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: "2015-04-21 11:24"
    },
    {
      id: "4",
      deadline: "临时",
      type: "检查",
      advice: "CT头颅平扫",
      dose: "",
      unit: "",
      channel: "",
      frequency: "",
      explanation: "",
      note: "急",
      start: "2015-04-21 11:24",
      end: ""
    },
    {
      id: "5",
      deadline: "临时",
      type: "检查",
      advice: "DR胸部正侧位",
      dose: "",
      unit: "",
      channel: "",
      frequency: "",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: ""
    },
    {
      id: "6",
      deadline: "临时",
      type: "检查",
      advice: "12导联心电图检查",
      dose: "",
      unit: "",
      channel: "",
      frequency: "",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: ""
    },
    {
      id: "7",
      deadline: "临时",
      type: "检查",
      advice: "肝功能肾功能",
      dose: "",
      unit: "",
      channel: "",
      frequency: "",
      explanation: "",
      note: "",
      start: "",
      end: ""
    },
    {
      id: "8",
      deadline: "长期",
      type: "药品",
      advice: "杏林分散片",
      dose: "0.3",
      unit: "g",
      channel: "口服",
      frequency: "3次/日",
      explanation: "饭后服用",
      note: "",
      start: "2015-04-21 11:24",
      end: "2015-04-21 11:24"
    },
    {
      id: "9",
      deadline: "长期",
      type: "药品",
      advice: "地黄叶总苷胶囊",
      dose: "0.4",
      unit: "g",
      channel: "口服",
      frequency: "2次/日",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: "2015-04-21 11:24"
    },
    {
      id: "10",
      deadline: "长期",
      type: "处置",
      advice: "血糖监测",
      dose: "",
      unit: "",
      channel: "",
      frequency: "6次/日",
      explanation: "",
      note: "",
      start: "2015-04-21 11:24",
      end: "2015-04-21 11:24"
    }
  ];

  Init() {}

  mounted() {
    this.Init();
  }

  tableRowClassName(item: any) {
    if (item.deadline === "") {
      return "children";
    } else {
      return "";
    }
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

    table {
      font-size: 14px;
      color: #5a5e66;
      border-collapse: collapse;
      width: 1000px;
      overflow-x: auto;

      tr {
        color: #878d99;
        font-weight: 500;
        text-align: left;

        th {
          border-bottom: 2px solid #e6ebf5;
          padding: 12px 0;
          min-width: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          text-overflow: ellipsis;
          vertical-align: middle;
          position: relative;
        }

        td {
          border-top: 1px solid #e6ebf5;
          padding: 12px 0;
          min-width: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          text-overflow: ellipsis;
          vertical-align: middle;
          position: relative;
          color: #5a5e66;
        }

        &.children {
          td {
            border-top: 1px solid #fff;
          }
        }

        &:last-child {
          border-bottom: 2px solid #e6ebf5;
        }
      }
    }
  }
}
</style>
