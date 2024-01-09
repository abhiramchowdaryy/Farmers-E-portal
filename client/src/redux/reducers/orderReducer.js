import * as actionTypes from '../actions/actionTypes';

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				successful: true,
				order: action.payload,
			};
		case actionTypes.ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case actionTypes.ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
				success: true,
			};
		case actionTypes.ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.ORDER_DETAILS_RESET:
			return {
				orderItems: [],
				shippingAddress: {},
			};
		default:
			return state;
	}
};

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.ORDER_PAY_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.ORDER_PAY_SUCCESS:
			return {
				loading: false,
				successful: true,
			};
		case actionTypes.ORDER_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

export const orderUserListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case actionTypes.ORDER_USER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.ORDER_USER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			};
		case actionTypes.ORDER_USER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.ORDER_USER_LIST_RESET:
			return {
				loading: false,
				orders: [],
			};
		default:
			return state;
	}
};
