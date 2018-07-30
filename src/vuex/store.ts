/**
 * Created by Zili Fan on 17/11/29.
 * vuex store
 */

import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import * as apiConfig from './../api/config'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: null,
        user: {
            id: '',
            userName: '',
            hCOCode: '',
            hCOName: '',
            hCODeptCode: '',
            hCODeptName: '',
            phone: '',
            rights: []
        },
        referral: {
            submitState: {
                userInfo: {},
                result: {}
            },
            dict: {
                sex: {},
                planVisit: {},
                insuranceType: {},
                contactRelationship: {},
                referralDirectionOptList: {}
            },
            pageParame: {
                visitType: ''
            },
            selectHospital: {
                hcocode: '',
                hconame: '',
                remarks: ''
            },
            selectDepartment: {
                deptcode: '',
                deptname: ''
            },
            appointmentInfo: ''
        },
        remote: {
            curDataType: '',
            curPathName: '',
            curSubMenuIndex: 0,
            curRecordId: '',
            curRecordStatus: null
        },
        breadcrumb: []
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = data.token;
            localStorage.serviceBaseUrl = data.baseUrl;
            localStorage.integrationUrl = data.integrationUrl;
            localStorage.rights = JSON.stringify(data.rights);
            state.token = data.token;
            state.user.rights = data.rights;
            Vue.prototype.$http.defaults.baseURL = data.baseUrl;
        },
        [types.USERINFO]: (state, data) => {
            localStorage.hCOCode = data.hCOCode;
            state.user.hCOCode = data.hCOCode;
            state.user.hCOName = data.hCOName;
            state.user.hCODeptCode = data.hCODeptCode;
            state.user.hCODeptName = data.hCODeptName;
            state.user.id = data.id;
            state.user.userName = data.userName;
            state.user.phone = data.phone;
        },
        [types.REFERRALSUBMIT]: (state, data) => {
            state.referral.submitState.userInfo = data.userInfo;
            state.referral.submitState.result = data.result;
        },
        [types.REFERRALDICT]: (state, data) => {
            state.referral.dict.sex = data.sex;
            state.referral.dict.planVisit = data.planVisit;
            state.referral.dict.insuranceType = data.insuranceType;
            state.referral.dict.contactRelationship = data.contactRelationship;
            state.referral.dict.referralDirectionOptList = data.referralDirectionOptList;
        },
        [types.REFERRALPAGEPARAME]: (state, data) => {
            state.referral.pageParame.visitType = data.visitType;
        },
        [types.SELECTHOSPITAL]: (state, data) => {
            state.referral.selectHospital.hcocode = data.hcocode;
            state.referral.selectHospital.hconame = data.hconame;
            state.referral.selectHospital.remarks = data.remarks;
        },
        [types.SELECTDEPARTMENT]: (state, data) => {
            state.referral.selectDepartment.deptcode = data.deptcode;
            state.referral.selectDepartment.deptname = data.deptname;
        },
        [types.APPOINTMENTINFO]: (state, data) => {
            state.referral.appointmentInfo = data.appointmentInfo;
        },
        [types.CURREMOTETYPE]: (state, data) => {
            state.remote.curDataType = data.curDataType;
        },
        [types.CURREMOTEDATASELECT]: (state, data) => {
            state.remote.curPathName = data.curPathName;
            state.remote.curSubMenuIndex = data.curSubMenuIndex;
        },
        [types.CURREMOTERECORD]: (state, data) => {
            state.remote.curRecordId = data.curRecordId;
            state.remote.curRecordStatus = data.curRecordStatus;
        },
        [types.BREADCRUMB]: (state, data) => {
            state.breadcrumb = data;
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('serviceBaseUrl');
            localStorage.removeItem('breadcrumb');
            state.token = null;
            Vue.prototype.$http.defaults.baseURL = apiConfig.baseUrl;
        }
    }
})