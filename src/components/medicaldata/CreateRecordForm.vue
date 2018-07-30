<template>
  <div class="create-medical"
       v-show="show"
       @scroll.prevent>

    <div class="create-medical-content" >
      <div class="view-dialog">
        <div v-if="createMode" class="dialog-title">
          <span class="line"></span>新建{{recordTypeName}}
          <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
        </div>
        <div v-else class="dialog-title">
          <span class="line"></span>编辑{{recordTypeName}}
          <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
        </div>
        <div class="dialog-content" id="dialog-content" @scroll.prevent>

          <div class="dialog-info">

            <!-- 放射-->
            <div class="dialog-info-content">
              <el-form clearValidate :model="infoModel" :rules="rules" ref="infoModel">

                <div v-if="isRecord" class="input-row">
                  <span class="info-item-title">检查类型：</span>
                  <el-select v-model="infoModel.recordTypeID" disabled  placeholder="请选择" size="small" class="info-item-input w-150" >
                    <el-option
                      v-for="item in recordTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <span class="info-item-title ml-50">{{recordTypeName}}编号：</span>
                  <el-input  v-model="infoModel.hisRecordID" class="info-item-input w-150" maxlength="22" :placeholder="'请输入'+recordTypeName+'编号'" size="small" ></el-input>
                </div>

                <div v-if="isRecord" class="input-row">
                  <span class="info-item-title">检查科室：</span>
                  <el-input v-model="infoModel.examDeptName" class="info-item-input w-150" maxlength="35" placeholder="请输入检查科室" size="small" ></el-input>
                  <span class="info-item-title ml-50">检查部位：</span>
                  <el-input  v-model="infoModel.examBodyParts" class="info-item-input w-150" maxlength="50" placeholder="请输入检查部位" size="small" ></el-input>
                </div>

                <div v-if="isRecord" class="input-row">
                  <span class="info-item-title">检查名称：</span>
                  <el-form-item prop="medicalRecordsName" class="info-item-input w-600">
                    <el-input v-model="infoModel.medicalRecordsName" maxlength="50" placeholder="请输入检查名称" size="small" ></el-input>
                  </el-form-item>
                  <span class="required-item"></span>
                </div>

                <!-- 类型为电子病例或者其他-->
                <div v-if="!isRecord" class="input-row">
                  <span class="info-item-title">资料类型：</span>
                  <el-select v-model="infoModel.recordTypeID" disabled placeholder="请选择" size="small" class="info-item-input w-150" >
                    <el-option
                      v-for="item in recordTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <span class="info-item-title ml-50">资料名称：</span>
                  <el-form-item prop="medicalRecordsName" class="info-item-input w-150">
                    <el-input v-model="infoModel.medicalRecordsName" maxlength="50" placeholder="请输入资料名称" size="small" ></el-input>
                  </el-form-item>
                  <span class="required-item"></span>
                </div>

                <div class="input-div">
                  <span class="info-item-title">描述：</span>
                  <el-input class="info-item-textarea w-600"
                            v-model="infoModel.description"
                            placeholder="请输入描述"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="500"
                            rows="6">
                  </el-input>
                </div>

                <div v-if="isRecord" class="input-div">
                  <span class="info-item-title">诊断建议：</span>
                  <el-input class="info-item-textarea w-600"
                            v-model ="infoModel.examDiagnosis"
                            placeholder="请输入诊断建议"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="500"
                            rows="6">
                  </el-input>
                </div>

                <uploadFileComp  :fileList.sync="fileList" :show="show"></uploadFileComp>
              </el-form>
            </div>

          </div>
        </div>
        <div class="dialog-btn-div">
          <el-button  class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
          <el-button  class="btn-submit my-submit-btn" @click="save()">保存</el-button>
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
import UploadFileComp from "@/components/common/UploadFile.vue";

@Component({
  components: {
    uploadFileComp: UploadFileComp
  }
})
export default class CreateRecordFrom extends Vue {
  infoModel: any = {};
  isRecord: boolean = true;
  createMode: boolean = true;
  fileList: {}[] = [];
  attachmentList: {}[] = [];

  @Prop() show: boolean = false;
  @Prop() currentRecordId: string;
  @Prop() visitID: string;
  @Prop() idNo: string;
  @Prop() patientID: string;
  @Prop() recordTypeID: string;
  @Prop() recordTypeName: string;
  @Prop() recordTypeList: {}[] = [];

  rules = {
    medicalRecordsName: {
      required: true,
      message: "请输入名称",
      trigger: "blur"
    }
  };

  mounted() {
    this.getRecordTypeDict();
  }

  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    this.infoModel = {};
    this.fileList = [];
    this.attachmentList = [];
    this.createMode = true;
    this.infoModel = {
      recordTypeID: this.recordTypeID,
      recordTypeName: this.recordTypeName,
      visitID: this.visitID,
      identityCardNo: this.idNo,
      patientID: this.patientID
    };
    if (this.recordTypeID == "1" || this.recordTypeID == "9") {
      this.isRecord = false;
    } else {
      this.isRecord = true;
    }
    if (this.currentRecordId != "") {
      this.createMode = false;
      this.getRecord();
    }
  }

  //保存检查类型
  save() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }

    const _this = this;
    _this.setModel();
    var params = _this.infoModel;
    var url = apiConfig.API.createMedicalRecords;
    if (!_this.createMode) {
      url = apiConfig.API.modifyMedicalRecords;
      params = {
        filter: {
          id: _this.currentRecordId
        },
        record: _this.infoModel
      };
    }

    Vue.prototype.$http
      .post(url, params)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.$emit("refresh");
          _this.closeDialog();
          //_this.alert(ValidateInfo.CreateSuccess, "success");
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

  getRecord() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.searchMedicalRecordsDetail, {
        id: _this.currentRecordId
      })
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data;
          _this.attachmentList = _this.infoModel.recordAttachments;
          _this.infoModel.recordAttachments = null;
          _this.setAttachment();

          //_this.alert(ValidateInfo.CreateSuccess, "success");
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

  getRecordAttachment() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.searchMedicalRecordsAttachment, {
        medicalRecordsID: _this.currentRecordId,
        valid: true
      })
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.attachmentList = response.data.data;
          _this.setAttachment();
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

  //参数设置
  setModel() {
    var fileArray = new Array();
    if (this.fileList) {
      for (var i = 0; i < this.fileList.length; i++) {
        var item = this.fileList[i] as any;
        fileArray.push(item.fileId);
      }
      this.infoModel.attachments = fileArray;
    }
    this.infoModel.visitID = this.visitID;
    this.infoModel.identityCardNo = this.idNo;
    this.infoModel.patientID = this.patientID;
  }

  setAttachment() {
    var fileArray = new Array();
    if (this.attachmentList) {
      for (var i = 0; i < this.attachmentList.length; i++) {
        var item = this.attachmentList[i] as any;
        fileArray.push({
          fileName: item.fileMemo,
          fileId: item.id
        });
      }
      this.fileList = fileArray;
    }
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

    .info-item-title {
      width: 110px;
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
