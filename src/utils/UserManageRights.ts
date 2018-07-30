// 用户管理权限控制
import store from "./../vuex/store";
export default {
    // 获取登录用户基本信息
    GetLoginUserInfo(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "131001") {
                return true;
            }
        }
        return false
    },
    // 查询用户详细信息
    SearchUserDetailInfo(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "131002") {
                return true;
            }
        }
        return false
    },
    // 修改用户信息
    ModifyUserInfo(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "131003") {
                return true;
            }
        }
        return false
    },
    // 修改用户密码
    ModifyUserPassword(): boolean {
        for (var item of (store.state.user.rights) as any) {
            if (item.code === "131004") {
                return true;
            }
        }
        return false
    }
}