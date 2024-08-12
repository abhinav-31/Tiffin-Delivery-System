// // import React from 'react';
// // import './MenuCard.css'; // Import your CSS file

// // const MenuCard = ({ menu }) => {
// //   return (
// //     <div className="menu-card">
// //       {menu.menuImage && (
// //         <img
// //           src={`data:image/jpeg;base64,${menu.menuImage}`}
// //           alt="Menu"
// //         />
// //       )}
// //       <div className="menu-card-content">
// //         <h3>{menu.name}</h3>
// //         <p className="description">{menu.description}</p>
// //         <p className="price">${menu.price.toFixed(2)}</p>
// //         <p className="category">{menu.category}</p>
// //         <p className="quantity">Quantity Available: {menu.quantity}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MenuCard;
// import React from 'react';
// import './MenuCard.css'; // Import your CSS file

// const MenuCard = ({ menu }) => {
//   return (
//     <div className="menu-card">
//       <img
//         src={`data:image/jpeg;base64,${menu.menuImage}`}
//         alt="Menu"
//         className="menu-card-image"
//       />
//       <div className="menu-card-content">
//         <h3 className="menu-name">{menu.name}</h3>
//         <p className="description">{menu.description}</p>
//         <p className="price">${menu.price.toFixed(2)}</p>
//         <p className="category">{menu.category}</p>
//         <p className="quantity">Quantity Available: {menu.quantity}</p>
//         <button className="add-button">Add</button>
//       </div>
//     </div>
//   );
// };

// export default MenuCard;
// // import React from 'react';
// // import './MenuCard.css'; // Import your CSS file

// // const MenuCard = ({ menu }) => {
// //   return (
// //     <div className="menu-card">
// //       {menu.menuImage && (
// //         <img
// //           src={`data:image/jpeg;base64,${menu.menuImage}`}
// //           alt="Menu"
// //         />
// //       )}
// //       <div className="menu-card-content">
// //         <h3>{menu.name}</h3>
// //         <p className="description">{menu.description}</p>
// //         <p className="price">${menu.price.toFixed(2)}</p>
// //         <p className="category">{menu.category}</p>
// //         <p className="quantity">Quantity Available: {menu.quantity}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MenuCard;
import React from 'react';
import './MenuCard.css'; // Import your CSS file

const MenuCard = ({ menu }) => {
  return (
    <div className="menu-card">
      <img
        src={`data:image/jpeg;base64,${menu.menuImage}`}
        alt="Menu"
        className="menu-card-image"
      />
      <div className="menu-card-content">
        <h3 className="menu-name">{menu.name}</h3>
        <p className="description">{menu.description}</p>
        <p className="price">${menu.price.toFixed(2)}</p>
        <button className="add-button">Add</button>
      </div>
    </div>
  );
};

export default MenuCard;


