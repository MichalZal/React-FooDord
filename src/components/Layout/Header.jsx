import { Fragment } from "react";
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton.js'

const Header = props => {
	return (
		<Fragment>
			<header className={classes.header}>
        <h1>FooDord</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of various food"/>
      </div>
		</Fragment>
	);
};

export default Header;
