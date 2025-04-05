import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCartAPI } from "./redux/slices/cartSlice"; // Import API function
import { useDispatch } from "react-redux";

const Productinfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const APIURL = "https://ecommerce-react-redux-m41t.onrender.com/products/";

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      let response = await fetch(`${APIURL}${id}`);
      let result = await response.json();
      setProduct(result);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Handle Add to Cart with Redux and API
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      productId: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      totalAmount: product.price * quantity,
    };

    dispatch(addToCartAPI(cartItem)); // ✅ Redux updates instantly
    alert("Product added to cart!");
  };

  return (
    <React.Fragment>
      <div className="container pt-5 pb-5">
        {product ? (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mb-3">
              <img src={product.thumbnail} alt={product.title} />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 mb-3">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p>
                  <b>Brand:</b> {product.brand}
                  <br />
                  <b>Price:</b> ₹{product.price}
                  <br />
                  <b>Description:</b> {product.description}
                </p>

                <div className="input-group">
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="form-control input-number"
                    value={quantity} // ✅ Ensure input value is maintained
                    min="1"
                    max="100"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary mt-3"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default Productinfo;
