// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { removeItem } from "../../redux/cartSlice";
// import Counter from "./counter";

// function CartItem({ cartItem, vendorEmail, updateBill }) {
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(cartItem.quantity);
//   const [itemTotal, setItemTotal] = useState(
//     cartItem.quantity * cartItem.menuPrice
//   );

//   useEffect(() => {
//     // Calculate and set item total whenever quantity changes
//     setItemTotal(quantity * cartItem.menuPrice);

//     // Call updateBill to update cart state and totals
//     updateBill(vendorEmail, cartItem.menuId, quantity);
//   }, [quantity, cartItem.menuPrice, cartItem.menuId, vendorEmail, updateBill]);

//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity <= 0) {
//       dispatch(removeItem({ vendorEmail, menuId: cartItem.menuId }));
//     } else {
//       setQuantity(newQuantity);
//     }
//   };

//   return (
//     <div className="card border shadow-none">
//       <div className="card-body">
//         <div className="d-flex align-items-start border-bottom pb-3">
//           <div className="me-4">
//             <img
//               src={`data:image/jpeg;base64,${cartItem.menuImage}`}
//               alt=""
//               className="avatar-lg rounded"
//             />
//           </div>
//           <div className="flex-grow-1 align-self-center overflow-hidden">
//             <div>
//               <h5 className="text-truncate font-size-20 fw-bold">
//                 {cartItem.menuName}
//               </h5>
//               <p className="text-muted mb-0">
//                 {Array.from({ length: cartItem.rating }, (_, index) => (
//                   <i key={index} className="bx bxs-star text-warning"></i>
//                 ))}
//               </p>
//             </div>
//           </div>
//           <div className="flex-shrink-0 ms-2">
//             <ul className="list-inline mb-0 font-size-16">
//               <li className="list-inline-item">
//                 <a href="#" className="text-muted px-1">
//                   <i className="mdi mdi-heart-outline"></i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-4">
//             <div className="mt-3">
//               <p className="text-muted mb-2 font-size-16">Price</p>
//               <h5 className="mb-0 mt-2">
//                 <span className="text-muted me-2">
//                   <del className="font-size-16 fw-normal">
//                     ₹ {cartItem.menuPrice + 10}
//                   </del>
//                 </span>
//                 ₹ {cartItem.menuPrice}
//               </h5>
//             </div>
//           </div>
//           <div className="col-md-5">
//             <div className="mt-3">
//               <p className="text-muted mb-2 font-size-16">Quantity</p>
//               <div className="d-inline-flex">
//                 <Counter
//                   quantity={quantity}
//                   onQuantityChange={handleQuantityChange}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="mt-3">
//               <p className="text-muted mb-2"></p>
//               <h5>₹ {itemTotal.toFixed(2)}</h5>
//             </div>
//           </div>
//         </div>

//         {cartItem.vendorBusinessImage && (
//           <div className="mt-3">
//             <img
//               src={`data:image/jpeg;base64,${cartItem.vendorBusinessImage}`}
//               alt="Vendor"
//               className="vendor-image"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CartItem;
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/cartSlice";
import Counter from "./counter";

function CartItem({ cartItem, vendorEmail, updateBill }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [itemTotal, setItemTotal] = useState(
    cartItem.quantity * cartItem.menuPrice
  );

  useEffect(() => {
    setItemTotal(quantity * cartItem.menuPrice);
    updateBill(vendorEmail, cartItem.menuId, quantity);
  }, [quantity, cartItem.menuPrice, cartItem.menuId, vendorEmail, updateBill]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeItem({ vendorEmail, menuId: cartItem.menuId }));
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="card border shadow-none">
      <div className="card-body">
        <div className="d-flex align-items-start border-bottom pb-3">
          <div className="me-4">
            <img
              src={`data:image/jpeg;base64,${cartItem.menuImage}`}
              alt=""
              className="avatar-lg rounded"
            />
          </div>
          <div className="flex-grow-1 align-self-center overflow-hidden">
            <div>
              <h5 className="text-truncate font-size-20 fw-bold">
                {cartItem.menuName}
              </h5>
              <p className="text-muted mb-0">
                {Array.from({ length: cartItem.rating }, (_, index) => (
                  <i key={index} className="bx bxs-star text-warning"></i>
                ))}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 ms-2">
            <ul className="list-inline mb-0 font-size-16">
              <li className="list-inline-item">
                <a href="#" className="text-muted px-1">
                  <i className="mdi mdi-heart-outline"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mt-3">
              <p className="text-muted mb-2 font-size-16">Price</p>
              <h5 className="mb-0 mt-2">
                <span className="text-muted me-2">
                  <del className="font-size-16 fw-normal">
                    ₹ {cartItem.menuPrice + 10}
                  </del>
                </span>
                ₹ {cartItem.menuPrice}
              </h5>
            </div>
          </div>
          <div className="col-md-5">
            <div className="mt-3">
              <p className="text-muted mb-2 font-size-16">Quantity</p>
              <div className="d-inline-flex">
                <Counter
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                  vendorEmail={vendorEmail} // Pass vendorEmail
                  menuId={cartItem.menuId} // Pass menuId
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="mt-3">
              <p className="text-muted mb-2"></p>
              <h5>₹ {itemTotal.toFixed(2)}</h5>
            </div>
          </div>
        </div>

        {cartItem.vendorBusinessImage && (
          <div className="mt-3">
            <img
              src={`data:image/jpeg;base64,${cartItem.vendorBusinessImage}`}
              alt="Vendor"
              className="vendor-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
