import React, { useCallback, useState } from "react";
import { useMount } from "ahooks";
import { Button, DatePicker, Drawer, Form, Input, message, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import apis from "apis";

import { apps, developers, documentsTypes, taskStatus } from "../constants";

const FormItem = Form.Item;
const { Option } = Select;

type EditTaskProps = {
  visible: boolean;
  setVisible: (params: boolean) => void;
  success: () => void;
  id: number | undefined;
};
const EditTask = (props: EditTaskProps) => {
  const { visible, setVisible, success, id } = props;

  const [formInstance] = Form.useForm();
  const [detailData, setDetailData] = useState<any>(null);

  // 提交操作
  const submitForm = async () => {
    const values = await formInstance.getFieldsValue(true);
    const {
      preReviewDate = "",
      reviewDate = "",
      technicalReviewDate = "",
      testDate = "",
      publishDate = ""
    } = values;
    const formatMode = "YYYY-MM-DD";
    const coverData = {
      preReviewDate: preReviewDate ? preReviewDate.format(formatMode) : "",
      reviewDate: reviewDate ? reviewDate.format(formatMode) : "",
      technicalReviewDate: technicalReviewDate ? technicalReviewDate.format(formatMode) : "",
      testDate: testDate ? testDate.format(formatMode) : "",
      publishDate: publishDate ? publishDate.format(formatMode) : ""
    };

    const res = await apis.updateDemand(Object.assign(values, coverData, { id }));
    if (res.code === 0) {
      message.success("编辑成功");
      setVisible(false);
      success?.();
    }
  };

  // 获取详情数据
  const getDetailData = useCallback(async () => {
    if (!id) return;

    const res = await apis.queryDemandDetail({ id });
    const data = res?.data?.[0];

    data.developers = data.developers.map((item: any) => Number(item));
    data.relationalApps = data.relationalApps.map((item: any) => Number(item));

    setDetailData(data);
  }, [id]);

  useMount(async () => {
    getDetailData();
  });

  if (!detailData) return null;

  return (
    <Drawer
      maskClosable
      title="编辑需求"
      placement="left"
      width="50%"
      open={visible}
      closable={false}
      onClose={() => setVisible(false)}
      extra={
        <Space>
          <Button onClick={() => setVisible(false)}>关闭</Button>
          <Button type="primary" onClick={submitForm}>
            保存
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        form={formInstance}
        initialValues={{
          status: detailData.status,
          longMaoDemand: detailData.longMaoDemand || "",
          demandDocuments: detailData.demandDocuments || [],
          relativeDocuments: detailData.relativeDocuments || [],
          developers: detailData.developers || [],
          preReviewDate: detailData.preReviewDate
            ? dayjs(detailData.preReviewDate, "YYYY-MM-DD")
            : "",
          reviewDate: detailData.reviewDate ? dayjs(detailData.reviewDate, "YYYY-MM-DD") : "",
          technicalReviewDate: detailData.technicalReviewDate
            ? dayjs(detailData.technicalReviewDate, "YYYY-MM-DD")
            : "",
          testDate: detailData.testDate ? dayjs(detailData.testDate, "YYYY-MM-DD") : "",
          publishDate: detailData.publishDate ? dayjs(detailData.publishDate, "YYYY-MM-DD") : "",
          relationalApps: detailData.relationalApps || [],
          remark: detailData.remark || ""
        }}
      >
        <FormItem label="需求状态" name="status">
          <Select placeholder="请选择需求状态">
            {taskStatus.map((item) => (
              <Option key={item.name} value={item.status}>
                {item.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="龙猫需求" name="longMaoDemand">
          <Input placeholder="请输入龙猫需求" />
        </FormItem>
        <FormItem label="需求地址">
          <Form.List name="demandDocuments">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space.Compact block key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "请输入需求名称" }]}
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="请输入需求名称..." style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      rules={[{ required: true, message: "请输入需求地址" }]}
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="请输入需求CF地址..." style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item {...restField} name={[name, "type"]} style={{ width: "100%" }}>
                      <Select placeholder="请选择文档类型">
                        {documentsTypes.map((item) => (
                          <Option key={item.label} value={item.value}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Button
                      type="primary"
                      danger
                      onClick={() => remove(name)}
                      icon={<MinusCircleOutlined />}
                    >
                      删除
                    </Button>
                  </Space.Compact>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加需求地址
                </Button>
              </>
            )}
          </Form.List>
        </FormItem>
        <FormItem label="相关文档">
          <Form.List name="relativeDocuments">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space.Compact block key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "请输入文档名称" }]}
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="请输入文档名称..." style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "url"]}
                      rules={[{ required: true, message: "请输入文档地址" }]}
                      style={{ width: "100%" }}
                    >
                      <Input placeholder="请输入文档地址..." style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "type"]} style={{ width: "100%" }}>
                      <Select placeholder="请选择文档类型">
                        {documentsTypes.map((item) => (
                          <Option key={item.label} value={item.value}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Button
                      type="primary"
                      danger
                      onClick={() => remove(name)}
                      icon={<MinusCircleOutlined />}
                    >
                      删除
                    </Button>
                  </Space.Compact>
                ))}
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  添加相关文档
                </Button>
              </>
            )}
          </Form.List>
        </FormItem>
        <FormItem name="developers" label="前端开发">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="请选择开发者"
            options={developers}
          />
        </FormItem>
        {/* <FormItem name="preReviewDate" label="预审日期">
          <DatePicker style={{ width: "100%" }} />
        </FormItem> */}
        <FormItem name="reviewDate" label="评审日期">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
        <FormItem name="technicalReviewDate" label="技评日期">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
        <FormItem name="testDate" label="提测日期">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
        <FormItem name="publishDate" label="发布日期">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
        <FormItem name="relationalApps" label="涉及应用">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="请选择涉及应用"
            options={apps}
          />
        </FormItem>
        <FormItem label="备注" name="remark">
          <Input.TextArea placeholder="请输入备注..." />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default EditTask;
