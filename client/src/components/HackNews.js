import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Card, Table, Tag, Spin, Alert } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
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
  const { loggedinEmpid } = props;
  const [challenges, setchallenges] = useState([]);
  const [loading, setloading] = useState(true);

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

  const fetchData = async () => {
    axios.get("challenges/getAll").then((res) => {
      setchallenges(processData(res.data));
    });
  };

  const updateVotes = (challenge) => {
    axios.post(`challenges/update/${challenge.key}`).then((res) => {
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
    setloading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [challenges]);

  if (!loggedinEmpid) {
    history.push("/");
  }
  return (
    <div>
      <center>
        <h1>Welcome to hackNews {loggedinEmpid}</h1>
        <Card style={{ width: "max-width" }}>
          {loading ? (
            <Spin tip="Loading challenges ..." />
          ) : (
            <Table
              columns={columns}
              dataSource={challenges}
              pagination={{ pageSize: 10 }}
            />
          )}
        </Card>
      </center>
    </div>
  );
};

export default HackNews;
