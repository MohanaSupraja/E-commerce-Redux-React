import React from "react";
import Product from "./Product";
import { useSelector } from "react-redux";
import store from "../slice";
import { useAppSelector } from "../slice";
import { cart } from "../slice/cartSlice";
import styled from "@emotion/styled";
const Container = styled.div`
  position: relative;
  top: 110px;
`;
const Dashboard: React.FC = () => {
  const cartProducts = useAppSelector(cart);

  const cartQuantity = Object.values(cartProducts).reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <>
      <Container>
        <h5>Items in Cart :{cartQuantity}</h5>
        <div></div>
      </Container>
    </>
  );
};
export default Dashboard;
