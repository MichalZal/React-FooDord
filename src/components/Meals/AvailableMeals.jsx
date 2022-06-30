import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals]= useState([])
	const [isLoading, setIsloading] = useState(true)
	const [httpError, setHttpError] = useState()

	useEffect(() => {
    const fetchMeals = async () => {
			const res = await fetch("https://foodord-fd587-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
			if (!res.ok) {
				throw new Error("Somethnig went wrong with server connection")
			}

			const data = await res.json();

			const loadedMeals = [];

			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}

			setMeals(loadedMeals);
			setIsloading(false)
		}

		try {
			fetchMeals()
				.catch(e => {
					setIsloading(false)
					setHttpError(e.message)
				})
		} catch (e) {
		}
  }, []); 
	// ten useEffect fetchuje obiekt meals z firebase

	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<Card>
					<p>Loading...</p>
				</Card>
			</section>
		)
	}
	// jeśli isLoading jest true, to komponent zwraca section z loading, zamias wyświetlać mealsów

	if(httpError) {
		return (
			<section className={classes.MealsError}>
				<Card>
					<p>{httpError}</p>
				</Card>
			</section>
		)
	}

  const mealsList = meals.map((meal) => {
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
