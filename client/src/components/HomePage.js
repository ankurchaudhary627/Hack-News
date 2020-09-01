import React from "react";
import { Card, Tabs } from "antd";
import "antd/dist/antd.css";
import Login from "./Login";
import Signup from "./Signup";
import "../css/style.css";

const { TabPane } = Tabs;

const onTabChange = (key) => {
  console.log("tab key", key);
};

const HomePage = (props) => {
  const { onChange } = props;
  return (
    <div className="homepage">
      <Card title="Hack-News" style={{ width: 500 }}>
        <Tabs defaultActiveKey="login" size="large" centered>
          <TabPane tab="Login" key="login">
            <Login onChange={onChange} />
          </TabPane>
          <TabPane tab="Register" key="register">
            <Signup onChange={onChange} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default HomePage;
