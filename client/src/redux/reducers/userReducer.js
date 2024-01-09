import * as actionTypes from '../actions/actionTypes';

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_LOGIN_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_LOGIN_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			};
		case actionTypes.USER_LOGIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const registerReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_REGISTER_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_REGISTER_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			};
		case actionTypes.USER_REGISTER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const getProfileReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case actionTypes.USER_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.USER_PROFILE_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};
		case actionTypes.USER_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.USER_PROFILE_RESET:
			return {
				loading: false,
				user: {},
			};
		default:
			return state;
	}
};

export const updateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.USER_UPDATE_PROFILE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
				successful: true,
			};
		case actionTypes.USER_UPDATE_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
