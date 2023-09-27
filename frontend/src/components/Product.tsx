import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../slice/cartSlice";
import { getProducts } from "../slice/productSlice";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../slice";
import Cards from "./card";
import { proData } from "../slice/productSlice";
import axios from "axios";
import styled from "styled-components";

interface ProductType {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
}

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-top: 110px;
  margin-bottom: 20px;
  margin-left: 140px;
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
    margin-left: 480px;
    margin-top: 70px;
    position: relative;
  }
`;
const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(proData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProducts());
      setLoading(false);
    }, 1000);
  }, []);
  // useEffect(() => {
  //   // Make a GET request to your backend endpoint
  //   axios
  //     .get("/fake-store-data")
  //     .then((response: any) => {
  //       // Handle the response data
  //       dispatch(getProducts()); // Assuming getProducts dispatches to your Redux store
  //       setLoading(false);
  //     })
  //     .catch((error: any) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);

  const { state } = useLocation();
  const search = state ? state.search : "";

  return (
    <ProductContainer>
      {loading ? (
        <LoadingSpinner>
          <div className="loading-spinner"></div>
        </LoadingSpinner>
      ) : (
        <Cards data={products} search={search} />
      )}
    </ProductContainer>
  );
};

export default Product;
