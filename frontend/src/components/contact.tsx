// import React, { useState, useRef, FormEvent } from 'react';
// import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
// import emailjs from '@emailjs/browser';

// const Contact: React.FC = () => {
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [subject, setSubject] = useState<string>('');
//   const [message, setMessage] = useState<string>('');
//   const form = useRef<HTMLFormElement>(null);

//   const sendEmail = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     emailjs.sendForm('service_qm1ayaa', 'template_rpdl0fn', e.currentTarget, 'EX56vteDH9wtpKsap')
//       .then((result) => {
//         console.log(result.text);
//         console.log('sent');
//         alert('Mail sent Successfully !');
//       })
//       .catch((error) => {
//         console.log(error.text);
//         alert('Error! Try after some time');
//       });
//   };

//   return (
//     <>
//     <Container>
//         <Row className="vh-100 d-flex justify-content-center align-items-center">
//           <Col md={6} lg={5} xs={12}>
//             <div className="border border-3 border-danger"></div>
//             <Card className="shadow">
//               <Card.Body>
//                 <div className="mb-3 mt-md-2">

//                   <p className=" mb-4 fw-bold text-uppercase">Mention your Query!</p>

//       <Form ref={form} onSubmit={sendEmail}>

//                       <Form.Group  controlId="formBasicEmail"  className=" mb-2">
//                         <Form.Control type="text" placeholder="Name" />
//                       </Form.Group>
//                       <Form.Group  controlId="formBasicEmail"  className=" mb-2">
//                         <Form.Control type="email" placeholder="Email" />
//                       </Form.Group>
//                       <Form.Group  controlId="formBasicEmail"  className=" mb-2">
//                         <Form.Control type="text" placeholder="Subject" />
//                       </Form.Group>
//                       <Form.Group  controlId="formBasicEmail"  className=" mb-2">
//                         <Form.Control as="textarea" rows={5} placeholder='Message' />
//                      </Form.Group>
//                         <Button variant="btn btn-outline-danger" type="submit" >
//                         Submit
//                         </Button>
//       </Form>
//       </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Contact;
import emailjs from "@emailjs/browser";
import React, { useRef, useState, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import { Box } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
const ErrorText = styled.div`
  color: #dc3545; /* Red color for error messages */
  font-size: 14px;
  margin-top: 4px; /* Adjust as needed for spacing */
`;

const LoginFormContainer = styled.div`
  width: 600px;
  margin-top: 120px;
  margin-bottom: 50px;
  position: relative;
  left: 320px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
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
const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Contact: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" "),
    email: Yup.string().email("Invalid email address").required(" "),

    subject: Yup.string().required(" "),
    message: Yup.string().required(" "),
  });

  const onSubmit = (values: any, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
  };
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

  const handleButtonClick = () => {
    setButtonClicked(true);
  };
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qm1ayaa",
        "template_rpdl0fn",
        e.currentTarget,
        "EX56vteDH9wtpKsap"
      )
      .then((result: any) => {
        console.log(result.text);
        console.log("sent");
        alert("Mail sent Successfully !");
        window.location.reload();
      })
      .catch((error: any) => {
        console.log(error.text);
        alert("Error! Try after some time");
      });
  };

  return (
    <LoginFormContainer>
      <h6 className="fw-bold text-uppercase mb-3"> Mention your Query!</h6>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form ref={form} onSubmit={sendEmail}>
            <FormGroup>
              <Box display="flex" alignItems="center">
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
                <StyledField
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  className={`form-control ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                />
              </Box>
              <p>
                {errors.name && touched.name && (
                  <ErrorText>{errors.name}</ErrorText>
                )}
              </p>
            </FormGroup>
            <FormGroup>
              <Box display="flex" alignItems="center">
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
                <StyledField
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`form-control ${
                    (errors.email && touched.email) || (buttonClicked && !dirty) // Check if the button is clicked and the form is not dirty
                      ? "is-invalid"
                      : ""
                  }`}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Box>
            </FormGroup>
            <FormGroup>
              <Box display="flex" alignItems="center">
                <InputAdornment position="start">
                  <LabelImportantIcon />
                </InputAdornment>
                <StyledField
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className={`form-control ${
                    errors.subject && touched.subject ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="invalid-feedback"
                />
              </Box>
            </FormGroup>
            <FormGroup>
              <StyledField
                as="textarea"
                name="message"
                rows={5}
                placeholder="Message"
                className={`form-control ${
                  errors.message && touched.message ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="invalid-feedback"
              />
            </FormGroup>
            <Button
              variant="btn btn-outline-dark"
              type="submit"
              onClick={() => {
                handleButtonClick(); // Call the function when the button is clicked
              }}
              disabled={!isValid || !dirty}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </LoginFormContainer>
  );
};

export default Contact;
