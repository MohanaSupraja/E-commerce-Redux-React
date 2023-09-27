import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Search } from "@mui/icons-material";
import styled from "styled-components";
import { useAppSelector } from "../slice";
import { cart } from "../slice/cartSlice";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../slice/userSlice";
import { toast } from "react-toastify";
const StyledNavbar = styled(Navbar)`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);

  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: 500;
  font-size: 18px;
  background-color: white;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0px;
`;

const SearchBar = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.expanded ? "250px" : "auto")};
`;

const SearchButton = styled(Button)`
  padding: 0;
  background: transparent;
  border: none;
`;
const SearchContainer = styled.div`
  marginleft: 30px;
`;
const SearchIcon = styled(Search)`
  font-size: 30px;
  color: #dc143c;
  margin-left: 20px;
`;

const SearchInput = styled.input<{ expanded: boolean }>`
  width: 100%;
  border: none;
  // border-radius: 10px;
  padding: 7px 12px;
  margin-left: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  // transition: opacity 0.3s ease-in-out;
`;

const StyledNavLink = styled(Link)`
  margin-right: 15px;
  // font-weight: bold;
  color: inherit;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    color: #dc143c;
  }
  &:focus {
    text-decoration: none;
    color: #dc143c;
    font-weight: bold;
  }
`;

const StyledIconLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 15px;

  &:hover {
    transform: scale(1.2); /* Add hover styles for your icons */
  }
`;

const StyledCartIconLink = styled(Link)`
  display: flex;
  align-items: center;

  &:hover {
    /* Add hover styles for your icons */
  }
`;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const handleLogout = () => {
    dispatch(logout());
    toast.success("logged out successfully", {});
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const toggleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setExpanded(!expanded);
    if (search) {
      console.log(search, "search");
      // navigate(`/pro?search=${encodeURIComponent(search)}`);
      navigate("/pro", { state: { search } });
    }
  };
  const cartProducts = useAppSelector(cart);
  const cartQuantity = Object.values(cartProducts).reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  console.log(cartQuantity);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <StyledNavbar collapseOnSelect expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://1000logos.net/wp-content/uploads/2019/02/Celine-Logo-2012.jpg"
            width="140px"
            height="50px"
          ></img>
        </Navbar.Brand>
        <SearchContainer>
          <SearchBar expanded={expanded}>
            <SearchForm onSubmit={toggleSearch}>
              <SearchButton type="submit" variant="link">
                <SearchIcon />
              </SearchButton>
              {expanded && (
                <SearchInput
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  expanded={expanded}
                />
              )}
            </SearchForm>
          </SearchBar>
        </SearchContainer>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <StyledNavLink to="/">Home</StyledNavLink>

            <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
            <StyledNavLink to="/pro">Products</StyledNavLink>
            <StyledNavLink to="/con">Contact</StyledNavLink>
            {isAuthenticated ? (
              <StyledNavLink to="#" onClick={handleLogout}>
                Logout{" "}
                <LogoutIcon
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    paddingBottom: "5px",
                    paddingRight: "5px",
                  }}
                />
              </StyledNavLink>
            ) : (
              <StyledNavLink to="/login">
                Login
                <LoginIcon
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    paddingBottom: "5px",
                    paddingRight: "5px",
                  }}
                />
              </StyledNavLink>
            )}
            <StyledIconLink to="/wish">
              <FavoriteBorderIcon
                style={{
                  color: "#DC143C",
                  fontSize: "30px",
                  cursor: "pointer",
                  paddingBottom: "4px",
                }}
              />
            </StyledIconLink>
          </Nav>
          <StyledCartIconLink to="/cart">
            <div>
              <ShoppingBagOutlinedIcon
                style={{
                  color: "blue",
                  fontSize: "31px",
                  cursor: "pointer",
                  paddingBottom: "5px",
                  paddingRight: "5px",
                }}
              />

              {cartQuantity > 0 && (
                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.1rem",
                    height: "1.1rem",
                    position: "absolute",
                    fontWeight: "bold",
                    bottom: 0,
                    right: 0,
                    fontSize: "13px",
                    transform: "translate(-160%, -230%)",
                  }}
                >
                  {cartQuantity}
                </div>
              )}
            </div>
          </StyledCartIconLink>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default NavBar;
