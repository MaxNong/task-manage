import React from "react";
import moment from "moment";
import { Button, DatePicker, Drawer, Form, Input, message, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import apis from "apis";

import { apps, developers, taskStatus } from "../constants";

const FormItem = Form.Item;
const { Option } = Select;

type AddTaskProps = {
  visible: boolean;
  setVisible: (params: boolean) => void;
  success: () => void;
};
const AddTask = (props: AddTaskProps) => {
  const { visible, setVisible, success } = props;
  const [formInstance] = Form.useForm();

  const onClose = () => {
    setVisible(false);
  };

  const submitForm = async () => {
    const values = await formInstance.getFieldsValue(true);

    values.preReviewDate =
      values.preReviewDate && moment(values.preReviewDate).format("YYYY-MM-DD");
    values.reviewDate = values.reviewDate && moment(values.reviewDate).format("YYYY-MM-DD");
    values.technicalReviewDate =
      values.technicalReviewDate && moment(values.technicalReviewDate).format("YYYY-MM-DD");
    values.testDate = values.testDate && moment(values.testDate).format("YYYY-MM-DD");
    values.publishDate = values.publishDate && moment(values.publishDate).format("YYYY-MM-DD");

    const res = await apis.createDemand(values);
    if (res.code === 0) {
      message.success("新增成功");
      success?.();
    }
  };

  return (
    <Drawer
      title="新增需求"
      placement="left"
      width="50%"
      open={visible}
      closable={false}
      extra={
        <Space>
          <Button onClick={onClose}>关闭</Button>
          <Button type="primary" onClick={submitForm}>
            保存
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={formInstance}>
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
          <Form.List name="demandUrls">
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
        <FormItem name="preReviewDate" label="预审日期">
          <DatePicker style={{ width: "100%" }} />
        </FormItem>
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
        <FormItem label="备注">
          <Input.TextArea placeholder="请输入备注..." />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default AddTask;
