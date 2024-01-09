import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
	it('renders SearchBar component', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SearchBar />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Search Groceries')).toBeInTheDocument();
	});

	it('updates SearchBar input', async () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<SearchBar />
				</BrowserRouter>
			</Provider>
		);

		await screen.findByPlaceholderText(/Search Groceries/);
		expect(
			screen.queryByPlaceholderText(/Search Groceries/)
		).toBeInTheDocument();
		await userEvent.type(screen.getByRole('textbox'), 'Apples');
		expect(screen.getByDisplayValue('Apples')).toBeInTheDocument();
	});
});
