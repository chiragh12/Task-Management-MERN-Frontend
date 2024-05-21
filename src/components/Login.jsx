import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ isAutheticated, setIsAutheticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (res) => (
          setEmail(""),
          setPassword(""),
          setIsAutheticated(true),
          toast.success(res.data.message)
        )
      )
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  if (isAutheticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleLogin} className="w-100">
        <Form.Group className="mb-3" controlId="formBasicEmail1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>
            Not Regsitered?{" "}
            <Link className="text-decoration-none" to={"/register"}>
              Register here!
            </Link>
          </Form.Label>
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          className="w-100 fw-bold fs-5 text-light"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;