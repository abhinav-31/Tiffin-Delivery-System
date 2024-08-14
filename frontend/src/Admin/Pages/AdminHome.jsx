import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Vendor from "../components/Vendor";
import Deliveryboy from "../components/Deliveryboy";
import Customer from "../components/Customer";
// import DailyEarning from '../components/DailyEarning';
import "../../../src/App.css";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchVendors,
  fetchDeliveryboys,
  fetchCustomers,
} from "../../services/admin_api";
import {
  setVendorsCount,
  setCustomersCount,
  setDeliveryBoysCount,
} from "../../redux/counter/counterSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { vendorsCount, customersCount, deliveryBoysCount } = useSelector(
    (state) => state.counter
  );

  useEffect(() => {
    const getCounts = async () => {
      try {
        const vendors = await fetchVendors();
        const customers = await fetchCustomers();
        const deliveryBoys = await fetchDeliveryboys();

        dispatch(setVendorsCount(vendors.length || 0));
        dispatch(setCustomersCount(customers.length || 0));
        dispatch(setDeliveryBoysCount(deliveryBoys.length || 0));
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    getCounts();
  }, [dispatch]);

  return (
    <Container fluid>
      <Row className="my-4">
        <Col>
          <h5>Admin Home Page</h5>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="vendorcomponent">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={8}>
                  <Vendor />
                </Col>
                <Col xs={1} className="text-end">
                  <span className="vendor-count">{vendorsCount}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="deliveryboycomponent">
            <Card.Body>
              {/* <Deliveryboy /> */}
              <Row className="align-items-center">
                <Col xs={8}>
                  <Customer />
                </Col>
                <Col xs={1} className="text-end">
                  <span className="customer-count">{customersCount}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="customercomponent">
            <Card.Body>
              {/* <Customer /> */}
              <Row className="align-items-center">
                <Col xs={8}>
                  <Deliveryboy />
                </Col>
                <Col xs={1} className="text-end">
                  <span className="deliveryboy-count">{deliveryBoysCount}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row>
      <Col md={4} className="mb-4">
          <Card className='dailyearningcomponent'>
            <Card.Body>
              <DailyEarning/>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default AdminHomePage;
