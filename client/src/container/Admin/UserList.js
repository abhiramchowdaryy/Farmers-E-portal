import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Button, Table } from 'react-bootstrap';
import { listAllUsers, deleteUser } from '../../redux/actions/adminActions';
import { localDate } from '../../util/localDate';
import { useHistory } from 'react-router-dom';

const UserList = () => {
	const [deleted, setDeleted] = useState(false);
	const dispatch = useDispatch();
	let history = useHistory();

	const userList = useSelector((state) => state.userList);
	const { users, loading, error } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const {
		success: successDelete,
		loading: loadingDelete,
		error: errorDelete,
	} = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listAllUsers());
		} else {
			history.push('/');
		}
	}, [dispatch, history, userInfo, deleted, successDelete]);

	const deleteUserHandler = (id) => {
		if (window.confirm('Are you sure you want to delete user?')) {
			dispatch(deleteUser(id));
			setDeleted(!deleted);
		}
		return;
	};

	return (
		<>
			<h1>All Users</h1>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped hover responsive>
					<thead>
						<tr>
							<th>USER ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>CREATED</th>
							<th>ADMIN</th>
							<th>EDIT</th>
							<th>DELETE</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>
									<strong>{user.name}</strong>
								</td>
								<td>
									<a href={`mailto:${user.email}`}>
										<strong>{user.email}</strong>
									</a>
								</td>
								<td>{localDate(user.createdAt)}</td>
								<td>
									{user.isAdmin ? (
										<i
											className='far fa-check-circle'
											style={{ color: '#56cc9d' }}
										></i>
									) : (
										<i
											className='far fa-times-circle'
											style={{ color: '#ff7851' }}
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/editusers/${user._id}/`}>
										<Button variant='info' className='btn-sm'>
											<i
												className='fas fa-user-edit'
												style={{ color: 'white' }}
											></i>
										</Button>
									</LinkContainer>
								</td>
								<td>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteUserHandler(user._id)}
									>
										<i
											className='fas fa-trash-alt'
											style={{ color: 'white' }}
										></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserList;
