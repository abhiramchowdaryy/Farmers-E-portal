import * as actionTypes from '../actions/actionTypes';

export const trolleyReducer = (
	state = { trolleyItems: [], deliveryAddress: {} },
	action
) => {
	switch (action.type) {
		case actionTypes.TROLLEY_ADD_ITEM:
			const item = action.payload;

			const existingItem = state.trolleyItems.find(
				(tp) => tp.productId === item.productId
			);
			if (existingItem) {
				return {
					...state,
					trolleyItems: state.trolleyItems.map((tp) =>
						tp.productId === existingItem.productId ? item : tp
					),
				};
			} else {
				return {
					...state,
					trolleyItems: [...state.trolleyItems, item],
				};
			}

		case actionTypes.TROLLEY_REMOVE_ITEM:
			return {
				...state,
				trolleyItems: state.trolleyItems.filter(
					(tp) => tp.productId !== action.payload
				),
			};

		case actionTypes.TROLLEY_SAVE_DELIVERY_ADDRESS:
			return {
				...state,
				deliveryAddress: action.payload,
			};

		case actionTypes.TROLLEY_SAVE_DELIVERY_DATE:
			return {
				...state,
				deliveryDate: action.payload,
			};

		case actionTypes.TROLLEY_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};

		case actionTypes.TROLLEY_RESET:
			return {
				trolleyItems: [],
				deliveryAddress: {},
			};
		default:
			return state;
	}
};
