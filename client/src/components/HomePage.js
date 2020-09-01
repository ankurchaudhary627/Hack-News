import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import Login from "./Login";
import Signup from "./Signup";

const { TabPane } = Tabs;

const onTabChange = (key) => {
  console.log("tab key", key);
};

const HomePage = (props) => {
  const { onChange } = props;
  return (
    <Tabs defaultActiveKey="login" size="large" centered>
      <TabPane tab="Login" key="login">
        <Login onChange={onChange} />
      </TabPane>
      <TabPane tab="Register" key="register">
        <Signup onChange={onChange} />
      </TabPane>
    </Tabs>
  );
};

export default HomePage;
