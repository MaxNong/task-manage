import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";

import router from "./router/index";

import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const App = (
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: "#1890ff"
      }
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
root.render(App);
