import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from './Header';

const mockStore = configureStore([]);

describe('Header', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			userLogin: {
				userInfo: {
					_id: '123456',
					name: 'Test',
					email: 'test@test.com',
					isAdmin: false,
					token: 'fake_token',
				},
			},
		});
	});

	it('renders SearchBar in Header component', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Search Groceries')).toBeInTheDocument();
	});

	it(`renders Farmer's Market and Trolley link in Header component`, () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);

		expect(
			screen.getByRole('link', { name: `FARMER'S MARKET` })
		).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'TROLLEY' })).toBeInTheDocument();
	});

	it('renders UserInfo menu button, but NOT the Admin menu button, in Header component', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Admin' })).toBeNull();
	});
});
