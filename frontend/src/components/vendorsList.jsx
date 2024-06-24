import React, { useEffect, useState } from "react";
import Vendor from "./vendor";

function VendorsList() {
  const [vendors, setVendors] = useState([]);
  const loadVendors = () => {
    const result = [
      {
        id: 1,
        userID: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "hashed_password_here",
        phoneNumber: "+1234567890",
        address: "123 Main St, Anytown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "123 Main St, Anytown, USA",
        businessName: "ABC Supplies",
      },
      {
        id: 2,
        userID: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "hashed_password_here",
        phoneNumber: "+1987654321",
        address: "456 Elm St, Sometown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "456 Elm St, Sometown, USA",
        businessName: "XYZ Tech",
      },
      {
        id: 3,
        userID: 3,
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        password: "hashed_password_here",
        phoneNumber: "+1122334455",
        address: "789 Oak Ave, Othertown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "789 Oak Ave, Othertown, USA",
        businessName: "Best Foods",
      },
      {
        id: 4,
        userID: 4,
        firstName: "Emily",
        lastName: "Brown",
        email: "emily.brown@example.com",
        password: "hashed_password_here",
        phoneNumber: "+3344556677",
        address: "321 Pine Rd, Newville, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "321 Pine Rd, Newville, USA",
        businessName: "Global Imports",
      },
      {
        id: 5,
        userID: 5,
        firstName: "William",
        lastName: "Lee",
        email: "william.lee@example.com",
        password: "hashed_password_here",
        phoneNumber: "+4455667788",
        address: "654 Cedar Ln, Hometown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "654 Cedar Ln, Hometown, USA",
        businessName: "Superior Goods",
      },
      {
        id: 6,
        userID: 6,
        firstName: "Sophia",
        lastName: "Garcia",
        email: "sophia.garcia@example.com",
        password: "hashed_password_here",
        phoneNumber: "+9988776655",
        address: "987 Maple Dr, Othertown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "987 Maple Dr, Othertown, USA",
        businessName: "Smart Devices",
      },
      {
        id: 7,
        userID: 7,
        firstName: "Daniel",
        lastName: "Martinez",
        email: "daniel.martinez@example.com",
        password: "hashed_password_here",
        phoneNumber: "+5544332211",
        address: "741 Birch St, Anytown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "741 Birch St, Anytown, USA",
        businessName: "Quick Tech Solutions",
      },
      {
        id: 8,
        userID: 8,
        firstName: "Olivia",
        lastName: "Wilson",
        email: "olivia.wilson@example.com",
        password: "hashed_password_here",
        phoneNumber: "+7788990011",
        address: "852 Walnut Ave, Sometown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "852 Walnut Ave, Sometown, USA",
        businessName: "Innovative Products",
      },
      {
        id: 9,
        userID: 9,
        firstName: "Ethan",
        lastName: "Rodriguez",
        email: "ethan.rodriguez@example.com",
        password: "hashed_password_here",
        phoneNumber: "+1122334455",
        address: "963 Pine Rd, Newville, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "963 Pine Rd, Newville, USA",
        businessName: "Global Trade Inc",
      },
      {
        id: 10,
        userID: 10,
        firstName: "Ava",
        lastName: "Gonzalez",
        email: "ava.gonzalez@example.com",
        password: "hashed_password_here",
        phoneNumber: "+3344556677",
        address: "159 Cedar Ln, Hometown, USA",
        role: "vendor",
        roleID: 2,
        createdAt: "2024-06-19T12:00:00Z",
        updatedAt: "2024-06-19T12:00:00Z",
        isDeleted: 0,
        deletedAt: null,
        deletedBy: null,
        businessAddress: "159 Cedar Ln, Hometown, USA",
        businessName: "Quality Merchants",
      },
    ];
    setVendors(result);
  };
  useEffect(() => {
    loadVendors();
  }, []);
  return vendors.map((vendor) => {
    return <Vendor property={vendor} />;
  });
}

export default VendorsList;