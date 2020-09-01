import React, { useState } from "react";
import { message, Button, Card, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const { onChange } = props;
  const history = useHistory();
  const [empId, setempId] = useState("");
  const [loading, setloading] = useState(false);

  const loginEmployee = async () => {
    const id = empId.split("-");
    const processedEmpid = `${id[0].toUpperCase()}-${id[1]}`;
    const valid = processedEmpid && processedEmpid.match("^HN-[0-9]+$");
    if (valid) {
      // call api to validate employee here
      setloading(true);
      await axios
        .post("/users/getById", {
          empId: processedEmpid,
        })
        .then(async (res) => {
          if (res.data === null) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            message.error("User not found. Try again!");
          } else {
            onChange(processedEmpid, history);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            message.success("Success.");
          }
        })
        .catch((err) => console.log(err));
      setloading(false);
    } else if (!empId) {
      message.warning("Employee id cannot be empty");
    } else {
      message.warning("Invalid employee id.");
    }
  };

  const getEmpid = (e) => {
    const empId = e.target.value;
    setempId(empId);
  };

  return (
    <center>
      <Card style={{ width: 500 }}>
        <Input
          size="large"
          placeholder="Employee id: HN-1"
          prefix={<UserOutlined className="site-form-item-icon" />}
          onChange={getEmpid}
          onPressEnter={loginEmployee}
          suffix={
            <Tooltip title="Format: HN- {any numeric value}">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
        <br />
        <br />
        <Button
          size="large"
          block
          type="primary"
          loading={loading}
          onClick={loginEmployee}
        >
          Login
        </Button>
      </Card>
    </center>
  );
};

export default Login;
