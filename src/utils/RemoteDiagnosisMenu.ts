const MenuList = ([
    {
        "roleId": "ROLE_USER",
        "roleName": "普通用户",
        "menus": [
            {
                "index": "1",
                "icon": "image",
                "path": "/remotediagnosis/remoteimage",
                "name": "远程影像诊断",
                "submenus": [
                    {
                        "index": "1-1",
                        "icon": "icon_new_referral",
                        "path": "",
                        "name": "新建申请"
                    },
                    {
                        "index": "1-2",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/pendingdiagnosis",
                        "name": "待诊断"
                    },
                    {
                        "index": "1-3",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/pendingaudit",
                        "name": "待审核"
                    },
                    {
                        "index": "1-4",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/applicationrecord",
                        "name": "申请记录"
                    }
                ],
                "viewmenus": [
                    {
                        "index": "1",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/applicationform",
                        "name": "申请单"
                    },
                    {
                        "index": "2",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/imagefile",
                        "name": "影像文件"
                    },
                    {
                        "index": "3",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/medicaldata",
                        "name": "病历资料"
                    },
                    {
                        "index": "4",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/diagnosticreport",
                        "name": "诊断报告"
                    }
                ],
                "recordmenus": [
                    {
                        "index": "1",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/medicaldata/patientinfo",
                        "name": "患者信息"
                    },
                    {
                        "index": "2",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/medicaldata/medicalrecord",
                        "name": "就诊记录"
                    },
                    {
                        "index": "3",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/medicaldata/studyrecord",
                        "name": "检查记录"
                    },
                    {
                        "index": "4",
                        "icon": "",
                        "path": "/remotediagnosis/remoteimage/medicaldata/inspectionrecord",
                        "name": "检验记录"
                    }
                ]
            },
            {
                "index": "2",
                "icon": "ecg",
                "path": "/remotediagnosis/remoteecg",
                "name": "远程心电诊断",
                "submenus": [
                    {
                        "index": "2-1",
                        "icon": "icon_new_referral",
                        "path": "",
                        "name": "新建申请"
                    },
                    {
                        "index": "2-2",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/pendingdiagnosis",
                        "name": "待诊断"
                    },
                    {
                        "index": "2-3",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/pendingaudit",
                        "name": "待审核"
                    },
                    {
                        "index": "2-4",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/applicationrecord",
                        "name": "申请记录"
                    }
                ],
                "viewmenus": [
                    {
                        "index": "1",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/applicationform",
                        "name": "申请单"
                    },
                    {
                        "index": "2",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/imagefile",
                        "name": "影像文件"
                    },
                    {
                        "index": "3",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/medicaldata",
                        "name": "病历资料"
                    },
                    {
                        "index": "4",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/diagnosticreport",
                        "name": "诊断报告"
                    }
                ],
                "recordmenus": [
                    {
                        "index": "1",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/medicaldata/patientinfo",
                        "name": "患者信息"
                    },
                    {
                        "index": "2",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/medicaldata/medicalrecord",
                        "name": "就诊记录"
                    },
                    {
                        "index": "3",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/medicaldata/studyrecord",
                        "name": "检查记录"
                    },
                    {
                        "index": "4",
                        "icon": "",
                        "path": "/remotediagnosis/remoteecg/medicaldata/inspectionrecord",
                        "name": "检验记录"
                    }
                ]
            },
            {
                "index": "3",
                "icon": "pathology",
                "path": "/remotediagnosis/remotepathology",
                "name": "远程病理诊断",
                "submenus": [
                    {
                        "index": "3-1",
                        "icon": "icon_new_referral",
                        "path": "",
                        "name": "新建申请"
                    },
                    {
                        "index": "3-2",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/pendingdiagnosis",
                        "name": "待诊断"
                    },
                    {
                        "index": "3-3",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/pendingaudit",
                        "name": "待审核"
                    },
                    {
                        "index": "3-4",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/applicationrecord",
                        "name": "申请记录"
                    }
                ],
                "viewmenus": [
                    {
                        "index": "1",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/diagnosticreport",
                        "name": "诊断报告"
                    },
                    {
                        "index": "2",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/medicaldata",
                        "name": "病历资料"
                    }
                ],
                "recordmenus": [
                    {
                        "index": "1",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/medicaldata/patientinfo",
                        "name": "患者信息"
                    },
                    {
                        "index": "2",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/medicaldata/medicalrecord",
                        "name": "就诊记录"
                    },
                    {
                        "index": "3",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/medicaldata/studyrecord",
                        "name": "检查记录"
                    },
                    {
                        "index": "4",
                        "icon": "",
                        "path": "/remotediagnosis/remotepathology/medicaldata/inspectionrecord",
                        "name": "检验记录"
                    }
                ]
            }
        ]
    }
])

export default MenuList;