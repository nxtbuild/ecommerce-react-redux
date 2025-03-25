import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { removeFromCartAPI, fetchCart } from "./redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // Get products List

  useEffect(() => {
    dispatch(fetchCart()); // ✅ Fetch cart items on component mount
  }, [dispatch]);

  // Handle Remove to Cart with Redux and API
  const handleRemoveToCart = (id) => {
    dispatch(removeFromCartAPI(id))
      .then(() => {
        dispatch(fetchCart());
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
        alert("Failed to remove product from cart.");
      });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems ? (
                cartItems.map((item, i) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.totalAmount}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveToCart(item.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Cart empty</td>
                </tr>
              )}
            </tbody>
          </table>

          <Link to={"/checkout"} className="btn btn-danger">
            Procced To Checkout
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
