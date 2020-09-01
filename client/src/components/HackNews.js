import React from "react";
import { useHistory } from "react-router-dom";

const HackNews = (props) => {
  const { loggedinEmpid } = props;
  const history = useHistory();

  if (!loggedinEmpid) {
    history.push("/");
  }
  return (
    <div>
      <h1>Welcome to hackNews {loggedinEmpid}</h1>
    </div>
  );
};

export default HackNews;
