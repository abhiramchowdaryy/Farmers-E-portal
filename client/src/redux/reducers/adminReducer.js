import * as actionTypes from '../actions/actionTypes';

export const listAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ADMIN_USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case actionTypes.ADMIN_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADMIN_USER_LIST_RESET:
      return {
        loading: false,
        users: [],
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ADMIN_USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.ADMIN_USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminGetProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADMIN_USER_PROFILE_SUCCESS:
      return {
        loading: false,
        aduser: action.payload,
      };
    case actionTypes.ADMIN_USER_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADMIN_USER_PROFILE_RESET:
      return {
        loading: false,
        aduser: {},
      };
    default:
      return state;
  }
};

export const adminUpdateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADMIN_USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.ADMIN_USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADMIN_USER_UPDATE_PROFILE_RESET:
      return {
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionTypes.ADMIN_PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ADMIN_PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case actionTypes.ADMIN_PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADMIN_PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ADMIN_PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case actionTypes.ADMIN_PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADMIN_PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const listAllOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ADMIN_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case actionTypes.ADMIN_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ADMIN_ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        successful: true,
      };
    case actionTypes.ADMIN_ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.ADMIN_ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

export const biddingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BIDDING_PRODUCT_DETAILS':
      return { ...state, biddingProduct: action?.payload };
    default:
      return state;
  }
};
