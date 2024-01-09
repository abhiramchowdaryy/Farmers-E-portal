import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormWrap from '../../components/Form';
import {
	adminGetUserProfile,
	adminUpdateProfile,
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
} from 'react-bootstrap';

const EditUser = () => {
	const { userId } = useParams();
	let history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const adminGetUser = useSelector((state) => state.adminGetUser);
	const { loading, error, user } = adminGetUser;

	const adminUpdateUser = useSelector((state) => state.adminUpdateUser);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = adminUpdateUser;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: ADMIN_USER_UPDATE_PROFILE_RESET });
			history.push('/users');
		} else {
			if (!user || !userId.length === 24) {
				dispatch(adminGetUserProfile(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, user, userId, successUpdate, history, name]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(adminUpdateProfile({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/users'>
				Return to All Users
			</Link>

			<FormWrap>
				<h1>Edit User: </h1>
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loadingUpdate && <Loader />}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
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

						<FormGroup controlId='isAdmin'>
							<FormCheck
								type='switch'
								id='switch'
								label='Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
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

export default EditUser;
