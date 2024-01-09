import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import Login from './Login';

describe('Login', () => {
	it('renders Login component', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Enter email address')
		).toBeInTheDocument();
	});

	it('updates Login input', async () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			</Provider>
		);

		await screen.findByPlaceholderText(/Enter email/);
		expect(screen.queryByPlaceholderText(/Enter email/)).toBeInTheDocument();
		await userEvent.type(
			screen.getByPlaceholderText('Enter email address'),
			'test@test.com'
		);
		expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
	});
});
