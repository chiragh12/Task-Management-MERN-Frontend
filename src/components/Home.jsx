import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import CreateTaskModel from "./CreateTaskModel";
import UpdateTaskModel from "./UpdateTaskModel";
import ViewTaskModel from "./ViewTaskModel";

const Home = ({ setTask, task, isAutheticated, taskType }) => {
  const [showCreateModal, setshowCreateModal] = useState(false);
  const [showupdateModal, setshowUpdateModal] = useState(false);
  const [showViewModal, setshowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState("");

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/task/delete/${id}`, {
        withCredentials: true,
      });
      setTask((prevTask) => prevTask.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleCreateModalClose = () => setshowCreateModal(false);
  const handleViewModalClose = () => setshowViewModal(false);
  const handleUpdateModalClose = () => setshowUpdateModal(false);
  const handleCreateModalShow = () => setshowCreateModal(true);
  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setshowUpdateModal(true);
  };
  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setshowViewModal(true);
  };
  console.log(taskType);

  if (!isAutheticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container my-4">
      <div className="row mb-3 d-flex">
        <h1 style={{ width: "fit-content" }}>{taskType}</h1>
        <div className="col text-end " style={{ width: "fit-content" }}>
          <Button variant="warning" onClick={handleCreateModalShow}>
            Create task
          </Button>
        </div>
      </div>
      <div className="row">
        {task.length > 0 && task ? (
          task.map((task) => (
            <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">
              <Card style={{ minHeight: "400px", marginBottom: "20px" }}>
                <Card.Body className="d-flex justify-content-between flex-column">
                  <Stack gap={2}>
                    <Card.Title className="mb-2" style={{ height: "50px" }}>
                      {task && task.title.length <= 40
                        ? task.title
                        : task.title.slice(0, 40) + "......"}
                    </Card.Title>
                    <Card.Text>
                      {task && task.description.length <= 150
                        ? task.description
                        : task.description.slice(0, 150) + "....."}
                    </Card.Text>
                  </Stack>
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className=" justify-content-end"
                  >
                    <MdEdit
                      className="fs-3"
                      onClick={() => handleUpdateModalShow(task._id)}
                    />
                    <MdDelete
                      className="fs-3"
                      onClick={() => deleteTask(task._id)}
                    />
                    <FaEye
                      className="fs-3"
                      onClick={() => handleViewModalShow(task._id)}
                    />
                  </Stack>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h2>You dont have any {taskType}</h2>
        )}
      </div>
      <CreateTaskModel
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTask={setTask}
      />
      <ViewTaskModel
        showViewModal={showViewModal}
        handleViewModalClose={handleViewModalClose}
        id={viewTaskId}
      />
      <UpdateTaskModel
        showupdateModal={showupdateModal}
        handleUpdateModalClose={handleUpdateModalClose}
        id={updateTaskId}
        setTask={setTask}
      />
    </div>
  );
};

export default Home;
