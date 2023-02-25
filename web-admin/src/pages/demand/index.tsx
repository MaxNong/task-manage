import { useState } from "react";
import React from "react";
import { useMount } from "ahooks";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table } from "antd";

import apis from "apis";

import AddDemand from "./components/AddDemand";

import "./index.scss";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const dataSource = [
  {
    key: "1",
    name: "需求状态",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "龙猫需求",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "需求状态",
    dataIndex: "name",
    key: "name",
    width: 100
  },
  {
    title: "龙猫需求",
    dataIndex: "age",
    key: "age",
    width: 100
  },
  {
    title: "需求地址",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "相关文档",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "前端开发",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "预审日期",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "评审日期",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "技评日期",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "提测日期",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "发布日期",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "涉及应用",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "备注",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "操作",
    render: () => {
      return (
        <Space>
          <Button type="primary">编辑</Button>
        </Space>
      );
    }
  }
];

function App() {
  const [addDrawerVisible, setAddDrawerVisible] = useState<boolean>(false);

  const queryList = async () => {
    const res = await apis.queryDemandList();
    if (res === 0) {
    }
  };

  const addDemandSuccess = () => {
    queryList();
  };

  useMount(() => {
    queryList();
  });

  return (
    <div className="page-container">
      <div className="search-form">
        <Form
          initialValues={{
            member: 0
          }}
        >
          <Row gutter={50}>
            <Col span={6}>
              <FormItem label="龙猫ID">
                <Input placeholder="请输入龙猫ID..." style={{ width: "100%" }} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="时间范围">
                <RangePicker picker="month" style={{ width: "100%" }} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="前端开发" name="member">
                <Select
                  options={[
                    { value: 0, label: "全部" },
                    { value: 1, label: "陈宇明" },
                    { value: 2, label: "颜榕宝" },
                    { value: 3, label: "魏苗" },
                    { value: 4, label: "施欢迎" }
                  ]}
                ></Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="关联人员">
                <Input placeholder="请输入关联人员..." />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem>
                <Space>
                  <Button type="primary">查询</Button>
                  <Button type="primary" onClick={() => setAddDrawerVisible(true)}>
                    新增需求
                  </Button>
                </Space>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="search-table">
        <Table dataSource={dataSource} columns={columns} />
      </div>

      <AddDemand
        visible={addDrawerVisible}
        setVisible={setAddDrawerVisible}
        success={addDemandSuccess}
      />
    </div>
  );
}

export default App;
