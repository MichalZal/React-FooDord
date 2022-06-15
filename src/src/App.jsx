import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

const App = () => {
	const [cartIsVisible, setCartIsVisible] = useState(false);

	const showCartHandler = () => {
		setCartIsVisible(true);
	};

	const hideCartHandler = () => {
		setCartIsVisible(false);
	};

	return (
		<Fragment>
			{cartIsVisible && <Cart onClose={hideCartHandler}/>}
			<Header onShowCart={showCartHandler} onHideCart={hideCartHandler} />
			<main>
				<Meals />
			</main>
		</Fragment>
	);
};
export default App;
