import { http } from "@/utils/http";

// Api List
const api = {
  UserList: "/api/gtmaac//sysUserInfo/page",
  Region: "/api/gtmaac/sysIdentityDimension/getRegion",
  Channel: "/api/gtmaac/sysIdentityDimension/getChannel",
  Customer: "/api/gtmaac/sysIdentityDimension/getCustomer",
  Shop: "/api/gtmaac/sysIdentityDimension/getShop",
  Product: "/api/gtmaac/sysIdentityDimension/getCategory",
  Brand: "/api/gtmaac/sysIdentityDimension/getBrand",
  SysIdentity: "/api/gtmaac/sysIdentity/page",
  SysIdentityTree: "/api/gtmaac/sysIdentity/selectSysIdentityList",
  SysIdentitySave: "/api/gtmaac/sysIdentity/saveIdentity",
  SysIdentityUser: "/api/gtmaac/sysUserIdentity/saveSysUserIdentity",
  SysMenu: "https://cep-dev.haier.net/api/gtmaac/SysMenu/page?current=1&size=100",
  SysMuneDetail: "https://cep-dev.haier.net/api/gtmaac/SysMenu/get",
  SysMenuSave: "/api/gtmaac/SysMenu/save",
  SysMenuUpdate: "/api/gtmaac/SysMenu/update"
};

// Api Function
// 用户列表
export const getUserList = () => {
  return http.request<any>("get", api.UserList);
}
// 根据组织获取基础数据(区域)
export const getRegion = params => {
  return http.request("get", api.Region, { params });
}
// 根据组织获取基础数据(渠道)
export const getChannel = () => {
  return http.request("get", api.Channel)
};
// 根据组织获取基础数据(客户)
export const getCustomer = () => { 
  return http.request("get", api.Customer);
}
// 根据组织获取基础数据(店铺)
export const getShop = () => { 
  http.request("get", api.Shop);
}

export const getProductCategory = () => { 
  return http.request("get", api.Product);
};
export const getBrand = () => { 
  return http.request("get", api.Brand);
}

// 岗位
export const getSysIdentity = () => http.request("get", api.SysIdentity);
export const getSysIdentityTree = params => http.request<any>("get", api.SysIdentityTree, { params });
export const postSysIdentitySave = () => http.request("post", api.SysIdentitySave);

// 菜单
export const getSysMenu = data => http.request("get", api.SysMenu, { data });
export const getSysMenuDetail = id => http.request("get", `${api.SysMenu}/${id}`);
export const postSysMenuSave = () => http.request("post", api.SysMenuSave);
export const postSysMenuUpdate = () => http.request("post", api.SysMenuUpdate);
