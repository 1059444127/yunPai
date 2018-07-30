<template>
    <div class="main">
        <div class="main-top">
          <div class="main-top-in">
            <div class="top-left">
                <img class="company-logo" v-show="false" src="">
                <span class="main-top-title">{{webTitle}}-{{subTitle}}</span>
            </div>
            <div class="top-right">
                <div class="user-info-top">
                    <div class="user-name">{{userName}}</div>
                    <div class="hospital-name">{{hospitalName}}</div>
                </div>
                <div class="user-info-bottom">
                    <router-link class="text-link" to="">{{btnMsg}}</router-link>
                    <span class="user-info-line">|</span>
                    <router-link class="text-link" to="">{{btnSetting}}</router-link>
                    <span class="user-info-line">|</span>
                    <span class="text-link pointer" @click="logout()">{{btnLogout}}</span>
                </div>
            </div>
          </div>
        </div>
        <div class="main-content">
            <div class="video-title">
              局部解剖学操作指导-器械
            </div>
            <video src="https://mtps.vico-lab.com/test.mp4" controls autoplay>
            您的浏览器不支持该播放器。
            </video>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./../../vuex/store";
import * as types from "./../../vuex/types";
import * as apiConfig from "./../../api/config";
import ReferralRights from "./../../utils/ReferralRights";
import ValidateInfo from "./../../utils/ValidateInfo";

@Component({
  components: {}
})
export default class VideoPlayPage extends Vue {
  webTitle: string = "医联体云平台";
  subTitle: string = "教学视频点播";
  userName = "";
  hospitalName: string = "";
  btnMsg: string = "消息(2)";
  btnSetting: string = "设置";
  btnLogout: string = "退出";
  locationTitle: string = "位置：";
  curLocation: string = "首页";

  admin: string = "admin";

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
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
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

  .main-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #fff;
    clear: both;
    border-bottom: 10px solid #42e0b7;

    .main-top-in {
      width: 1200px;
      margin: 0 auto;

      .top-left {
        float: left;
        clear: both;

        .main-top-title {
          float: left;
          line-height: 60px;
          font-size: 30px;
          color: #42e0b7;
          font-family: "Microsoft Yahei Bold", "Microsoft Yahei";
        }
      }

      .top-right {
        float: right;
        margin-top: 13px;
        line-height: 22px;

        .user-info-top {
          clear: both;
          height: 22px;
          font-size: 16px;
          color: #42e0b7;
          font-weight: bold;

          .user-name {
            float: right;
            padding-right: 16px;
            background: url("./../../assets/image/main_icon_username.png")
              no-repeat right 10px;
          }

          .hospital-name {
            float: right;
            margin-right: 16px;
            padding-left: 26px;
            background: url("./../../assets/image/main_icon_user.png") no-repeat
              center left;
          }
        }

        .user-info-bottom {
          text-align: right;

          .user-info-line {
            margin: 0 8px;
            color: #ccc;
          }

          .text-link {
            font-size: 14px;
            color: #42e0b7;
          }
        }
      }
    }
  }

  .main-content {
    width: 1200px;
    position: absolute;
    top: 80px;
    left: 50%;
    margin-left: -600px;
    margin-bottom: 30px;
    background: #fff;
    padding: 20px 30px;

    .video-title {
      border-left: 10px solid #42e0b7;
      margin-bottom: 20px;
      padding-left: 15px;
    }

    video {
      background: #ccc;
      width: 100%;
      height: 600px;
    }
  }
}
</style>