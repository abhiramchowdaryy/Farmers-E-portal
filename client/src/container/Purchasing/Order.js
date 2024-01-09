import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, ListGroup, ListGroupItem, Image, Card, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getOrderDetails, payOrder } from '../../redux/actions/orderActions';
import { deliverOrder } from '../../redux/actions/adminActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  ORDER_PAY_RESET,
  ADMIN_ORDER_DELIVERED_RESET,
  TROLLEY_RESET,
} from '../../redux/actions/actionTypes';
import { localDate } from '../../util/localDate';

const Order = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const { orderId } = useParams();
  let history = useHistory();

  const trolley = useSelector(state => state.trolley);

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, error, success, order } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { successful: successfulPay } = orderPay;

  const orderDelivered = useSelector(state => state.orderDelivered);
  const { loading: loadingDeliver, successful: successfulDelivered } = orderDelivered;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const paypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setScriptLoaded(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successfulPay || successfulDelivered || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ADMIN_ORDER_DELIVERED_RESET });
      dispatch({ type: TROLLEY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        paypalScript();
      } else {
        setScriptLoaded(true);
      }
    }
  }, [
    userInfo,
    scriptLoaded,
    history,
    dispatch,
    trolley,
    order,
    orderId,
    success,
    successfulPay,
    successfulDelivered,
  ]);

  if (!loading) {
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.trolleyTotal = addDecimals(
      order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successfulPaymentHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliveredHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>ORDER #: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Delivery</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.deliveryAddress.address},{' '}
                {order.deliveryAddress.city}, {order.deliveryAddress.postcode}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  <em>Delivered on: </em>
                  <strong>{localDate(order.deliveredAt)}</strong>
                </Message>
              ) : (
                <Message variant='danger'>
                  <em>Delivery due on: </em>
                  <strong>{localDate(order.deliveryDate)}</strong>
                </Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  <em>Paid on: </em>
                  <strong>{localDate(order.paidAt)}</strong>
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Summary</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.price} = £{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order Total</Col>
                  <Col>£{order.trolleyTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery</Col>
                  <Col>£{order.deliveryPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>£{order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* {!order.isPaid && (
								<ListGroupItem>
									{!scriptLoaded ? (
										<Loader />
									) : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successfulPaymentHandler}
										/>
									)}
								</ListGroupItem>
							)} */}

              <Button
                onClick={() => {
                  history.push('/');
                }}
                type='button'
                className='btn btn-block my-4'
              >
                Continue Shopping
              </Button>
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroupItem>
                  <Button type='button' className='btn btn-block' onClick={deliveredHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroupItem>
              )}
              {userInfo && userInfo.isAdmin && order.isPaid && order.isDelivered && (
                <ListGroupItem>
                  <LinkContainer to='/orders'>
                    <Button type='button' className='btn btn-block'>
                      Return to All Orders
                    </Button>
                  </LinkContainer>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
