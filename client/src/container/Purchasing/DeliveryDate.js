import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/Form';
import { saveDeliveryDate } from '../../redux/actions/trolleyActions';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Button, Form, FormLabel, FormGroup } from 'react-bootstrap';

const DeliveryDate = () => {
	let history = useHistory();
	const trolley = useSelector((state) => state.trolley);
	const { deliveryAddress } = trolley;

	if (!deliveryAddress) {
		history.push('/delivery-address');
	}

	const [deliveryDate, setDeliveryDate] = useState();

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveDeliveryDate(deliveryDate));
		history.push('/payment-method');
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 />
			<FormWrap>
				<h1>DELIVERY DATE</h1>
				<Form onSubmit={submitHandler}>
					<FormGroup>
						<FormLabel as='legend'>Select Delivery Date</FormLabel>
						<Form.Control
							type='date'
							name='deliveryDate'
							id='deliveryDate'
							onChange={(e) => setDeliveryDate(e.target.value)}
						></Form.Control>
					</FormGroup>
					<Button variant='primary' type='submit'>
						Select Payment Method
					</Button>
				</Form>
			</FormWrap>
		</>
	);
};

export default DeliveryDate;
