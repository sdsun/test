/**
 * 用户权限中心_岗位模块
 */
import { http } from "@/utils/http";

const api = {
  SysIdentity: "/api/gtmaac/sysIdentity/page",
  SysIdentityTree: "/api/gtmaac/sysIdentity/selectSysIdentityList",
  SysIdentitySave: "/api/gtmaac/sysIdentity/saveIdentity",
  SysIdentityUser: "/api/gtmaac/sysUserIdentity/saveSysUserIdentity"
};

// 获取系统岗位列表
export const getSysIdentity = () => { 
  return http.request("get", api.SysIdentity); 
}
// 获取系统岗位树
export const getSysIdentityTree = params => { 
  return http.request<any>("get", api.SysIdentityTree, { params });
}
// 新增系统岗位-获取
export const postSysIdentitySave = () => { 
  return http.request("post", api.SysIdentitySave);
};
