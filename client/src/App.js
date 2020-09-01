import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import HackNews from "./components/HackNews";
import "./App.css";

const App = () => {
  const [history, sethistory] = useState([]);
  const [loggedinEmpid, setloggedinEmpid] = useState("");

  const handleChange = (id, history) => {
    sethistory(history);
    setloggedinEmpid(id);
  };

  const redirect = async () => {
    if (loggedinEmpid && history) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      history.push("/loggedin");
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      history.push("/");
    }
  };

  useEffect(() => {
    redirect();
  }, [loggedinEmpid, history]);

  return (
    <BrowserRouter>
      <Route
        exact
        path="/"
        render={() => <HomePage onChange={handleChange} />}
      />
      <Route
        path="/loggedin"
        render={() => (
          <HackNews loggedinEmpid={loggedinEmpid} onChange={handleChange} />
        )}
      />
    </BrowserRouter>
  );
};

export default App;
