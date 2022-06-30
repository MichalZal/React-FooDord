import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isOrdering, setIsOrdering] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [didSubmit, setDidSubmit] = useState(false)

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;
	const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id);
	}

	const cartItemAddHandler = item => {
		cartCtx.addItem({...item, amount: 1})
	}

	const submitOrderHandler = async (userData, )	=> {
		setIsSubmitting(true)
		const res = await fetch('https://foodord-fd587-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
			method: 'POST',
			body: JSON.stringify({ 
				user: userData,
				orderedItems: cartCtx.items
			})
		})
		setIsSubmitting(false)
		setDidSubmit(true)

		cartCtx.clearCart()
	}

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				>
				</CartItem>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
		<button className={classes[`button--alt`]} onClick={props.onClose}>
			Close
		</button>
			<button onClick={() => setIsOrdering(true)} className={classes.button}>Order</button>
		</div>
	)

	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isOrdering && !hasItems && <p>No items to oreder</p>}
			{isOrdering && hasItems && <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler} />}
			{modalActions}
		</>
	)

	const isSubmittingModalContent = (
		<>
			<p>Sending order Data...</p>
			<div className={classes.action}>
				<button className={classes.button}></button>
			</div>
		</>
	)

	const didSubmitModalContent = (
		<>
		<p>Successfully send oreder!</p>
		<button onClick={() => setDidSubmit(false)}>OK</button>
		</>
	)

	return (
		<Modal onClick={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}


			{/* {isSubmitting && !didSubmit ? isSubmittingModalContent : cartModalContent}
			{didSubmit && !isSubmitting && didSubmitModalContent} */}
		</Modal>
	);
};

export default Cart;
