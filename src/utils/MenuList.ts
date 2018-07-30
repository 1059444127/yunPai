const MenuList = ({
    "Referral": [{
        "index": "1",
        "right": "101010",
        "icon": "dictionary-manage",
        "root": "/dualreferral/homepage",
        "path": "/dualreferral/homepage",
        "name": "首页",
        "submenus": ""
    }, {
        "index": "2",
        "right": "101001",
        "icon": "mtps-manage",
        "root": "/dualreferral/manage",
        "path": "/dualreferral/manage/zyreferral",
        "name": "转诊管理",
        "submenus": [{
            "index": "1",
            "right": "101002",
            "icon": "",
            "path": "/dualreferral/manage/zyreferral",
            "name": "住院转诊"
        }, {
            "index": "2",
            "right": "101006",
            "icon": "",
            "path": "/dualreferral/manage/zyaudit",
            "name": "住院审核"
        }, {
            "index": "3",
            "right": "101014",
            "icon": "",
            "path": "/dualreferral/manage/mzreferral",
            "name": "门诊转诊"
        }, {
            "index": "4",
            "right": "101015",
            "icon": "",
            "path": "/dualreferral/manage/mzaudit",
            "name": "门诊审核"
        }]
    }],
    "ImageDiagnosis": [
        //     {
        //     "index": "1",
        //     "right": "111014",
        //     "icon": "dictionary-manage",
        //     "root": "/imagediagnosis/homepage",
        //     "path": "/imagediagnosis/homepage",
        //     "name": "首页",
        //     "submenus": ""
        // }, 
        {
            "index": "2",
            "right": "111001",
            "icon": "mtps-manage",
            "root": "/imagediagnosis/manage",
            "path": "/imagediagnosis/manage/diagnosisapplication",
            "name": "影像诊断管理",
            "submenus": [{
                "index": "1",
                "right": "111002",
                "icon": "",
                "path": "/imagediagnosis/manage/diagnosisapplication",
                "name": "诊断申请"
            }, {
                "index": "2",
                "right": "111007",
                "icon": "",
                "path": "/imagediagnosis/manage/imagediagnosis",
                "name": "影像诊断"
            }
                // , {
                //     "index": "3",
                //     "right": "111009",
                //     "icon": "",
                //     "path": "/imagediagnosis/manage/reportaudit",
                //     "name": "报告审核"
                // }, {
                //     "index": "4",
                //     "right": "111011",
                //     "icon": "",
                //     "path": "/imagediagnosis/manage/reportsearch",
                //     "name": "报告查询"
                // }
            ]
        }],
    "ConfigManage": [{
        "index": "1",
        "right": "12",
        "icon": "mtps-manage",
        "root": "/configmanage/mtps",
        "path": "/configmanage/mtps/mtps",
        "name": "医联体管理",
        "submenus": [{
            "index": "1",
            "right": "121002",
            "icon": "",
            "path": "/configmanage/mtps/mtps",
            "name": "医联体管理"
        }, {
            "index": "2",
            "right": "121006",
            "icon": "",
            "path": "/configmanage/mtps/hco",
            "name": "机构管理"
        }, {
            "index": "3",
            "right": "121011",
            "icon": "",
            "path": "/configmanage/mtps/dept",
            "name": "科室管理"
        }]
    },
    {
        "index": "2",
        "right": "000000",
        "icon": "authority-manage",
        "root": "/configmanage/authority",
        "path": "/configmanage/authority/point",
        "name": "权限管理",
        "submenus": [{
            "index": "1",
            "right": "000000",
            "icon": "",
            "path": "/configmanage/authority/point",
            "name": "权限点管理"
        }, {
            "index": "2",
            "right": "000000",
            "icon": "",
            "path": "/configmanage/authority/role",
            "name": "角色管理"
        }, {
            "index": "3",
            "right": "000000",
            "icon": "",
            "path": "/configmanage/authority/user",
            "name": "用户管理"
        }]
    }, {
        "index": "3",
        "right": "000000",
        "icon": "dictionary-manage",
        "path": "/configmanage/basedict/media",
        "root": "/configmanage/basedict",
        "name": "基础字典管理",
        "submenus": [{
            "index": "1",
            "right": "000000",
            "icon": "",
            "path": "/configmanage/basedict/media",
            "name": "存储媒质字典"
        }]
    }]
})

export default MenuList;