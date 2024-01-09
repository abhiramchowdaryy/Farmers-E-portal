import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormWrap from '../../components/Form';
import { register } from '../../redux/actions/userActions';
import {
	Button,
	Col,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	FormText,
	Row,
} from 'react-bootstrap';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	let location = useLocation();
	let history = useHistory();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords must match.');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormWrap>
			<h1>Register</h1>
			{message && <Message variant='danger'>{message}</Message>}
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
					<FormLabel>Password:</FormLabel>
					<FormControl
						type='password'
						placeholder='********'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>

				<FormGroup controlId='confirmPassword'>
					<FormLabel>Confirm Password:</FormLabel>
					<FormControl
						type='password'
						placeholder='********'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</FormGroup>

				<Button variant='primary' type='submit'>
					Sign me up!
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					<Link className='ml-1' to={'/login'}>
						Have an account? <strong>Log in here</strong>
					</Link>
				</Col>
			</Row>
		</FormWrap>
	);
};

export default Register;
