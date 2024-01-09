import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addToTrolley = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/product/${id}`);

	dispatch({
		type: actionTypes.TROLLEY_ADD_ITEM,
		payload: {
			productId: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	localStorage.setItem(
		'trolleyItems',
		JSON.stringify(getState().trolley.trolleyItems)
	);
};

export const removeFromTrolley = (id) => (dispatch, getState) => {
	dispatch({
		type: actionTypes.TROLLEY_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem(
		'trolleyItems',
		JSON.stringify(getState().trolley.trolleyItems)
	);
};

export const saveDeliveryAddress = (data) => (dispatch) => {
	dispatch({
		type: actionTypes.TROLLEY_SAVE_DELIVERY_ADDRESS,
		payload: data,
	});

	localStorage.setItem('deliveryAddress', JSON.stringify(data));
};

export const saveDeliveryDate = (data) => (dispatch) => {
	dispatch({
		type: actionTypes.TROLLEY_SAVE_DELIVERY_DATE,
		payload: data,
	});

	localStorage.setItem('deliveryDate', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: actionTypes.TROLLEY_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem('paymentMethod', JSON.stringify(data));
};
