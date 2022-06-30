import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		// updating amount (increasing)
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;
		// updating amount (increasing)

		// updating item (increasing)
		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}
		// updating item (increasing)

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "REMOVE") {
		// updating amount (decreasing)
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		// updating amount (decreasing)

		// updating item (decreasing)
    let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };			
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		// updating item (decreasing)

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === 'CLEAR') {
		return {
			defaultCartState
		}
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const clearCartHandler = () => {
		dispatchCartAction({type: "CLEAR"})
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
