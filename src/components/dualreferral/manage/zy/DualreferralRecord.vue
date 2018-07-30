<template>
  <div class="dualreferral">
      <div class="dualreferral-content">
        <div class="content-title"><span>|</span>{{pageTitle}}</div>
        <div class="content-nav">
          <div class="nav-list">
            <el-badge class="nav-item"
                      v-for="item in dualreferralMenu" 
                      v-bind:key="item.index"
                      :value="getDataCount(item.index)" >
                <el-button size="medium"
                           class="my-btn"
                           @click="toRecordListByPath(item)"
                           v-bind:class="[item.index===curMenuIndex?'on':'',getDataCount(item.index)===0?'':'my-menu-btn']">
                           {{item.name}}
                </el-button>
            </el-badge>
          </div>
          <div class="nav-search">
            <div class="my-search-control">
              <input :placeholder="noneSearchKeyMsg" type="text"/>
              <div></div>
            </div>
          </div>
          <el-button size="medium"
                     class="my-btn create-btn"
                     @click="createReferral()">
                    + 新建转诊
          </el-button>
        </div>
        <div class="content-list">
          <div class="list-detail">
            <router-view @cur-tab-index="setCurTab"
                         @to-create-referral="CreateReferralById"
                         @to-refresh-count="updataTabCount()">
            </router-view>
          </div>
        </div>
      </div>

      <!-- Create referral start -->
      <createreferral :show="dialogCreateShow" 
                      :paraminfo="createReferralInfo"
                      :appointment="appointmentSuccess"
                      @show-statue-change="createDialogChange" 
                      @appointment-statue-change="appointmentStatusChange"
                      @to-confirm="confirmReferral"
                      @to-hospitallist="hospitalList">
      </createreferral>
      <confirmreferral :show="dialogConfirmShow" 
                       @show-statue-change="confirmDialogChange"
                       @refresh-page="refreshPage">
      </confirmreferral>
      <hospitallist :show="dialogHospitalListShow" 
                    @show-statue-change="hospitalListDialogChange" 
                    @to-departmentlist="departmentlist">
      </hospitallist>
      <departmentlist :show="dialogDepartmentListShow"
                      @show-statue-change="departmentListDialogChange"
                      @to-hospitallist="hospitalList"
                      @to-create="afterAppointment"
                      @to-appointmentlist="appointmentlist"></departmentlist>
      <appointmentlist :show="dialogAppointmentListShow"
                       @show-statue-change="appointmentListDialogChange"
                       @to-create="afterAppointment"
                       @to-departmentlist="departmentlist"></appointmentlist>
      <!-- Create referral end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../../vuex/store";
import * as types from "./../../../../vuex/types";
import * as apiConfig from "./../../../../api/config";
import DualreferralMenu from "./../../../../utils/DualreferralMenu";
import PendingAudit from "@/components/dualreferral/manage/zy/PendingAudit.vue";
import CreateReferral from "@/components/dualreferral/manage/zy/CreateReferral.vue";
import ConfirmReferral from "@/components/dualreferral/manage/zy/ConfirmReferral.vue";
import HospitalList from "@/components/dualreferral/manage/zy/HospitalList.vue";
import DepartmentList from "@/components/dualreferral/manage/zy/DepartmentList.vue";
import AppointmentList from "@/components/dualreferral/manage/zy/AppointmentList.vue";

@Component({
  components: {
    pendingaudit: PendingAudit,
    createreferral: CreateReferral,
    confirmreferral: ConfirmReferral,
    hospitallist: HospitalList,
    departmentlist: DepartmentList,
    appointmentlist: AppointmentList
  }
})
export default class DualreferralRecord extends Vue {
  menuIndex: string = "2";
  subMenuIndex: string = "2-1";
  pageTitle: string = "转诊记录";
  curMenuIndex: string = "2";
  noneSearchKeyMsg: string = "编号、姓名或医院名称";
  waitAuditCount: number = 0;
  waitAcceptCount: number = 0;

  getDataCount(val: string): any {
    if (val === "2") {
      if (this.waitAuditCount > 99) {
        return "···";
      } else {
        return this.waitAuditCount;
      }
    } else if (val === "3") {
      if (this.waitAcceptCount > 99) {
        return "···";
      } else {
        return this.waitAcceptCount;
      }
    } else {
      return 0;
    }
  }

  get dualreferralMenu() {
    return DualreferralMenu[0].menus;
  }

  mounted() {
    this.getWaitAuditAcceptCount();
  }

  getWaitAuditAcceptCount() {
    const _this = this;
    Vue.prototype.$http
      .get(apiConfig.API.getWaitAuditAcceptCount)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;
          _this.waitAuditCount = data.waitAuditCount;
          _this.waitAcceptCount = data.waitAcceptCount;
        } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
          store.commit(types.LOGOUT);
          _this.$router.push({ path: "/" });
        } else {
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  toRecordListByPath(obj: any) {
    this.getWaitAuditAcceptCount();
    if (this.curMenuIndex === obj.index) {
      this.$router.go(0);
    } else {
      this.$router.push({ path: obj.path });
    }
  }

  // 设置tab高亮
  setCurTab(curTabIndex: string) {
    this.curMenuIndex = curTabIndex;
  }

  refreshPage() {
    this.$router.go(0);
  }

  updataTabCount() {
    this.getWaitAuditAcceptCount();
  }

  // Create referral start
  dialogCreateShow: boolean = false;
  dialogConfirmShow: boolean = false;
  dialogHospitalListShow: boolean = false;
  dialogDepartmentListShow: boolean = false;
  dialogAppointmentListShow: boolean = false;
  appointmentSuccess: boolean = false;
  createReferralInfo: any = null;

  createReferral() {
    this.dialogCreateShow = true;
    this.appointmentSuccess = false;
    this.dialogConfirmShow = false;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
  }

  CreateReferralById(obj: any) {
    this.dialogCreateShow = true;
    this.appointmentSuccess = false;
    this.dialogConfirmShow = false;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
    this.createReferralInfo = obj;
  }

  afterAppointment() {
    this.appointmentSuccess = true;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
  }

  confirmReferral() {
    this.dialogCreateShow = false;
    this.appointmentSuccess = false;
    this.dialogConfirmShow = true;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
  }

  hospitalList() {
    this.appointmentSuccess = false;
    this.dialogHospitalListShow = true;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
  }

  departmentlist() {
    this.appointmentSuccess = false;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = true;
    this.dialogAppointmentListShow = false;
  }

  appointmentlist() {
    this.appointmentSuccess = false;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = true;
  }

  createDialogChange(val: boolean) {
    this.dialogCreateShow = val;
    if (!val) {
      this.createReferralInfo = null;
    }
  }

  appointmentStatusChange(val: boolean) {
    this.appointmentSuccess = val;
  }

  confirmDialogChange(val: boolean) {
    this.dialogConfirmShow = val;
  }

  hospitalListDialogChange(val: boolean) {
    this.dialogHospitalListShow = val;
  }

  departmentListDialogChange(val: boolean) {
    this.dialogDepartmentListShow = val;
  }

  appointmentListDialogChange(val: boolean) {
    this.dialogAppointmentListShow = val;
  }
  // Create referral end
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dualreferral {
  width: 100%;
  min-width: 925px;
  background: #fff;
  overflow-x: auto;

  .dualreferral-content {
    position: relative;
    width: 100%;
    height: 100%;

    .content-title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      font-size: 16px;
      color: #1bd0a1;
      width: 100%;

      span {
        font-weight: bold;
        margin-right: 8px;
      }
    }

    .content-nav {
      width: 100%;
      padding: 10px 30px;
      overflow: hidden;

      .nav-list {
        float: left;
        clear: both;

        .nav-item {
          float: left;
          margin-right: 26px;
        }
      }

      .create-btn {
        float: right;
        margin-right: 20px;
      }

      .nav-search {
        float: right;
      }
    }

    .content-list {
      padding: 20px 30px;
      .list-detail {
        width: 100%;
      }
    }
  }
}
</style>
