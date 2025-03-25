import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderAPI } from "./redux/slices/orderSlice";
const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Store customer details dynamically
  const [customerDetails, setCustomerDetails] = useState({});

  const handleChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    if (Object.keys(customerDetails).length === 0) {
      alert("Please enter customer details!");
      return;
    }

    dispatch(placeOrderAPI(customerDetails))
      .then(() => {
        alert("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order!");
      });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="col-12">
          <div class="col-5 mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Name
            </label>
            <input
              type="text"
              name="customerName"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              required
              onChange={handleChange}
            />
          </div>

          <div class="col-5 mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Mobile No
            </label>
            <input
              type="text"
              name="mobileNo"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              required
              min={10}
              max={10}
              onChange={handleChange}
            />
          </div>

          <button onClick={handlePlaceOrder} className="btn btn-danger">
            Place Order
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
