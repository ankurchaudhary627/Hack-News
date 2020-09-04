import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Popover, Modal, Button, Card, Table, Tag, Space } from "antd";
import {
  ArrowUpOutlined,
  PoweroffOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AddChallenge from "./AddChallenge";
import axios from "axios";

const formatDate = (date) => {
  var formattedDate = new Date(date);
  return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
};

const showDescription = (challenge) => {
  Modal.info({
    title: "Description",
    content: (
      <div>
        <p>{challenge.description}</p>
      </div>
    ),
    onOk() {},
  });
};

const getColor = (tag) => {
  switch (tag.toUpperCase()) {
    case "ARTIFICIAL INTELLIGENCE":
      return "green";
    case "CLOUD":
      return "blue";
    case "WEB DEVELOPMENT":
      return "red";
    case "IOT":
      return "orange";
    case "AUTOMATION":
      return "purple";
    default:
      return "";
  }
};

const checkDisabled = (challenge, empId) => {
  if (challenge.createdBy === empId) {
    return true;
  }
  return false;
};

const processData = (challenges) => {
  var res = [];
  challenges.map((challenge, index) => {
    let obj = {
      key: challenge._id,
      title: challenge.title,
      description: challenge.description,
      tags: challenge.tags.split(";"),
      createdBy: challenge.createdBy,
      createdOn: formatDate(challenge.createdOn),
      votes: challenge.voteCount,
      index: index,
    };
    res.push(obj);
  });
  return res;
};

const HackNews = (props) => {
  const { loggedinEmpid, onChange } = props;
  const [challenges, setchallenges] = useState([]);
  const [addChallenge, setaddChallenge] = useState(false);

  const history = useHistory();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      key: "description",
      render: (challenge) => (
        <Button type="link" onClick={() => showDescription(challenge)}>
          View Description
        </Button>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = getColor(tag);
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      sorter: (a, b) => new Date(a.createdOn) - new Date(b.createdOn),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Votes",
      dataIndex: "votes",
      key: "votes",
      sorter: (a, b) => a.votes - b.votes,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Upvote",
      key: "upvote",
      render: (challenge) => (
        <Button
          type="primary"
          icon={<ArrowUpOutlined />}
          disabled={checkDisabled(challenge, loggedinEmpid)}
          onClick={() => updateVotes(challenge)}
        />
      ),
    },
  ];

  const logout = () => {
    onChange("", history);
  };

  const handleClose = () => {
    setaddChallenge(false);
  };

  const fetchData = async () => {
    axios.get("/api/challenges/getAll").then((res) => {
      setchallenges(processData(res.data));
    });
  };

  const updateVotes = (challenge) => {
    axios.post(`/api/challenges/update/${challenge.key}`).then((res) => {
      if (res.data) {
        const index = challenge.index;
        var updatedObj = res.data;
        var newObj = {
          key: updatedObj._id,
          title: updatedObj.title,
          description: updatedObj.description,
          tags: updatedObj.tags.split(";"),
          createdBy: updatedObj.createdBy,
          createdOn: formatDate(updatedObj.createdOn),
          votes: updatedObj.voteCount,
          index: index,
        };
        var updatedChallenges = challenges.slice();
        updatedChallenges[index] = newObj;
        setchallenges(updatedChallenges);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [challenges]);

  if (!loggedinEmpid) {
    history.push("/");
  }
  return (
    <div className="hackNews">
      <center>
        <Card title={<h2>Hack-News</h2>}>
          {addChallenge ? (
            <AddChallenge
              visible={addChallenge}
              onClose={handleClose}
              createdBy={loggedinEmpid}
            />
          ) : null}
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginRight: 16, marginBottom: 16 }}
              onClick={() => setaddChallenge(true)}
            >
              Add challenge
            </Button>
            <Button type="dashed" style={{ marginRight: 16, marginBottom: 16 }}>
              Welcome: {loggedinEmpid}
            </Button>
            <Popover content="Logout">
              <Button
                type="primary"
                danger
                style={{ marginRight: 16, marginBottom: 16 }}
                icon={<PoweroffOutlined />}
                onClick={() => logout()}
              />
            </Popover>
          </Space>
          <Table
            columns={columns}
            dataSource={challenges}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </center>
    </div>
  );
};

export default HackNews;
