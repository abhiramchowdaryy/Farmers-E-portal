import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserProfile, updateProfile } from '../../redux/actions/userActions';
import { getUserOrders } from '../../redux/actions/orderActions';
import { localDate } from '../../util/localDate';
import {
	Button,
	Col,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	FormText,
	Row,
	Table,
} from 'react-bootstrap';

const Profile = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	let history = useHistory();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userProfile = useSelector((state) => state.userProfile);
	const { loading, error, user } = userProfile;

	const updatedUserProfile = useSelector((state) => state.updatedUserProfile);
	const { successful } = updatedUserProfile;

	const orderUserList = useSelector((state) => state.orderUserList);
	const { loading: loadingOrders, error: errorOrders, orders } = orderUserList;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserProfile('profile'));
				dispatch(getUserOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, user.name, user.email, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords must match.');
		} else {
			dispatch(updateProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row className='py-3'>
			<Col md={3}>
				<h2>My Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{successful && <Message variant='success'>Profile updated!</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<FormGroup controlId='name'>
						<FormLabel>Name:</FormLabel>
						<FormControl
							type='name'
							placeholder='Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId='formBasicEmail'>
						<FormLabel>Email address:</FormLabel>
						<FormControl
							type='email'
							placeholder='e.g. farmer@market.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FormText className='text-muted'>
							We'll never share your email with anyone else.
						</FormText>
					</FormGroup>

					<FormGroup controlId='formBasicPassword'>
						<FormLabel>Update Password:</FormLabel>
						<FormControl
							type='password'
							placeholder='********'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormGroup>

					<FormGroup controlId='confirmPassword'>
						<FormLabel>Confirm Updated Password:</FormLabel>
						<FormControl
							type='password'
							placeholder='********'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</FormGroup>

					<Button variant='secondary' type='submit'>
						Update Profile
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped hover responsive>
						<thead>
							<tr>
								<th>ORDER ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{localDate(order.createdAt)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											localDate(order.paidAt)
										) : (
											<i
												className='far fa-times-circle'
												style={{ color: '#ff7851' }}
											></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											localDate(order.deliveredAt)
										) : (
											<i
												className='far fa-times-circle'
												style={{ color: '#ff7851' }}
											></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant='info' className='btn-sm'>
												Summary
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default Profile;
