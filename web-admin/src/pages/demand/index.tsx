import { useState } from "react";
import React from "react";
import { useMount } from "ahooks";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, Tag } from "antd";

import apis from "apis";

import AddDemand from "./components/AddDemand";
import EditDemand from "./components/EditDemand";
import { apps, developers, taskStatus, taskStatusColorMapping } from "./constants";
import { ListItem } from "./typing";

import "./index.scss";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

function DemandList() {
  const [addDrawerVisible, setAddDrawerVisible] = useState<boolean>(false);
  const [listData, setListData] = useState<ListItem[]>([]);
  const [formInstance] = Form.useForm();

  const [editDemandVisible, setEditDemandVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);

  const columns = [
    {
      title: "需求状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (scope: keyof typeof taskStatusColorMapping) => {
        return (
          <Tag color={taskStatusColorMapping[scope]}>
            {taskStatus.find((item) => scope == item.status)?.name}
          </Tag>
        );
      }
    },
    {
      title: "龙猫需求",
      dataIndex: "longMaoDemand",
      key: "longMaoDemand",
      width: 300
    },
    {
      title: "需求地址",
      dataIndex: "demandDocuments",
      key: "demandDocuments",
      render: (scope: ListItem["demandDocuments"]) => {
        return scope?.map((item) => (
          <a
            key={item.url + item.name}
            href={item.url}
            target="_blank"
            style={{ display: "block" }}
            rel="noreferrer"
          >
            {item.name}
          </a>
        ));
      }
    },
    {
      title: "相关文档",
      dataIndex: "relativeDocuments",
      key: "relativeDocuments",
      render: (scope: ListItem["relativeDocuments"]) => {
        return scope?.map((item) => (
          <a
            key={item.url + item.name}
            href={item.url}
            target="_blank"
            style={{ display: "block" }}
            rel="noreferrer"
          >
            {item.name}
          </a>
        ));
      }
    },
    {
      title: "前端开发",
      dataIndex: "developers",
      key: "developers",
      render: (scope: ListItem["developers"]) => {
        return scope?.map((currentValue) => (
          <div key={currentValue}>
            {developers.find((item) => currentValue == item.value)?.label}
          </div>
        ));
      }
    },
    {
      title: "预审日期",
      dataIndex: "preReviewDate",
      key: "preReviewDate"
    },
    {
      title: "评审日期",
      dataIndex: "reviewDate",
      key: "reviewDate"
    },
    {
      title: "技评日期",
      dataIndex: "technicalReviewDate",
      key: "technicalReviewDate"
    },
    {
      title: "提测日期",
      dataIndex: "testDate",
      key: "testDate"
    },
    {
      title: "发布日期",
      dataIndex: "publishDate",
      key: "publishDate"
    },
    {
      title: "涉及应用",
      dataIndex: "relationalApps",
      key: "relationalApps",
      render: (scope: ListItem["relationalApps"]) => {
        return scope?.map((currentValue) => (
          <div key={currentValue}>{apps.find((item) => currentValue == item.value)?.label}</div>
        ));
      }
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark"
    },
    {
      title: "操作",
      render: (scope: any, row: any) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setEditDemandVisible(true);
                setEditId(row.id);
              }}
            >
              编辑
            </Button>
          </Space>
        );
      }
    }
  ];

  const queryList = async () => {
    const values = await formInstance.getFieldsValue(true);
    values.startDate = values.rangeDate ? values.rangeDate[0].format("YYYY-MM") : "";
    values.endDate = values.rangeDate ? values.rangeDate[1].format("YYYY-MM") : "";

    Object.assign(values, {
      pageSize: 999,
      page: 1
    });
    const res = await apis.queryDemandList(values);
    if (res.code === 0) {
      const list = res?.data || [];
      setListData(list);
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
          form={formInstance}
          initialValues={{
            member: "",
            demandStatus: ""
          }}
        >
          <Row gutter={50}>
            <Col span={6}>
              <FormItem label="龙猫ID" name="longMaoId">
                <Input placeholder="请输入龙猫ID..." style={{ width: "100%" }} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="时间范围" name="rangeDate">
                <RangePicker picker="month" style={{ width: "100%" }} />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="前端开发" name="member">
                <Select options={[{ label: "全部", value: "" }, ...developers]}></Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="需求状态" name="demandStatus">
                <Select
                  options={[
                    { label: "全部", value: "" },
                    ...taskStatus.map((item) => ({
                      label: item.name,
                      value: item.status
                    }))
                  ]}
                ></Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem>
                <Space>
                  <Button type="primary" onClick={queryList}>
                    查询
                  </Button>
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
        <Table
          rowKey="id"
          dataSource={listData}
          columns={columns}
          scroll={{ y: "calc(100vh - 300px)" }}
        />
      </div>

      {addDrawerVisible && (
        <AddDemand
          visible={addDrawerVisible}
          setVisible={setAddDrawerVisible}
          success={addDemandSuccess}
        />
      )}

      {editDemandVisible && (
        <EditDemand
          visible={editDemandVisible}
          setVisible={setEditDemandVisible}
          success={addDemandSuccess}
          id={editId}
        />
      )}
    </div>
  );
}

export default DemandList;
