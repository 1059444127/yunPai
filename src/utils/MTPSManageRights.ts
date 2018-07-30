// 医联体管理权限控制
import store from "./../vuex/store";
export default {
    // 医联体管理（一级菜单）
    MTPSManageFirstMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121001") {
                return true;
            }
        }
        return false
    },
    // 医联体管理（二级菜单）
    MTPSManageSecondMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121002") {
                return true;
            }
        }
        return false
    },
    // 新增医联体
    CreateMTPS(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121003") {
                return true;
            }
        }
        return false
    },
    // 修改医联体信息
    ModifyMTPS(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121004") {
                return true;
            }
        }
        return false
    },
    // 删除医联体
    DeleteMTPS(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121005") {
                return true;
            }
        }
        return false
    },
    // 机构管理（菜单）
    HCOManageMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121006") {
                return true;
            }
        }
        return false
    },
    // 新增机构
    CreateHCO(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121007") {
                return true;
            }
        }
        return false
    },
    // 修改所在机构信息
    ModifyOwnHCO(code: string): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121008" && code === store.state.user.hCOCode) {
                return true;
            }
        }
        return false
    },
    // 修改机构信息
    ModifyHCO(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121009") {
                return true;
            }
        }
        return false
    },
    // 删除机构
    DeleteHCO(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121010") {
                return true;
            }
        }
        return false
    },
    // 科室管理（菜单）
    DeptManageMenu(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121011") {
                return true;
            }
        }
        return false
    },
    // 新增科室
    CreateDept(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121012") {
                return true;
            }
        }
        return false
    },
    // 修改所在机构的科室信息
    ModifyOwnDept(code: string): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121013" && code === store.state.user.hCOCode) {
                return true;
            }
        }
        return false
    },
    // 修改科室信息
    ModifyDept(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121014") {
                return true;
            }
        }
        return false
    },
    // 删除科室
    DeleteDept(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "121015") {
                return true;
            }
        }
        return false
    }

}