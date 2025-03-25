import React from "react";
import LimitItems from "./components/LimitItems";
import Categories from "./components/Categories";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <div className="">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={"img/slider/banner16.jpg"}
                className="d-block w-100"
                alt=""
              />
            </div>

            <div className="carousel-item ">
              <img
                src={"img/slider/banner16.jpg"}
                className="d-block w-100"
                alt=""
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container pt-5 pb-5">
        <h3 className="text-center pb-5">Our Categories</h3>

        <Categories />
      </div>

      <div className="container pt-5 pb-5">
        <h3 className="text-center pb-5">Our Products</h3>
        <LimitItems />

        <center>
          <Link to={"/products"} className="btn btn-dark btn-md mt-4">
            See More
          </Link>
        </center>
      </div>
    </React.Fragment>
  );
};

export default Home;
