import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const items = useSelector((state) => state.cart.items) || [];
  const itemCount = items.length || 0;

  return (
    <div className="bg-body-tertiary ">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Ecommerce Lite
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/about"}>
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/products"}>
                    Products
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <Link className="btn btn-outline-success" to={"/cart"}>
                  <span style={{ fontWeight: "bolder" }}>{itemCount}</span>
                  <i className="bi bi-cart3"></i>Cart
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
