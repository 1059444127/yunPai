<template>
    <div class="main">
        <div class="main-top">
            <div class="top-left">
                <img class="company-logo" src="./../assets/image/company_logo.png" />
                <div class="main-top-title">{{webTitle}}</div>
            </div>
            <div class="top-right">
                <div class="top-menu">
                  <div class="menu-list">
                    <ul>
                      <li>消息</li>
                      <li v-show="searchUserDetailInfoRight" @click="goUserCenter()">用户中心</li>
                      <li @click="logout()">退出</li>
                    </ul>
                  </div>
                </div>
                <div class="user-name">{{userName}}</div>
                <div class="user-info">
                  <div class="user-head" >
                    <img v-show="!hasPhoto" src="./../assets/image/platform_head.png" />
                    <img v-show="hasPhoto" :src="photo" />
                  </div>
                </div>

                <div class="main-nav" v-show="false">
                  <navBar class="main-nav-in" :admin="admin"></navBar>
                </div>
            </div>
        </div>
        <!-- <div class="breadcrumb">
          <breadcrumb></breadcrumb>
        </div> -->
        <div class="main-content">
            <router-view  @web-title-change="changeTitle"></router-view>
        </div>
      <!-- Create userInfoView start -->
      <viewUserInfo :show="showViewUser"  :userid="userId" @show-status-change = "changeShowStatus"></viewUserInfo>
      <!-- Create userInfoView end -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navigation from "@/components/common/Navigation.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ViewUserInfo from "@/components/common/ViewUserInfo.vue";
import store from "./../vuex/store";
import * as types from "./../vuex/types";
import * as apiConfig from "./../api/config";
import UserManageRights from "./../utils/UserManageRights";
import ValidateInfo from "./../utils/ValidateInfo";

@Component({
  components: {
    navBar: Navigation,
    breadcrumb: Breadcrumb,
    viewUserInfo: ViewUserInfo
  }
})
export default class FrontEndMain extends Vue {
  webTitle: string = "医联体云平台";
  userName = "";
  hospitalName: string = "";
  btnMsg: string = "消息(2)";
  btnSetting: string = "设置";
  btnLogout: string = "退出";
  locationTitle: string = "位置：";
  curLocation: string = "首页";
  showViewUser: boolean = false;
  userId: string = "";
  hasPhoto: boolean = false;
  photo: string = "";

  admin: string = "admin";

  // 功能权限点标记
  searchUserDetailInfoRight: boolean = UserManageRights.SearchUserDetailInfo();

  mounted() {
    // 页面刷新时，重新赋值token和接口地址
    if (
      !window.localStorage.getItem("token") ||
      !window.localStorage.getItem("serviceBaseUrl")
    ) {
      this.$router.push({ path: "/" });
    }
    this.getUserInfo();
  }

  getUserInfo() {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.getUserInfo)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;
          _this.hospitalName = data.hCOName;
          _this.userName = data.userName;
          if (!response.data.data.photo || response.data.data.photo === null) {
            _this.hasPhoto = false;
          } else {
            _this.hasPhoto = true;
            _this.photo = response.data.data.photo;
          }
          store.commit(types.USERINFO, {
            hCOCode: data.hCOCode,
            hCOName: data.hCOName,
            hCODeptCode: data.deptCode,
            hCODeptName: data.deptName,
            id: data.id,
            userName: data.userName,
            phone: data.phone
          });
          _this.userId = data.id;
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
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //
  changeShowStatus(val: boolean) {
    this.showViewUser = val;
  }

  goUserCenter() {
    this.showViewUser = true;
    //store.commit(types.LOGOUT);
    //this.$router.push({ path: "/" });
  }

  changeTitle(title: string) {
    this.webTitle = title;
  }

  logout() {
    window.close();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width: 100%;
  position: relative;
  background: #f4f4f4;

  .main-top {
    width: 100%;
    height: 72px;
    background: #00ceab;
    clear: both;
    z-index: 3;

    .top-left {
      float: left;
      clear: both;

      .company-logo {
        float: left;
        margin: 18px 30px;
      }

      .main-top-title {
        float: left;
        margin-top: 18px;
        padding-left: 30px;
        height: 36px;
        line-height: 36px;
        border-left: 1px solid #52ddc3;
        font-size: 28px;
        color: #fff;
      }
    }

    .top-right {
      float: right;

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
        float: right;
        margin-right: 12px;
        padding-left: 10px;
        height: 100%;
        color: white;
        font-size: 15px;
        display: inline;
        margin-top: 24px;
      }

      .top-menu {
        cursor: pointer;
        float: right;
        position: relative;
        width: 73px;
        height: 72px;
        background: #00c2a3 url("./../assets/image/top_menu_icon.png") no-repeat
          center;

        .menu-list {
          position: absolute;
          right: 0;
          top: 72px;
          display: none;
          z-index: 2;

          ul {
            padding: 0;
            margin: 0;

            li {
              width: 100px;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              background: #00c2a3;
              color: #ffffff;
              text-align: center;

              .link {
                color: #fff;
              }

              &:hover {
                background: #00e1b5;
              }
            }
          }
        }

        &:hover {
          .menu-list {
            display: block;
          }
        }
      }

      .main-nav {
        float: right;
        max-width: 740px;
        height: 72px;
        background: #00ceab;

        .main-nav-in {
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }

  .main-content {
    width: 100%;
    padding: 0 10px;
    position: fixed;
    top: 92px;
    left: 0;
    bottom: 20px;
  }
}
</style>
