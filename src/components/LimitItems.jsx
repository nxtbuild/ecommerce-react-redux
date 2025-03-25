import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAPI } from "../redux/slices/cartSlice";

const LimitItems = () => {
  const dispatch = useDispatch();
  const [productItems, setProducts] = useState([]);

  // Get products List

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let results = await fetch("http://localhost:3000/products");

    results = await results.json();
    setProducts(results);
    // console.log(results);
  };

  const handleAddToCart = (product) => {
    if (!productItems) return;

    const cartItem = {
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      totalAmount: product.price * 1,
    };

    dispatch(addToCartAPI(cartItem)); // ✅ Redux updates instantly
    alert("Product added to cart!");
  };

  return (
    <div className="container text-center">
      <div className="row justify-content-md-center">
        {productItems.map((item, i) => (
          <div
            key={item.id}
            className="col-lg-3 col-md-3 col-sm-6 col-xs-6 mb-3"
          >
            <div className="card">
              <Link to={"/productinfo/" + item.id}>
                <img
                  src={item.thumbnail}
                  className="card-img-top product-thum"
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>
                  <b>Price:</b>&nbsp;₹
                  {item.price}
                </p>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn btn-primary mt-3"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitItems;
