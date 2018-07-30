/**
 * Created by Zili Fan on 17/11/29.
 * http 配置
 */

import axios from 'axios'
import store from './../vuex/store'
import * as types from './../vuex/types'
import * as  apiConfig from './config'
import router from './../router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = apiConfig.baseUrl;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.post["Content-Type"] = "text/plain;charset=utf-8";
            config.headers.common.Accept = "application/json; charset=utf-8";
            config.headers.common.token = store.state.token;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

export default axios;
