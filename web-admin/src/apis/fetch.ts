import { message } from "antd";
import axios from "axios";

type FetchParams = {
  data?: object;
  method: "get" | "post" | string;
  url: string;
};
const instance = axios.create();

const baseURL =
  process.env.NODE_ENV == "production"
    ? "http://139.224.221.14:3001/"
    : "http://139.224.221.14:3001/";

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  function (response) {
    const resData = response.data;
    if (resData.code === 401) {
      message.error("您的账号没有权限，请重新登陆");
      setTimeout(() => {
        window.location.hash = "#/login";
      }, 1000);

      return Promise.reject();
    }
    if (resData.code != 0) {
      message.error(resData.msg || "接口异常");
      return Promise.reject();
    }
    return Promise.resolve(resData);
  },
  function (error) {
    message.error("网络异常，请稍后重试");
    return Promise.reject(error);
  }
);

const fetch = (params: FetchParams): any => {
  const { data, method, url } = params;

  return instance.request({
    url: url,
    method: method,
    baseURL: baseURL,
    headers: {
      Authorization: localStorage.getItem("Authorization")
    },
    params: method == "get" ? data : "",
    data: data,
    timeout: 5000,
    withCredentials: false,
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    }
  });
};

export default fetch;
