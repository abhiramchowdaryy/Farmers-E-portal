import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormWrap from '../../components/Form';
import { updateProduct } from '../../redux/actions/adminActions';
import { listProductProfile } from '../../redux/actions/productActions';
import { ADMIN_PRODUCT_UPDATE_RESET } from '../../redux/actions/actionTypes';
import { Button, Form, FormControl, FormGroup, FormLabel, FormFile } from 'react-bootstrap';

const EditProduct = () => {
  const { prodId } = useParams();
  let history = useHistory();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('meet');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productProfile = useSelector(state => state.productProfile);
  const { loading, error, product } = productProfile;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET });
      history.push('/products');
    } else {
      if (!product.name || product._id !== prodId) {
        dispatch(listProductProfile(prodId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, product, prodId, history, successUpdate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: prodId,
        name,
        price,
        image,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/products'>
        Return to All Prodcuts
      </Link>

      <FormWrap>
        <h1>Edit Product: </h1>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingUpdate && <Loader />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name'>
              <FormLabel>
                <strong>Name</strong>
              </FormLabel>
              <FormControl
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='price'>
              <FormLabel>
                <strong>Price</strong>
              </FormLabel>
              <FormControl
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='image'>
              <FormLabel>
                <strong>Upload Image</strong>
              </FormLabel>
              <FormControl
                type='text'
                placeholder='Upload image'
                value={image}
                onChange={e => setImage(e.target.value)}
              />
              <FormFile
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></FormFile>
              {uploading && <Loader />}
            </FormGroup>

            <FormGroup controlId='category'>
              <FormLabel>
                <strong>Category</strong>
              </FormLabel>
              {/* <FormControl
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/> */}
              <select
                style={{ width: '100%', padding: '10px' }}
                onChange={e => setCategory(e.target.value)}
                value={category}
                name='category'
              >
                <option value='meat'>Meat</option>
                <option value='vegetable'>Vegetable</option>
                <option value='fruit'>Fruit</option>
                <option value='cupboard'>Cupboard</option>
              </select>
            </FormGroup>

            <FormGroup controlId='description'>
              <FormLabel>
                <strong>Description</strong>
              </FormLabel>
              <FormControl
                as='textarea'
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId='countInStock'>
              <FormLabel>
                <strong>Stock count</strong>
              </FormLabel>
              <FormControl
                type='number'
                placeholder='Enter stock count'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              />
            </FormGroup>

            <Button variant='primary' type='submit'>
              Update
            </Button>
          </Form>
        )}
      </FormWrap>
    </>
  );
};

export default EditProduct;
