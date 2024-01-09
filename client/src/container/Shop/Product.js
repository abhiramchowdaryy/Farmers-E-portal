import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { localDate } from '../../util/localDate';
import {
  listProductProfile,
  createProductReview,
  addFavouriteProduct,
  removeFavouriteProduct,
  productBidding,
} from '../../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/actions/actionTypes';
import { getBiddingProduct } from '../../redux/actions/adminActions';
import _ from 'lodash';

const Product = () => {
  const { prodId } = useParams();
  let history = useHistory();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [biddingValues, setBiddingValues] = useState({});
  const [isBiddingCompleted, setIsBiddingCompleted] = useState(false);

  const dispatch = useDispatch();

  const productProfile = useSelector(state => state.productProfile);
  const bidding = useSelector(state => state?.bidding?.biddingProduct);
  console.log('🚀 ~ file: Product.js:43 ~ Product ~ bidding:', bidding);
  const { loading, error, product } = productProfile;

  const productReview = useSelector(state => state.productReview);
  const { error: errorReview, success } = productReview;

  const productFavourited = useSelector(state => state.productFavourited);
  const { error: errorFavourited, success: successFavourited } = productFavourited;

  const productUnfavourited = useSelector(state => state.productUnfavourited);
  const { error: errorUnfavourited, success: successUnfavourited } = productUnfavourited;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    } else if (successFavourited || successUnfavourited) {
      dispatch(listProductProfile(prodId));
    } else {
      dispatch(listProductProfile(prodId));
    }
    dispatch(getBiddingProduct(prodId));
  }, [dispatch, prodId, success, successFavourited, successUnfavourited]);

  useEffect(() => {
    if (bidding && bidding?.biddings && bidding?.biddings?.length > 0) {
      const biddingCompleted = bidding?.biddings?.find(b => b.user?._id === userInfo?._id);
      console.log('🚀 ~ file: Product.js:79 ~ useEffect ~ biddingCompleted:', biddingCompleted);
      if (biddingCompleted) {
        setIsBiddingCompleted(true);
      }
    }
  }, [bidding]);

  const addToTrolleyHandler = () => {
    history.push(`/trolley/${prodId}?qty=${qty}`);
  };

  const submitReviewHandler = e => {
    e.preventDefault();
    dispatch(
      createProductReview(prodId, {
        rating,
        comment,
      })
    );
  };

  let favButton = null;

  const favouriteHandler = e => {
    e.preventDefault();
    if (!userInfo) {
      history.push(`/login`);
    } else {
      dispatch(addFavouriteProduct(prodId));
    }
  };
  const unFavouriteHandler = e => {
    e.preventDefault();
    dispatch(removeFavouriteProduct(prodId));
  };

  if (
    userInfo &&
    product.favouritedBy &&
    product.favouritedBy.filter(fave => fave.user.toString() === userInfo._id).length > 0
  ) {
    favButton = (
      <Button
        className='btn-block btn-secondary'
        type='button'
        disabled={product.countInStock === 0}
        onClick={unFavouriteHandler}
      >
        FAVOURITED <i className='fas fa-heart'></i>
      </Button>
    );
  } else {
    favButton = (
      <Button
        className='btn-block btn-secondary'
        type='button'
        disabled={product.countInStock === 0}
        onClick={favouriteHandler}
      >
        ADD TO FAVOURITES
      </Button>
    );
  }

  const submitBidding = e => {
    e.preventDefault();

    console.log('biddingValues', biddingValues);

    dispatch(productBidding(bidding?._id, biddingValues));
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {errorFavourited && <Message variant='secondary'>{errorFavourited}</Message>}
          {errorUnfavourited && <Message variant='secondary'>{errorUnfavourited}</Message>}
          <Row className='mt-4'>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color='#F1C40F'
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <strong>₹{product.price}</strong>
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Description: {product.description}</strong>
                </ListGroupItem>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].slice(0, 10).map(n => (
                              <option key={n + 1} value={n + 1}>
                                {n + 1}
                              </option>
                            ))}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToTrolleyHandler}
                    >
                      ADD TO TROLLEY
                    </Button>
                  </ListGroupItem>

                  <ListGroupItem>{favButton}</ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col md={6}>
              <h2>Product Reviews</h2>
              {product.reviews.length === 0 && <Message>No Written Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(rvw => (
                  <ListGroupItem key={rvw._id}>
                    <strong>{rvw.name}</strong>
                    <Rating value={rvw.rating} />
                    <p>{localDate(rvw.createdAt)}</p>
                    <p>{rvw.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorReview && <Message variant='secondary'>{errorReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <FormGroup controlId='rating'>
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Please select</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId='comment'>
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as='textarea'
                          type='text'
                          row='4'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>
                      <Button variant='primary' type='submit'>
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please{' '}
                      <Link to='/login'>
                        <strong>log in</strong>
                      </Link>{' '}
                      to write a review
                    </Message>
                  )}
                </ListGroupItem>

                {/* Product bidding */}
                {bidding && (
                  <ListGroupItem>
                    <h2>Create Bidding for the product</h2>
                    {userInfo && !isBiddingCompleted && biddingValues?.status !== 'Completed' ? (
                      <Form onSubmit={submitBidding}>
                        <FormGroup controlId='comment'>
                          <FormLabel>Bidding Price*</FormLabel>
                          <FormControl
                            as='input'
                            type='number'
                            required
                            value={biddingValues?.price}
                            onChange={e =>
                              setBiddingValues({ ...biddingValues, price: e.target.value })
                            }
                          ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='comment'>
                          <FormLabel>Bidding Comment</FormLabel>
                          <FormControl
                            as='textarea'
                            type='text'
                            row='4'
                            value={biddingValues?.comment}
                            onChange={e =>
                              setBiddingValues({ ...biddingValues, comment: e.target.value })
                            }
                          ></FormControl>
                        </FormGroup>
                        <Button variant='warning' type='submit'>
                          Submit Bidding
                        </Button>
                      </Form>
                    ) : (
                      <>
                        {isBiddingCompleted ? (
                          <Message>Your bidding is completed for this product.</Message>
                        ) : (
                          <Message>
                            Please{' '}
                            <Link to='/login'>
                              <strong>log in</strong>
                            </Link>{' '}
                            to write a review
                          </Message>
                        )}
                      </>
                    )}
                  </ListGroupItem>
                )}

                {bidding?.status == 'Closed' && bidding?.winner?.name && (
                  <ListGroupItem>
                    <Message variant={'success'}>
                      Winner of the bidding is <b>{bidding?.winner?.name}</b>
                    </Message>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
