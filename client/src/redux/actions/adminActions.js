import * as actionTypes from './actionTypes';
import axios from 'axios';

export const listAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`api/admin/users/`, config);

    dispatch({
      type: actionTypes.ADMIN_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`api/admin/users/${id}`, config);

    dispatch({
      type: actionTypes.ADMIN_USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminGetUserProfile = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_USER_PROFILE_REQUEST,
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

    const { data } = await axios.get(`/api/admin/users/${id}`, config);

    dispatch({
      type: actionTypes.ADMIN_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminUpdateProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`/api/admin/users/${user._id}`, user, config);

    dispatch({
      type: actionTypes.ADMIN_USER_UPDATE_PROFILE_SUCCESS,
    });
    dispatch({
      type: actionTypes.ADMIN_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/admin/product/${id}`, config);

    dispatch({
      type: actionTypes.ADMIN_PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/admin/product/create`, {}, config);

    dispatch({
      type: actionTypes.ADMIN_PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/admin/product/${product._id}`, product, config);

    dispatch({
      type: actionTypes.ADMIN_PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`api/admin/orders/`, config);

    dispatch({
      type: actionTypes.ADMIN_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deliverOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionTypes.ADMIN_ORDER_DELIVERED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/admin/orders/${order._id}/deliver`, {}, config);

    dispatch({
      type: actionTypes.ADMIN_ORDER_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADMIN_ORDER_DELIVERED_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getBiddingProduct = id => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: actionTypes.ADMIN_ORDER_DELIVERED_REQUEST,
    // });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/bidding/get/${id}`, config);

    dispatch({
      type: 'BIDDING_PRODUCT_DETAILS',
      payload: data,
    });
  } catch (error) {
    // dispatch({
    //   type: actionTypes.ADMIN_ORDER_DELIVERED_FAIL,
    //   payload:
    //     error.response && error.response.data.message ? error.response.data.message : error.message,
    // });
  }
};

export const createBiddingProduct = values => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/admin/bidding/create`, values, config);

    dispatch({
      type: 'BIDDING_PRODUCT_DETAILS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateBiddingProduct = (id, values, history) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/admin/bidding/update/${id}`, values, config);
    alert('Updated Successfully');
    history.push('/products');
    dispatch({
      type: 'BIDDING_PRODUCT_DETAILS',
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
