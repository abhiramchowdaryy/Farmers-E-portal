import * as actionTypes from './actionTypes';
import axios from 'axios';

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async dispatch => {
    try {
      dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

      dispatch({
        type: actionTypes.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductProfile = id => async dispatch => {
  try {
    dispatch({ type: actionTypes.PRODUCT_PROFILE_REQUEST });

    const { data } = await axios.get(`/api/products/product/${id}`);

    dispatch({
      type: actionTypes.PRODUCT_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createProductReview = (prodId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/products/product/${prodId}/reviews`, review, config);

    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listTopProducts = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: actionTypes.PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listCategoryProducts =
  (keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: actionTypes.PRODUCT_CATEGORY_REQUEST });

      const { data } = await axios.get(`/api/products/category?keyword=${keyword}`);

      dispatch({
        type: actionTypes.PRODUCT_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CATEGORY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addFavouriteProduct = prodId => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_FAVOURITE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/products/product/${prodId}/favourite`,
      { prodId },
      config
    );

    dispatch({
      type: actionTypes.PRODUCT_FAVOURITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_FAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const removeFavouriteProduct = prodId => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_UNFAVOURITE_REQUEST });

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
      `/api/products/product/${prodId}/unfavourite`,
      { prodId },
      config
    );

    dispatch({
      type: actionTypes.PRODUCT_UNFAVOURITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_UNFAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const productBidding = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_UNFAVOURITE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/user/bidding/${id}`, values, config);
    alert('Bidding added successfully.');
    dispatch({
      type: 'BIDDING_PRODUCT_DETAILS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_UNFAVOURITE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
