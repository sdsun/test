/**
 * 系统基础数据权限API
 * 用于人和角色的分配
 */

import { http } from "@/utils/http";

const api = {
  Region: "/api/gtmaac/sysIdentityDimension/getRegion",
  Channel: "/api/gtmaac/sysIdentityDimension/getChannel",
  Customer: "/api/gtmaac/sysIdentityDimension/getCustomer",
  Shop: "/api/gtmaac/sysIdentityDimension/getShop",
  ProductCategory: "/api/gtmaac/sysIdentityDimension/getCategory",
  Brand: "/api/gtmaac/sysIdentityDimension/getBrand",
  DataAccess: "",
};

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
// 根据组织获取基础数据(产品分类)
export const getProductCategory = () => { 
  return http.request("get", api.ProductCategory);
};
// 根据组织获取基础数据(品牌)
export const getBrand = () => { 
  return http.request("get", api.Brand);
}
// 分配系统基础数据权限(人或者岗)
export const assignDataAccess = () => { 
  return http.request("post", api.DataAccess);
}