<template>
  <div class="hospital-list"
      v-show="show"
      @scroll.prevent>

    <div class="hospital-list-content">
        <div class="hospital-list-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"></span>
            </div>
            <div class="dialog-content" id="dialog-content">
                <div class="dialog-content-title">
                    <span class="choose-hospital-title">{{chooseHospitalTitle}}</span>
                    <span class="dis-next-icon">></span>
                    <span class="choose-department-title">{{chooseDepartmentTitle}}</span>
                </div>
                <div class="search-bar">
                    <div class="search-key-list" v-show="false">
                        <el-button type="text"
                                   v-for="item in searchAreaList"
                                   :key="item.index">
                            {{item.name}}
                        </el-button>
                    </div>
                    <div class="search-key-input">
                        <div class="my-search-control">
                          <input :placeholder="noneSearchKeyMsg" type="text"/>
                          <div></div>
                        </div>
                    </div>
                </div>
                <div class="hospital-detail-list">
                    <div type="text"
                         v-for="item in hospitalInfoList"
                         :key="item.hCOCode"
                         class="hospital-detail-item pointer"
                         @click="toDepartmentList(item.hCOCode,item.hCOName,item.remarks)">
                        <img :src="'data:image/png;base64,'+imgUrl">
                        <div class="detail-info">
                            <span class="hospital-title">{{item.hCOName}}</span>
                            <span>等级：{{item.hospitalClassName}}</span>
                            <span>电话：{{item.contactPhone}}</span>
                            <span>地址：{{item.address}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "./../../../../utils/ConstList";
import store from "./../../../../vuex/store";
import * as types from "./../../../../vuex/types";
import * as apiConfig from "./../../../../api/config";
import ReferralRights from "./../../../../utils/ReferralRights";
import ValidateInfo from "./../../../../utils/ValidateInfo";

// 固定医院头像，以后会从数据库读取
import * as ConstVal from "./../../../../utils/ImgUrl";

@Component
export default class HospitalList extends Vue {
  dialogTitle: string = "选择";
  chooseHospitalTitle: string = "选择医院";
  chooseDepartmentTitle: string = "选择科室";
  noneSearchKeyMsg: string = "搜索医院";
  rollInHospitalShow: boolean = false;
  imgUrl: string = "";

  const_list = ConstList;

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  Init() {
    this.imgUrl = ConstVal.imgurl;
    this.getHCOForReferral();
  }

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#dialog-content");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  closeDialog() {
    this.show = false;
    this.InitialStore();
    this.scrollToTop();
  }

  toDepartmentList(code: string, name: string, mark: string) {
    this.show = false;
    store.commit(types.SELECTHOSPITAL, {
      hcocode: code,
      hconame: name,
      remarks: mark
    });

    this.$emit("to-departmentlist", "");
    this.scrollToTop();
  }

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;

    if (val) {
      this.Init();
    }
  }

  @Watch("showStatus", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("show-statue-change", val);
  }

  InitialStore() {
    store.commit(types.SELECTHOSPITAL, {
      hcocode: "",
      hconame: "",
      remarks: ""
    });
    store.commit(types.SELECTDEPARTMENT, {
      deptcode: "",
      deptname: ""
    });
    store.commit(types.APPOINTMENTINFO, {
      appointmentInfo: ""
    });
  }

  searchAreaList: {}[] = [
    {
      index: "1",
      name: "全部"
    },
    {
      value: "2",
      name: "省级"
    },
    {
      value: "3",
      name: "县级"
    },
    {
      value: "4",
      name: "乡镇级"
    },
    {
      value: "5",
      name: "村室"
    },
    {
      value: "5",
      name: "最近选择过的"
    }
  ];

  hospitalInfoList: {}[] = [{}];

  // 获取当前用户可转诊的医院列表
  getHCOForReferral() {
    const _this = this;

    var requestValue = "0"; // 0:不包含当前机构,1:包含

    Vue.prototype.$http
      .post(apiConfig.API.getHealthCareOrganizationDict, requestValue)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.hospitalInfoList = response.data.data;
        } else if (response.data.code === apiConfig.MESSAGECODE.ERROR) {
          _this.alert(response.data.message, "error");
        } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
          store.commit(types.LOGOUT);
          _this.$router.push({ path: "/" });
        } else if (
          response.data.code === apiConfig.MESSAGECODE.LACKOFAUTHORITY
        ) {
          _this.alert(ValidateInfo.LackOfAuthority, "error");
        } else {
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hospital-list {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: #5a5e66;
  line-height: 24px;
  font-size: 14px;

  .hospital-list-content {
    width: 920px;
    margin: 50px auto;
    height: calc(100% - 100px);

    .hospital-list-dialog {
      height: 100%;
      width: 100%;
      background: #fff;
      padding: 2px;
      padding-right: 20px;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

      .dialog-title {
        position: relative;
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 16px;
        color: #1bd0a1;

        .line {
          font-weight: bold;
          margin-right: 8px;
          display: inline-block;
          width: 2px;
          height: 11px;
          background: #30e0b2;
        }

        .close-dialog {
          position: absolute;
          right: 0;
          top: 19px;
          display: block;
          height: 22px;
          width: 22px;
          background: url("./../../../../assets/image/common_icon_close.png")
            no-repeat center;
          background-size: 60% 60%;

          &:hover {
            cursor: pointer;
          }
        }
      }

      .dialog-content {
        width: 100%;
        height: calc(100% - 100px);
        overflow-y: auto;
        margin: 20px 0;
        padding: 0 20px 0 30px;

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(155, 155, 155, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar {
          width: 8px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(155, 155, 155, 0.3);
          background-color: rgba(0, 0, 0, 0.4);
        }

        .dialog-content-title {
          font-size: 14px;
          height: 38px;
          line-height: 38px;
          background: #effaf6;
          padding-left: 24px;

          .choose-hospital-title {
            color: #1bd0a1;
          }

          .dis-next-icon {
            margin: 0 10px;
            color: #97a9bf;
          }

          .choose-department-title {
            color: #97a9bf;
          }
        }

        .search-bar {
          width: 100%;
          padding: 10px 20px 20px 170px;
          overflow: hidden;

          .search-key-list {
            float: left;
          }

          .search-key-input {
            float: right;
          }
        }

        .hospital-detail-list {
          overflow: hidden;

          .hospital-detail-item {
            float: left;
            width: calc(50% - 10px);
            margin-right: 10px;
            margin-bottom: 20px;
            overflow: hidden;

            span {
              display: block;
              font-size: 12px;

              &.hospital-title {
                font-size: 20px;
                color: #333333;
                line-height: 40px;
              }
            }

            img {
              float: left;
              width: 130px;
              height: 130px;
              border: 1px solid #ddd;
            }

            .detail-info {
              float: left;
              width: calc(100% - 157px);
              margin-left: 15px;
              font-size: 16px;
              color: #333333;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
