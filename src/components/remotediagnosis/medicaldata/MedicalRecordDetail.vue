<template>
  <div class="medicaldata">
      <div class="data-menu">
        <div class="user-name">
          赵自林
        </div>
        <div class="return-btn" @click="returnRecord">
          < 返回就诊记录列表
        </div>
        <div class="record-info">
            2017-11-02 宜宾市中医院内科 肺炎，高血压
        </div>
        <div>
            <span class="menu-title">病案首页</span>
            <el-tree :data="menuList" 
                     default-expand-all
                     highlight-current="true"
                     :expand-on-click-node="false"
                     :props="defaultProps"
                     @node-click="handleNodeClick">
            </el-tree>
        </div>
      </div>
      <div class="data-content">
            <router-view></router-view>
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
export default class MedicalRecordDetail extends Vue {
  menuList: {}[] = [
    {
      id: "1",
      type: "",
      label: "病历",
      children: [
        {
          id: "1-1",
          type: "1",
          label: "04-07 入院记录"
        },
        {
          id: "1-2",
          type: "1",
          label: "04-08 病程记录"
        },
        {
          id: "1-3",
          type: "1",
          label: "04-11 会诊记录"
        }
      ]
    },
    {
      id: "2",
      type: "2",
      label: "医嘱"
    },
    {
      id: "3",
      type: "",
      label: "处方",
      children: [
        {
          id: "3-1",
          type: "3",
          label: "04-07 普通西药处方"
        }
      ]
    },
    {
      id: "4",
      type: "",
      label: "检查",
      children: [
        {
          id: "4-1",
          type: "4",
          label: "04-07 [放射]胸部正位片"
        },
        {
          id: "4-2",
          type: "4",
          label: "04-07 [心电图]1导联常规心电图"
        }
      ]
    },
    {
      id: "5",
      type: "",
      label: "检验",
      children: [
        {
          id: "5-1",
          type: "5",
          label: "04-07 血常规 "
        },
        {
          id: "5-2",
          type: "5",
          label: "04-07 尿常规"
        },
        {
          id: "5-3",
          type: "5",
          label: "04-07 生化十二项"
        }
      ]
    }
  ];

  defaultProps: {
    children: "children";
    label: "label";
  };

  Init() {}

  mounted() {
    this.Init();
  }

  returnRecord() {
    this.$emit(
      "page-redirect",
      "/remotediagnosis/remoteimage/medicaldata/medicalrecord"
    );
  }

  handleNodeClick(obj: any) {
    switch (obj.type) {
      case "1":
        this.$router.push({ name: "imagemrdcase" });
        break;
      case "2":
        this.$router.push({ name: "imagemrddoctor" });
        break;
      case "3":
        alert("开发中...");
        break;
      case "4":
        this.$router.push({ name: "imagemrdstudy" });
        break;
      case "5":
        this.$router.push({ name: "imagemrdtest" });
        break;
      default:
        break;
    }
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
    width: 260px;

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

    .record-info {
      padding: 10px 20px;
      background: #f0faf6;
    }

    .menu-title {
      margin-left: 24px;
    }
  }

  .data-content {
    position: relative;
    padding: 20px 30px 30px 30px;
    width: calc(100% - 280px);
    height: 100%;
    float: left;
  }
}
</style>
