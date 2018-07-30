<template>
  <div class="department-list"
      v-show="show"
      @scroll.prevent>

    <div class="department-list-content">
        <div class="department-list-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"></span>
            </div>
            <div class="dialog-content" id="dialog-content">
                <div class="dialog-content-title">
                    <span class="choose-hospital-title">{{chooseHospitalTitle}}</span>
                    <span class="next-icon">></span>
                    <span class="choose-department-title">{{chooseDepartmentTitle}}</span>
                    <span class="dis-next-icon">></span>
                    <span class="choose-doctorandtime-title">{{chooseDoctorAndTimeTitle}}</span>
                    <el-button size="mini" class="return-hospital-list my-btn my-btn-radius on" @click="toHospitalList()">返回</el-button>
                </div>
                <div class="department-list-area">
                    <div class="hospital-info">
                        <span class="hospital-title">{{hospitalName}}</span>
                        <span class="hospital-link pointer" @click="changeRemarksStatus">简介</span>
                        <span class="prompt">平台已开通该院的在线预约挂号，选择科室后可直接预约挂号</span>
                    </div>
                    <div class="hospital-remarks" v-show="hospitalRemarksShow">
                      {{hospitalRemarks}}
                    </div>
                    <div class="department-detail-list">
                        <div type="text"
                            v-for="item in departmentInfoList"
                            :key="item.id"
                            class="department-detail-item">
                            <table>
                                <tr>
                                    <td class="department-unit">
                                        {{item.deptClassName}}
                                    </td>
                                    <td class="detail-info">
                                        <el-button type="text" 
                                           class="department-link"
                                           v-for="subItem in item.openedDeptList"
                                           :key="subItem.openedDeptCode"
                                           @click="[visitType===0?toAppointmentListDetail(subItem):toCreateReferralList(subItem)]">
                                           {{subItem.openedDeptName}}
                                        </el-button>
                                    </td>
                                </tr>
                            </table>
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

@Component
export default class DepartmentList extends Vue {
  dialogTitle: string = "选择";
  chooseHospitalTitle: string = "选择医院";
  chooseDepartmentTitle: string = "选择科室";
  chooseDoctorAndTimeTitle: string = "选择医生/就诊时间";
  rollInHospitalShow: boolean = false;

  hospitalName: string = "";
  hospitalRemarks: string = "";
  hospitalRemarksShow: boolean = false;
  visitType: string = "";

  const_list = ConstList;

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  Init() {
    this.hospitalName = store.state.referral.selectHospital.hconame;
    this.hospitalRemarks = store.state.referral.selectHospital.remarks;
    this.hospitalRemarksShow = false;
    this.visitType = store.state.referral.pageParame.visitType;
    this.getOpenedDeptForReferral();
  }

  // 切换简介显示状态
  changeRemarksStatus() {
    this.hospitalRemarksShow = !this.hospitalRemarksShow;
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

  toConfirmReferral() {
    this.show = false;
    this.$emit("to-confirm", "");
    this.scrollToTop();
  }

  toHospitalList() {
    this.show = false;
    this.$emit("to-hospitallist", "");
    this.scrollToTop();
  }

  toAppointmentListDetail(obj: any) {
    this.show = false;

    store.commit(types.SELECTDEPARTMENT, {
      deptcode: obj.openedDeptCodecode,
      deptname: obj.openedDeptName
    });

    this.$emit("to-appointmentlist", "");
    this.scrollToTop();
  }

  toCreateReferralList(obj: any) {
    this.show = false;
    store.commit(types.SELECTDEPARTMENT, {
      deptcode: obj.openedDeptCode,
      deptname: obj.openedDeptName
    });
    store.commit(types.APPOINTMENTINFO, {
      appointmentInfo: ""
    });
    this.$emit("to-create", "");
    this.scrollToTop();
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

  departmentInfoList: {}[] = [{}];

  // 获取转诊科室信息
  getOpenedDeptForReferral() {
    const _this = this;
    var requestModel: {} = {
      hcocode: store.state.referral.selectHospital.hcocode,
      visitType: this.visitType
    };

    Vue.prototype.$http
      .post(apiConfig.API.getOpenedDeptForReferral, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.departmentInfoList = response.data.data;
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
.department-list {
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

  .department-list-content {
    width: 920px;
    margin: 50px auto;
    height: calc(100% - 100px);

    .department-list-dialog {
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

          .next-icon {
            margin: 0 10px;
            color: #1bd0a1;
          }

          .choose-department-title {
            color: #1bd0a1;
          }

          .dis-next-icon {
            margin: 0 10px;
            color: #97a9bf;
          }

          .choose-doctorandtime-title {
            color: #97a9bf;
          }

          .return-hospital-list {
            float: right;
            margin: 5px;
          }
        }

        .department-list-area {
          padding: 30px 0 10px 0;

          .hospital-info {
            overflow: hidden;

            .hospital-title {
              float: left;
              display: block;
              height: 30px;
              line-height: 30px;
              padding-left: 30px;
              background: url("./../../../../assets/image/common_hospital_icon.png")
                no-repeat left;
              font-size: 20px;
              color: #30e0b2;
            }

            .hospital-link {
              float: left;
              padding: 0;
              margin: 0;
              margin-left: 20px;
              line-height: 30px;
              color: #666666;
              font-size: 14px;
            }

            .prompt {
              float: right;
              display: block;
              color: #f7ba2a;
              line-height: 30px;
              padding-left: 30px;
              padding-left: 26px;
              background: url("./../../../../assets/image/common_tip_icon.png")
                no-repeat left;
            }
          }

          .hospital-remarks {
            color: #999;
          }

          .department-detail-list {
            .department-detail-item {
              width: 100%;
              margin-top: 10px;
              border: 1px solid #bfcbd9;
              margin-bottom: 10px;
              color: #333333;

              table {
                border-collapse: collapse;

                td:first-child {
                  border-right: 1px solid #bfcbd9;
                }

                .department-unit {
                  width: 100px;
                  background: #eeeaf2;
                  vertical-align: middle;
                  text-align: center;
                  font-size: 20px;
                }

                .detail-info {
                  width: calc(100% - 100px);
                  padding: 10px;

                  .department-link {
                    float: left;
                    width: 150px;
                    margin-left: 0;
                    color: #333333;
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
