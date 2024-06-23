drop database tiffin_delivery_self;
create database tiffin_delivery_self;
use tiffin_delivery_self;
create table role (
  id int primary key auto_increment,
  role_name varchar(20) not null unique
);
ALTER TABLE users
MODIFY role varchar(20);
create table users(
    id int primary key auto_increment,
    firstName varchar(15) not null,
    lastName varchar(15) not null,
    email varchar(30) not null,
    password varchar(100) not null,
    phoneNumber varchar(15) not null,
    address varchar(1000) not null,
    role varchar(20) not null,
    roleID int,
    createdAt DATETIME default CURRENT_TIMESTAMP,
    updatedAt DATETIME default CURRENT_TIMESTAMP,
    isDeleted int default 0,
    deletedAt DATETIME,
    deletedBy int,
    constraint fk_users_role_id foreign key (roleID) references role(id) on delete cascade on update cascade
);

create table vendors
(
  id int primary key,
  userID int,
  buisnessAddress varchar(1000) not null,
  buisnessName varchar(100) not null,
  constraint fk_vendors_users_id foreign key(userID) 
  references users(id) on delete cascade on update cascade
);

create table customers 
(
  id int primary key,
  userID int,
  constraint fk_customers_users_id foreign key(userID)
  references users(id) on delete cascade on update cascade
);

create table deliveryPersons
(
  id int primary key,
  userID int,
  constraint fk_deliveryPersons_users_id foreign key(userID)
  references users(id) on delete cascade on update cascade
);

create table orders
(
  id int primary key,
  customerID int, -- foreign key references to customers_id,
  vendorID int, -- foreign key references to vendors_id
  deliveryPersonID int, -- foreign key references to deliveryPersons_id
  orderStatus varchar(10) not null,
  orderDate timestamp not null,
  constraint fk_orders_customers_id foreign key(customerID)
  references customers(id) on delete cascade on update cascade,
  constraint fk_orders_vendors_id foreign key(vendorID)
  references vendors(id) on delete cascade on update cascade,
  constraint fk_orders_deliveryPersons_id foreign key(deliveryPersonID)
  references deliveryPersons(id) on delete cascade on update cascade
);

create table menuItems
(
  id int primary key,
  vendorID int,
  constraint fk_menuItems_vendors_id foreign key(vendorID)
  references vendors(id) on delete cascade on update cascade,
  itemType varchar(15) not null,
  itemName varchar(20) not null,
  itemPrice int not null
  -- image
  -- details
  -- itemType
  -- 1. veg
  -- 2. non-veg
);
create table ordersItem
(
  id int primary key,
  orderID int, -- foreign key references to orders_orderid
  menuItemID int, -- foreign key
  quantity int,
  constraint fk_ordersItem_order_id foreign key(orderID)
  references orders(id) on delete cascade on update cascade,
  constraint fk_ordersItem_menuItems_id foreign key(menuItemID)
  references menuItems(id) on delete cascade on update cascade
);


-- one to one:- users to vendors, users to customers, users to deliveryPersons
-- one to many:- vendors to menuItems, customers to orders, vendors to orders, deliveryPersons to orders
-- many to many:- orders to menuItems(via orderItems)



-- role
-- id  name
-- 1. admin
-- 2. customer
-- 3. vendor
-- . deliveryBoy


-- insert into role(role_name) values("admin");
-- insert into role(role_name) values("customer");
-- insert into role(role_name) values("vendor");
-- insert into role(role_name) values("deliveryBoy");