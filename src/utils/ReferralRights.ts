// 转诊权限控制
import store from "./../vuex/store";
export default {
    // 转诊管理（一级菜单）
    ReferralManageFirstMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101001") {
                return true;
            }
        }
        return false
    },
    // 住院转诊（二级菜单）
    ZYReferralMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101002") {
                return true;
            }
        }
        return false
    },
    // 新建转诊
    CreateReferral(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101004") {
                return true;
            }
        }
        return false
    },
    // 撤回转诊
    RecallReferral(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101005") {
                return true;
            }
        }
        return false
    },
    // 住院审核（二级菜单）
    ZYAuditMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101006") {
                return true;
            }
        }
        return false
    },
    // 接收审核
    AcceptAudit(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101008") {
                return true;
            }
        }
        return false
    },
    // 门诊转诊（二级菜单）
    MZReferralMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101014") {
                return true;
            }
        }
        return false
    },
    // 门诊审核（二级菜单）
    MZAuditMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101015") {
                return true;
            }
        }
        return false
    },
    // 双向转诊首页（一级菜单）
    IndexMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "101010") {
                return true;
            }
        }
        return false
    }
}