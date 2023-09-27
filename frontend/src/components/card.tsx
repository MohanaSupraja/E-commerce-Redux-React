import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../slice/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  wishlist,
} from "../slice/wishSlice";
import CloseIcon from "@mui/icons-material/Close";
import Card from "react-bootstrap/Card";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import the filled heart icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Import the outlined heart icon
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppSelector } from "../slice";

import { cart } from "../slice/cartSlice";

const ActivePageItem = styled.li`
  &.active {
    .page-link {
      background-color: black;
      color: white;
    }
  }
`;
const Paging = styled.div`
  position: relative;
  top: 550px;

  left: 530px;
  position: fixed;
`;
const LoadingSpinner = styled.div`
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    border: 5px solid rgba(0, 0, 0, 0.3);
    border-top: 4px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: loading 1s linear infinite;
    margin: 0 auto;
    margin-left: 600px;
    margin-top: 70px;
  }
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
interface ProductType {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
}

interface WishlistItem {
  id: number;
}
export const Cards = (props: any) => {
  let { data, search } = props;
  console.log("search:", search);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useAppSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const findItems = useAppSelector(cart);
  const wishlistItems = useAppSelector(wishlist);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const openModal = (product: ProductType) => {
    console.log("Opening modal");
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setSelectedProduct(null);
    setShowModal(false);
  };

  const [favoritedStatus, setFavoritedStatus] = useState<{
    [id: number]: boolean;
  }>({});

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
  const filteredData = search
    ? data.filter((product: ProductType) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  const pages = Math.ceil(filteredData.length / limit);
  const updateFilteredProducts = () => {
    const indexOfLastProduct = currentPage * limit;

    const indexOfFirstProduct = indexOfLastProduct - limit;

    const slicedProducts = filteredData.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    return slicedProducts;
  };
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // console.log(
  //   "pages: ",
  //   pages,
  //   " lastpage: ",
  //   lastPage,
  //   " firstpage: ",
  //   firstPage,
  //   "currentpage: ",
  //   currentPage
  // );
  const numbers = [...Array(pages + 1).keys()].slice(1);
  const addToCart = (product: ProductType) => {
    if (isAuthenticated) {
      dispatch(add(product));
      toast.success("Product added to cart!");
    } else {
      toast.error("Please login first.");
    }
  };

  const handleFavoriteClick = (product: ProductType) => {
    const isProductInWishlist = wishlistItems.some(
      (item: WishlistItem) => item.id === product.id
    );

    setFavoritedStatus((prevStatus) => ({
      ...prevStatus,
      [product.id]: !prevStatus[product.id],
    }));

    if (isAuthenticated) {
      if (isProductInWishlist) {
        toast.success("Product removed to wishlist!");
        dispatch(removeFromWishlist(product.id));
      } else {
        toast.success("Product added to wishlist!");
        dispatch(addToWishlist(product));
      }
    } else {
      toast.error("Please login first.");
    }
  };

  const start = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }; // Function to handle navigating to the next page
  const end = () => {
    const pages = Math.ceil(filteredData.length / limit);
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {updateFilteredProducts().map((product: ProductType) => (
        <center key={product.id}>
          <div>
            <Card
              style={{
                width: "300px",
                height: "370px",
                marginRight: "40px",
                marginBottom: "40px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                boxSizing: "border-box",
              }}
            >
              <div className="text-center" style={{ paddingTop: "20px" }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  height="200px"
                  style={{
                    width: "100px",
                    height: "130px",
                    marginBottom: "10px",
                    paddingBottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => openModal(product)}
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
                    top: "230px",
                  }}
                  className="text-muted"
                >
                  Price: $ {product.price}
                </Card.Text>
                {findItems.find((item: any) => item.id === product.id) ? (
                  <div className=" flex-column">
                    <div className=" align-items-center justify-content-between">
                      <Button
                        variant="btn btn-dark"
                        onClick={() => nav("/cart")}
                        style={{
                          position: "absolute",
                          left: "30px",
                          top: "290px",
                        }}
                      >
                        Go to Cart
                      </Button>
                      {favoritedStatus[product.id] ? (
                        <FavoriteIcon
                          style={{
                            color: "#DC143C",
                            fontSize: "28px",
                            cursor: "pointer",
                            position: "absolute",
                            left: "250px",
                            top: "290px",
                          }}
                          onClick={() => handleFavoriteClick(product)}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{
                            color: "black",
                            fontSize: "28px",
                            cursor: "pointer",
                            position: "absolute",
                            left: "250px",
                            top: "290px",
                          }}
                          onClick={() => handleFavoriteClick(product)}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className=" flex-column">
                    <div className=" align-items-center justify-content-between b-box">
                      <Button
                        variant="btn btn-outline-dark"
                        style={{
                          position: "absolute",
                          left: "30px",
                          top: "290px",
                        }}
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart
                      </Button>
                      {favoritedStatus[product.id] ? (
                        <FavoriteIcon
                          style={{
                            color: "#DC143C",
                            fontSize: "28px",
                            cursor: "pointer",
                            position: "absolute",
                            left: "250px",
                            top: "290px",
                          }}
                          onClick={() => handleFavoriteClick(product)}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{
                            color: "black",
                            fontSize: "28px",
                            cursor: "pointer",
                            position: "absolute",
                            left: "250px",
                            top: "290px",
                          }}
                          onClick={() => handleFavoriteClick(product)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </center>
      ))}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Paging>
          <div>
            <ul className="pagination">
              {/* <li className="page-item">
              <a href="#" className="page-link text-dark bold" onClick={start}>
                {"start"}
              </a>
            </li> */}
              <li className="page-item">
                <button
                  onClick={start}
                  className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
                >
                  {"<<"}
                </button>
              </li>
              {numbers.map((n, i) => (
                <ActivePageItem
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <button className="page-link" onClick={() => paginate(n)}>
                    {n}
                  </button>
                </ActivePageItem>
              ))}
              <li className="page-item">
                <button
                  onClick={end}
                  className={`page-link ${
                    currentPage === pages ? "disabled" : ""
                  }`}
                >
                  {">>"}
                </button>
              </li>
              {/* <li className="page-item">
              <a href="#" className="page-link text-dark bold" onClick={end}>
                {"end"}
              </a>
            </li> */}
            </ul>
          </div>
        </Paging>
      )}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{
                  width: "120px",
                  height: "150px",
                  display: "block", // Center horizontally
                  margin: "0 auto",
                }} // Adjust the width and height as needed
              />
              <h2
                style={{
                  paddingTop: "10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  fontFamily: "cursive",
                }}
              >
                {selectedProduct.title}
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "cursive",
                }}
              >
                <strong>Description:</strong> {selectedProduct.description}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "cursive",
                }}
              >
                <strong> Price: </strong>$ {selectedProduct.price}
              </p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          {selectedProduct && (
            <div>
              {findItems.find((item: any) => item.id === selectedProduct.id) ? (
                <Button
                  variant="btn btn-dark"
                  onClick={() => nav("/cart")}
                  style={{
                    marginRight: "20px",
                  }}
                >
                  Added
                </Button>
              ) : (
                <Button
                  variant="btn btn-outline-dark"
                  style={{
                    marginRight: "20px",
                  }}
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add To Cart
                </Button>
              )}
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Cards;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { add } from "../slice/cartSlice";
// import {
//   addToWishlist,
//   removeFromWishlist,
//   wishlist,
// } from "../slice/wishSlice";
// import Card from "react-bootstrap/Card";
// import { Button } from "react-bootstrap";
// import { useNavigate, useLocation } from "react-router-dom";
// import FavoriteIcon from "@mui/icons-material/Favorite"; // Import the filled heart icon
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Import the outlined heart icon

// import styled from "styled-components";
// import { useAppSelector } from "../slice";

// import { cart } from "../slice/cartSlice";
// import { StartSharp } from "@mui/icons-material";

// const ActivePageItem = styled.li`
//   &.active {
//     .page-link {
//       background-color: black; /* Change to your desired background color */
//       color: white; /* Change to your desired text color */
//     }
//   }
// `;
// const Paging = styled.div`
//   position: relative;
//   top: 550px;

//   left: 530px;
//   position: fixed;
// `;
// const LoadingSpinner = styled.div`
//   @keyframes loading {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }

//   .loading-spinner {
//     border: 5px solid rgba(0, 0, 0, 0.3);
//     border-top: 4px solid black;
//     border-radius: 50%;
//     width: 50px;
//     height: 50px;
//     animation: loading 1s linear infinite;
//     margin: 0 auto;
//     margin-left: 600px;
//     margin-top: 70px;
//   }
// `;
// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
// `;

// // Styled component for the .page-number element
// const PageNumber = styled.button`
//   padding: 10px;
//   margin: 5px;
//   background-color: #111112;
//   color: white;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &.active {
//     background-color: #0056b3;
//   }
// `;
// interface ProductType {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   price: number;
//   name: string;
//   quantity: number;
// }

// interface WishlistItem {
//   id: number;
// }
// export const Cards = (props: any) => {
//   let { data, search } = props;
//   console.log(search, "cards");
//   const nav = useNavigate();
//   const dispatch = useDispatch();
//   const findItems = useAppSelector(cart);
//   const wishlistItems = useAppSelector(wishlist);

//   const [favoritedStatus, setFavoritedStatus] = useState<{
//     [id: number]: boolean;
//   }>({});

//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(4);
//   const filteredData = search
//     ? data.filter((product: ProductType) =>
//         product.title.toLowerCase().includes(search.toLowerCase())
//       )
//     : data;
//   const pages = Math.ceil(filteredData.length / limit);

//   const updateFilteredProducts = () => {
//     const indexOfLastProduct = currentPage * limit;

//     const indexOfFirstProduct = indexOfLastProduct - limit;

//     const slicedProducts = filteredData.slice(
//       indexOfFirstProduct,
//       indexOfLastProduct
//     );

//     return slicedProducts;
//   };
//   // console.log(
//   //   "pages: ",
//   //   pages,
//   //   " lastpage: ",
//   //   lastPage,
//   //   " firstpage: ",
//   //   firstPage,
//   //   "currentpage: ",
//   //   currentPage
//   // );
//   // const numbers = [...Array(pages + 1).keys()].slice(1);
//   const addToCart = (product: ProductType) => {
//     dispatch(add(product));
//   };

//   const handleFavoriteClick = (product: ProductType) => {
//     const isProductInWishlist = wishlistItems.some(
//       (item: WishlistItem) => item.id === product.id
//     );

//     setFavoritedStatus((prevStatus) => ({
//       ...prevStatus,
//       [product.id]: !prevStatus[product.id],
//     }));

//     if (isProductInWishlist) {
//       dispatch(removeFromWishlist(product.id));
//     } else {
//       dispatch(addToWishlist(product));
//     }
//   };
//   // function start() {
//   //   setCurrentPage(1);
//   // }
//   // function end() {
//   //   setCurrentPage(pages);
//   // }

//   const start = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }; // Function to handle navigating to the next page
//   const end = () => {
//     const pages = Math.ceil(filteredData.length / limit);
//     if (currentPage < pages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);
//   // function prePage() {
//   //   if (currentPage !== firstPage + 1) {
//   //     setCurrentPage(currentPage - 1);
//   //   }
//   // }
//   // function changePage(id: any) {
//   //   setCurrentPage(id);
//   // }
//   // function nextPage() {
//   //   if (pages !== currentPage) setCurrentPage(currentPage + 1);
//   // }
//   // const { state } = useLocation();

//   // if (!search) {
//   //   search = state ? state.search : "";
//   // }

//   return (
//     <>
//       {updateFilteredProducts().map((product: ProductType) => (
//         <center key={product.id}>
//           <div

//           // style={{
//           //   position: "relative",
//           //   top: "10px",
//           //   left: "30px",
//           // }}
//           >
//             <Card
//               style={{
//                 width: "300px",
//                 height: "370px",
//                 marginRight: "40px",
//                 marginBottom: "40px",
//                 boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
//                 boxSizing: "border-box",
//               }}
//             >
//               <div className="text-center" style={{ paddingTop: "20px" }}>
//                 <Card.Img
//                   variant="top"
//                   src={product.image}
//                   height="200px"
//                   style={{
//                     width: "100px",
//                     height: "130px",
//                     marginBottom: "10px",
//                     paddingBottom: "5px",
//                     cursor: "pointer", // Center horizontally
//                   }}
//                 />
//               </div>
//               <Card.Body>
//                 <Card.Title style={{ fontSize: "13px" }}>
//                   {product.title}
//                 </Card.Title>
//                 <Card.Text
//                   style={{
//                     fontSize: "16px",
//                     position: "absolute",
//                     left: "110px",
//                     top: "230px",
//                   }}
//                   className="text-muted"
//                 >
//                   Price: $ {product.price}
//                 </Card.Text>
//                 {findItems.find((item: any) => item.id === product.id) ? (
//                   <div className=" flex-column">
//                     <div className=" align-items-center justify-content-between">
//                       <Button
//                         variant="btn btn-dark"
//                         onClick={() => nav("/cart")}
//                         style={{
//                           position: "absolute",
//                           left: "30px",
//                           top: "290px",
//                         }}
//                       >
//                         Go to Cart
//                       </Button>
//                       {favoritedStatus[product.id] ? (
//                         <FavoriteIcon
//                           style={{
//                             color: "#DC143C",
//                             fontSize: "28px",
//                             cursor: "pointer",
//                             position: "absolute",
//                             left: "250px",
//                             top: "290px",
//                           }}
//                           onClick={() => handleFavoriteClick(product)}
//                         />
//                       ) : (
//                         <FavoriteBorderIcon
//                           style={{
//                             color: "black",
//                             fontSize: "28px",
//                             cursor: "pointer",
//                             position: "absolute",
//                             left: "250px",
//                             top: "290px",
//                           }}
//                           onClick={() => handleFavoriteClick(product)}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className=" flex-column">
//                     <div className=" align-items-center justify-content-between b-box">
//                       <Button
//                         variant="btn btn-outline-dark"
//                         style={{
//                           position: "absolute",
//                           left: "30px",
//                           top: "290px",
//                         }}
//                         onClick={() => addToCart(product)}
//                       >
//                         Add To Cart
//                       </Button>
//                       {favoritedStatus[product.id] ? (
//                         <FavoriteIcon
//                           style={{
//                             color: "#DC143C",
//                             fontSize: "28px",
//                             cursor: "pointer",
//                             position: "absolute",
//                             left: "250px",
//                             top: "290px",
//                           }}
//                           onClick={() => handleFavoriteClick(product)}
//                         />
//                       ) : (
//                         <FavoriteBorderIcon
//                           style={{
//                             color: "black",
//                             fontSize: "28px",
//                             cursor: "pointer",
//                             position: "absolute",
//                             left: "250px",
//                             top: "290px",
//                           }}
//                           onClick={() => handleFavoriteClick(product)}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </div>
//         </center>
//       ))}
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <PaginationContainer>
//           <div>
//             {/* Previous button */}

// <button
//   onClick={start}
//   className={`page-number ${currentPage === 1 ? "disabled" : ""}`}
// >
//   &lt; Previous
// </button>

//             {Array.from({ length: pages }, (_, i) => (
// <button
//   key={i}
//   onClick={() => paginate(i + 1)}
//   className={`page-number ${
//     currentPage === i + 1 ? "active" : ""
//   }`}
// >
//   {i + 1}
// </button>
//             ))}

//             {/* Next button */}

// <button
//   onClick={end}
//   className={`page-number ${
//     currentPage === pages ? "disabled" : ""
//   }`}
// >
//   Next &gt;
// </button>
//           </div>
//         </PaginationContainer>
//       )}
//     </>
//   );
// };
// export default Cards;
