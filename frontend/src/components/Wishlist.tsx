// import React from "react";
// import Product from "./Product";
// import { useSelector } from "react-redux";
// import { add } from "../slice/cartSlice";
// import store from "../slice";
// import { useAppSelector, useAppDispatch } from "../slice";
// import { cart } from "../slice/cartSlice";
// import { wishlist } from "../slice/wishSlice";
// import Cards from "./card";
// import Card from "react-bootstrap/Card";
// import { Col, Button, Row, Container, Form } from "react-bootstrap";
// import { removeFromWishlist } from "../slice/wishSlice";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import CloseIcon from "@mui/icons-material/Close";

// interface WishlistItem {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   price: number;
//   name: string;
//   quantity: number;
// }
// const CardTitle = styled.h3`
//   font-size: 13px;
// `;
// const CloseButton = styled(CloseIcon)`
//   position: absolute;
//   top: 10px;
//   right: 15px;
//   cursor: pointer;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 50%;
//   padding: 2px;
//   background-color: white;
//   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
// `;
// const ProductContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   padding-top: 110px;
//   max-width: 100%; /* Set a maximum width for the container */
//   margin: 20px 20px;
//   gap: 30px;
// `;

// const Wishlist: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const nav = useNavigate();
//   const wishlistItem = useAppSelector(wishlist);
//   const addToCart = (product: WishlistItem) => {
//     //  const inCart = findItems.find((item: any) => item.id === product.id);
//     dispatch(add(product));
//     dispatch(removeFromWishlist(product.id));
//   };

//   return (
//     <ProductContainer>
//       {wishlistItem.length === 0 ? (
//         <div>
//           <img
//             src="https://lenzcamera.com/img/emptywishlist.jpg"
//             height={"300px"}
//             style={{ marginLeft: "500px" }}
//             alt="Empty Wishlist"
//           />
//           {/* Your Continue Shopping button can be added here */}
//         </div>
//       ) : (
//         wishlistItem?.map((product: WishlistItem) => (
//           <center key={product.id}>
//             <div className="col-md-3">
//               <Card
//                 style={{
//                   width: "300px",
//                   height: "300px",
//                   marginRight: "20px",
//                   marginBottom: "30px",
//                   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                   boxSizing: "border-box",
//                 }}
//               >
//                 <CloseButton
//                   onClick={() => dispatch(removeFromWishlist(product.id))}
//                 />
//                 <div className="text-center" style={{ paddingTop: "20px" }}>
//                   <Card.Img
//                     variant="top"
//                     src={product.image}
//                     height="200px"
//                     style={{
//                       width: "90px",
//                       height: "110px",
//                       marginBottom: "10px",
//                       paddingBottom: "5px",
//                       cursor: "pointer", // Center horizontally
//                     }}
//                   />
//                 </div>
//                 <Card.Body>
//                   <Card.Title style={{ fontSize: "13px" }}>
//                     {product.title}
//                   </Card.Title>
//                   <Card.Text
//                     style={{
//                       fontSize: "16px",
//                       position: "absolute",
//                       left: "110px",
//                       top: "200px",
//                     }}
//                     className="text-muted"
//                   >
//                     Price: $ {product.price}
//                   </Card.Text>

//                   <Button
//                     size="sm"
//                     style={{
//                       fontSize: "15px",
//                       position: "absolute",
//                       left: "95px",
//                       top: "240px",
//                     }}
//                     variant="btn btn-outline-dark"
//                     onClick={() => addToCart(product)}
//                   >
//                     Move To Cart
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </div>
//           </center>
//         ))
//       )}
//     </ProductContainer>
//   );
// };

// export default Wishlist;
import React from "react";
import Product from "./Product";
import { useSelector } from "react-redux";
import { add } from "../slice/cartSlice";
import store from "../slice";
import { useAppSelector, useAppDispatch } from "../slice";
import { cart } from "../slice/cartSlice";
import { wishlist } from "../slice/wishSlice";
import Cards from "./card";
import Card from "react-bootstrap/Card";
import { Col, Button, Row, Container, Form } from "react-bootstrap";
import { removeFromWishlist } from "../slice/wishSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

interface WishlistItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
}
const CardTitle = styled.h3`
  font-size: 13px;
`;
const Container1 = styled.div`
  position: relative;
  top: 290px;
  font-size: 20px;
`;
const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 2px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 110px;
  max-width: 100%; /* Set a maximum width for the container */
  margin: 20px 20px;
  gap: 30px;
`;

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const nav = useNavigate();
  const wishlistItem = useAppSelector(wishlist);
  const addToCart = (product: WishlistItem) => {
    //  const inCart = findItems.find((item: any) => item.id === product.id);
    dispatch(add(product));
    dispatch(removeFromWishlist(product.id));
  };

  return (
    <>
      {isAuthenticated ? (
        <ProductContainer>
          {wishlistItem.length === 0 ? (
            <div>
              <img
                src="https://lenzcamera.com/img/emptywishlist.jpg"
                height={"300px"}
                style={{ marginLeft: "500px" }}
                alt="Empty Wishlist"
              />
              {/* Your Continue Shopping button can be added here */}
            </div>
          ) : (
            wishlistItem?.map((product: WishlistItem) => (
              <center key={product.id}>
                <div className="col-md-3">
                  <Card
                    style={{
                      width: "300px",
                      height: "300px",
                      marginRight: "20px",
                      marginBottom: "30px",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      boxSizing: "border-box",
                    }}
                  >
                    <CloseButton
                      onClick={() => dispatch(removeFromWishlist(product.id))}
                    />
                    <div className="text-center" style={{ paddingTop: "20px" }}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        height="200px"
                        style={{
                          width: "90px",
                          height: "110px",
                          marginBottom: "10px",
                          paddingBottom: "5px",
                          cursor: "pointer", // Center horizontally
                        }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title style={{ fontSize: "13px" }}>
                        {product.title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          fontSize: "16px",
                          position: "absolute",
                          left: "110px",
                          top: "200px",
                        }}
                        className="text-muted"
                      >
                        Price: $ {product.price}
                      </Card.Text>

                      <Button
                        size="sm"
                        style={{
                          fontSize: "15px",
                          position: "absolute",
                          left: "95px",
                          top: "240px",
                        }}
                        variant="btn btn-outline-dark"
                        onClick={() => addToCart(product)}
                      >
                        Move To Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </center>
            ))
          )}
        </ProductContainer>
      ) : (
        <Container1>
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
            to view your wishlist
          </h5>
        </Container1>
      )}
    </>
  );
};

export default Wishlist;
