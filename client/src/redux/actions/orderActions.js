import axios from 'axios';
import * as actionTypes from './actionTypes';
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: actionTypes.ORDER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`api/orders/`, order, config);

		dispatch({
			type: actionTypes.ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: actionTypes.ORDER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: actionTypes.ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed.') {
			dispatch(logout());
		}
		dispatch({
			type: actionTypes.ORDER_DETAILS_FAIL,
			payload: message,
		});
	}
};

// paymentResult comes from PayPal
export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: actionTypes.ORDER_PAY_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		);

		dispatch({
			type: actionTypes.ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed.') {
			dispatch(logout());
		}
		dispatch({
			type: actionTypes.ORDER_PAY_FAIL,
			payload: message,
		});
	}
};

export const getUserOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: actionTypes.ORDER_USER_LIST_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/user/myorders`, config);

		dispatch({
			type: actionTypes.ORDER_USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === 'Not authorized, token failed.') {
			dispatch(logout());
		}
		dispatch({
			type: actionTypes.ORDER_USER_LIST_FAIL,
			payload: message,
		});
	}
};
