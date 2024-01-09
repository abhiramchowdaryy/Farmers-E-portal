import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { listProducts } from '../../redux/actions/productActions';
import { deleteProduct, createProduct } from '../../redux/actions/adminActions';
import { ADMIN_PRODUCT_CREATE_RESET } from '../../redux/actions/actionTypes';
import Rating from '../../components/Rating';
import Paginate from '../../components/Paginate';

const ProductList = () => {
  let history = useHistory();
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();

  const { pageNumber } = useParams() || 1;

  const productList = useSelector(state => state.productList);
  const { products, pages, page, loading, error } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const { success: successDelete, loading: loadingDelete, error: errorDelete } = productDelete;

  const productCreate = useSelector(state => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ADMIN_PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/');
    } else {
      dispatch(listProducts('', pageNumber));
    }

    if (successCreate) {
      history.push(`/editproducts/${createdProduct._id}`);
    }
  }, [
    dispatch,
    history,
    userInfo,
    deleted,
    successCreate,
    createdProduct,
    successDelete,
    pageNumber,
  ]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteProductHandler = id => {
    if (window.confirm('Are you sure you want to delete user?')) {
      dispatch(deleteProduct(id));
      setDeleted(!deleted);
    }
    return;
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>All Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='btn btn-info my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>PRODUCT ID</th>
                <th>NAME</th>
                <th>PRICE (£)</th>
                <th>CATEGORY</th>
                <th>STOCK COUNT</th>
                <th>RATING</th>
                <th>REVIEW COUNT</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>
                    <strong>{product.price}</strong>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <strong>{product.countInStock}</strong>
                  </td>
                  <td>
                    <Rating value={product.rating} color='#888' />
                  </td>
                  <td>{product.numReviews}</td>
                  <td>
                    <LinkContainer to={`/bidding/${product._id}`}>
                      <Button variant='success' className='btn-sm'>
                        <i class='fas fa-money-bill' style={{ color: 'white' }}></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <LinkContainer to={`/editproducts/${product._id}/`}>
                      <Button variant='info' className='btn-sm'>
                        <i className='fas fa-user-edit' style={{ color: 'white' }}></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className='fas fa-trash-alt' style={{ color: 'white' }}></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductList;
