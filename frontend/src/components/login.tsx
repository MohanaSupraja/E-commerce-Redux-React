import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button } from "react-bootstrap";
import { loginUser } from "../slice/userSlice";
import { useAppDispatch, useAppSelector } from "../slice";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const LoginFormContainer = styled.div`
  width: 500px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-top: 110px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters and contain at least one capital letter, one lowercase letter, one number, and one special character"
      ),
  });

  const handleSubmit = (values: any) => {
    // console.log(values);
    try {
      dispatch(loginUser(values));
      if (isAuthenticated) {
        console.log("tr");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

  const handleButtonClick = () => {
    setButtonClicked(true); // Set buttonClicked to true when the button is clicked
  };

  return (
    <LoginFormContainer>
      <AccountCircleIcon />
      <br></br>
      <h6 className="fw-bold text-uppercase">Login here</h6>
      <p className="mb-3">Please Enter your Credentials!</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <FormGroup>
              <Field
                as={TextField}
                type="text"
                name="email"
                placeholder="Enter EmailId"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Field
                as={TextField}
                type="text"
                name="password"
                placeholder="Enter password"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </FormGroup>
            <FormGroup>
              <p className="small">
                <a className="text-dark" href="/con">
                  Forgot password?
                </a>
              </p>
            </FormGroup>
            <Button
              variant="btn btn-outline-dark"
              type="submit"
              onClick={() => {
                handleButtonClick(); // Call the function when the button is clicked
                // nav("/");
              }}
              // disabled={(isValid || dirty) && (!isValid || !dirty)} // Disable the button if the form is not valid or not dirty
              disabled={!isValid || !dirty}
            >
              Login
            </Button>
            <div className="mt-3">
              <p className="mb-0 text-center">
                Don't have an account?{" "}
               <button
                  onClick={() => navigate("/signup")}
                  className="text-danger fw-bold"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </LoginFormContainer>
  );
};

export default Login;
