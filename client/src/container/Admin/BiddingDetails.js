import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormWrap from '../../components/Form';
import {
  adminGetUserProfile,
  adminUpdateProfile,
  createBiddingProduct,
  getBiddingProduct,
  updateBiddingProduct,
} from '../../redux/actions/adminActions';
import { ADMIN_USER_UPDATE_PROFILE_RESET } from '../../redux/actions/actionTypes';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Table,
  Modal,
} from 'react-bootstrap';
import moment from 'moment';

const BiddingDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [isShow, setIsShow] = useState(false);
  const [values, setValues] = useState({});

  const biddingProduct = useSelector(state => state?.bidding?.biddingProduct);
  console.log('🚀 ~ file: BiddingDetails.js:28 ~ BiddingDetails ~ biddingProduct:', biddingProduct);

  useEffect(() => {
    dispatch(getBiddingProduct(id));
  }, []);

  const handleCreateBidding = () => {
    const values = { product: id };
    dispatch(createBiddingProduct(values));
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const updateBidding = e => {
    e.preventDefault();
    dispatch(updateBiddingProduct(id, values, history));
    handleClose();
  };

  const handleModal = () => {
    setIsShow(true);
    setValues({ status: biddingProduct?.status, winner: biddingProduct?.winner?._id });
  };

  return (
    <section>
      <div>
        {biddingProduct ? (
          <div>
            <div className='d-flex justify-content-between my-auto'>
              <h4>Bidding Details</h4>

              <Button variant='success' className='my-auto' onClick={handleModal}>
                Update Bidding
              </Button>
            </div>

            <div>
              <p>
                <b>Status: </b>
                {biddingProduct?.status}
              </p>
              <p>
                <b>Bidding Winner: </b>
                {biddingProduct?.winner?.name ?? '-'}
              </p>
            </div>

            {biddingProduct?.biddings && biddingProduct?.biddings?.length === 0 ? (
              <p className='text-danger'>No Biddings happened for this product.</p>
            ) : (
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Sl. No</th>
                    <th>Bidding Price</th>
                    <th>User</th>
                    <th>Bidding Date</th>
                  </tr>
                </thead>
                <tbody>
                  {biddingProduct?.biddings?.map((b, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{b?.price}</td>
                      <td>{b?.user?.name}</td>
                      <td>{moment(b?.date).format('lll')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        ) : (
          <div>
            <p className='text-danger'>No Bidding details found for this product.</p>

            <Button variant='success' onClick={handleCreateBidding}>
              Create Bidding
            </Button>
          </div>
        )}
      </div>

      <Modal show={isShow}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Update Billing</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updateBidding}>
          <Modal.Body>
            <FormGroup controlId='rating'>
              <FormLabel>Rating</FormLabel>
              <FormControl
                as='select'
                required
                value={values?.status}
                onChange={e => setValues({ ...values, status: e.target.value })}
              >
                <option value=''>Please select</option>
                <option value='Active'>Active</option>
                <option value='Closed'>Closed</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='rating'>
              <FormLabel>Winner</FormLabel>
              <FormControl
                as='select'
                required
                value={values?.winner}
                onChange={e => setValues({ ...values, winner: e.target.value })}
              >
                <option value=''>Please select</option>
                {biddingProduct?.biddings?.map((u, i) => (
                  <option value={u?.user?._id}>{u?.user?.name}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={handleClose}>
              Close
            </Button>
            <Button variant='dark' type='submit'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
};

export default BiddingDetails;
