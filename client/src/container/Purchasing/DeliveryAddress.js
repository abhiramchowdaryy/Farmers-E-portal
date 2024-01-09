import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormWrap from '../../components/Form';
import { saveDeliveryAddress } from '../../redux/actions/trolleyActions';
import CheckoutSteps from '../../components/CheckoutSteps';

import {
	Button,
	Form,
	FormGroup,
	FormLabel,
	FormControl,
} from 'react-bootstrap';

const DeliveryAddress = () => {
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postcode, setPostcode] = useState('');

	const dispatch = useDispatch();
	let history = useHistory();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveDeliveryAddress({ address, city, postcode }));
		history.push('/delivery-date');
	};

	return (
		<>
			<CheckoutSteps step1 step2 />
			<FormWrap>
				<h1>DELIVERY ADDRESS</h1>
				<Form onSubmit={submitHandler} data-testid='form'>
					<FormGroup controlId='address'>
						<FormLabel>Address:</FormLabel>
						<FormControl
							type='text'
							placeholder='Enter address'
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId='city'>
						<FormLabel>City:</FormLabel>
						<FormControl
							type='text'
							placeholder='Enter city'
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId='postcode'>
						<FormLabel>Postcode:</FormLabel>
						<FormControl
							type='text'
							placeholder='Enter postcode'
							value={postcode}
							required
							onChange={(e) => setPostcode(e.target.value)}
						/>
					</FormGroup>

					<Button variant='primary' type='submit'>
						Select Delivery Date
					</Button>
				</Form>
			</FormWrap>
		</>
	);
};

export default DeliveryAddress;
