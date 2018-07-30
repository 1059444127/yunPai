// 影像诊断权限控制
import store from "./../vuex/store";
export default {
    // 影像诊断管理（一级菜单）
    ImageDiagnosisFirstMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111001") {
                return true;
            }
        }
        return false
    },
    // 诊断申请（二级菜单）
    DiagnosisApplicationMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111002") {
                return true;
            }
        }
        return false
    },
    // 新建申请
    CreateApplication(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111003") {
                return true;
            }
        }
        return false
    },
    // 修改申请信息
    ModifyApplication(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111004") {
                return true;
            }
        }
        return false
    },
    // 取消申请
    CancelApplication(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111005") {
                return true;
            }
        }
        return false
    },
    // 催办申请
    RemindersApplication(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111006") {
                return true;
            }
        }
        return false
    },
    // 影像诊断（二级菜单）
    ImageDiagnosisMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111007") {
                return true;
            }
        }
        return false
    },
    // 诊断远程影像
    DiagnosisImageRomate(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111008") {
                return true;
            }
        }
        return false
    },
    // 报告审核（二级菜单）
    ReportAudit(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111009") {
                return true;
            }
        }
        return false
    },
    // 审核远程影像诊断
    AuditImageDiagnosis(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111010") {
                return true;
            }
        }
        return false
    },
    // 报告查询（二级菜单）
    ReportSearch(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111011") {
                return true;
            }
        }
        return false
    },
    // 查询远程影像诊断记录
    GetImageDiagnosisData(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111012") {
                return true;
            }
        }
        return false
    },
    // 分页查询远程影像诊断记录
    GetImageDiagnosisDataByPage(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111013") {
                return true;
            }
        }
        return false
    },
    // 首页（一级菜单）
    IndexMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "111014") {
                return true;
            }
        }
        return false
    },
}