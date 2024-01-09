import * as actionTypes from './actionTypes';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: actionTypes.USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'api/users/login',
			{ email, password },
			config
		);

		dispatch({
			type: actionTypes.USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: actionTypes.USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: actionTypes.USER_LOGOUT,
	});
	dispatch({
		type: actionTypes.USER_PROFILE_RESET,
	});
	dispatch({
		type: actionTypes.ORDER_USER_LIST_RESET,
	});
	dispatch({
		type: actionTypes.TROLLEY_RESET,
	});
	dispatch({
		type: actionTypes.ORDER_DETAILS_RESET,
	});
	dispatch({
		type: actionTypes.ADMIN_USER_LIST_RESET,
	});

	localStorage.removeItem('userInfo');
	localStorage.removeItem('trolleyItems');
	localStorage.removeItem('deliveryAddress');
	localStorage.removeItem('paymentMethod');
	localStorage.removeItem('orderDetails');
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: actionTypes.USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'api/users/',
			{ name, email, password },
			config
		);

		dispatch({
			type: actionTypes.USER_REGISTER_SUCCESS,
			payload: data,
		});

		dispatch({
			type: actionTypes.USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: actionTypes.USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getUserProfile = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: actionTypes.USER_PROFILE_REQUEST,
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

		const { data } = await axios.get(`api/users/${id}`, config);

		dispatch({
			type: actionTypes.USER_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
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

		const { data } = await axios.put(`api/users/profile`, user, config);

		dispatch({
			type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
