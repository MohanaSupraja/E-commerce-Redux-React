import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, add, removeall, removeallcart } from "../slice/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useAppSelector } from "../slice";
import { Button, Card } from "react-bootstrap";
import { cart } from "../slice/cartSlice";
import Checkbox from "@mui/material/Checkbox";
import { addToWishlist, removeFromWishlist } from "../slice/wishSlice";
interface ProductType {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
}
const Container = styled.div`
  position: relative;
  top: 290px;
  // font-size: 20px;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 30px;
  max-width: 100%; /* Set a maximum width for the container */
`;
const DelButton = styled(DeleteIcon)`
  color: #dc143c;
  font-size: 10px; /* Adjust the size as needed */
  cursor: pointer;
`;

const PlusMinusButtons = styled.button`
  border: none;
  background-color: transparent;
`;

const PlusMinusIcons = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

const CheckboxWrapper = styled.div`
  position: absolute;
  top: 9px;
  right: 18px;

  /* Increase the size of the checkbox */
  input[type="checkbox"] {
    transform: scale(1.3);
  }
`;

export default function Cart() {
  const products = useAppSelector(cart);
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const cartProductsPrice = useSelector((state: any) => state.cart.data);
  const nav = useNavigate();
  const [productPrices, setProductPrices] = useState<{ [id: number]: number }>(
    {}
  );

  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  const handleCheckboxChange = (product: ProductType) => {
    const isProductSelected = selectedProducts.some(
      (selectedProduct) => selectedProduct.id === product.id
    );

    if (isProductSelected) {
      setSelectedProducts(
        selectedProducts.filter(
          (selectedProduct) => selectedProduct.id !== product.id
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  const calculateGrandTotal = () => {
    let total = 0;

    if (selectedProducts.length > 0) {
      for (const product of products) {
        if (selectedProducts.includes(product)) {
          total += product.price * product.quantity;
        }
      }
    } else {
      total = Object.values(cartProductsPrice).reduce(
        (accumulator: number, item: any) =>
          accumulator + (productPrices[item.id] || item.price),
        0
      );
    }

    return total.toFixed(2); // Format the total with 2 decimal places
  };

  const addToCart = (product: ProductType) => {
    const newPrice = parseFloat(
      ((productPrices[product.id] || product.price) + product.price).toFixed(2)
    );

    setProductPrices((prevPrices) => ({
      ...prevPrices,
      [product.id]: newPrice,
    }));

    dispatch(add(product));
  };

  const handleRemove = (productId: number) => {
    const product = products.find((item: ProductType) => item.id === productId);

    if (product) {
      const newPrice = parseFloat(
        ((productPrices[product.id] || product.price) - product.price).toFixed(
          2
        )
      );
      setProductPrices((prevPrices) => ({
        ...prevPrices,
        [product.id]: newPrice,
      }));
      dispatch(remove(product.id));
    }
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/check", { state: { selectedProducts } });
  };

  const handleRemoveall = (id: number) => {
    dispatch(removeall(id));
  };
  const addToWishlists = (product: ProductType) => {
    dispatch(addToWishlist(product));
    dispatch(removeall(product.id));
  };

  const handleRemoveallcart = () => {
    dispatch(removeallcart());
  };

  const findQuantity = (id: number) => {
    const inCart = products.find((item: ProductType) => item.id === id);
    return inCart ? inCart.quantity : 0;
  };

  let content;

  if (products.length === 0) {
    content = (
      <div>
        <img
          src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
          height={"450px"}
          style={{ marginTop: "70px" }}
          alt="Empty Cart"
        ></img>
      </div>
    );
  } else {
    content = (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "45%",
            marginTop: "70px",
          }}
        >
          <Button
            onClick={() => handleRemoveallcart()}
            variant="btn btn-dark"
            className="mb-0 mt-5"
          >
            Remove All from Cart
          </Button>
          <span
            style={{
              marginRight: "50px",
              marginTop: "35px",
              fontWeight: "bold",
            }}
          >
            Grand Total: $ {calculateGrandTotal()}
            <br></br>
            <Button
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                color: "black",
                fontWeight: "100px",
              }}
              variant="btn btn-warning"
              // onClick={() => nav("/check")}
              onClick={handleCheckout}
            >
              Checkout
            </Button>{" "}
            {/* Add Proceed button */}
          </span>
        </div>

        <ProductContainer>
          {products.map((product: ProductType) => (
            <center key={product.id}>
              <div className="col-md-3">
                <Card
                  style={{
                    width: "320px",
                    height: "340px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    boxSizing: "border-box",
                    marginRight: "30px",

                    marginBottom: "30px",
                  }}
                >
                  <CheckboxWrapper>
                    <Checkbox
                      checked={selectedProducts.includes(product)}
                      onChange={() => handleCheckboxChange(product)} // Pass the 'product' object
                    />
                  </CheckboxWrapper>
                  <div className="text-center" style={{ paddingTop: "30px" }}>
                    <Card.Img
                      variant="top"
                      src={product.image}
                      height="200px"
                      style={{
                        width: "90px",
                        height: "110px",
                        marginBottom: "5px",

                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "13px" }}>
                      {product.title}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontSize: "15px",
                        position: "absolute",
                        left: "110px",
                        top: "210px",
                      }}
                      className="text-muted"
                    >
                      Price: $ {(product.price * product.quantity).toFixed(2)}
                    </Card.Text>
                    <div
                      className="d-flex flex-column"
                      style={{
                        fontSize: "15px",
                        position: "absolute",
                        left: "90px",
                        top: "230px",
                      }}
                    >
                      <ButtonWrapper>
                        <PlusMinusButtons>
                          <PlusMinusIcons
                            onClick={() => handleRemove(product.id)}
                          >
                            -
                          </PlusMinusIcons>
                        </PlusMinusButtons>
                        <div>
                          <span className="fs-6">
                            {findQuantity(product.id)}
                          </span>
                        </div>
                        <PlusMinusButtons>
                          <PlusMinusIcons onClick={() => addToCart(product)}>
                            +
                          </PlusMinusIcons>
                        </PlusMinusButtons>

                        <Button
                          onClick={() => handleRemoveall(product.id)}
                          style={{ backgroundColor: "white", border: "none" }}
                          size="sm"
                        >
                          <DelButton />
                        </Button>
                      </ButtonWrapper>
                    </div>
                    <Button
                      style={{
                        fontSize: "15px",
                        position: "absolute",
                        left: "95px",
                        top: "280px",
                      }}
                      size="sm"
                      variant="btn btn-outline-dark"
                      onClick={() => addToWishlists(product)}
                    >
                      Move to Wishlist
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </center>
          ))}
        </ProductContainer>
      </>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <div>{content}</div>
      ) : (
        <Container>
          <h5 className="text-muted">
            Please{" "}
            <strong
              style={{ cursor: "pointer" }}
              onClick={() => nav("/login")}
              className="text-danger"
            >
              {" "}
              login{" "}
            </strong>
            to view your cart
          </h5>
        </Container>
      )}
    </>
  );
}

//another way to display cards

// const Container = styled.div`
//   position: relative;
//   top: 110px;
// `;

// const ProductTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;
// const Paging = styled.div`
//   position: relative;
//   top: 20px;
// `;

// const Row = styled.tr`
//   border: none;
// `;

// const ProductCell = styled.td`
//   padding: 10px;
//   text-align: center;
//   font-family: "Times New Roman", Times, serif;
//   font-weight: bold;
// `;
// const Cell = styled.td`
//   padding: 7px;
//   text-align: center;
//   font-family: "Times New Roman", Times, serif;
// `;
// const ProductImage = styled.img`
//   max-width: 50px; /* Adjust the image size as needed */
//   height: auto;
// `;

// <Container>
// <ProductTable>
//   <thead>
//     <Row>
//       <ProductCell>Image</ProductCell>
//       <ProductCell>Title</ProductCell>
//       <ProductCell>Price</ProductCell>
//       <ProductCell>Quantity</ProductCell>
//       <ProductCell>Remove</ProductCell>
//     </Row>
//   </thead>
//   <tbody>
//     {selectedProducts.map((product: any) => (
//       <Row key={product.id}>
//         <Cell>
//           <ProductImage src={product.image} alt={product.title} />
//         </Cell>
//         <Cell>{product.title}</Cell>
//         <Cell>${(product.quantity * product.price).toFixed(2)}</Cell>
//         <Cell>{product.quantity}</Cell>
//         <Cell>
//           <Button
//             variant="btn btn-outline-dark"
//             type="submit"
//             size="sm"
//             onClick={() => remove(product.id)}
//           >
//             Remove
//           </Button>
//         </Cell>
//       </Row>
//     ))}
//   </tbody>
// </ProductTable>
// <Paging>
//   <Button
//     style={{
//       fontWeight: "100px",
//     }}
//     variant="btn btn-outline-dark"
//     // onClick={() => nav("/check")}
//     //   onClick={handleCheckout}
//   >
//     Add your Address
//   </Button>{" "}
// </Paging>
// </Container>
