import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { addToTrolley, removeFromTrolley } from '../../redux/actions/trolleyActions';

const Trolley = () => {
  const { prodId } = useParams();
  let history = useHistory();
  let location = useLocation();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const trolley = useSelector(state => state.trolley);
  const { trolleyItems } = trolley;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (prodId) {
      dispatch(addToTrolley(prodId, qty));
    }
  }, [dispatch, prodId, qty]);

  const removeFromTrolleyHandler = id => {
    dispatch(removeFromTrolley(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      history.push('/login');
    } else {
      history.push('/delivery-address');
    }
  };

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Return to Shop
      </Link>
      <Row>
        <Col md={8}>
          <h1>Your Shopping Trolley</h1>
          {trolleyItems.length === 0 ? (
            <Message variant='secondary'>
              Your trolley is empty. Return to{' '}
              <Link to='/'>
                <strong>Shop</strong>
              </Link>{' '}
              to add items.
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {trolleyItems.map(item => (
                <ListGroupItem key={item.productId}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.productId}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <strong>₹{item.price}</strong>
                    </Col>
                    <Col md={2}>
                      <FormControl
                        as='select'
                        value={item.qty}
                        onChange={e =>
                          dispatch(addToTrolley(item.productId, Number(e.target.value)))
                        }
                      >
                        {[...Array(item.countInStock).keys()].slice(0, 10).map(n => (
                          <option key={n + 1} value={n + 1}>
                            {n + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='danger'
                        onClick={() => removeFromTrolleyHandler(item.productId)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroupItem variant='flush'>
              <h2>Subtotal ({trolleyItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>£{' '}
              {trolleyItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type='button'
                className='btn-block'
                disabled={trolleyItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroupItem>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Trolley;
