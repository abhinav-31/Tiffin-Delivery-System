import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DbHomePage.css"; // Custom CSS for styling

const DbHomePage = () => {
  // State for filters and pagination
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Any");

  // Sample data (can be fetched from an API)
  const orders = [
    {
      id: 1,
      customer: "Michael Holz",
      avatar: "/examples/images/avatar/1.jpg",
      location: "London",
      orderDate: "Jun 15, 2024",
      status: "Delivered",
      amount: "₹ 254",
    },
    {
      id: 2,
      customer: "Paula Wilson",
      avatar: "/examples/images/avatar/2.jpg",
      location: "Madrid",
      orderDate: "Jun 21, 2024",
      status: "In transit",
      amount: "₹ 1,260",
    },
    {
      id: 3,
      customer: "Antonio Moreno",
      avatar: "/examples/images/avatar/3.jpg",
      location: "Berlin",
      orderDate: "Jul 04, 2024",
      status: "Cancelled",
      amount: "₹ 350",
    },
    {
      id: 4,
      customer: "Mary Saveley",
      avatar: "/examples/images/avatar/4.jpg",
      location: "New York",
      orderDate: "Jul 16, 2024",
      status: "Pending",
      amount: "₹ 1,572",
    },
    {
      id: 5,
      customer: "Martin Sommer",
      avatar: "/examples/images/avatar/5.jpg",
      location: "Paris",
      orderDate: "Aug 04, 2024",
      status: "Delivered",
      amount: "₹ 580",
    },
  ];

  // Filtered and paginated orders based on current state
  const filteredOrders = orders.filter((order) => {
    return (
      (nameFilter === "" ||
        order.customer.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (locationFilter === "All" || order.location === locationFilter) &&
      (statusFilter === "Any" || order.status === statusFilter)
    );
  });

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredOrders.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-xl vendor-home">
      <div className="table-responsive vendor-section">
        <div className="card">
          <div className="card-body">
            <h2>Order Details</h2>
            <div className="table-filter">
              <div className="row">
                <div className="col-sm-3">
                  <div className="show-entries">
                    <span>Show</span>
                    <select
                      className="form-control"
                      value={entriesPerPage}
                      onChange={(e) =>
                        setEntriesPerPage(parseInt(e.target.value))
                      }
                    >
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                    </select>
                    <span>entries</span>
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="row">
                    <div className="col-md-4 filter-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 filter-group">
                      <label>Location</label>
                      <select
                        className="form-control"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      >
                        <option>All</option>
                        <option>Berlin</option>
                        <option>London</option>
                        <option>Madrid</option>
                        <option>New York</option>
                        <option>Paris</option>
                      </select>
                    </div>
                    <div className="col-md-4 filter-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option>Any</option>
                        <option>Delivered</option>
                        <option>In transit</option>
                        <option>Pending</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <span className="filter-icon">
                    <i className="fa fa-filter"></i>
                  </span>
                </div>
              </div>
            </div>

            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Net Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="#x">
                        <img
                          src={order.avatar}
                          className="avatar"
                          alt="Avatar"
                        />{" "}
                        {order.customer}
                      </a>
                    </td>
                    <td>{order.location}</td>
                    <td>{order.orderDate}</td>
                    <td>
                      <span className={`badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>{" "}
                    </td>
                    <td>{order.amount}</td>
                    <td>
                      <a
                        href="#"
                        className="view"
                        title="View Details"
                        data-toggle="tooltip"
                        data-original-title="View Details"
                      >
                        <i className="material-icons"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="clearfix">
              <div className="hint-text">
                Showing <b>{currentEntries.length}</b> out of{" "}
                <b>{filteredOrders.length}</b> entries
              </div>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {paginationItems(filteredOrders.length, entriesPerPage).map(
                  (page, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === page && "active"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage ===
                      numPages(filteredOrders.length, entriesPerPage) &&
                    "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility functions
const paginationItems = (totalEntries, entriesPerPage) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

const numPages = (totalEntries, entriesPerPage) =>
  Math.ceil(totalEntries / entriesPerPage);

const getStatusClass = (status) => {
  switch (status) {
    case "Delivered":
      return "badge bg-success";
    case "In transit":
      return "badge bg-info";
    case "Pending":
      return "badge bg-warning text-dark";
    case "Cancelled":
      return "badge bg-danger";
    default:
      return "badge bg-secondary";
  }
};

export default DbHomePage;
