import * as actionTypes from '../actions/actionTypes';

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_LIST_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case actionTypes.PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
			};
		case actionTypes.PRODUCT_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const productProfileReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case actionTypes.PRODUCT_PROFILE_REQUEST:
			return {
				loading: true,
				...state,
			};
		case actionTypes.PRODUCT_PROFILE_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case actionTypes.PRODUCT_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const createProductReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

export const getTopProductsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_TOP_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case actionTypes.PRODUCT_TOP_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case actionTypes.PRODUCT_TOP_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const productCategoryListReducer = (
	state = { products: [] },
	action
) => {
	switch (action.type) {
		case actionTypes.PRODUCT_CATEGORY_REQUEST:
			return {
				loading: true,
				products: [],
			};
		case actionTypes.PRODUCT_CATEGORY_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
			};
		case actionTypes.PRODUCT_CATEGORY_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const favouriteProductReducer = (
	state = { product: { favouritedBy: [] } },
	action
) => {
	switch (action.type) {
		case actionTypes.PRODUCT_FAVOURITE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.PRODUCT_FAVOURITE_SUCCESS:
			return {
				loading: false,
				success: true,
				product: action.payload,
			};
		case actionTypes.PRODUCT_FAVOURITE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const unfavouriteProductReducer = (
	state = { product: { favouritedBy: [] } },
	action
) => {
	switch (action.type) {
		case actionTypes.PRODUCT_UNFAVOURITE_REQUEST:
			return {
				loading: true,
			};
		case actionTypes.PRODUCT_UNFAVOURITE_SUCCESS:
			return {
				loading: false,
				success: true,
				product: action.payload,
			};
		case actionTypes.PRODUCT_UNFAVOURITE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
