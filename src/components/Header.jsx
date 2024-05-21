import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function Header({ isAutheticated, setIsAutheticated, setTask, setTaskType }) {
  const navigate = useNavigate();
  const [alltask, allsetTask] = useState([]);

  useEffect(() => {
    if (isAutheticated) {
      fetchTask();
    }
  }, [isAutheticated]);

  const fetchTask = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/task/getall",
        {
          withCredentials: true,
        }
      );
      allsetTask(data.task);
      setTask(data.task);
      toast.success("Tasks fetched successfully");
    } catch (error) {
      console.log("Error fetching tasks", error);
      toast.error("Failed to fetch tasks");
    }
  };

  const filterTask = (filtertype) => {
    let filteredTasks = [];
    switch (filtertype) {
      case "completed":
        filteredTasks = alltask.filter((task) => task.status === "completed");
        setTaskType("Completed Task");
        break;
      case "incomplete":
        filteredTasks = alltask.filter((task) => task.status === "incomplete");
        setTaskType("Incompleted Task");
        break;
      case "archieved":
        filteredTasks = alltask.filter((task) => task.archieved === true);
        setTaskType("Archieved Task");
        break;
      case "all":
        filteredTasks = alltask;
        setTaskType("Tasks");
        break;
      default:
        filteredTasks = alltask;
    }
    setTask(filteredTasks);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAutheticated(false);
      navigate("/login");
    } catch (error) {
      toast.error("User is not authenticated");
    }
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${!isAutheticated ? "d-none" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="text-decoration-none d-flex align-items-center"
            >
              Home
            </Nav.Link>
            <NavDropdown title="Filter tasks" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => filterTask("all")}>
                All tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTask("completed")}>
                Completed Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTask("incomplete")}>
                Incomplete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTask("archieved")}>
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              as={Link}
              to="/profile"
              className="text-decoration-none d-flex align-items-center"
            >
              Profile
            </Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
