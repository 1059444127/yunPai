<template>

  <div class="input-div">
    <span class="info-item-title">文件上传：</span>
    <el-button size="mini" class="my-submit-btn info-item-content" @click="goUploadFile">点击上传</el-button>
    <input type="file" v-show="false" ref="uploadBtn" v-on:change="uploadFile"/>
    <ul class="upload-file-ul">
      <li v-for="(item, index) in fileList">
        <i class="el-icon-document"></i> {{item.fileName}}<span><i class="upload-success el-icon-circle-check"></i><i class="upload-del el-icon-close" @click="removeFileItem(index)"></i></span>
      </li>
    </ul>
  </div>

</template>
<script lang="ts">
  import Vue from "vue";
  import { Component, Prop, Watch } from "vue-property-decorator";
  import * as apiConfig from "./../../api/config";
  import ValidateInfo from "./../../utils/ValidateInfo";
  import store from "./../../vuex/store";
  import * as types from "./../../vuex/types";

@Component
export default class UploadFile extends Vue {

  @Prop() fileList:{}[];
  @Prop() show:boolean;

  mounted(){

  }

  Init(){
    (this.$refs.uploadBtn as any).value = "";
  }
  goUploadFile(){
      (this.$refs.uploadBtn as any).click();
  }

  uploadFile(){
    var _this = this;
    var file = (this.$refs.uploadBtn as any).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file); //调用自带方法进行转换
    reader.onload = function(e:any) {
      var fileSize = e.total;
      var fileLimit = 1024*1024*100;
      if(fileSize>fileLimit){
        _this.alert("文件大小不能超过100M");
        return;
      }
      var fd = new FormData();
      var ext = file.name.substring(file.name.lastIndexOf('.'));
      fd.append('file', file);
      fd.append('memo',file.name);
      Vue.prototype.$http({
        method: 'post',
        url: apiConfig.API.uploadMedicalRecordsAttachment,
        data: fd
      }).then(function(response:any){
        if (response.data.code === 0) {
            var fileObj = {
              fileId:response.data.data,
              fileName:file.name
            }
          if(typeof(_this.fileList)=="undefined"){
            _this.fileList = new Array();
          }
          _this.fileList.push(fileObj);
            console.log(_this.fileList);
        } else if (response.data.code === apiConfig.MESSAGECODE.ERROR) {
          _this.alert(response.data.message, "error");
        } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
            store.commit(types.LOGOUT);
          _this.$router.push({ path: "/" });
        } else if (  response.data.code === apiConfig.MESSAGECODE.LACKOFAUTHORITY ) {
          _this.alert(ValidateInfo.LackOfAuthority, "error");
        } else {
          _this.alert(ValidateInfo.UploadError, "error");
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
    };
  }

  removeFileItem(index :number){
    var fileItem = this.fileList[index] as any;
    var _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.deleteMedicalRecordsAttachment, {
          id: fileItem.fileId
      })
      .then(function(response: any) {
        if (response.data.code === 0 && response.data.data != null) {
          _this.fileList.splice(index,1);
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

  @Watch("show", { immediate: true })
  showChange(val:boolean){
    if(val){
      this.Init();
    }
  }

  @Watch("fileList", { immediate: true })
  fileListChange(fileList:[{}]) {
    this.fileList = fileList;
    this.$emit('update:fileList', fileList)
  }
}
</script>

<style scoped lang="scss">
  .input-div {
      min-height: 40px;
      line-height: 40px;
      font-size: 14px;
      overflow: hidden;
    input,span,select{
        float:left;
    }
    .info-item-title {
      color:#999;
      width: 110px;
      text-align: right;
      margin-right: 12px;
      min-height:1px;
    }

    .info-item-content{
      color: #333;
      min-height: 1px;
      white-space: pre;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
    .upload-file-ul{
      margin-top: 0;
      margin-left: 82px;
      width: 636px;
      li{
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        width: 100%;
        font-size:14px;
        &:hover {
          color:#409eff;
          background: rgba(0, 0, 0, 0.1);
          .upload-success{
            display: none;
          }
          .upload-del{
            display: inline;
          }
        }
        span{
          float: right;
          padding-right: 5px;
          .upload-success{
            color:#67c23a;
            display: inline;
          }
          .upload-del{
            cursor: pointer;
            color:#606266;
            display: none;
          }
        }
      }
    }
  }
</style>
