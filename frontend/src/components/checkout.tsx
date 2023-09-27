import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "react-bootstrap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Card = styled.div`
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 16px;
  width: 700px;
  position: relative;
  top: 100px;
  border-radius: 5px;
  left: 250px;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ProductColumn = styled.div`
  flex: 1;
`;
const Backbutton = styled(Button)`
  display: flex;
  justify-content: start;
  background-color: White;
  color: black;
  border: none;
  margin-bottom: 20px;
  &:hover {
    background-color: black;
    color: white;
    border: none; // Set the background color to black on hover
  }
`;
const Backbutton2 = styled(ArrowBackIosIcon)`
  font-size: 16px;
`;
const ProductName = styled(ProductColumn)`
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 14px;
`;

const ProductQuantity = styled(ProductColumn)`
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
`;

const ProductPrice = styled(ProductColumn)`
  font-family: "Times New Roman", Times, serif;
`;

const ProductSubtotal = styled(ProductColumn)`
  font-family: "Times New Roman", Times, serif;
`;

const GrandTotal = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-top: 20px;
  position: relative;
  padding-left: 70px;
  box-sizing: border-box;
`;
const GrandTotal2 = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-top: 20px;
  position: relative;
  padding-right: 50px;
  box-sizing: border-box;
`;
const ProductImage = styled.img`
  max-width: 60px;
  max-height: 60px;
  margin-right: 10px;
`;

export default function Checkout() {
  const { state } = useLocation();
  const nav = useNavigate();
  const selectedProducts = state ? state.selectedProducts : [];
  const calculateGrandTotal = () => {
    let total = 0;

    if (selectedProducts.length > 0) {
      for (const product of selectedProducts) {
        if (selectedProducts.includes(product)) {
          total += product.price * product.quantity;
        }
      }
    } else {
      total = 0;
    }

    return total.toFixed(2); // Format the total with 2 decimal places
  };

  return (
    <Card>
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

      {selectedProducts.map((product: any) => (
        <div key={product.id}>
          <ProductInfo>
            <ProductColumn>
              <ProductImage src={product.image} alt={product.title} />
            </ProductColumn>
            <ProductName>{product.title}</ProductName>
            <ProductPrice>$ {"" + product.price.toFixed(2)}</ProductPrice>
            <ProductQuantity>x{product.quantity}</ProductQuantity>

            <ProductSubtotal>
              $ {(product.quantity * product.price).toFixed(2)}
            </ProductSubtotal>
          </ProductInfo>
        </div>
      ))}
      <ProductInfo>
        <GrandTotal></GrandTotal>
        <GrandTotal></GrandTotal>
        <GrandTotal>Grand Total</GrandTotal>
        <GrandTotal2> $ {calculateGrandTotal()}</GrandTotal2>
      </ProductInfo>
      <br></br>
      <div>
        <Button
          variant="btn btn-outline-dark"
          type="submit"
          //   size="sm"
          onClick={() => {
            nav("/payment", { state: { selectedProducts } });
          }}
          disabled={selectedProducts.length == 0}
        >
          Proceed
        </Button>
      </div>
    </Card>
  );
}
