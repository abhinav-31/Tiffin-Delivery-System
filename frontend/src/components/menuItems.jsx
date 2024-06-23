import { useDispatch } from "react-redux";
import { addToCartAction } from "../features/cartSlice";
import config from "../config";
import { useNavigate } from "react-router-dom";

function MenuItems({ menuItems }) {
  const getShortDetails = () => {
    return menuItems.details.length > 50
      ? menuItems.details.substr(0, 50) + "..."
      : menuItems.details;
  };

  // used to update the state
  const dispatch = useDispatch();

  const bookMenuItems = () => {
    dispatch(addToCartAction(menuItems));
  };

  const navigate = useNavigate();
  const onMenuItemsClick = () => {
    navigate(`/menuItems-details/${menuItems.id}`);
  };

  return (
    <div
      onClick={onMenuItemsClick}
      className="col-3"
      style={{ display: "inline-block", cursor: "pointer", padding: 10 }}
    >
      <div className="card">
        <img
          style={{ height: 200 }}
          className="card-img-top"
          // src={`${config.url}/image/${menuItems.profileImage}`}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{menuItems.itemName}</h5>
          <p className="card-text">{getShortDetails()}</p>
          <div style={{ fontWeight: 600 }}>₹ {menuItems.itemPrice} </div>
          <button
            onClick={bookMenuItems}
            style={{ position: "absolute", right: 15, bottom: 15 }}
            className="btn btn-success"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItems;
