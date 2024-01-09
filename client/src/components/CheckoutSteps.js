import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4, step5 }) => {
	return (
		<Nav className='justify-content-center mb-4'>
			<NavItem>
				{step1 ? (
					<LinkContainer to='/login'>
						<NavLink>
							<i className='fas fa-sign-in-alt'></i> Log in
						</NavLink>
					</LinkContainer>
				) : (
					<NavLink disabled>
						<i className='fas fa-sign-in-alt'></i> Log in
					</NavLink>
				)}
			</NavItem>

			<NavItem>
				{step2 ? (
					<LinkContainer to='/delivery-address'>
						<NavLink>
							<i className='far fa-address-card'></i> Delivery Address
						</NavLink>
					</LinkContainer>
				) : (
					<NavLink disabled>
						<i className='far fa-address-card'></i> Delivery Address
					</NavLink>
				)}
			</NavItem>

			<NavItem>
				{step3 ? (
					<LinkContainer to='/delivery-date'>
						<NavLink>
							<i className='far fa-calendar-alt'></i> Delivery Date
						</NavLink>
					</LinkContainer>
				) : (
					<NavLink disabled>
						<i className='far fa-calendar-alt'></i> Delivery Date
					</NavLink>
				)}
			</NavItem>

			<NavItem>
				{step4 ? (
					<LinkContainer to='/payment-method'>
						<NavLink>
							<i className='far fa-credit-card'></i> Payment Method
						</NavLink>
					</LinkContainer>
				) : (
					<NavLink disabled>
						<i className='far fa-credit-card'></i> Payment Method
					</NavLink>
				)}
			</NavItem>

			<NavItem>
				{step5 ? (
					<LinkContainer to='/review-order'>
						<NavLink>
							<i className='fas fa-receipt'></i> Review Order
						</NavLink>
					</LinkContainer>
				) : (
					<NavLink disabled>
						<i className='fas fa-receipt'></i> Review Order
					</NavLink>
				)}
			</NavItem>
		</Nav>
	);
};

export default CheckoutSteps;
