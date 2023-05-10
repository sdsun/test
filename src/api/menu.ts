/**
 * 用户权限中心_应用&系统菜单&系统按钮配置
 */
import { http } from "@/utils/http";

const api = {
  SysMenu: "/api/gtmaac/SysMenu/page",
  SysMenuCreate: "/api/gtmaac/SysMenu/save",
  SysMenuUpdate: "/api/gtmaac/SysMenu/update"
};

// 获取系统菜单(树形)
export const getSysMenu = data => { 
  return http.request("get", api.SysMenu, { data });
};
// 新增系统菜单
export const createSysMenu = () => { 
  return http.request("post", api.SysMenuCreate);
}
// 更新系统菜单
export const updateSysMenu = () => { 
  return http.request("post", api.SysMenuUpdate)
};
