import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Stack from "react-bootstrap/esm/Stack";
import toast from "react-hot-toast";

const UpdateTaskModel = ({
  showupdateModal,
  handleUpdateModalClose,
  id,
  setTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [archieved, setArchieved] = useState("");

  useEffect(() => {
    const getSingletask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/task/getsinlge/${id}`,
          { withCredentials: true }
        );
        const { title, description, status, archieved } = res.data.task;
        setTitle(title);
        setDescription(description);
        setStatus(status);
        setArchieved(archieved);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    if (id) {
      getSingletask();
    }
  }, [id]);

  const updateTask = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/task/update/${id}`,
        { title, description, status, archieved },
        { withCredentials: true }
      );
      setTask((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task._id === id
            ? { ...task, title, description, status, archieved }
            : task
        );
        return updatedTasks;
      });
      handleUpdateModalClose();
      toast.success(res.data.message);
      handleUpdateModalClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Modal
        show={showupdateModal}
        onHide={handleUpdateModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Description</label>
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Archieved</label>
            <select
              value={archieved}
              onChange={(e) => setArchieved(e.target.value)}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateTask}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTaskModel;
