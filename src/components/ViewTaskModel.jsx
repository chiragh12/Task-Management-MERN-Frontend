import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Stack from "react-bootstrap/esm/Stack";

const ViewTaskModel = ({ id, showViewModal, handleViewModalClose }) => {
  const [task, setTask] = useState("");
  useEffect(() => {
    const getSingletask = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/task/getsinlge/${id}`, {
          withCredentials: true,
        })
        .then((res) => setTask(res.data.task))
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    if (id) {
      getSingletask();
    }
  }, [id]);
  return (
    <>
      <Modal
        show={showViewModal}
        onHide={handleViewModalClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <p className="fw-bold mb-0">Title</p>
            <p>{task && task.title}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Description</p>
            <p>{task && task.description}</p>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondry" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewTaskModel;
