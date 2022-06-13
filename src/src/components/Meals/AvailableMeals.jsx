import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
	{
		id: "m1",
		name: "Sushi",
		description: "Finest fish and veggies",
		price: 22.99,
	},
	{
		id: "m2",
		name: "Schnitzel",
		description: "A german specialty!",
		price: 16.5,
	},
	{
		id: "m3",
		name: "Barbecue Burger",
		description: "American, raw, meaty",
		price: 12.99,
	},
	{
		id: "m5",
		name: "Hamburger",
		description: "The Best of the best",
		price: 20.99,
	},
	{
		id: "m6",
		name: "Kebab",
		description: "The Turkish specialty!",
		price: 13.99,
	},
	{
		id: "m7",
		name: "Curry",
		description: "Spicy and delicious",
		price: 21.99,
	},
	{
		id: "m8",
		name: "",
		description: "Chicken",
		price: 10.99,
	},
	{
		id: "m9",
		name: "Baked egg",
		description: "The eggish specialty",
		price: 21.99,
	},
];

const AvailableMeals = () => {
	const mealsList = DUMMY_MEALS.map((meal) => {
		return (
			<MealItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				description={meal.description}
				price={meal.price}
			/>
		);
	});

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
