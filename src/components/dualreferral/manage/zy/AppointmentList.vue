<template>
  <div class="appointment-list"
        v-show="show"
        @scroll.prevent>

    <div class="appointment-content">
        <div class="appointment-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"></span>
            </div>
            <div class="dialog-content" id="dialog-content">
                <div class="dialog-content-title">
                    <span class="choose-hospital-title">{{chooseHospitalTitle}}</span>
                    <span class="next-icon">></span>
                    <span class="choose-department-title">{{chooseDepartmentTitle}}</span>
                    <span class="next-icon">></span>
                    <span class="choose-doctorandtime-title">{{chooseDoctorAndTimeTitle}}</span>
                    <el-button size="mini" class="return-hospital-list my-btn my-btn-radius on" @click="toDepartmentList()">返回</el-button>
                </div>
                <div class="appointment-area">
                    <div class="hospital-info">
                        <span class="hospital-title">{{hospitalName+departmentName}}</span>
                        <span class="hospital-link pointer" @click="changeRemarksStatus">简介</span>
                        <div class="switch-btn">
                          <span class="date-title">日期：</span>
                          <el-button plain size="mini"><</el-button>
                          <el-button plain size="mini">></el-button>
                        </div>
                    </div>
                    <div class="hospital-remarks" v-show="hospitalRemarksShow">
                      {{hospitalRemarks}}
                    </div>
                    <div class="appointment-detail-list">
                        <table class="appointment-detail-item">
                          <tr>
                            <th class="item-title">普通号</th>
                            <th width="80">时间段</th>
                            <th width="80"
                                v-for="item in appointmentList"
                                v-bind:key="item.index">
                                {{item.weekday}}<br>
                                <span class="detail">{{item.date+item.note}}</span>
                            </th>
                          </tr>
                          <tr>
                            <td class="item-appointment" rowspan="2"><span>{{departmentName}}</span></td>
                            <td>上午</td>
                            <td v-for="item in appointmentList"
                                v-bind:key="item.index">
                              <el-button class="btn-appointment" size="mini" @click="toCreateReferralList(item,'上午','普通门诊')">预约</el-button>
                            </td>
                          </tr>
                          <tr>
                            <td>下午</td>
                            <td v-for="item in appointmentList"
                                v-bind:key="item.index">
                              <el-button class="btn-appointment" size="mini" @click="toCreateReferralList(item,'下午','普通门诊')">预约</el-button>
                            </td>
                          </tr>
                        </table>
                        <table class="appointment-detail-item" v-show="false">
                          <tr>
                            <th>专家号</th>
                            <th width="80">时间段</th>
                            <th width="80">星期四<br><span class="detail">11-22明天</span></th>
                            <th width="80">星期五<br><span class="detail">11-23后天</span></th>
                            <th width="80">星期六<br><span class="detail">11-24</span></th>
                            <th width="80">星期天<br><span class="detail">11-25</span></th>
                            <th width="80">星期一<br><span class="detail">11-26</span></th>
                            <th width="80">星期二<br><span class="detail">11-27</span></th>
                            <th width="80">星期三<br><span class="detail">11-28</span></th>
                          </tr>
                          <tr>
                            <td rowspan="2">周建英<br><span class="title">主任医师</span></td>
                            <td>上午</td>
                            <td><el-button type="info" size="mini" plain disabled>已满</el-button></td>
                            <td><el-button type="info" size="mini" plain disabled>已满</el-button></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                          </tr>
                          <tr>
                            <td>下午</td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                            <td></td>
                            <td><el-button type="info" size="mini" plain disabled>已满</el-button></td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                            <td><el-button type="info" size="mini" plain disabled>已满</el-button></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </table>
                        <table class="appointment-detail-item" v-show="false">
                          <tr>
                            <th>专家号</th>
                            <th width="80">时间段</th>
                            <th width="80">星期四<br><span class="detail">11-22明天</span></th>
                            <th width="80">星期五<br><span class="detail">11-23后天</span></th>
                            <th width="80">星期六<br><span class="detail">11-24</span></th>
                            <th width="80">星期天<br><span class="detail">11-25</span></th>
                            <th width="80">星期一<br><span class="detail">11-26</span></th>
                            <th width="80">星期二<br><span class="detail">11-27</span></th>
                            <th width="80">星期三<br><span class="detail">11-28</span></th>
                          </tr>
                          <tr>
                            <td rowspan="2">杨光叠<br><span class="title">副主任医师</span></td>
                            <td>上午</td>
                            <td></td>
                            <td></td>
                            <td><el-button type="info" size="mini" plain disabled>已满</el-button></td>
                            <td></td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>下午</td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><el-button type="success" size="mini" @click="toCreateReferralList">预约</el-button></td>
                          </tr>
                        </table>
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

@Component
export default class AppointmentList extends Vue {
  dialogTitle: string = "选择";
  chooseHospitalTitle: string = "选择医院";
  chooseDepartmentTitle: string = "选择科室";
  chooseDoctorAndTimeTitle: string = "选择医生/就诊时间";
  rollInHospitalShow: boolean = false;

  hospitalName: string = "";
  hospitalRemarks: string = "";
  hospitalRemarksShow: boolean = false;
  departmentName: string = "";

  const_list = ConstList;

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  // 预约时间表
  appointmentList: {}[] = [];

  Init() {
    this.hospitalName = store.state.referral.selectHospital.hconame;
    this.hospitalRemarks = store.state.referral.selectHospital.remarks;
    this.departmentName = store.state.referral.selectDepartment.deptname;
    this.hospitalRemarksShow = false;

    // 初始化预约时间表
    this.appointmentList = [];
    var i: number;
    for (i = 1; i <= 7; i++) {
      var dt = new Date();
      dt.setDate(dt.getDate() + i);
      var dateStr: string = (dt.getMonth() + 1).toString() + "-" + dt.getDate();
      var noteStr: string = "";
      if (i === 1) {
        noteStr = "明天";
      } else if (i === 2) {
        noteStr = "后天";
      }

      var obj: {} = {
        index: i,
        weekday: this.getWeekday(dt.getDay()),
        datetime:
          dt.getFullYear() +
          "-" +
          (dt.getMonth() + 1).toString() +
          "-" +
          dt.getDate(),
        date: dateStr,
        note: noteStr,
        am: "",
        pm: ""
      };

      this.appointmentList.push(obj);
    }
  }

  getWeekday(index: number): string {
    var wd: string = "";
    switch (index) {
      case 0:
        wd = "星期日";
        break;
      case 1:
        wd = "星期一";
        break;
      case 2:
        wd = "星期二";
        break;
      case 3:
        wd = "星期三";
        break;
      case 4:
        wd = "星期四";
        break;
      case 5:
        wd = "星期五";
        break;
      case 6:
        wd = "星期六";
        break;
    }
    return wd;
  }

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#dialog-content");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  // 切换简介显示状态
  changeRemarksStatus() {
    this.hospitalRemarksShow = !this.hospitalRemarksShow;
  }

  closeDialog() {
    this.show = false;
    this.InitialStore();
    this.scrollToTop();
  }

  toCreateReferralList(obj: any, time: string, outpatientType: string) {
    this.show = false;

    store.commit(types.APPOINTMENTINFO, {
      appointmentInfo:
        "已预约" +
        obj.datetime +
        " " +
        time +
        " " +
        this.departmentName +
        " " +
        outpatientType
    });

    this.$emit("to-create", "");
    this.scrollToTop();
  }

  toDepartmentList() {
    this.show = false;
    this.$emit("to-departmentlist", "");
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.appointment-list {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: #666;
  line-height: 24px;
  font-size: 14px;

  .appointment-content {
    width: 920px;
    margin: 50px auto;
    height: calc(100% - 100px);

    .appointment-dialog {
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

          .choose-hospital-title,
          .choose-department-title,
          .choose-doctorandtime-title {
            color: #1bd0a1;
          }

          .next-icon {
            margin: 0 10px;
            color: #1bd0a1;
          }

          .return-hospital-list {
            float: right;
            margin: 5px;
          }
        }

        .appointment-area {
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

            .switch-btn {
              float: right;
            }
          }

          .hospital-remarks {
            color: #999;
          }

          .appointment-detail-list {
            .appointment-detail-item {
              width: 100%;
              margin-top: 10px;
              margin-bottom: 10px;
              border-collapse: collapse;
              text-align: center;

              th,
              td {
                border: 1px solid #bfcbd9;
                color: #333;
                font-size: 14px;
                font-weight: normal;
              }

              th {
                &.item-title {
                  font-size: 14px;
                  background: #eeeaf2;
                }

                .detail {
                  font-size: 12px;
                }
              }

              td {
                padding: 5px 0;

                &.item-appointment {
                  font-size: 20px;
                  background: #eeeaf2;
                }

                .title {
                  color: #bbb;
                }

                .btn-appointment {
                  border: 1px solid #30e0b2 !important;
                  color: #fff;
                  background: #30e0b2 !important;

                  &:hover,
                  &.on {
                    color: #fff !important;
                    background: #30e0b2 !important;
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
