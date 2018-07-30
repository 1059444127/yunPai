import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../vuex/store'
import * as types from "./../vuex/types"

/* 公共页面 */
import Login from '@/components/Login.vue'
import FrontEndMain from '@/components/FrontEndMain.vue'
import BackEndMain from '@/components/BackEndMain.vue'
import Breadcrumb from "./../utils/Breadcrumb"

/* 双向转诊相关页面 */
import dualreferral from '@/components/dualreferral/Index.vue'
import dualreferralhomepage from '@/components/dualreferral/homepage/Index.vue'
import referralmanagezyreferral from '@/components/dualreferral/manage/zy/ReferralRegistration.vue'
import referralmanagezyaudit from '@/components/dualreferral/manage/zy/AcceptAudit.vue'
import referralmanagemzreferral from '@/components/dualreferral/manage/mz/ReferralRegistration.vue'
import referralmanagemzaudit from '@/components/dualreferral/manage/mz/AcceptAudit.vue'
/*
import dualreferralrecord from '@/components/dualreferral/manage/DualreferralRecord.vue'
import pendingaudit from '@/components/dualreferral/manage/PendingAudit.vue'
import pendingreceive from '@/components/dualreferral/manage/PendingReceive.vue'
import referraloutrecord from '@/components/dualreferral/manage/ReferralOutRecord.vue'
import referralinrecord from '@/components/dualreferral/manage/ReferralInRecord.vue'
*/

/* 远程影像诊断相关页面 */
import imagediagnosis from '@/components/imagediagnosis/Index.vue'
import imagediagnosishomepage from '@/components/imagediagnosis/homepage/Index.vue'
import imagediagnosismanagediagnosisapplication from '@/components/imagediagnosis/manage/DiagnosisApplication.vue'
import imagediagnosismanageimagediagnosis from '@/components/imagediagnosis/manage/ImageDiagnosis.vue'
import imagediagnosismanagereportaudit from '@/components/imagediagnosis/manage/ReportAudit.vue'
import imagediagnosismanagereportsearch from '@/components/imagediagnosis/manage/ReportSearch.vue'

/* 病历资料相关页面 */
import medicaldata from '@/components/medicaldata/Index.vue'

/* 远程诊断相关页面 */
/*
import remotediagnosis from '@/components/remotediagnosis/Index.vue'
import remoteimage from '@/components/remotediagnosis/remoteimage/RemoteImage.vue'
import imagependingdiagnosis from '@/components/remotediagnosis/remoteimage/ImagePendingDiagnosis.vue'
import imagependingaudit from '@/components/remotediagnosis/remoteimage/ImagePendingAudit.vue'
import imageapplicationrecord from '@/components/remotediagnosis/remoteimage/ImageApplicationRecord.vue'
import imageapplicationform from '@/components/remotediagnosis/remoteimage/ApplicationForm.vue'
import imagediagnosticreport from '@/components/remotediagnosis/remoteimage/DiagnosticReport.vue'
import imageauditreportform from '@/components/remotediagnosis/remoteimage/AuditReportForm.vue'
import imageprintreportform from '@/components/remotediagnosis/remoteimage/PrintReportForm.vue'
import remoteecg from '@/components/remotediagnosis/remoteecg/RemoteEcg.vue'
import ecgpendingdiagnosis from '@/components/remotediagnosis/remoteecg/EcgPendingDiagnosis.vue'
import ecgpendingaudit from '@/components/remotediagnosis/remoteecg/EcgPendingAudit.vue'
import ecgapplicationrecord from '@/components/remotediagnosis/remoteecg/EcgApplicationRecord.vue'
import ecgapplicationform from '@/components/remotediagnosis/remoteecg/ApplicationForm.vue'
import ecgdiagnosticreport from '@/components/remotediagnosis/remoteecg/DiagnosticReport.vue'
import ecgauditreportform from '@/components/remotediagnosis/remoteecg/AuditReportForm.vue'
import ecgprintreportform from '@/components/remotediagnosis/remoteecg/PrintReportForm.vue'
import remotepathology from '@/components/remotediagnosis/remotepathology/RemotePathology.vue'
import pathologypendingdiagnosis from '@/components/remotediagnosis/remotepathology/PathologyPendingDiagnosis.vue'
import pathologypendingaudit from '@/components/remotediagnosis/remotepathology/PathologyPendingAudit.vue'
import pathologyapplicationrecord from '@/components/remotediagnosis/remotepathology/PathologyApplicationRecord.vue'
import pathologydiagnosticreport from '@/components/remotediagnosis/remotepathology/DiagnosticReport.vue'
import pathologyauditreportform from '@/components/remotediagnosis/remotepathology/AuditReportForm.vue'
import pathologyprintreportform from '@/components/remotediagnosis/remotepathology/PrintReportForm.vue'
import medicaldata from '@/components/remotediagnosis/medicaldata/Index.vue'
import patientinfo from '@/components/remotediagnosis/medicaldata/PatientInfo.vue'
import medicalrecord from '@/components/remotediagnosis/medicaldata/MedicalRecord.vue'
import studyrecord from '@/components/remotediagnosis/medicaldata/StudyRecord.vue'
import inspectionrecord from '@/components/remotediagnosis/medicaldata/InspectionRecord.vue'
import medicalrecorddetail from '@/components/remotediagnosis/medicaldata/MedicalRecordDetail.vue'
import mrdcase from '@/components/remotediagnosis/medicaldata/MRDCase.vue'
import mrddoctor from '@/components/remotediagnosis/medicaldata/MRDDoctor.vue'
import mrdstudy from '@/components/remotediagnosis/medicaldata/MRDStudy.vue'
import mrdtest from '@/components/remotediagnosis/medicaldata/MRDTest.vue'
import studyrecorddetail from '@/components/remotediagnosis/medicaldata/StudyRecordDetail.vue'
import inspectionrecorddetail from '@/components/remotediagnosis/medicaldata/InspectionRecordDetail.vue'
*/

/* 远程教学相关页面 */
import remoteeducation from '@/components/remoteeducation/Index.vue'
import livebroadcast from '@/components/remoteeducation/LiveBroadcast.vue'
import educationalvideo from '@/components/remoteeducation/EducationalVideo.vue'
import resourcelibrary from '@/components/remoteeducation/ResourceLibrary.vue'
import videoplaypage from '@/components/remoteeducation/VideoPlayPage.vue'

/* 后台配置管理相关页面 */
import configmanage from '@/components/configmanage/Index.vue'
import authoritypoint from '@/components/configmanage/authority/Point.vue'
import authorityrole from '@/components/configmanage/authority/Role.vue'
import authorityuser from '@/components/configmanage/authority/User.vue'
import mtpsmtps from '@/components/configmanage/mtps/MTPS.vue'
import mtpshco from '@/components/configmanage/mtps/HCO.vue'
import mtpsdept from '@/components/configmanage/mtps/Dept.vue'
import mtpsmedia from '@/components/configmanage/basedict/Media.vue'

/* 医联体平台登录首页 */
import platform from '@/components/platform/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/platform',
      name: 'platform',
      component: platform,
      meta: { requiresAuth: true }
    },
    {
      path: '/main',
      name: 'main',
      redirect: '/dualreferral',
      component: FrontEndMain,
      meta: {},
      children: [
        {
          path: '/dualreferral',
          redirect: '/dualreferral/homepage',
          name: 'dualreferral',
          component: dualreferral,
          meta: {},
          children: [
            {
              path: '/dualreferral/homepage',
              name: 'dualreferralhomepage',
              component: dualreferralhomepage,
              meta: {}
            }, {
              path: '/dualreferral/manage/zyreferral',
              name: 'referralmanagezyreferral',
              component: referralmanagezyreferral,
              meta: {}
            }, {
              path: '/dualreferral/manage/zyaudit',
              name: 'referralmanagezyaudit',
              component: referralmanagezyaudit,
              meta: {}
            }, {
              path: '/dualreferral/manage/mzreferral',
              name: 'referralmanagemzreferral',
              component: referralmanagemzreferral,
              meta: {}
            }, {
              path: '/dualreferral/manage/mzaudit',
              name: 'referralmanagemzaudit',
              component: referralmanagemzaudit,
              meta: {}
            }
          ]

        }, {
          path: '/imagediagnosis',
          redirect: '/imagediagnosis/manage/diagnosisapplication',
          name: 'imagediagnosis',
          component: imagediagnosis,
          meta: {},
          children: [
            {
              path: '/imagediagnosis/homepage',
              name: 'imagediagnosishomepage',
              component: imagediagnosishomepage,
              meta: {}
            }, {
              path: '/imagediagnosis/manage/diagnosisapplication',
              name: 'imagediagnosismanagediagnosisapplication',
              component: imagediagnosismanagediagnosisapplication,
              meta: {}
            }, {
              path: '/imagediagnosis/manage/imagediagnosis',
              name: 'imagediagnosismanageimagediagnosis',
              component: imagediagnosismanageimagediagnosis,
              meta: {}
            }, {
              path: '/imagediagnosis/manage/reportaudit',
              name: 'imagediagnosismanagereportaudit',
              component: imagediagnosismanagereportaudit,
              meta: {}
            }, {
              path: '/imagediagnosis/manage/reportsearch',
              name: 'imagediagnosismanagereportsearch',
              component: imagediagnosismanagereportsearch,
              meta: {}
            }
          ]
        }, {
          path: '/remoteeducation',
          redirect: '/remoteeducation/educationalvideo',
          name: 'remoteeducation',
          component: remoteeducation,
          meta: {},
          children: [
            {
              path: '/remoteeducation/livebroadcast',
              name: 'livebroadcast',
              component: livebroadcast,
              meta: { breadMenuName: 'livebroadcast' }
            },
            {
              path: '/remoteeducation/educationalvideo',
              name: 'educationalvideo',
              component: educationalvideo,
              meta: { breadMenuName: 'educationalvideo' }
            },
            {
              path: '/remoteeducation/resourcelibrary',
              name: 'resourcelibrary',
              component: resourcelibrary,
              meta: { breadMenuName: 'resourcelibrary' }
            }
          ]
        }, {
          path: '/configmanage',
          name: 'configmanage',
          redirect: '/configmanage/mtps/mtps',
          component: configmanage,
          meta: {},
          children: [
            {
              path: '/configmanage/authority/point',
              name: 'authoritypoint',
              component: authoritypoint,
              meta: { breadMenuName: 'authoritypoint' }
            }, {
              path: '/configmanage/authority/role',
              name: 'authorityrole',
              component: authorityrole,
              meta: { breadMenuName: 'authorityrole' }
            }, {
              path: '/configmanage/authority/user',
              name: 'authorityuser',
              component: authorityuser,
              meta: { breadMenuName: 'authorityuser' }
            }, {
              path: '/configmanage/mtps/mtps',
              name: 'mtpsmtps',
              component: mtpsmtps,
              meta: { breadMenuName: 'mtpsmtps' }
            }, {
              path: '/configmanage/mtps/hco',
              name: 'mtpshco',
              component: mtpshco,
              meta: { breadMenuName: 'mtpshco' }
            }, {
              path: '/configmanage/mtps/dept',
              name: 'mtpsdept',
              component: mtpsdept,
              meta: { breadMenuName: 'mtpsdept' }
            },
            {
              path: '/configmanage/basedict/media',
              name: 'mtpsmedia',
              component: mtpsmedia,
              meta: {}
            }
          ]
        }, {
          path: '/medicaldata',
          name: 'medicaldata',
          component: medicaldata,
          meta: {}
        }
      ]
    },
    {
      path: '/videoplaypage',
      name: 'videoplaypage',
      component: videoplaypage,
      meta: { requiresAuth: false }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],
  mode: 'hash'
})

/* 暂时不需要面包屑功能
var routeList: {}[];
router.beforeEach((to, from, next) => {

  // 面包屑设置
  to.meta.routeList = JSON.parse((localStorage.getItem("breadcrumb") as string));
  if (to.meta.breadMenuName !== undefined) {
    switch (to.meta.breadMenuName) {
      case "dualreferral":
        to.meta.routeList = Breadcrumb.dualreferral;
        break;
      case "remotediagnosis":
        to.meta.routeList = Breadcrumb.remotediagnosis;
        break;
      case "remoteimage":
        to.meta.routeList = Breadcrumb.remoteimage;
        break;
      case "remoteecg":
        to.meta.routeList = Breadcrumb.remoteecg;
        break;
      case "remotepathology":
        to.meta.routeList = Breadcrumb.remotepathology;
        break;
      case "livebroadcast":
        to.meta.routeList = Breadcrumb.livebroadcast;
        break;
      case "educationalvideo":
        to.meta.routeList = Breadcrumb.educationalvideo;
        break;
      case "resourcelibrary":
        to.meta.routeList = Breadcrumb.resourcelibrary;
        break;
      case "authoritypoint":
        to.meta.routeList = Breadcrumb.authoritypoint;
        break;
      case "authorityrole":
        to.meta.routeList = Breadcrumb.authorityrole;
        break;
      case "authorityuser":
        to.meta.routeList = Breadcrumb.authorityuser;
        break;
      default:
        break;
    }
  }
  localStorage.setItem("breadcrumb", JSON.stringify(to.meta.routeList));

  next();
})
*/

/**
 * Token验证，只是对时间验证过期否
 * */
function _checkAuth() {
  return new Promise(function (resolve, reject) {
    let authorization = Vue.prototype.$localStorage.authorization

    let time = parseInt(authorization.time)
    console.log(authorization)
    if (new Date().getTime() - time < 1000 * 60 * 60 * 2) {
      // token有效,能进入
      if (!store.state.user) {
        let userinfo = Vue.prototype.$localStorage.userInfo
        store.commit('setLoginState', true)
        store.commit('updateUserInfo', {
          user: userinfo
        })
        // 设置请求的token
        // this.$http.headers.common['authorization'] =
        // 'Bearer  ' + authorization.token
      }
      resolve()
    } else {
      Vue.prototype.$localStorage.$delete('authorization')
      Vue.prototype.$localStorage.$delete('userInfo')
      store.commit('setLoginState', false)
      store.commit('updateUserInfo', {
        user: null
      })
      reject()
    }
  })
}

export default router
