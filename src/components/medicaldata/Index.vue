<template>
  <div class="main">
      <div class="userinfo">
        <div class="headinfo">
          <div class="user-photo-out">
            <img class="user-photo" v-show="showInitialPhoto" src="./../../assets/image/common_user_photo_none.png"/>
            <img class="user-photo" v-show="!showInitialPhoto" :src="userInfoModel.photo"/>
          </div>
          <div class="username">
            <span class="content-info">{{userInfoModel.name}}</span>
            <i class="iconfont icon-bianji oper-icon oper-icon-edit"
               @click="showEditPersonMasterForm()"
               :title="const_list.ListTitle.Edit"
               v-show="!initialDisable">
            </i>
          </div>
        </div>
        <div class="detailinfo">
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.Sex}}</span>
                <span class="info-item-content w-110">{{userInfoModel.sexText}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.SocialNumber}}</span>
                <span class="info-item-content w-110">{{userInfoModel.insuranceCardID}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.Birthday}}</span>
                <span class="info-item-content w-110">{{userInfoModel.dateOfBirth}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.ContactNumber}}</span>
                <span class="info-item-content w-110">{{userInfoModel.patientPhone}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.Address}}</span>
                <span class="info-item-content w-110">{{userInfoModel.patientAddress}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.Anaphylaxis}}</span>
                <span class="info-item-content w-110">{{userInfoModel.allergyHistory}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.PastHistory}}</span>
                <span class="info-item-content w-110">{{userInfoModel.pastHistory}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.FamilyHistory}}</span>
                <span class="info-item-content w-110">{{userInfoModel.familyHistory}}</span>
            </div>
            <div class="info-row">
                <span class="info-item-title">{{const_list.FormTitle.PersonalHistory}}</span>
                <span class="info-item-content w-110">{{userInfoModel.personalHistory}}</span>
            </div>
        </div>
      </div>
      <div class="content">
        <div class="menu-bar">
            <div class="datelist-area">
              <span class="left-arrow-btn pointer" @click="prevPage()" :class="prevBtnDisable?'disabled':''"></span>
              <div class="datalist" ref="listout">
                <div class="list-detal" ref="listdetail" v-bind:style="`margin-left:-${listMarginLeft}px;width:${listWidth}px`">
                  <div class="item"
                       v-for="item in visitMasterIndexList"
                       v-bind:key="item"
                       @click="selectDate(item)"
                       :class="curVisitMasterInfo.id===item.id?'active':''">{{item.visitStartDT}}</div>
                </div>
              </div>
              <span class="right-arrow-btn pointer" @click="nextPage()" :class="nextBtnDisable?'disabled':''"></span>
            </div>
            <el-button size="medium"
                       class="my-btn my-default-btn create-btn" @click="showCreateMedicalForm" :disabled="initialDisable">
                       新建就诊
            </el-button>
        </div>
        <div class="content-detail">
          <!-- 病历概述 -->
          <div class="info-content">
            <div class="detail-title">
              {{const_list.FormTitle.CaseReview}}
              <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                 :title="const_list.ListTitle.Edit"
                 @click="showEditVisitMasterIndexForm()"
                 v-show="hasDetailInfo">
              </i>
            </div>
            <div :class="[infoAreaInitial?'detail-content h-90':'detail-content']">
              <div class="info-row">
                  <span class="info-item-title">{{const_list.FormTitle.Height}}</span>
                  <span class="info-item-content p-10" :class="[infoAreaInitial?'ellipsis':'']">{{curVisitMasterInfo.hight}}cm</span>
                  <span class="info-item-title ml-10">{{const_list.FormTitle.Weight}}</span>
                  <span class="info-item-content p-10" :class="[infoAreaInitial?'ellipsis':'']">{{curVisitMasterInfo.weight}}kg</span>
                  <span class="info-item-title ml-10">{{const_list.FormTitle.BloodPressure}}</span>
                  <span class="info-item-content p-20" :class="[infoAreaInitial?'ellipsis':'']">{{curVisitMasterInfo.systolicPressure}}/{{curVisitMasterInfo.diastolicPressure}}mmHg</span>
                  <span class="info-item-title ml-10">{{const_list.FormTitle.ClinicalDiagnosis}}</span>
                  <span class="info-item-content p-40" :class="[infoAreaInitial?'ellipsis':'']">{{curVisitMasterInfo.diagnosis}}</span>
              </div>
              <div class="info-row">
                  <span class="info-item-title">{{const_list.FormTitle.HeartRate}}</span>
                  <span class="info-item-content p-10" :class="[infoAreaInitial?'ellipsis':'']">{{curVisitMasterInfo.p}}bpm</span>
                  <span class="info-item-title ml-10">{{const_list.FormTitle.Temperature}}</span>
                  <span class="info-item-content p-10" :class="[infoAreaInitial?'ellipsis':'']">{{curVisitMasterInfo.t}}℃</span>
                  <span class="info-item-title ml-10"></span><span class="info-item-content p-20"></span>
                  <span class="info-item-title ml-10">{{const_list.FormTitle.ChiefComplaint}}</span>
                  <span class="info-item-content p-40" :class="[infoAreaInitial?'ellipsis':'']">{{curVisitMasterInfo.chiefComplaint}}</span>
              </div>
              <span :class="[infoAreaInitial?'change-size-btn':'change-size-btn narrow']" @click="changeInfoAreaSize()"></span>
            </div>
          </div>
          <!-- 电子病历 -->
          <div class="info-content half">
            <div class="detail-title">{{const_list.FormTitle.EleCase}}<i class="el-icon-plus oper-icon-view pointer" title="更多" @click="showCreateRecordForm('1','电子病历')" v-show="hasDetailInfo"></i></div>
            <div class="detail-content h-140">
              <div v-for="item in medicalRecordList1"
                    v-bind:key="item"
                    class="record-row">
                <div class="record-title pointer" @click="changeShowStatue($event)">
                  {{item.medicalRecordsName}}
                  <i class="iconfont icon-shanchu oper-icon-ml oper-icon-delete"
                     :title="const_list.ListTitle.Delete"
                     @click="deleteMedicalRecords(item)"
                     @click.stop>
                  </i>
                  <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                     :title="const_list.ListTitle.Edit"
                     @click="showEditRecordForm(item.id,'1','电子病历')"
                     @click.stop>
                  </i>
                </div>
                <div class="record-content">
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.Describe}}</span>
                    <span class="describe-width">{{item.description}}</span>
                  </div>
                  <div class="record-file-row pointer"
                       v-for="attachment in item.recordAttachments"
                       v-bind:key="attachment"
                       @click="viewRecordDetail(item.id)">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?true:false" src="./../../assets/image/common_pdf_icon.png">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?false:true" src="./../../assets/image/common_image_icon.png">
                    <span class="file-name">{{attachment.filePath}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 放射 -->
          <div class="info-content half ml-20">
            <div class="detail-title">{{const_list.FormTitle.Radiation}}<i class="el-icon-plus oper-icon-view pointer" title="更多" @click="showCreateRecordForm('2','放射')" v-show="hasDetailInfo"></i></div>
            <div class="detail-content h-140">
              <div v-for="item in medicalRecordList2"
                    v-bind:key="item"
                    class="record-row">
                <div class="record-title pointer" @click="changeShowStatue($event)">
                  {{item.medicalRecordsName}}
                  <i class="iconfont icon-shanchu oper-icon-ml oper-icon-delete"
                     :title="const_list.ListTitle.Delete"
                     @click="deleteMedicalRecords(item)"
                     @click.stop>
                  </i>
                  <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                     :title="const_list.ListTitle.Edit"
                     @click="showEditRecordForm(item.id,'2','放射')"
                     @click.stop>
                  </i>
                </div>
                <div class="record-content">
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.Describe}}</span>
                    <span class="describe-width">{{item.description}}</span>
                  </div>
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.DiagnosticAdvice}}</span>
                    <span class="diagnostic-advice-width">{{item.examDiagnosis}}</span>
                  </div>
                  <div class="record-file-row pointer"
                       v-for="attachment in item.recordAttachments"
                       v-bind:key="attachment"
                       @click="viewRecordDetail(item.id)">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?true:false" src="./../../assets/image/common_pdf_icon.png">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?false:true" src="./../../assets/image/common_image_icon.png">
                    <span class="file-name">{{attachment.filePath}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 心电 -->
          <div class="info-content half">
            <div class="detail-title">{{const_list.FormTitle.Ecg}}<i class="el-icon-plus oper-icon-view pointer" title="更多" @click="showCreateRecordForm('3','心电')" v-show="hasDetailInfo"></i></div>
            <div class="detail-content h-140">
              <div v-for="item in medicalRecordList3"
                    v-bind:key="item"
                    class="record-row">
                <div class="record-title pointer" @click="changeShowStatue($event)">
                  {{item.medicalRecordsName}}
                  <i class="iconfont icon-shanchu oper-icon-ml oper-icon-delete"
                     :title="const_list.ListTitle.Delete"
                     @click="deleteMedicalRecords(item)"
                     @click.stop>
                  </i>
                  <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                     :title="const_list.ListTitle.Edit"
                     @click="showEditRecordForm(item.id,'3','心电')"
                     @click.stop>
                  </i>
                </div>
                <div class="record-content">
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.Describe}}</span>
                    <span class="describe-width">{{item.description}}</span>
                  </div>
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.DiagnosticAdvice}}</span>
                    <span class="diagnostic-advice-width">{{item.examDiagnosis}}</span>
                  </div>
                  <div class="record-file-row pointer"
                       v-for="attachment in item.recordAttachments"
                       v-bind:key="attachment"
                       @click="viewRecordDetail(item.id)">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?true:false" src="./../../assets/image/common_pdf_icon.png">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?false:true" src="./../../assets/image/common_image_icon.png">
                    <span class="file-name">{{attachment.filePath}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 检验 -->
          <div class="info-content half ml-20">
            <div class="detail-title">{{const_list.FormTitle.Inspect}}<i class="el-icon-plus oper-icon-view pointer" title="更多" @click="showCreateRecordForm('4','检验')" v-show="hasDetailInfo"></i></div>
            <div class="detail-content h-140">
              <div v-for="item in medicalRecordList4"
                    v-bind:key="item"
                    class="record-row">
                <div class="record-title pointer" @click="changeShowStatue($event)">
                  {{item.medicalRecordsName}}
                  <i class="iconfont icon-shanchu oper-icon-ml oper-icon-delete"
                     :title="const_list.ListTitle.Delete"
                     @click="deleteMedicalRecords(item)"
                     @click.stop>
                  </i>
                  <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                     :title="const_list.ListTitle.Edit"
                     @click="showEditRecordForm(item.id,'4','检验')"
                     @click.stop>
                  </i>
                </div>
                <div class="record-content">
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.Describe}}</span>
                    <span class="describe-width">{{item.description}}</span>
                  </div>
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.DiagnosticAdvice}}</span>
                    <span class="diagnostic-advice-width">{{item.examDiagnosis}}</span>
                  </div>
                  <div class="record-file-row pointer"
                       v-for="attachment in item.recordAttachments"
                       v-bind:key="attachment"
                       @click="viewRecordDetail(item.id)">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?true:false" src="./../../assets/image/common_pdf_icon.png">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?false:true" src="./../../assets/image/common_image_icon.png">
                    <span class="file-name">{{attachment.filePath}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 超声 -->
          <div class="info-content half">
            <div class="detail-title">{{const_list.FormTitle.Ultrasonic}}<i class="el-icon-plus oper-icon-view pointer" title="更多" @click="showCreateRecordForm('5','超声')" v-show="hasDetailInfo"></i></div>
            <div class="detail-content h-140">
              <div v-for="item in medicalRecordList5"
                    v-bind:key="item"
                    class="record-row">
                <div class="record-title pointer" @click="changeShowStatue($event)">
                  {{item.medicalRecordsName}}
                  <i class="iconfont icon-shanchu oper-icon-ml oper-icon-delete"
                     :title="const_list.ListTitle.Delete"
                     @click="deleteMedicalRecords(item)"
                     @click.stop>
                  </i>
                  <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                     :title="const_list.ListTitle.Edit"
                     @click="showEditRecordForm(item.id,'5','超声')"
                     @click.stop>
                  </i>
                </div>
                <div class="record-content">
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.Describe}}</span>
                    <span class="describe-width">{{item.description}}</span>
                  </div>
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.DiagnosticAdvice}}</span>
                    <span class="diagnostic-advice-width">{{item.examDiagnosis}}</span>
                  </div>
                  <div class="record-file-row pointer"
                       v-for="attachment in item.recordAttachments"
                       v-bind:key="attachment"
                       @click="viewRecordDetail(item.id)">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?true:false" src="./../../assets/image/common_pdf_icon.png">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?false:true" src="./../../assets/image/common_image_icon.png">
                    <span class="file-name">{{attachment.filePath}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 病理 -->
          <div class="info-content half ml-20">
            <div class="detail-title">{{const_list.FormTitle.Pathology}}<i class="el-icon-plus oper-icon-view pointer" title="更多" @click="showCreateRecordForm('6','病理')" v-show="hasDetailInfo"></i></div>
            <div class="detail-content h-140">
              <div v-for="item in medicalRecordList6"
                    v-bind:key="item"
                    class="record-row">
                <div class="record-title pointer" @click="changeShowStatue($event)">
                  {{item.medicalRecordsName}}
                  <i class="iconfont icon-shanchu oper-icon-ml oper-icon-delete"
                     :title="const_list.ListTitle.Delete"
                     @click="deleteMedicalRecords(item)"
                     @click.stop>
                  </i>
                  <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                     :title="const_list.ListTitle.Edit"
                     @click="showEditRecordForm(item.id,'6','病理')"
                     @click.stop>
                  </i>
                </div>
                <div class="record-content">
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.Describe}}</span>
                    <span class="describe-width">{{item.description}}</span>
                  </div>
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.DiagnosticAdvice}}</span>
                    <span class="diagnostic-advice-width">{{item.examDiagnosis}}</span>
                  </div>
                  <div class="record-file-row pointer"
                       v-for="attachment in item.recordAttachments"
                       v-bind:key="attachment"
                       @click="viewRecordDetail(item.id)">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?true:false" src="./../../assets/image/common_pdf_icon.png">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?false:true" src="./../../assets/image/common_image_icon.png">
                    <span class="file-name">{{attachment.filePath}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 其他 -->
          <div class="info-content half">
            <div class="detail-title">{{const_list.FormTitle.Other}}<i class="el-icon-plus oper-icon-view pointer" title="更多" @click="showCreateRecordForm('9','其他')" v-show="hasDetailInfo"></i></div>
            <div class="detail-content h-140">
              <div v-for="item in medicalRecordList7"
                    v-bind:key="item"
                    class="record-row">
                <div class="record-title pointer" @click="changeShowStatue($event)">
                  {{item.medicalRecordsName}}
                  <i class="iconfont icon-shanchu oper-icon-ml oper-icon-delete"
                     :title="const_list.ListTitle.Delete"
                     @click="deleteMedicalRecords(item)"
                     @click.stop>
                  </i>
                  <i class="iconfont icon-bianji oper-icon-ml oper-icon-edit"
                     :title="const_list.ListTitle.Edit"
                     @click="showEditRecordForm(item.id,'9','其他')"
                     @click.stop>
                  </i>
                </div>
                <div class="record-content">
                  <div class="record-content-row">
                    <span>{{const_list.FormTitle.Describe}}</span>
                    <span class="describe-width">{{item.description}}</span>
                  </div>
                  <div class="record-file-row pointer"
                       v-for="attachment in item.recordAttachments"
                       v-bind:key="attachment"
                       @click="viewRecordDetail(item.id)">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?true:false" src="./../../assets/image/common_pdf_icon.png">
                    <img class="file-icon" v-show="attachment.dataType==='application/pdf'?false:true" src="./../../assets/image/common_image_icon.png">
                    <span class="file-name">{{attachment.filePath}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <createMedicalForm :show.sync="showCreateMedical" :idNo="curIdentityCardNo" :patientID="userInfoModel.id"  @refresh="searchVisitMasterIndex()"></createMedicalForm>

    <createRecordForm
      :show.sync="showCreateRecord"
      :currentRecordId="curRecordID"
      :visitID="curVisitID"
      :idNo="curIdentityCardNo"
      :patientID="userInfoModel.id"
      :recordTypeID="recordTypeID"
      :recordTypeName="recordTypeName"
      @refresh="searchVisitMasterIndexDetail()"
    >
    </createRecordForm>


    <createMasterIndexForm :show.sync="showCreateMasterIndex" :currentRecordId="curVisitMasterInfo.id" :patientID="userInfoModel.id" @refresh="searchVisitMasterIndexDetail()"></createMasterIndexForm>
    <createPersonMasterForm :show.sync="showCreatePersonMaster" :curIdentityCardNo="curIdentityCardNo" :isCreate="createPersonMaster" @refresh="refreshSearchPersonMasterDetail"></createPersonMasterForm>
    <ViewRecordDetail :show.sync="showViewRecordDetail" :curVisitMasterInfo="curVisitMasterInfo" :curRecordID="curRecordID"></ViewRecordDetail>


  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../vuex/store";
import * as types from "./../../vuex/types";
import * as apiConfig from "./../../api/config";
import ConstList from "./../../utils/ConstList";
import ValidateInfo from "./../../utils/ValidateInfo";
import CreateMedicalForm from "@/components/medicaldata/CreateMedicalForm.vue";
import CreateRecordForm from "@/components/medicaldata/CreateRecordForm.vue";
import CreateMasterIndexForm from "@/components/medicaldata/CreateMasterIndexForm.vue";
import CreatePersonMasterForm from "@/components/medicaldata/CreatePersonMasterForm.vue";
import ViewRecordDetail from "@/components/medicaldata/ViewRecordDetail.vue";

@Component({
  components: {
    createMedicalForm: CreateMedicalForm,
    createRecordForm: CreateRecordForm,
    createMasterIndexForm: CreateMasterIndexForm,
    createPersonMasterForm: CreatePersonMasterForm,
    ViewRecordDetail: ViewRecordDetail
  }
})
export default class MedicalData extends Vue {
  showInitialPhoto: boolean = true;
  const_list = ConstList.MedicalData;
  infoAreaInitial: boolean = true;
  initialDisable: boolean = true;
  hasDetailInfo: boolean = false;
  //当前选中的日期
  curDate: string = "2018-01-04";
  //日期列表滑动距离
  listMarginLeft: number = 0;
  listWidth: number = 0;
  outWidth: number = 0;
  prevBtnDisable: boolean = true;
  nextBtnDisable: boolean = true;
  showCreateMedical: boolean = false;
  showCreateRecord: boolean = false;
  showCreateMasterIndex: boolean = false;
  showCreatePersonMaster: boolean = false;
  createPersonMaster: boolean = false;
  showViewRecordDetail: boolean = false;

  //就诊ID
  curVisitID: string = "";
  //记录ID
  curRecordID: string = "";
  recordTypeID: string;
  recordTypeName: string;

  // 当前病人的身份证号
  curIdentityCardNo: string = "";
  // 病人信息
  userInfoModel = {};
  // 当前病人诊断列表
  visitMasterIndexList = [];
  // 当前诊断信息
  curVisitMasterInfo = {};

  mounted() {
    if (
      this.$route.query.identityCardNo === undefined ||
      this.$route.query.identityCardNo === ""
    ) {
      this.showCreatePersonMasterForm();
    } else {
      this.curIdentityCardNo = this.$route.query.identityCardNo;
      this.searchPersonMasterIndexDetail();
    }
    this.$emit("web-title-change", "医联体云平台-病历资料");
    this.prevBtnDisable = true;
    this.nextBtnDisable = true;

    //监听窗口大小改变事件
    var that = this;
    window.onresize = function temp() {
      that.resetListStatus();
    };
  }

  // 重置列表滑动状态
  resetListStatus() {
    this.outWidth = (this.$refs.listout as any).clientWidth;
    this.listWidth = this.visitMasterIndexList.length * 125; // 125表示时间固定宽度
    this.prevBtnDisable = true;
    this.nextBtnDisable = true;
    this.listMarginLeft = 0;
    if (this.listWidth > this.outWidth) {
      this.nextBtnDisable = false;
    }
  }

  openList = [
    {
      index: "1"
    },
    {
      index: "2"
    }
  ];

  // 电子病历
  medicalRecordList1 = [];
  // 放射
  medicalRecordList2 = [];
  // 心电
  medicalRecordList3 = [];
  // 检验
  medicalRecordList4 = [];
  // 超声
  medicalRecordList5 = [];
  // 病理
  medicalRecordList6 = [];
  // 其他
  medicalRecordList7 = [];

  //上一页
  prevPage() {
    if (this.listMarginLeft - this.outWidth < 0) {
      this.listMarginLeft = 0;
    } else {
      this.listMarginLeft -= this.outWidth;
    }

    if (this.listMarginLeft > 0) {
      this.prevBtnDisable = false;
    } else {
      this.prevBtnDisable = true;
    }
    if (this.listMarginLeft < this.listWidth - this.outWidth) {
      this.nextBtnDisable = false;
    } else {
      this.nextBtnDisable = true;
    }
  }

  //下一页
  nextPage() {
    if (this.listMarginLeft + this.outWidth > this.listWidth - this.outWidth) {
      this.listMarginLeft = this.listWidth - this.outWidth;
    } else {
      this.listMarginLeft += this.outWidth;
    }

    if (this.listMarginLeft > 0) {
      this.prevBtnDisable = false;
    } else {
      this.prevBtnDisable = true;
    }
    if (this.listMarginLeft < this.listWidth - this.outWidth) {
      this.nextBtnDisable = false;
    } else {
      this.nextBtnDisable = true;
    }
  }

  selectDate(obj: any) {
    this.infoAreaInitial = true;
    this.curVisitMasterInfo = obj;
    this.curVisitID = obj.id;
    this.searchVisitMasterIndexDetail();
  }

  changeInfoAreaSize() {
    this.infoAreaInitial = !this.infoAreaInitial;
  }

  changeShowStatue(e: any) {
    if (this.hasClass(e.currentTarget.parentNode.classList, "open")) {
      e.currentTarget.parentNode.classList.remove("open");
    } else {
      e.currentTarget.parentNode.classList.add("open");
    }
  }

  hasClass(obj: any, className: string): boolean {
    for (var i = 0; i < obj.length; i++) {
      if (obj[i] === className) {
        return true;
      }
    }
    return false;
  }

  // 查询患者主索引详细信息
  searchPersonMasterIndexDetail(afterCreate: boolean = false) {
    const _this = this;

    var requestModel = {
      identityCardNo: _this.curIdentityCardNo
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchPersonMasterIndexDetail, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0 && response.data.data !== null) {
          _this.initialDisable = false;
          _this.userInfoModel = response.data.data;
          if (
            (_this.userInfoModel as any).photo === null ||
            !(_this.userInfoModel as any).photo
          ) {
            _this.showInitialPhoto = true;
          } else {
            _this.showInitialPhoto = false;
          }
          if (!afterCreate) {
            _this.searchVisitMasterIndex();
          }
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
          _this.alert(ValidateInfo.GetInfoError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // 查询就诊主索引
  searchVisitMasterIndex() {
    const _this = this;

    var requestModel = {
      patientID: (_this.userInfoModel as any).id
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchVisitMasterIndex, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.visitMasterIndexList = response.data.data;
          _this.resetListStatus();
          if (_this.visitMasterIndexList.length > 0) {
            _this.selectDate(_this.visitMasterIndexList[0]);
            _this.hasDetailInfo = true;
          } else {
            _this.hasDetailInfo = false;
          }
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
          _this.alert(ValidateInfo.GetListError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // 查询就诊详细信息
  searchVisitMasterIndexDetail() {
    const _this = this;

    var requestModel = {
      id: (_this.curVisitMasterInfo as any).id
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchVisitMasterIndexDetail, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.curVisitMasterInfo = response.data.data;
          _this.setListData(response.data.data);
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
          _this.alert(ValidateInfo.GetListError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // 删除就诊资料
  deleteMedicalRecords(obj: any) {
    const _this = this;
    debugger;
    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.deleteMedicalRecords, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.searchVisitMasterIndexDetail();
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
            _this.alert(ValidateInfo.DeleteError, "error");
            console.log(response.data.message);
          }
        })
        .catch(function(error: any) {
          console.log(error);
        });
    });
  }

  // 给数据赋值
  setListData(obj: any) {
    this.medicalRecordList1 = [];
    this.medicalRecordList2 = [];
    this.medicalRecordList3 = [];
    this.medicalRecordList4 = [];
    this.medicalRecordList5 = [];
    this.medicalRecordList6 = [];
    this.medicalRecordList7 = [];

    if (obj.recordTypes !== undefined || obj.recordTypes !== null) {
      for (var item of obj.recordTypes) {
        switch (item.id) {
          case "1":
            this.medicalRecordList1 = item.records;
            break;
          case "2":
            this.medicalRecordList2 = item.records;
            break;
          case "3":
            this.medicalRecordList3 = item.records;
            break;
          case "4":
            this.medicalRecordList4 = item.records;
            break;
          case "5":
            this.medicalRecordList5 = item.records;
            break;
          case "6":
            this.medicalRecordList6 = item.records;
            break;
          case "9":
            this.medicalRecordList7 = item.records;
            break;
          default:
            break;
        }
      }
    }
  }

  //新建患者建档信息
  showCreatePersonMasterForm() {
    const _this = this;
    _this.confirm("是否为患者创建病历资料？").then(function() {
      _this.showCreatePersonMaster = true;
      _this.createPersonMaster = true;
    });
  }

  //刷新患者信息
  refreshSearchPersonMasterDetail(idNo: string) {
    this.curIdentityCardNo = idNo;
    this.searchPersonMasterIndexDetail(true);
  }

  //修改患者信息
  showEditPersonMasterForm() {
    this.showCreatePersonMaster = true;
    this.createPersonMaster = false;
  }

  //新建就诊
  showCreateMedicalForm() {
    this.showCreateMedical = true;
  }

  // 新增记录
  showCreateRecordForm(id: string, name: string) {
    this.curRecordID = "";
    this.recordTypeID = id;
    this.recordTypeName = name;
    this.showCreateRecord = true;
  }

  // 修改记录
  showEditRecordForm(recordId: string, typdId: string, name: string) {
    this.curRecordID = recordId;
    this.recordTypeID = typdId;
    this.recordTypeName = name;
    this.showCreateRecord = true;
  }

  // 新建后刷新
  refreshVisitMasterIndexAfterCreate() {
    this.searchVisitMasterIndex();
  }

  // 修改病例概述
  showEditVisitMasterIndexForm() {
    this.showCreateMasterIndex = true;
  }

  // 查看检查记录详细列表
  viewRecordDetail(id: string) {
    this.curRecordID = id;
    this.showViewRecordDetail = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../../assets/style/dialog.scss";
.main {
  width: 100%;
  overflow: hidden;
  height: 100%;

  .content-title {
    color: #999;
  }

  .content-info {
    color: #333;
  }

  .userinfo {
    float: left;
    width: 220px;
    height: 100%;
    border: 1px solid #d8dde3;
    background: #fff;

    .headinfo {
      padding-top: 56px;
      width: 100%;
      text-align: center;

      .user-photo-out {
        width: 130px;
        height: 130px;
        padding: 0;
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;

        .user-photo {
          max-width: 130px;
          max-height: 130px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
      }

      .username {
        font-size: 20px;
        padding: 30px 0 40px 0;
      }
    }

    .detailinfo {
      width: 100%;
      height: calc(100% - 288px);
      padding-left: 10px;
      overflow-y: auto;
    }
  }

  .content {
    float: right;
    position: relative;
    border: 1px solid #d8dde3;
    background: #fff;
    width: calc(100% - 240px);
    height: 100%;
    padding: 10px 20px;
    overflow-y: auto;

    .menu-bar {
      width: 100%;
      height: 38px;
      margin-bottom: 20px;
      overflow: hidden;

      .create-btn {
        float: right;
      }

      .datelist-area {
        float: left;
        width: calc(100% - 110px);
        overflow: hidden;

        .left-arrow-btn {
          display: block;
          float: left;
          width: 7px;
          height: 38px;
          background: url("./../../assets/image/common_scrollarrow.png") left
            center no-repeat;

          &.disabled {
            opacity: 0.3;
          }
        }

        .right-arrow-btn {
          display: block;
          float: right;
          width: 7px;
          height: 38px;
          background: url("./../../assets/image/common_scrollarrow.png") right
            center no-repeat;

          &.disabled {
            opacity: 0.3;
          }
        }

        .datalist {
          width: calc(100% - 34px);
          margin: 0 10px;
          float: left;
          height: 38px;
          border-bottom: 2px solid #effaf6;
          overflow: hidden;

          .list-detal {
            height: 36px;

            .item {
              float: left;
              width: 125px;
              height: 36px;
              line-height: 36px;
              font-size: 16px;
              color: #666;
              text-align: center;
              cursor: pointer;

              &:hover,
              &.active {
                color: #fff;
                background: #00d1a4;
              }
            }
          }
        }
      }
    }

    .content-detail {
      width: 100%;
      height: calc(100% - 60px);
      overflow-y: auto;

      .info-content {
        float: left;
        margin-bottom: 20px;
        border: 1px solid #effaf6;
        width: 100%;

        &.half {
          width: calc(50% - 10px);
        }

        .detail-title {
          font-size: 14px;
          color: #1bd0a1;
          padding: 0 10px 0 20px;
          height: 36px;
          line-height: 36px;
          background: #effaf6;

          i {
            float: right;
            line-height: 36px !important;
            font-weight: bold;
            font-size: 16px !important;
          }
        }

        .detail-content {
          padding: 10px 10px 10px 20px;
          overflow-y: auto;
          width: 100%;
          position: relative;

          .change-size-btn {
            position: absolute;
            right: 10px;
            bottom: 10px;
            display: block;
            width: 20px;
            height: 20px;
            background: url("./../../assets/image/commmon_enlarge_area.png")
              no-repeat center;
            background-size: 100%;

            &.narrow {
              background: url("./../../assets/image/commmon_narrow_area.png")
                no-repeat center;
              background-size: 100%;
            }
          }

          .info-row {
            min-width: 900px;

            .info-item-content.ellipsis {
              height: 35px;
              overflow: hidden !important;
              white-space: nowrap !important;
              text-overflow: ellipsis !important;
            }
          }

          .record-row {
            width: 100%;
            font-size: 14px;
            overflow: hidden;

            .record-title {
              color: #333;
              padding-left: 20px;
              background: url("./../../assets/image/common_record_close.png")
                left center no-repeat;
              height: 32px;
              line-height: 32px;
              overflow: hidden;

              i {
                float: right;
              }
            }

            .record-content {
              display: none;
              padding-left: 20px;

              .record-content-row {
                min-height: 20px;
                line-height: 20px;
                color: #999;
                overflow: hidden;

                span {
                  float: left;
                }

                .describe-width {
                  width: calc(100% - 42px);
                }

                .diagnostic-advice-width {
                  width: calc(100% - 70px);
                }
              }

              .record-file-row {
                overflow: hidden;

                .file-icon {
                  float: left;
                  width: 30px;
                  height: 30px;
                }

                .file-name {
                  float: left;
                  color: #1bd0a1;
                  line-height: 30px;
                  margin-left: 10px;
                }
              }
            }

            &.open {
              .record-title {
                background: url("./../../assets/image/common_record_open.png")
                  left center no-repeat;
              }

              .record-content {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
