import React from "react";
import styled from "@emotion/styled";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  position: relative;
  top: 110px;
`;
export default function Success() {
  const nav = useNavigate();
  return (
    <>
      <Container>
        <h3>Payment Success!</h3>
        <Button
          variant="btn btn-outline-dark"
          type="submit"
          onClick={() => {
            nav("/pro");
          }}
        >
          Continue Shopiing
        </Button>
      </Container>
    </>
  );
}
