import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { removeall, remove } from "../slice/cartSlice";
import { Button } from "react-bootstrap";
import styled from "@emotion/styled";
import Person2Icon from "@mui/icons-material/Person2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useDispatch } from "react-redux";

const LoginFormContainer = styled.div`
  width: 600px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  position: relative;
  top: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;
const Backbutton = styled(Button)`
  display: flex;
  justify-content: start;
  background-color: White;
  color: black;
  border: none;
  margin-bottom: 2px;
  &:hover {
    background-color: black;
    color: white;
    border: none; // Set the background color to black on hover
  }
`;
const Backbutton2 = styled(ArrowBackIosIcon)`
  font-size: 16px;
`;

const PaymentPage = () => {
  // Initial form values
  const initialValues = {
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    fullName: "",
    phoneNumber: "",
  };

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const selectedProducts = state ? state.selectedProducts : [];
  console.log(selectedProducts, "hi");
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleButtonClick = (id: number) => {
    setButtonClicked(true);
    dispatch(removeall(id));
  };

  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),
    expirationDate: Yup.string()
      .required("Expiration date is required")
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date (MM/YY)")
      .test(
        "is-expiration-date-valid",
        "Your card is expired",
        function (value) {
          if (!value) return false;

          const [month, year] = value.split("/");
          const expirationDate = new Date(
            Number(`20${year}`),
            Number(month) - 1
          );

          const today = new Date();

          return expirationDate > today;
        }
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
    fullName: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  });

  const onSubmit = (values: any, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <div>
      {" "}
      <LoginFormContainer>
        <Backbutton
          onClick={() => {
            nav("/cart");
          }}
          size="sm"
        >
          <Backbutton2>
            <ArrowBackIosIcon />
          </Backbutton2>
        </Backbutton>
        <h6 className="fw-bold text-uppercase mb-3 ">PAYMENT DETAILS</h6>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <FormGroup>
                <Field
                  as={TextField}
                  type="text"
                  name="fullName"
                  placeholder="Enter Name as per your Card"
                  className={`form-control ${
                    touched.fullName && errors.fullName ? "is-invalid" : ""
                  }`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person2Icon />
                      </InputAdornment>
                    ),
                  }}
                />
                {touched.fullName && errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </FormGroup>

              <FormGroup>
                <Field
                  as={TextField}
                  type="text"
                  name="phoneNumber"
                  placeholder="phone number"
                  className={`form-control ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "is-invalid"
                      : ""
                  }`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  as={TextField}
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number XXXX XXXX XXXX XXXX"
                  className={`form-control ${
                    touched.cardNumber && errors.cardNumber ? "is-invalid" : ""
                  }`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddCardIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>

              <FormGroup>
                <Field
                  as={TextField}
                  type="text"
                  name="expirationDate"
                  placeholder="Expiry Date MM/YY"
                  className={`form-control ${
                    touched.expirationDate && errors.expirationDate
                      ? "is-invalid"
                      : ""
                  }`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage
                  name="expirationDate"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  as={TextField}
                  type="text"
                  name="cvv"
                  placeholder="CVV "
                  className={`form-control ${
                    touched.cvv && errors.cvv ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="cvv"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>

              <Button
                variant="btn btn-outline-dark"
                type="submit"
                onClick={() => {
                  selectedProducts.forEach((product: any) => {
                    handleButtonClick(product.id);
                  });

                  nav("/success");
                }}
                disabled={!isValid || !dirty}
              >
                Proceed to Pay
              </Button>
            </Form>
          )}
        </Formik>
      </LoginFormContainer>
    </div>
  );
};

export default PaymentPage;
