import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import Product from './Product';

const product = {
	_id: {
		$oid: '5fa1943bcbfa945cfbf57175',
	},
	price: 3.59,
	countInStock: 0,
	rating: 5,
	numReviews: 32,
	name: 'Bacon',
	image: '/images/bacon.jpg',
	description:
		'A cured pork product that comes either smoked or dry-cured. Pack of 8 rashers',
	category: 'Meat',
	user: {
		$oid: '5fa1943bcbfa945cfbf57171',
	},
	reviews: [],
	__v: 0,
	createdAt: {
		$date: '2020-11-03T17:32:43.926Z',
	},
	updatedAt: {
		$date: '2020-11-03T17:32:43.926Z',
	},
};

it('renders Product component when product is passed as props', () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<Product product={product} />
			</BrowserRouter>
		</Provider>
	);

	// screen.debug();
	// screen.getByRole('');
	expect(screen.getByRole('img')).toBeInTheDocument();
	expect(screen.getByRole('link', { name: 'Bacon' })).toBeInTheDocument();
	expect(screen.getByText('₹3.59')).toBeInTheDocument();
});
