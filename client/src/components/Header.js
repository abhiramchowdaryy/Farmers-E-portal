import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavLink, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../redux/actions/userActions';
import SearchBar from './SearchBar';

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>
							<strong>FARMER'S MARKET</strong>
						</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<SearchBar />
						<Nav className='ml-auto'>
							<LinkContainer to='/trolley'>
								<Nav.Link>
									<i className='fas fa-shopping-cart px-2'></i> TROLLEY
								</Nav.Link>
							</LinkContainer>

							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id='username'
									className='ml-2'
								>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/'>
										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<NavLink>
										<i className='fas fa-user px-2'></i> LOG IN
									</NavLink>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu' className='ml-2'>
									<LinkContainer to='/users'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/products'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/orders'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
