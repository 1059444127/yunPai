<template>
  <div class="main"  ref="main">
    <div class="main-top">
      <img class="company-logo" src="../../assets/image/company_logo.png" />
      <div class="web-title">{{webTitle}}</div>
      <div class="user-name">{{userName}}  <el-button @click="logout()" class="logout-btn" type="text">[退出]</el-button></div>
      <div class="user-info">
        <div class="user-head" >
            <img v-show="!hasPhoto" src="../../assets/image/platform_head.png" />
            <img v-show="hasPhoto" :src="photo" />
        </div>
      </div>


    </div>
    <div class="main-content" ref="content">
      <el-row class="pl-20 pr-20">
          <el-col :span="24">
            <el-row class="halfH">
              <el-col :span="15">
                  <el-row>
                    <el-col :span="12" class="pd10">
                      <img src="../../assets/image/platform_fjzz_t.png" style="margin-top: 2.3em;position: absolute;margin-left:-0.5em"/>
                      <el-card @click.native="open('Referral')" :body-style="{ padding: '0px',width:'100%',height:'100%' ,position:'relative'}" class="box-card image-fjzz">
                        <div class='box-bottom-text'>
                          分级转诊
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="12" class="pd10">
                      <el-card  @click.native="open('ImageDiagnosis')" :body-style="{ padding: '0px',width:'100%',height:'100%',position:'relative'}" class="box-card image-ycyxzd">
                        <div class='box-bottom-text'>
                          远程影像诊断
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8" class="pd10">
                      <el-card   @click.native="alert('该功能未开放')" :body-style="{ padding: '0px',width:'100%',height:'100%',align:'center' }" class="box-card image-jtxdzd-bg">
                        <img  class="image-jtxdzd"  src="../../assets/image/platform_jtxdzd.png" />
                        <span  class="text" style="text-align:center; display:block;color: white; " >
                            静态心电诊断
                        </span>
                      </el-card>
                    </el-col>
                    <el-col :span="8" class="pd10">
                      <el-card  @click.native="openLink('http://222.175.179.102:90/admin/login.aspx')" :body-style="{ padding: '0px',width:'100%',height:'100%',align:'center' }" class="box-card image-qyjyzx-bg">
                        <img  class="image-jtxdzd"  src="../../assets/image/platform_qyjyzx.png" />
                        <span  class="text" style="text-align:center; display:block; color: white;" >
                            区域检验中心
                        </span>
                      </el-card>
                    </el-col>
                    <el-col :span="8" class="pd10">
                      <el-card @click.native="alert('该功能未开放')" :body-style="{ padding: '0px',width:'100%',height:'100%',align:'center' }" class="box-card image-dtxdzd-bg">
                        <img  class="image-jtxdzd"  src="../../assets/image/platform_dtxdzd.png" />
                        <span  class="text" style="text-align:center; display:block;color: white; " >
                            动态心电诊断
                        </span>
                      </el-card>
                    </el-col>
                  </el-row>
              </el-col>
              <el-col :span="9">
                  <el-row>
                      <el-col :span="12" class="pd10">
                        <el-card @click.native="[openLink(`http://mtps.eclous.com/login?token=${token}&gobackurl=${integrationUrl}`)]" :body-style="{ padding: '0px',width:'100%',height:'100%',align:'center' }" class="box-card ">
                          <img  class="image-ycjx"  src="../../assets/image/platform_ycjx.png" />
                          <span  class="text" style="text-align:center; display:block; " >
                              远程教学
                          </span>
                        </el-card>
                      </el-col>
                      <el-col :span="12" class="halfH">
                        <el-row>
                          <el-col :span="24" class="pd10">
                            <el-card @click.native="alert('该功能未开放')" :body-style="{ padding: '0px',width:'100%',height:'100%',align:'center' }" class="box-card">
                              <img  class="image-ychz"  src="../../assets/image/platform_ychz.png" />
                              <span  class="text" style="text-align:center; display:block; " >
                                  远程会诊
                              </span>
                            </el-card>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24" class="pd10">
                            <el-card @click.native="alert('该功能未开放')" :body-style="{ padding: '0px',width:'100%',height:'100%',align:'center' }" class="box-card">
                              <img  class="image-ycblzd"  src="../../assets/image/platform_ycblzd.png" />
                              <span  class="text" style="text-align:center; display:block; " >
                                  远程病理诊断
                              </span>
                            </el-card>
                          </el-col>
                        </el-row>
                      </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"  class="halfH">
                      <el-row>
                        <el-col :span="24"  class="pd10">
                        <el-card @click.native="alert('该功能未开放')" :body-style="{ padding: '0px',height:'100%'}"  class="box-card">
                          <div class="btn-gltj">
                                                <span  class="text">
                                                    管理统计
                                                </span>
                            <div>
                              <img   src="../../assets/image/platform_gltj.png" />
                            </div >
                          </div>
                        </el-card>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24"  class="pd10">
                          <el-card @click.native="open('ConfigManage')" :body-style="{ padding: '0px',height:'100%'}" class="box-card">
                            <div class="btn-gltj">
                                                  <span  class="text">
                                                      运营管理
                                                  </span>
                              <div>
                                <img  src="../../assets/image/platform_yygl.png" />
                              </div >
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
              </el-col>
            </el-row>
          </el-col>
      </el-row>
      <div class="copy-right-footer">{{copyrightInfo}}</div>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "../../vuex/store";
import * as types from "../../vuex/types";
import * as apiConfig from "./../../api/config";
import ValidateInfo from "./../../utils/ValidateInfo";
import MenuList from "./../../utils/MenuList";
import MTPSManageRights from "./../../utils/MTPSManageRights";
import ReferralRights from "./../../utils/ReferralRights";
import ImageDiagnosisRights from "./../../utils/ImageDiagnosisRights";

@Component
export default class Index extends Vue {
  webTitle: string = "医联体云平台";
  hasPhoto: boolean = false;
  userName: string = "";
  photo: string = "";
  copyrightInfo: string = "版权所有：深圳中兴网信科技有限公司";
  divHeight: string = "100%";
  token: string = "";
  integrationUrl: string = "";

  mounted() {
    this.resetHeight();
    this.getUserInfo();

    this.token = localStorage.getItem("token") as string;
    this.integrationUrl = localStorage.getItem("integrationUrl") as string;

    //监听窗口大小改变事件
    var that = this;
    window.onresize = function temp() {
      that.resetHeight();
    };
  }
  //打开地址
  open(pageType: string) {
    var menus: any = this.menuList(pageType);
    var path = "";
    for (var item of menus) {
      if (item.submenus.length > 0) {
        path = this.getChildrenPath(item.submenus);
      } else {
        if (this.canRedirectMenu(item.right)) {
          path = item.path;
        }
      }

      if (path !== "") {
        // 确保是在网站的根目录下打开
        var rootPath = window.location.href.split("#")[0];
        window.open(`${rootPath}#${path}`);
        return;
      }
    }

    this.alert("权限不足，请联系管理员！");
  }

  menuList(menutype: string) {
    switch (menutype) {
      case "Referral":
        return MenuList.Referral;
      case "ConfigManage":
        return MenuList.ConfigManage;
      case "ImageDiagnosis":
        return MenuList.ImageDiagnosis;
      default:
        return null;
    }
  }

  // 判断可以跳转的子路径
  getChildrenPath(obj: any): string {
    for (var item of obj) {
      if (this.canRedirectMenu((item as any).right)) {
        return (item as any).path;
      }
    }
    return "";
  }

  //判断菜单是否有权限
  canRedirectMenu(right: string) {
    switch (right) {
      // 医联体管理（一级菜单）
      case "12":
        return MTPSManageRights.MTPSManageFirstMenu();
      // 医联体管理（二级菜单）
      case "121002":
        return MTPSManageRights.MTPSManageSecondMenu();
      // 机构管理（菜单）
      case "121006":
        return MTPSManageRights.HCOManageMenu();
      // 科室管理（菜单）
      case "121011":
        return MTPSManageRights.DeptManageMenu();
      // 转诊管理（一级菜单）
      case "101001":
        return ReferralRights.ReferralManageFirstMenu();
      // 住院转诊（二级菜单）
      case "101002":
        return ReferralRights.ZYReferralMenu();
      // 住院审核（二级菜单）
      case "101006":
        return ReferralRights.ZYAuditMenu();
      // 转诊首页（一级菜单）
      case "101010":
        return ReferralRights.IndexMenu();
      // 门诊转诊（二级菜单）
      case "101014":
        return ReferralRights.MZReferralMenu();
      // 门诊审核（二级菜单）
      case "101015":
        return ReferralRights.MZAuditMenu();
      // 影像诊断管理（一级菜单）
      case "111001":
        return ImageDiagnosisRights.ImageDiagnosisFirstMenu();
      // 诊断申请（二级菜单）
      case "111002":
        return ImageDiagnosisRights.DiagnosisApplicationMenu();
      // 影像诊断（二级菜单）
      case "111007":
        return ImageDiagnosisRights.ImageDiagnosisMenu();
      // 报告审核（二级菜单）
      case "111009":
        return ImageDiagnosisRights.ReportAudit();
      // 报告查询（二级菜单）
      case "111011":
        return ImageDiagnosisRights.ReportSearch();
      // 远程诊断首页（一级菜单）
      case "111014":
        return ImageDiagnosisRights.IndexMenu();
      // 超级权限
      case "000000":
        return true;
      default:
        break;
    }
    return false;
  }

  resetHeight() {
    console.log(document.documentElement.clientHeight);
    let height = document.documentElement.clientHeight;
    if(height<=660){
      height = 660;
    }
    let main = this.$refs.main as any;
    let content = this.$refs.content as any;
    main.style.height = height + "px";
    //  height = (height-90)+"px";
    this.divHeight = height - 130 + "px";
    content.style.height = this.divHeight;
  }
  //打开外部地址
  openLink(path: string) {
    window.open(path);
  }

  getUserInfo() {
    var _this = this;
    var token = store.state.token;
    var requestModel = {
      token: token
    };
    Vue.prototype.$http
      .post(apiConfig.API.getUserInfo, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (!response.data.data.photo || response.data.data.photo === null) {
            _this.hasPhoto = false;
          } else {
            _this.hasPhoto = true;
            _this.photo = response.data.data.photo;
          }
          _this.userName = response.data.data.userName;
          console.log(response);
          store.commit(types.USERINFO, {
            id: response.data.data.id,
            hCOCode: response.data.data.hCOCode
          });
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
        }
      })
      .catch(function(error: any) {
        store.commit(types.LOGOUT);
        _this.$router.push({ path: "/" });
      });
  }

  logout() {
    store.commit(types.LOGOUT);
    this.$router.push({ path: "/" });
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width: 100%;
  position: relative;
  background: #f4f4f4;
  min-height: 660px;
  min-width: 1024px;
  overflow: auto;

  .main-top {
    width: 100%;
    height: 72px;
    background: #00ceab;
    border-bottom: 1px solid #52ddc3;

    .company-logo {
      float: left;
      margin: 18px 30px;
    }
    .web-title {
      float: left;
      margin-top: 18px;
      padding-left: 30px;
      height: 36px;
      line-height: 36px;
      border-left: 1px solid #52ddc3;
      font-size: 28px;
      color: #fff;
    }
    .user-info {
      float: right;
      height: 100%;
      .user-head {
        display: inline-block;
        height: 44px;
        width: 44px;
        border-radius: 50%;
        vertical-align: middle;
        img {
          margin-top: 12px;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .user-name {
      padding-left: 12px;
      height: 100%;
      color: white;
      font-size: 15px;
      float: right;
      display: inline;
      margin-top: 16px;
      margin-right: 20px;
      .logout-btn {
        padding-left: 8px;
        color: rgb(43, 54, 255) !important;
        font-size: 12px;
      }
    }
  }

  .main-content {
    width: 100%;
    height: -webkit-calc(100% - 10px);
    position: absolute;
    top: 88px;
    left: 0;
    bottom: 20px;

    .el-row {
      height: 100%;
    }
    .el-col {
      height: 100%;
    }

    .halfH {
      height: 50%;
    }

    .pd10 {
      padding: 10px;
    }

    .pl-20 {
      padding-left: 20px;
    }

    .pr-20 {
      padding-right: 20px;
    }

    .pt10 {
      padding-top: 10px;
    }

    .pb10 {
      padding-bottom: 10px;
    }

    .text {
      font-size: 1.4em;
    }
    .image {
      height: 100%;
      display: block;
    }

    .padding5 {
      padding: 10px;
    }

    .item {
      height: 100%;
      width: 100%;
      position: relative;
    }
    .box-card {
      height: 100%;
      cursor: pointer;
      border-radius: 10px;
    }
    .btn-gltj {
      display: table;
      width: 100%;
      height: 100%;
      span {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
      }
      div {
        display: table-cell;
        vertical-align: middle;
        img {
          height: 55%;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .image-fjzz {
      background: url("../../assets/image/platform_fjzz.png") no-repeat center;
      background-size: cover;
    }
    .image-ycyxzd {
      background: url("../../assets/image/platform_ycyxzd.png") no-repeat center;
      background-size: cover;
    }

    .image-jtxdzd-bg {
      background: url("../../assets/image/platform_jtxdzd_bg.png") no-repeat
        center;
      background-size: cover;
    }

    .image-qyjyzx-bg {
      background: url("../../assets/image/platform_qyjyzx_bg.png") no-repeat
        center;
      background-size: cover;
    }

    .not-allowed {
      cursor: not-allowed;
      box-shadow: none;
    }

    .image-dtxdzd-bg {
      background: url("../../assets/image/platform_dtxdzd_bg.png") no-repeat
        center;
      background-size: cover;
    }
    .image-ycjx {
      width: 40%;
      margin: 33% auto 10% auto;
      display: block;
    }
    .image-ychz {
      width: 25%;
      height: 40%;
      margin: 10% auto 5% auto;
      display: block;
    }
    .image-ycblzd {
      width: 25%;
      height: 40%;
      margin: 10% auto 5% auto;
      display: block;
    }
    .image-jtxdzd {
      width: 40%;
      height: 35%;
      margin: 33% auto 10% auto;
      display: block;
    }
    .height-percent-50 {
      height: 50%;
    }
    .box-bottom-text {
      position: absolute;
      bottom: 0;
      height: 80px;
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      line-height: 80px;
      padding-left: 30px;
      overflow: hidden;
      font-size: 1.5rem;
      display: table-cell;
      vertical-align: middle;
    }
  }
  .copy-right-footer {
    background: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #999999;
    text-align: center;
    font-family: “Microsoft YaHei”;
  }
}
</style>
