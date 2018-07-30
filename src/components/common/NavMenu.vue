<template>
  <div class="nav-menu">
    <ul class="my-nav-menu">
        <li v-for="item in menuList"
                    v-bind:key="item.index"
                    v-bind:index="item.index"
                    v-show="showMenu(item.right)"
                    :class="[isCurPath(item.root)?'open':'close',item.submenus.length>0?'canfold':'']">
            <router-link class="link" 
                        :to="item.submenus.length>0?getChildrenPath(item.submenus):item.path"
                        active-class="active">
                <span :class="item.icon">{{item.name}}</span>
            </router-link>
            <ul>
            <li v-for="subitem in item.submenus"
                v-bind:key="subitem.index"
                v-bind:index="subitem.index"
                v-show="showMenu(subitem.right)">
                <router-link class="link" 
                            :to="subitem.path"
                            active-class="active">
                        <span :class="subitem.icon">{{subitem.name}}</span>
                </router-link>
            </li>
            </ul>
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../vuex/store";
import MenuList from "./../../utils/MenuList";
import MTPSManageRights from "./../../utils/MTPSManageRights";
import ReferralRights from "./../../utils/ReferralRights";
import ImageDiagnosisRights from "./../../utils/ImageDiagnosisRights";
@Component
export default class NavMenu extends Vue {
  // 判断菜单
  @Prop() menutype: string;

  get menuList() {
    switch (this.menutype) {
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

  //判断菜单是否显示
  showMenu(right: string) {
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
      // 首页（一级菜单）
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

  // 判断是否当前路径
  isCurPath(path: string): boolean {
    if (this.$route.path.indexOf(path) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  // 判断可以跳转的子路径
  getChildrenPath(obj: any): string {
    for (var item of obj) {
      if (this.showMenu((item as any).right)) {
        return (item as any).path;
      }
    }
    return "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.nav-menu {
  width: 100%;
  height: 100%;

  .my-nav-menu,
  .my-nav-menu ul,
  .my-nav-menu li {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }
  .my-nav-menu > li {
    width: 100%;
    background: #e0f9f2;
    margin-bottom: 1px !important;

    &.canfold {
      background: #e0f9f2 url("./../../assets/image/nav_menu_tri_close.png")
        no-repeat right 20px top 20px;
    }
  }
  .my-nav-menu > li.open {
    background: #e0f9f2;

    &.canfold {
      background: #e0f9f2 url("./../../assets/image/nav_menu_tri_open.png")
        no-repeat right 20px top 20px;
    }
  }

  .my-nav-menu > li span {
    display: inline-block;
    width: 100%;
    height: 46px;
    line-height: 46px;
    padding-left: 50px;
    font-size: 14px;
    color: #1bd0a1;
  }
  .my-nav-menu > li ul {
    display: none;
  }
  .my-nav-menu > li.open ul {
    display: block;
  }
  .my-nav-menu > li ul li {
    background: #fff;
  }
  .my-nav-menu > li ul li span {
    color: #939393;
  }
  .my-nav-menu > li ul li:hover {
    background: #eee;
  }
  .my-nav-menu > li ul li .active {
    background: #1bd0a1;
  }

  .my-nav-menu > li ul li .active span {
    color: #fff;
  }

  .mtps-manage {
    background: url("./../../assets/image/mtps_manage_icon.png") no-repeat 17px;
  }

  .authority-manage {
    background: url("./../../assets/image/authority_manage_icon.png") no-repeat
      17px;
  }

  .dictionary-manage {
    background: url("./../../assets/image/dictionary_manage_icon.png") no-repeat
      17px;
  }
}
</style>
