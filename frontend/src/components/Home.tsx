import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 0px 10px;
  // background-color: #f0f0f0;
  margin-top: 80px;
`;

const LeftColumn = styled.div`
  // background-color: #f0f0f0;
  padding-top: 27px;
  padding-left: 60px;
  padding-right: 20px;
  justify-content: center;
  font-family: "Times New Roman", Times, serif;
  letter-spacing: 0.3px;
  .follow-icons {
    display: flex;
    font-size: 30px;
    gap: 20px;
    cursor: pointer;
    justify-content: center;
  }
`;

const RightColumn = styled.div`
  // background-color: #f0f0f0;
  padding: 12px 0px;
`;
const HoverableImage = styled.img`
  position: relative;
  width: 450px;
  height: 550px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    opacity: 0.8; /* Dim the image */
    cursor: pointer;
  }
  &:hover::after {
    content: "add";
  }
`;

export default function Home() {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate("/pro");
  };
  return (
    <>
      <Container>
        <LeftColumn>
          <p>
            <span style={{ fontWeight: " bold ", fontSize: "20px" }}>
              Celine
            </span>{" "}
            is a French luxury ready-to-wear and leather goods brand owned by
            the LVMH group since 1996. It was founded in 1945 by Céline Vipiana.
          </p>
          <p>
            Discover the latest Collections online, from Iconic pieces to
            CELINE's latest creations. Explore the latest pieces from the new
            collection and enjoy our complimentary delivery. Collected Returns
            Offered. New Collection. Store Locator. Delivery Offered.
          </p>
          <p>
            A symbol of modern minimalism and sophistication, the Celine brand
            is renowned for its understanding of what women really want to wear.
          </p>
          <p>
            V (Kim Taehyung) tops trends worldwide as he attends CELINE's Pop-Up
            Store in Seoul as his first official activity as Global
            Ambassador.NEWS Posted by YeontanNews99,660 pts Thursday, March 30,
            2023 BTS's V (Kim Taehyung) tops trends worldwide as he attends
            CELINE's Pop-Up Store in Seoul as his first official activity as
            Global Ambassador Content Tag n.news.naver.com BTS member Kim
          </p>
          <p>
            Taehyung, aka V, started his first official activity as "CELINE
            Boy."
          </p>
          <div className="follow-icons">
            <Facebook />
            <Twitter />
            <Instagram />
            {/* Add more icons as needed */}
          </div>
        </LeftColumn>
        <RightColumn>
          <HoverableImage
            src="https://staticg.sportskeeda.com/editor/2023/03/caec6-16802762965132-1920.jpg"
            alt="Hoverable Image"
            onClick={() => {
              handleImageClick();
            }}
          ></HoverableImage>
        </RightColumn>
      </Container>
    </>
  );
}
