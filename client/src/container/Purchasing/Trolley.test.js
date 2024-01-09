import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Trolley from './Trolley';

const mockStore = configureStore([]);

describe('My Connected React-Redux Component', () => {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({
			trolley: {
				trolleyItems: [
					{
						productId: '5fa1943bcbfa945cfbf5717b',
						name: 'Chicken',
						image: '/images/chicken.jpg',
						price: 8.79,
						countInStock: 35,
						qty: 1,
					},
				],
			},
		});

		store.dispatch = jest.fn();

		component = renderer.create(
			<Provider store={store}>
				<BrowserRouter>
					<Route path='/' render={(props) => <Trolley {...props} />} />
				</BrowserRouter>
			</Provider>
		);
	});

	it('should render with given state from Redux store', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('should dispatch an action on button click', () => {
		renderer.act(() => {
			component.root.findAllByType('button')[0].props.onClick();
		});

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(screen.queryByText(/Chicken/)).toBeNull();
		expect(screen.queryByRole('img')).toBeNull();
	});
});
