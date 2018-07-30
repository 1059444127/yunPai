const MenuList = ([
    {
        "roleId": "ROLE_USER",
        "roleName": "普通用户",
        "menus": [
            // {
            //     "index": "1",
            //     "icon": "icon_new_referral",
            //     "path": "",
            //     "name": "新建转诊"
            // },
            {
                "index": "2",
                "icon": "",
                "path": "/dualreferral/pendingaudit",
                "name": "待审核"
            },
            {
                "index": "3",
                "icon": "",
                "path": "/dualreferral/pendingreceive",
                "name": "待接收"
            },
            {
                "index": "4",
                "icon": "",
                "path": "/dualreferral/referraloutrecord",
                "name": "转出记录"
            },
            {
                "index": "5",
                "icon": "",
                "path": "/dualreferral/referralinrecord",
                "name": "转入记录"
            }
        ]
    }
])

export default MenuList;