import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productProfileReducer,
  productListReducer,
  createProductReviewReducer,
  getTopProductsReducer,
  productCategoryListReducer,
  favouriteProductReducer,
  unfavouriteProductReducer,
} from './reducers/productReducer';
import { trolleyReducer } from './reducers/trolleyReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderUserListReducer,
} from './reducers/orderReducer';
import {
  loginReducer,
  registerReducer,
  getProfileReducer,
  updateProfileReducer,
} from './reducers/userReducer';
import {
  listAllUsersReducer,
  listAllOrdersReducer,
  deleteUserReducer,
  adminGetProfileReducer,
  adminUpdateProfileReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  orderDeliveredReducer,
  biddingReducer,
} from './reducers/adminReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productCategoryList: productCategoryListReducer,
  productProfile: productProfileReducer,
  productReview: createProductReviewReducer,
  productFavourited: favouriteProductReducer,
  productUnfavourited: unfavouriteProductReducer,
  productTopRated: getTopProductsReducer,
  trolley: trolleyReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  userProfile: getProfileReducer,
  updatedUserProfile: updateProfileReducer,
  userList: listAllUsersReducer,
  userDelete: deleteUserReducer,
  adminGetUser: adminGetProfileReducer,
  adminUpdateUser: adminUpdateProfileReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderList: listAllOrdersReducer,
  orderDelivered: orderDeliveredReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderUserList: orderUserListReducer,
  bidding: biddingReducer,
});

const trolleyItemsLS = localStorage.getItem('trolleyItems')
  ? JSON.parse(localStorage.getItem('trolleyItems'))
  : [];

const userInfoLS = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const deliverAddressLS = localStorage.getItem('deliveryAddress')
  ? JSON.parse(localStorage.getItem('deliveryAddress'))
  : {};

const initialState = {
  trolley: { trolleyItems: trolleyItemsLS, deliveryAddress: deliverAddressLS },
  userLogin: { userInfo: userInfoLS },
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
