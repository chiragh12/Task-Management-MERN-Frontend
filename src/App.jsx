import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Home from "./components/Home.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const App = () => {
  const [isAutheticated, setIsAutheticated] = useState(false);
  const [task, setTask] = useState([]);
  const [user, setUser] = useState({});
  const [taskType, setTaskType] = useState("Tasks");
  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/myProfile",
          { withCredentials: true }
        );
        setIsAutheticated(true);
        setUser(res.data.user);
      } catch (error) {
        setIsAutheticated(false);
        console.log("User is not authenticated");
        setUser([]);
      }
    };
    handleGetUser();
  }, [isAutheticated]);
  return (
    <Router>
      <Header
        setTask={setTask}
        task={task}
        setIsAutheticated={setIsAutheticated}
        isAutheticated={isAutheticated}
        user={user}
        setTaskType={setTaskType}
        taskType={taskType}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isAutheticated={isAutheticated}
              task={task}
              setTask={setTask}
              taskType={taskType}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              isAutheticated={isAutheticated}
              setIsAutheticated={setIsAutheticated}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              isAutheticated={isAutheticated}
              setIsAutheticated={setIsAutheticated}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile user={user} isAutheticated={isAutheticated} />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
