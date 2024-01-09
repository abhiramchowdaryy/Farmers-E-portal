import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Message from './Message';

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('renders with or without variant', () => {
	act(() => {
		render(<Message children='Error' />, container);
	});
	expect(container.textContent).toBe('Error');

	act(() => {
		render(<Message variant='primary' children='Market' />, container);
	});
	expect(container.textContent).toBe('Market');

	act(() => {
		render(<Message variant='secondary' children='Error' />, container);
	});
	expect(container.textContent).toBe('Error');
});
