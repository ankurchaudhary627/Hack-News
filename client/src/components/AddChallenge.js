import React, { useState } from "react";
import { Modal, message, Button, Input, Form, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tagOptions = [
  <Option key="Cloud">Cloud</Option>,
  <Option key="Artificial Intelligence">Artificial Intelligence</Option>,
  <Option key="Web development">Web development</Option>,
  <Option key="Automation">Automation</Option>,
  <Option key="Iot">Iot</Option>,
];

const AddChallenge = (props) => {
  const { visible, onClose, createdBy } = props;
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [tags, settags] = useState("");
  const [confirmLoading, setconfirmLoading] = useState(false);

  const getTitle = (e) => {
    const title = e.target.value;
    settitle(title);
  };

  const getDescription = (e) => {
    const description = e.target.value;
    setdescription(description);
  };

  const handleOk = async () => {
    const validTitle = title && title.match("\\S");
    const validDescription = description && description.match("\\S");
    if (validTitle && validDescription && tags) {
      // call api to add challenge here
      setconfirmLoading(true);
      await axios
        .post("/api/challenges/add", {
          title: title,
          description: description,
          tags: tags,
          createdBy: createdBy,
        })
        .then(async (res) => {
          if (!res.data) {
            message.error("Challenge with this title already exists!");
          } else {
            message.success("Challenge created!");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onClose();
          }
        });
      setconfirmLoading(false);
    }
    if (!title) {
      message.warning("Title cannot be empty");
    }
    if (!description) {
      message.warning("Description cannot be empty");
    }
    if (!tags) {
      message.warning("Tags cannot be empty");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const getTags = (tags) => {
    settags(tags);
  };

  return (
    <Modal
      visible={visible}
      title="Add Challenge"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
        >
          Add Challenge
        </Button>,
      ]}
    >
      <Form {...layout}>
        <Form.Item label="Title">
          <Input placeholder="Title" onChange={getTitle} />
        </Form.Item>
        <Form.Item label="Description">
          <Input placeholder="Description" onChange={getDescription} />
        </Form.Item>
        <Form.Item label="Tags">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select tags from list below."
            onChange={getTags}
          >
            {tagOptions}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddChallenge;
