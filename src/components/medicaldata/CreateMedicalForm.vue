<template>
  <div class="create-medical"
       v-show="show"
       @scroll.prevent>

    <div class="create-medical-content" >
      <div class="view-dialog">
        <div class="dialog-title">
          <span class="line"></span>新建就诊
          <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
        </div>
        <div class="dialog-content" id="dialog-content" @scroll.prevent>
          <div  class="dialog-content-title">
              <div class="step">
                <div :class="[{'cur':stepNum == 1},'step-item step-right']"  @click="stepClick(1)">病历概述</div>
                <div :class="[{'cur':stepNum == 2},'step-item step-left step-right']"  @click="stepClick(2)">电子病历</div>
                <div :class="[{'cur':stepNum == 3},'step-item step-left step-right']"  @click="stepClick(3)">放射</div>
                <div :class="[{'cur':stepNum == 4},'step-item step-left step-right']"  @click="stepClick(4)">心电</div>
                <div :class="[{'cur':stepNum == 5},'step-item step-left step-right']"  @click="stepClick(5)">检验</div>
                <div :class="[{'cur':stepNum == 6},'step-item step-left step-right']"  @click="stepClick(6)">超声</div>
                <div :class="[{'cur':stepNum == 7},'step-item step-left step-right']"  @click="stepClick(7)">病理</div>
                <div :class="[{'cur':stepNum == 8},'step-item step-left']"  @click="stepClick(8)">其他</div>
              </div>
          </div>

            <div class="dialog-info">

              <!-- 病例概述-->
              <div class="dialog-info-content" v-show="stepNum==1">
                <el-form clearValidate :model="IndexModel" :rules="rules1" ref="IndexModel">
                <div class="input-row">
                    <span class="info-item-title">就诊日期：</span>
                    <el-form-item prop="visitStartDT" class="info-item-input w-150">
                      <el-date-picker
                        v-model="IndexModel.visitStartDT"
                        type="date"
                        placeholder="选择日期"
                        :clearable="false"
                        class="info-item-input w-150"
                        size="small"
                        :disabled="visitID!==''">
                      </el-date-picker>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>
                <div class="input-row">
                    <span class="info-item-title">身高(cm)：</span>
                    <el-input  v-model="IndexModel.hight" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入身高"></el-input>

                    <span class="info-item-title ml-50">体重(kg)：</span>
                    <el-input  v-model="IndexModel.weight" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入体重"></el-input>
                </div>
                <div class="input-row">
                  <span class="info-item-title">心率(bpm)：</span>
                    <el-input  v-model="IndexModel.p" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入心率"></el-input>

                  <span class="info-item-title ml-50">体温(℃)：</span>
                    <el-input  v-model="IndexModel.t"  class="info-item-input w-150" maxlength="10" size="small" placeholder="输入体温"></el-input>
                </div>
                <div class="input-row">
                  <span class="info-item-title">收缩压(mmHg)：</span>
                  <el-input  v-model="IndexModel.systolicPressure" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入收缩压"></el-input>

                  <span class="info-item-title ml-50">舒张压(mmHg)：</span>
                  <el-input  v-model="IndexModel.diastolicPressure" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入舒张压"></el-input>
                </div>
                <div class="input-div">
                  <span class="info-item-title">主诉：</span>
                  <el-input class="info-item-textarea w-600"
                            v-model="IndexModel.chiefComplaint"
                            placeholder="请输入主诉"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="6">
                  </el-input>
                </div>
                <div class="input-div">
                  <span class="info-item-title">临床诊断：</span>
                  <el-input class="info-item-textarea w-600"
                            v-model="IndexModel.diagnosis"
                            placeholder="请输入临床诊断"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="6">
                  </el-input>
                </div>
                </el-form>
              </div>

              <!-- 电子病例-->
              <div class="dialog-info-content" v-show="stepNum==2">
                <el-form clearValidate :model="DZBLModel" :rules="rules2" ref="DZBLModel">
                  <div class="input-row">
                    <span class="info-item-title">资料类型：</span>
                    <el-select v-model="DZBLModel.recordTypeID" disabled placeholder="请选择" size="small" class="info-item-input w-150" >
                      <el-option
                        v-for="item in recordTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span class="info-item-title ml-50">资料名称：</span>
                    <el-form-item prop="medicalRecordsName" class="info-item-input w-150">
                      <el-input v-model="DZBLModel.medicalRecordsName" maxlength="50" placeholder="请输入资料名称" size="small" ></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>
                  <div class="input-div">
                    <span class="info-item-title">描述：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model="DZBLModel.description"
                              placeholder="请输入描述"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>
                  <uploadFileComp :fileList.sync="DZBLModel.fileList" :show="show"></uploadFileComp>
                </el-form>
              </div>

              <!-- 放射-->
              <div class="dialog-info-content" v-show="stepNum==3">
                <el-form clearValidate :model="FSModel" :rules="rules3" ref="FSModel">
                  <div class="input-row">
                    <span class="info-item-title">检查类型：</span>
                    <el-select v-model="FSModel.recordTypeID" disabled  placeholder="请选择" size="small" class="info-item-input w-150" >
                      <el-option
                        v-for="item in recordTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span class="info-item-title ml-50">放射编号：</span>
                    <el-input  v-model="FSModel.hisRecordID" class="info-item-input w-150" maxlength="22" placeholder="请输入放射编号" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查科室：</span>
                    <el-input v-model="FSModel.examDeptName" class="info-item-input w-150" maxlength="35" placeholder="请输入检查科室" size="small" ></el-input>
                    <span class="info-item-title ml-50">检查部位：</span>
                    <el-input  v-model="FSModel.examBodyParts" class="info-item-input w-150" maxlength="50" placeholder="请输入检查部位" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查名称：</span>
                    <el-form-item prop="medicalRecordsName" class="info-item-input w-600">
                      <el-input v-model="FSModel.medicalRecordsName" maxlength="50" placeholder="请输入检查名称" size="small" ></el-input>
                    </el-form-item>
                    <span class="required-item" ></span>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">描述：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model = "FSModel.description"
                              placeholder="请输入描述"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">诊断建议：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model ="FSModel.examDiagnosis"
                              placeholder="请输入诊断建议"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>
                  <uploadFileComp :fileList.sync="FSModel.fileList" :show="show"></uploadFileComp>
                </el-form>
              </div>

              <!-- 心电-->
              <div class="dialog-info-content" v-show="stepNum==4">
                <el-form clearValidate :model="XDModel" :rules="rules3" ref="XDModel">
                  <div class="input-row">
                    <span class="info-item-title">检查类型：</span>
                    <el-select  v-model="XDModel.recordTypeID" disabled  placeholder="请选择" size="small" class="info-item-input w-150" >
                      <el-option
                        v-for="item in recordTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span class="info-item-title ml-50">心电编号：</span>
                    <el-input  v-model="XDModel.hisRecordID" class="info-item-input w-150" maxlength="22" placeholder="请输入心电编号" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查科室：</span>
                    <el-input v-model="XDModel.examDeptName" class="info-item-input w-150" maxlength="35" placeholder="请输入检查科室" size="small" ></el-input>
                    <span class="info-item-title ml-50">检查部位：</span>
                    <el-input v-model="XDModel.examBodyParts" class="info-item-input w-150" maxlength="50" placeholder="请输入检查部位" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查名称：</span>
                    <el-form-item prop="medicalRecordsName" class="info-item-input w-600">
                      <el-input v-model="XDModel.medicalRecordsName" maxlength="50" placeholder="请输入检查名称" size="small" ></el-input>
                    </el-form-item>
                    <span class="required-item" ></span>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">描述：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model = "XDModel.description"
                              placeholder="请输入描述"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">诊断建议：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model ="XDModel.examDiagnosis"
                              placeholder="请输入诊断建议"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>
                  <uploadFileComp :fileList.sync="XDModel.fileList" :show="show"></uploadFileComp>
                </el-form>
              </div>


              <!-- 检验-->
              <div class="dialog-info-content" v-show="stepNum==5">
                <el-form clearValidate :model="JYModel" :rules="rules3" ref="JYModel">
                  <div class="input-row">
                    <span class="info-item-title">检查类型：</span>
                    <el-select v-model="JYModel.recordTypeID" disabled  placeholder="请选择" size="small" class="info-item-input w-150" >
                      <el-option
                        v-for="item in recordTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span class="info-item-title ml-50">检验编号：</span>
                    <el-input   v-model="JYModel.hisRecordID" class="info-item-input w-150" maxlength="22" placeholder="请输入检验编号" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查科室：</span>
                    <el-input  v-model="JYModel.examDeptName" class="info-item-input w-150" maxlength="35" placeholder="请输入检查科室" size="small" ></el-input>
                    <span class="info-item-title ml-50">检查部位：</span>
                    <el-input  v-model="JYModel.examBodyParts" class="info-item-input w-150" maxlength="50" placeholder="请输入检查部位" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查名称：</span>
                    <el-form-item prop="medicalRecordsName" class="info-item-input w-600">
                      <el-input v-model="JYModel.medicalRecordsName" maxlength="50" placeholder="请输入检查名称" size="small" ></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">描述：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model = "JYModel.description"
                              placeholder="请输入描述"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">诊断建议：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model ="JYModel.examDiagnosis"
                              placeholder="请输入诊断建议"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>
                  <uploadFileComp :fileList.sync="JYModel.fileList" :show="show"></uploadFileComp>
                </el-form>
              </div>

              <!-- 超声-->
              <div class="dialog-info-content" v-show="stepNum==6">
                <el-form clearValidate :model="CSModel" :rules="rules3" ref="CSModel">
                  <div class="input-row">
                    <span class="info-item-title">检查类型：</span>
                    <el-select v-model="CSModel.recordTypeID" disabled  placeholder="请选择" size="small" class="info-item-input w-150" >
                      <el-option
                        v-for="item in recordTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span class="info-item-title ml-50">超声编号：</span>
                    <el-input   v-model="CSModel.hisRecordID" class="info-item-input w-150" maxlength="22" placeholder="请输入超声编号" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查科室：</span>
                    <el-input  v-model="CSModel.examDeptName"  class="info-item-input w-150" maxlength="35" placeholder="请输入检查科室" size="small" ></el-input>
                    <span class="info-item-title ml-50">检查部位：</span>
                    <el-input v-model="CSModel.examBodyParts" class="info-item-input w-150" maxlength="50" placeholder="请输入检查部位" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查名称：</span>
                    <el-form-item prop="medicalRecordsName" class="info-item-input w-600">
                      <el-input v-model="CSModel.medicalRecordsName" maxlength="50" placeholder="请输入检查名称" size="small" ></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">描述：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model = "CSModel.description"
                              placeholder="请输入描述"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">诊断建议：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model ="CSModel.examDiagnosis"
                              placeholder="请输入诊断建议"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>

                  <uploadFileComp :fileList.sync="CSModel.fileList" :show="show"></uploadFileComp>
                </el-form>
              </div>

              <!-- 病理-->
              <div class="dialog-info-content" v-show="stepNum==7">
                <el-form clearValidate :model="BLModel" :rules="rules3" ref="BLModel">
                  <div class="input-row">
                    <span class="info-item-title">检查类型：</span>
                    <el-select v-model="BLModel.recordTypeID" disabled  placeholder="请选择" size="small" class="info-item-input w-150" >
                      <el-option
                        v-for="item in recordTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span class="info-item-title ml-50">病理编号：</span>
                    <el-input  v-model="BLModel.hisRecordID" class="info-item-input w-150" maxlength="22" placeholder="请输入病理编号" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查科室：</span>
                    <el-input  v-model="BLModel.examDeptName" class="info-item-input w-150" maxlength="35" placeholder="请输入检查科室" size="small" ></el-input>
                    <span class="info-item-title ml-50">检查部位：</span>
                    <el-input  v-model="BLModel.examBodyParts"  class="info-item-input w-150" maxlength="50" placeholder="请输入检查部位" size="small" ></el-input>
                  </div>

                  <div class="input-row">
                    <span class="info-item-title">检查名称：</span>
                    <el-form-item prop="medicalRecordsName" class="info-item-input w-600">
                      <el-input v-model="BLModel.medicalRecordsName" maxlength="50" placeholder="请输入检查名称" size="small" ></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">描述：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model = "BLModel.description"
                              placeholder="请输入描述"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>

                  <div class="input-div">
                    <span class="info-item-title">诊断建议：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model ="BLModel.examDiagnosis"
                              placeholder="请输入诊断建议"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>

                  <uploadFileComp :fileList.sync="BLModel.fileList" :show="show"></uploadFileComp>
                </el-form>
              </div>

              <!-- 其他-->
              <div class="dialog-info-content" v-show="stepNum==8">
                <el-form clearValidate :model="OtherModel" :rules="rules2" ref="OtherModel">
                  <div class="input-row">
                    <span class="info-item-title">资料类型：</span>
                    <el-select v-model="OtherModel.recordTypeID" disabled  placeholder="请选择" size="small" class="info-item-input w-150" >
                      <el-option
                        v-for="item in recordTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span class="info-item-title ml-50">资料名称：</span>
                    <el-form-item prop="medicalRecordsName" class="info-item-input w-150">
                      <el-input v-model="OtherModel.medicalRecordsName" maxlength="50" placeholder="请输入资料名称" size="small" ></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>
                  <div class="input-div">
                    <span class="info-item-title">描述：</span>
                    <el-input class="info-item-textarea w-600"
                              v-model="OtherModel.description"
                              placeholder="请输入描述"
                              type="textarea"
                              size="small"
                              resize="none"
                              maxlength="500"
                              rows="6">
                    </el-input>
                  </div>
                  <uploadFileComp :fileList.sync="OtherModel.fileList" :show="show"></uploadFileComp>
                </el-form>
              </div>

            </div>
        </div>
        <div class="dialog-btn-div">
          <el-button v-show="visitID!==''" class="btn-submit my-submit-btn" @click="goComplete()">完成</el-button>
          <el-button  v-show="stepNum!=8" class="btn-submit my-submit-btn" @click="nextStep()">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "../../utils/ConstList";
import store from "../../vuex/store";
import * as types from "../../vuex/types";
import * as apiConfig from "../../api/config";
import ValidateInfo from "../../utils/ValidateInfo";
import ValidateRules from "./../../utils/ValidateRules";
import UploadFileComp from "@/components/common/UploadFile.vue";

@Component({
  components: {
    uploadFileComp: UploadFileComp
  }
})
export default class CreateMedicalForm extends Vue {
  stepNum: number = 1;
  recordTypeList: {}[] = [];
  requestModel: any = {};
  IndexModel: any = {};
  DZBLModel: any = {};
  FSModel: any = {};
  XDModel: any = {};
  JYModel: any = {};
  CSModel: any = {};
  BLModel: any = {};
  OtherModel: any = {};
  curModelInitial: any = {};
  infoChange: boolean = false;

  @Prop() show: boolean = false;
  @Prop() idNo: string;
  @Prop() patientID: string;
  visitID: string;

  mounted() {
    this.getRecordTypeDict();
  }

  Init() {
    this.clearAllValidate();
    this.visitID = "";
    this.stepNum = 1;
    this.IndexModel = {};
    this.DZBLModel = {
      recordTypeID: "1",
      recordTypeName: "电子病历"
    };
    this.FSModel = {
      recordTypeID: "2",
      recordTypeName: "放射"
    };
    this.XDModel = {
      recordTypeID: "3",
      recordTypeName: "心电"
    };
    this.JYModel = {
      recordTypeID: "4",
      recordTypeName: "检验"
    };
    this.CSModel = {
      recordTypeID: "5",
      recordTypeName: "超声"
    };
    this.BLModel = {
      recordTypeID: "6",
      recordTypeName: "病理"
    };
    this.OtherModel = {
      recordTypeID: "9",
      recordTypeName: "其他"
    };
    this.curModelInitial = this.IndexModel;
    var _this = this;
    setTimeout(function() {
      _this.infoChange = false;
    }, 100);
  }

  rules1 = {
    visitStartDT: { validator: ValidateRules.visitStartDT, trigger: "blur" }
  };
  rules2 = {
    medicalRecordsName: {
      required: true,
      message: "请输入资料名称",
      trigger: "blur"
    }
  };
  rules3 = {
    medicalRecordsName: {
      required: true,
      message: "请输入检查名称",
      trigger: "blur"
    }
  };

  clearAllValidate() {
    var form = this.$refs["IndexModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    form = this.$refs["DZBLModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    form = this.$refs["FSModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    form = this.$refs["XDModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    form = this.$refs["JYModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    form = this.$refs["CSModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    form = this.$refs["BLModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    form = this.$refs["OtherModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
  }

  validateByStep(num: number): boolean {
    var flag = false;
    switch (num) {
      case 1:
        (this.$refs["IndexModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      case 2:
        (this.$refs["DZBLModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      case 3:
        (this.$refs["FSModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      case 4:
        (this.$refs["XDModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      case 5:
        (this.$refs["JYModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      case 6:
        (this.$refs["CSModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      case 7:
        (this.$refs["BLModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      case 8:
        (this.$refs["OtherModel"] as any).validate((valid: boolean) => {
          flag = valid;
        });
        break;
      default:
        break;
    }
    return flag;
  }

  //保存病例概述
  saveVisitMaster(isNext: boolean = true) {
    if (!this.validateByStep(1)) {
      return;
    }

    const _this = this;
    var url = apiConfig.API.createVisitMasterIndex;
    var params = _this.IndexModel;
    _this.IndexModel.patientID = _this.patientID;
    if (_this.visitID) {
      url = apiConfig.API.modifyVisitMasterIndex;
      params = {
        filter: {
          id: _this.visitID,
          patientID: _this.patientID
        },
        record: _this.IndexModel
      };
    }

    Vue.prototype.$http
      .post(url, params)
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (!_this.visitID) {
            _this.visitID = response.data.data;
            _this.alert(ValidateInfo.CreateSuccess, "success");
          } else {
            _this.alert(ValidateInfo.ModifySuccess, "success");
          }
          if (isNext) {
            _this.stepNum = 2;
            _this.curModelInitial = _this.stepNumChange(_this.stepNum);
            setTimeout(function() {
              _this.infoChange = false;
            }, 100);
          } else {
            _this.closeDialog();
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
          _this.alert(ValidateInfo.CreateError, "error");
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //保存检查类型
  saveMedicalRecord(isNext: boolean) {
    if (!this.visitID) {
      this.alert("请先填写病历概述", "error");
      return;
    }

    if (!this.validateByStep(this.stepNum)) {
      return;
    }

    const _this = this;
    var infoModel = _this.stepNumChange(_this.stepNum);
    var params = _this.requestModel;
    var url = apiConfig.API.createMedicalRecords;
    if (_this.requestModel.id != null) {
      url = apiConfig.API.modifyMedicalRecords;
      params = {
        filter: {
          id: _this.requestModel.id
        },
        record: _this.requestModel
      };
    }
    Vue.prototype.$http
      .post(url, params)
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (_this.requestModel.id != null) {
            _this.alert(ValidateInfo.ModifySuccess, "success");
          } else {
            _this.alert(ValidateInfo.CreateSuccess, "success");
          }

          infoModel.id = response.data.data;
          if (isNext) {
            _this.stepNum++;
            _this.curModelInitial = _this.stepNumChange(_this.stepNum);
            setTimeout(function() {
              _this.infoChange = false;
            }, 100);
          } else {
            _this.closeDialog();
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
          _this.alert(ValidateInfo.CreateError, "error");
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //下一步
  nextStep() {
    if (this.stepNum > 0 && this.stepNum < 8) {
      if (this.stepNum == 1) {
        this.saveVisitMaster();
      } else {
        this.saveMedicalRecord(true);
      }
      this.scrollToTop();
    }
  }

  //完成
  goComplete() {
    if (this.stepNum == 1) {
      this.saveVisitMaster(false);
    } else {
      this.saveMedicalRecord(false);
    }
  }

  //不同类型参数赋值
  stepNumChange(val: Number): any {
    if (val === 1) {
      return this.IndexModel;
    } else if (val === 2) {
      this.copyModel(this.DZBLModel);
      return this.DZBLModel;
    } else if (val === 3) {
      this.copyModel(this.FSModel);
      return this.FSModel;
    } else if (val === 4) {
      this.copyModel(this.XDModel);
      return this.XDModel;
    } else if (val === 5) {
      this.copyModel(this.JYModel);
      return this.JYModel;
    } else if (val === 6) {
      this.copyModel(this.CSModel);
      return this.CSModel;
    } else if (val === 7) {
      this.copyModel(this.BLModel);
      return this.BLModel;
    } else if (val === 8) {
      this.copyModel(this.OtherModel);
      return this.OtherModel;
    }
  }

  //参数拷贝
  copyModel(model: any) {
    this.requestModel = {};
    for (var prop in model) {
      this.requestModel[prop] = model[prop];
    }
    var fileArray = new Array();
    var tempList = model.fileList;
    if (tempList) {
      for (var i = 0; i < tempList.length; i++) {
        var item = tempList[i];
        fileArray.push(item.fileId);
      }
      this.requestModel.attachments = fileArray;
    }
    this.requestModel.visitID = this.visitID;
    this.requestModel.identityCardNo = this.idNo;
    this.requestModel.patientID = this.patientID;
  }

  //获取检查类型字典
  getRecordTypeDict() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.searchMedicalRecordType, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.recordTypeList = response.data.data;
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
          _this.alert(ValidateInfo.GetDictError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  stepClick(num: number) {
    const _this = this;

    if (this.infoChange) {
      var msg: string = "";
      if (this.visitID === "") {
        msg = "当前信息尚未保存，如需保存需点下一步。是否继续操作？";
      } else {
        msg = "当前信息尚未保存，如需保存需点下一步或完成。是否继续操作？";
      }
      this.confirm(msg).then(function() {
        _this.stepNum = num;
        _this.curModelInitial = _this.stepNumChange(num);

        setTimeout(function() {
          _this.infoChange = false;
        }, 100);
      });
    } else {
      _this.stepNum = num;
      _this.curModelInitial = _this.stepNumChange(num);
      setTimeout(function() {
        _this.infoChange = false;
      }, 100);
    }
    this.scrollToTop();
  }

  @Watch("curModelInitial", { immediate: true })
  curModelInitialChange(val: boolean) {
    this.infoChange = true;
  }

  @Watch("show", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("update:show", val);
    if (this.show) {
      this.Init();
    }
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
    this.scrollToTop();
    this.$emit("refresh");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/dialog.scss";
.create-medical {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: #999;
  line-height: 24px;
  font-size: 14px;

  .create-medical-content {
    width: 890px;
    margin: 160px auto;
    height: calc(100% - 320px);

    .step {
      width: 100%;
      padding-left: 20px;
      padding-top: 10px;
      height: 60px;
      .step-item {
        float: left;
        height: 36px;
        line-height: 36px;
        width: 78px;
        margin-left: 24px;
        font-size: 14px;
        background: #effaf6;
        color: #5cd4af;
        text-align: center;
        display: inline;
        position: relative;
        cursor: pointer;
        &:hover {
          cursor: pointer;
        }
      }

      .step-left:before {
        position: absolute;
        background: #effaf6;
        display: inline-block;
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
        border-left: 10px solid #fff;
        left: -10px;
        top: 0px;
        content: "";
      }

      .step-right:after {
        position: absolute;
        background: #fff;
        display: inline-block;
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
        border-left: 10px solid #effaf6;
        right: -10px;
        top: 0px;
        content: "";
      }

      .cur {
        background: #5cd4af;
        color: #fff;
      }

      .cur:before {
        background: #5cd4af;
        border-left: -10px solid #fff;
      }
      .cur:after {
        background: #fff;
        border-left: 10px solid #5cd4af;
      }
    }

    .info-item-title {
      width: 112px;
    }
    .el-input__inner {
      padding: 0 !important;
    }
    .input-div {
      .el-form-item {
        margin-left: 82px !important;
      }
    }
  }

  @media screen and (max-height: 768px) {
    .create-medical-content {
      width: 890px;
      margin: 50px auto;
      height: calc(100% - 100px);
    }
  }
}
</style>
