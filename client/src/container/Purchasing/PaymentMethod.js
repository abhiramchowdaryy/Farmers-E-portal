import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/Form';
import { savePaymentMethod } from '../../redux/actions/trolleyActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Button, Col, Form, FormCheck, FormLabel, FormGroup, Row } from 'react-bootstrap';

const PaymentMethod = () => {
  let history = useHistory();
  const trolley = useSelector(state => state.trolley);
  const { deliveryDate } = trolley;

  if (!deliveryDate) {
    history.push('/delivery-date');
  }

  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/review-order');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <FormWrap>
        <h1>PAYMENT METHOD</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <FormLabel as='legend'>Select payment method</FormLabel>

            <Col>
              <Row className='mt-4'>
                <i className='fa fa-cash fa-2x mr-3'></i>
                <FormCheck
                  className='mt-1'
                  name='paymentMethod'
                  type='radio'
                  label='Cash and Delivery'
                  id='cash'
                  value='Cash'
                  checked
                  onChange={e => setPaymentMethod(e.target.value)}
                ></FormCheck>
              </Row>
              {/* <Row className='mt-4'>
								<i className='fab fa-cc-paypal fa-2x mr-3'></i>
								<FormCheck
									className='mt-1'
									name='paymentMethod'
									type='radio'
									label='PayPal or Credit Card'
									id='PayPal'
									value='PayPal'
									checked
									onChange={(e) => setPaymentMethod(e.target.value)}
								></FormCheck>
							</Row>
							<Row className='mt-4'>
								<i className='fab fa-cc-stripe fa-2x mr-3'></i>
								<FormCheck
									className='mt-1'
									name='paymentMethod'
									type='radio'
									label='Stripe'
									id='Stripe'
									value='Stripe'
									disabled
									onChange={(e) => setPaymentMethod(e.target.value)}
								></FormCheck>
							</Row> */}
            </Col>
          </FormGroup>
          <Button className='mt-4' variant='primary' type='submit'>
            Continue to Place Order
          </Button>
        </Form>
      </FormWrap>
    </>
  );
};

export default PaymentMethod;
