import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Box, TextField } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import KeyIcon from "@mui/icons-material/Key";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { registerUser } from "../slice/userSlice";
import { useAppDispatch, useAppSelector } from "../slice";
import { toast } from "react-toastify";

const LoginFormContainer = styled.div`
  width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  // position: relative;
  margin-bottom: 30px;
  margin-left: 340px;
  margin-top: 100px;
`;
const StyledField = styled(Field)`
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &::placeholder {
    color: #999;
    font-style: italic;
`;

const CustomLink = styled.a`
  color: #999;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: black;
    font-weight: 400px;
    cursor: pointer;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const reg = useAppSelector((state) => state.auth.reg);
  const nav = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid phone number"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters least one capital letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    agreeToTerms: Yup.boolean().oneOf([true], " "),
  });

  const handleSubmit = (values: any) => {
    // console.log(values);
    try {
      dispatch(registerUser(values));
      if (reg === true) {
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
      <h6 className="fw-bold text-uppercase  ">SignUp here</h6>

      <p className="mb-2 text-center ">
        Already have an account?{" "}
        <a href="/login" className="text-danger fw-bold">
          Login
        </a>
      </p>
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
                id="name"
                name="name"
                placeholder="Enter user name"
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {touched.name && errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Field
                as={TextField}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={`form-control ${
                  (errors.email && touched.email) || (buttonClicked && !dirty) // Check if the button is clicked and the form is not dirty
                    ? "is-invalid"
                    : ""
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
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+91 Phone Number "
                className={`form-control ${
                  errors.phoneNumber && touched.phoneNumber ? "is-invalid" : ""
                }`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <div className="invalid-feedback">{errors.phoneNumber}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Field
                as={TextField}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`form-control ${
                  (errors.password && touched.password) ||
                  (buttonClicked && !dirty) // Check if the button is clicked and the form is not dirty
                    ? "is-invalid"
                    : ""
                }`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {touched.password && errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </FormGroup>

            <FormGroup>
              <Field
                as={TextField}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`form-control ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Field
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className={`form-check-input ${
                    errors.agreeToTerms && touched.agreeToTerms
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <label htmlFor="agreeToTerms" className="form-check-label">
                  I agree to all statements in Terms of service
                </label>

                <ErrorMessage
                  name="agreeToTerms"
                  // component="div"
                  className="invalid-feedback"
                />
                <div>
                  <CustomLink href="/con">Forgot password?</CustomLink>
                </div>
              </div>
            </FormGroup>

            <FormGroup>
              <Button
                variant="btn btn-outline-dark"
                type="submit"
                onClick={() => {
                  handleButtonClick();
                  // nav("/");
                }}
                disabled={!isValid || !dirty} // Disable the button if the form is not valid or not dirty
              >
                SignUp
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>

      <div style={{ color: "#999" }}>OR</div>

      <div
        className="mt-2"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <a
          href=""
          className="text-primary fw-bold"
          style={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <GoogleIcon
            style={{ color: "blue", fontSize: "17px", marginRight: "10px" }}
          />
          SignUp with Google
        </a>
      </div>
    </LoginFormContainer>
  );
};

export default SignupForm;
