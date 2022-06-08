import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input type={props.type} />
		</div>
	);
};

export default input;
