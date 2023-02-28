import fetch from "./fetch";
import { CreateDemandParams, QueryDemandListParams } from "./types/index";

const apis = {
  // 创建需求
  createDemand: function (data: CreateDemandParams): Promise<any> {
    return fetch({
      method: "post",
      data: data,
      url: "/demands/create"
    });
  },

  queryDemandList: function (data: QueryDemandListParams): Promise<any> {
    return fetch({
      method: "get",
      data,
      url: "/demands/list"
    });
  }
};

export default apis;
