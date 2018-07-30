// 指定登录验证服务器地址
// export const baseUrl = 'https://mtps-api.vico-lab.com:8443/mtps-api-auth/';
export const baseUrl = 'http://172.16.99.213/mtps-api-auth/';
// export const baseUrl = 'http://172.16.22.115:8080/auth/';
// export const baseUrl = 'http://localhost:8200/auth/';
// export const baseUrl='http://119.23.23.56:8800/mtps-api-auth/';

// 登录失效错误代码
export const MESSAGECODE = {
    SUCCESS: 0,
    ERROR: 10003,
    TIMEOUT: 10004,
    LACKOFAUTHORITY: 10005,
    CALLYFDERROR: 10201
};

// 接口
export const API = {

    // 获取验证码
    getVertifyCode: '/auth/getVertifyCode',
    // 登录验证，获取token
    getToken: '/auth/getToken',

    // 获取登录用户信息
    getUserInfo: '/user/user/getUserInfo',

    /***  用户中心相关接口  ***/
    // 查询用户详细信息
    staffUserInfoSearch: '/user/user/search/detail',
    // 修改用户详细信息
    staffUserInfoModify: '/user/user/modify/ex',
    // 修改用户密码
    passwordModify: '/user/user/modifyUserPwd',

    /***  转诊相关接口  ***/
    // 获取转诊相关字典
    getRefferralDict: '/referral/getRefferralDict',
    // 根据ID获取转诊信息
    getReferralInfoByID: 'referral/getReferralInfoByID',
    // 取消转诊单
    cancelReferralByID: '/referral/cancelReferralByID',
    // 审核转出转诊申请
    auditReferralOutByID: '/referral/auditReferralOutByID',
    // 审核转入转诊申请
    auditReferralInByID: '/referral/auditReferralInByID',
    // 根据医院code获取科室字典
    getDepartmentDictByHCOCode: '/referral/getDepartmentDictByHCOCode',
    // 根据转诊类型获取转诊原因
    getReferralReasonByType: '/referral/getReferralReasonByType',
    // 获取转诊医院字典
    getHCODict: '/referral/getHCODict',
    // 提交转诊信息
    submitReferralInfo: '/referral/submitReferralInfo',
    // 获取待审核&待接收数量
    getWaitAuditAcceptCount: '/referral/getWaitAuditAcceptCount',
    // 获取待审核或待接收转诊患者信息列表
    getReferralPatBasicInfo: '/referral/getReferralPatBasicInfo',
    // 获取转入转诊记录信息
    getReferralInRecordInfo: '/referral/getReferralInRecordInfo',
    // 获取当前用户所能查看的转诊转出记录信息列表
    getReferralOutRecordInfo: '/referral/getReferralOutRecordInfo',
    // 获取当前用户可转诊的医院列表
    getHCOForReferral: '/referral/getHCOForReferral',
    // 获取转诊科室信息
    getOpenedDeptForReferral: '/referral/getOpenedDeptForReferral',
    // 查询转出记录
    searchDualReferralOut: '/dualReferral/dualReferral/search/out',
    // 查询转入记录
    searchDualReferralIn: '/dualReferral/dualReferral/search/in',
    // 按天统计转诊量
    getHalfMonthReferralCount: '/dualReferral/dualReferral/stat/count',
    // 按医生统计转诊量
    getDoctorReferralCountRank: '/dualReferral/dualReferral/stat/ranking',
    // 统计转诊量
    getReferralTotal: '/dualReferral/dualReferral/stat/total',
    // 短信催办
    dualReferralSMSRemind: '/dualReferral/dualReferral/sms/remind',

    /***  病历资料相关接口  ***/
    // 获取患者基本信息
    getPatientBasicInfo: '/emr/getPatientBasicInfo',
    // 获取患者就诊信息
    getVisitInfoByPatientId: '/emr/getVisitInfoByPatientId',

    /***  远程影像诊断相关接口  ***/
    // 查询远程影像诊断记录
    searchRemoteImageDiagnosis: '/remoteImage/remoteImageDiagnosis/search/detail',
    // 分页查询远程影像诊断记录
    searchRemoteImageDiagnosisByPage: '/remoteImage/remoteImageDiagnosis/search/page',
    // 查询远程影像诊断申请执行日志
    searchRemoteImageDiagnosisActionLog: '/remoteImage/remoteImageDiagnosisActionLog/search',
    // 审核远程影像诊断
    auditRemoteImageDiagnosis: '/remoteImage/remoteImageDiagnosis/audit',
    // 撤回远程影像诊断申请
    cancelRemoteImageDiagnosis: '/remoteImage/remoteImageDiagnosis/cancel',
    // 诊断远程影像
    diagnoseRemoteImageDiagnosis: '/remoteImage/remoteImageDiagnosis/diagnose',
    // 获取英飞达写报告地址
    getremoteImageQueryWriteReportUrl: '/remoteImage/remoteImageDiagnosis/queryWriteReportUrl',
    // 查询患者检查信息
    searchPatientremoteImageDiagnosis: '/remoteImage/remoteImageDiagnosis/search/patient',
    // 新建远程影像诊断记录
    createRemoteImageDiagnosis: '/remoteImage/remoteImageDiagnosis/create',
    // 修改远程影像诊断记录
    modifyRemoteImageDiagnosis: '/remoteImage/remoteImageDiagnosis/modify',
    // 短信催办
    remoteImageDiagnosisSMSRemind: '/remoteImage/remoteImageDiagnosis/sms/remind',
    // 获取英飞达影像文件地址接口
    getRemoteImageQueryImageFileUrl: '/remoteImage/remoteImageDiagnosis/queryImageFileUrl',

    // 获取远程影像诊断申请记录
    remoteImageGetRemoteDiagReqRecord: '/remoteImage/getRemoteDiagReqRecord',
    // 获取远程影像诊断待审核诊断申请记录
    remoteImageGetRemoteWaitAuditDiagReqRecord: '/remoteImage/getRemoteWaitAuditDiagReqRecord',
    // 获取远程影像诊断待诊断申请记录
    remoteImageGetRemoteWaitDiagReqRecord: '/remoteImage/getRemoteWaitDiagReqRecord',
    // 获取远程影像诊断待诊断及待审核的诊断申请数量
    remoteImageGetRemoteWaitAuditWaitDiagCount: '/remoteImage/getRemoteWaitAuditWaitDiagCount',
    // 审核通过
    remoteImageAcceptAudit: '/remoteImage/acceptAudit',
    // 保存远程影像诊断报告单
    remoteImageSaveDiagReport: '/remoteImage/saveDiagReport',
    // 获取远程影像诊断报告单信息
    remoteImageGetDiagReport: '/remoteImage/getDiagReport',
    // 提交远程诊断影像诊断申请
    remoteImageSubmitApplication: '/remoteImage/submitApplication',
    // 获取远程诊断影像诊断申请信息
    remoteImageGetApplicationDetail: '/remoteImage/getApplicationDetail',

    /***  字典相关接口  ***/
    // 查询卫生服务机构信息
    getHealthCareOrganizationDict: '/user/user/getMTPSCoopHCO',
    // 查询科室信息
    getDepartmentDict: '/dict/department/search',
    // 查询检查类别
    getExamClassDict: '/dict/examClass/search',

    /*** 权限相关接口 ***/
    // 查询权限类别
    funClassSearch: '/right/funClass/search',
    // 新建权限类别
    funClassCreate: '/right/funClass/create',
    // 删除权限类别
    funClassDelete: '/right/funClass/delete',
    // 修改权限类别
    funClassModify: '/right/funClass/modify',
    // 查询功能权限点
    funRightSearch: '/right/funRight/search',
    // 查询详细功能权限点
    funRightDetailSearch: '/right/funRight/search/detail',
    // 新建功能权限点
    funRightCreate: '/right/funRight/create',
    // 删除功能权限点
    funRightDelete: '/right/funRight/delete',
    // 修改功能权限点
    funRightModify: '/right/funRight/modify',
    // 查询数据权限点
    dataRightSearch: '/right/dataRight/search',
    // 新建数据权限点
    dataRightCreate: '/right/dataRight/create',
    // 删除数据权限点
    dataRightDelete: '/right/dataRight/delete',
    // 修改数据权限点
    dataRightModify: '/right/dataRight/modify',
    // 查询角色
    roleSearch: '/right/role/search',
    // 新建角色
    roleCreate: '/right/role/create',
    // 删除角色
    roleDelete: '/right/role/delete',
    // 修改角色
    roleModify: '/right/role/modify',
    // 查询角色权限
    roleRightSearch: '/right/role/right/search',
    // 修改角色权限
    roleRightSet: '/right/role/right/set',
    // 获取医联体合作医院
    getMTPSCoopHCO: '/user/user/getMTPSCoopHCO',
    // 医联体用户查询
    mtpsUserSearch: '/user/user/search/ex',
    // 医联体用户详细信息查询
    getMTPSUserInfo: '/user/user/search/detail',
    // 创建医联体用户
    createMTPSUser: '/user/user/create/ex',
    // 修改医联体用户信息
    modifyMTPSUser: '/user/user/modify/ex',

    /*** 医联体管理相关接口 ***/
    // 查询医联体
    searchMTPS: '/dict/MTPS/search',
    // 新建医联体
    createMTPS: '/dict/MTPS/create',
    // 修改医联体
    modifyMTPS: '/dict/MTPS/modify',
    // 删除医联体
    deleteMTPS: '/dict/MTPS/delete',
    // 查询卫生服务机构
    searchHealthCareOrganization: '/dict/healthCareOrganization/search',
    // 新建卫生服务机构
    createHealthCareOrganization: '/dict/healthCareOrganization/create',
    // 修改卫生服务机构
    modifyHealthCareOrganization: '/dict/healthCareOrganization/modify',
    // 删除卫生服务机构
    deleteHealthCareOrganization: '/dict/healthCareOrganization/delete',
    // 查询科室
    searchDepartment: '/dict/department/search',
    // 查询科室详细信息
    searchDepartmentDetail: '/dict/department/search/detail',
    // 新建医联体合作医院
    createDepartment: '/dict/department/create',
    // 修改医联体合作医院
    modifyDepartment: '/dict/department/modify',
    // 删除医联体合作医院
    deleteDepartment: '/dict/department/delete',
    // 获取上级卫生服务机构信息
    getParentHCOInfo: '/dict/healthCareOrganization/getParentHCOInfo',
    // 获取上级科室信息
    getParentDeptInfo: '/dict/department/getParentDeptInfo',

    /*** 医联体管理相关接口 ***/
    // 查询医联体
    searchMedia: '/dict/media/search',
    // 新建医联体
    createMedia: '/dict/media/create',
    // 修改医联体
    modifyMedia: '/dict/media/modify',
    // 删除医联体
    deleteMedia: '/dict/media/delete',

    /*** 病历相关接口 ***/
    // 查询患者主索引详细信息
    searchPersonMasterIndexDetail: '/medicalRecord/personMasterIndex/search/detail',
    // 修改患者主索引
    modifyPersonMasterIndex: '/medicalRecord/personMasterIndex/modify',
    // 新建患者主索引
    createPersonMasterIndex: '/medicalRecord/personMasterIndex/create',
    // 就诊文件上传
    uploadMedicalRecordsAttachment: '/medicalRecord/medicalRecordsAttachment/upload',
    // 就诊文件查询
    searchMedicalRecordsAttachment: '/medicalRecord/medicalRecordsAttachment/search',
    // 就诊文件删除
    deleteMedicalRecordsAttachment: '/medicalRecord/medicalRecordsAttachment/delete',
    // 就诊资料类型
    searchMedicalRecordType: '/medicalRecord/medicalRecordType/search',
    // 新建就诊资料
    createMedicalRecords: '/medicalRecord/medicalRecords/create',
    // 修改就诊资料
    modifyMedicalRecords: '/medicalRecord/medicalRecords/modify',
    // 查询就诊资料
    searchMedicalRecordsDetail: '/medicalRecord/medicalRecords/search/detail',
    // 查询就诊主索引
    searchVisitMasterIndex: '/medicalRecord/visitMasterIndex/search',
    // 查询就诊详细信息
    searchVisitMasterIndexDetail: '/medicalRecord/visitMasterIndex/search/detail',
    // 新建就诊主索引
    createVisitMasterIndex: '/medicalRecord/visitMasterIndex/create',
    // 修改就诊主索引
    modifyVisitMasterIndex: '/medicalRecord/visitMasterIndex/modify',
    // 查看病历资料附件
    viewMedicalRecordsAttachment: '/medicalRecord/medicalRecordsAttachment/view',
    // 删除就诊资料
    deleteMedicalRecords: '/medicalRecord/medicalRecords/delete'

}
