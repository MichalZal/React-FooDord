import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (val) => val.trim().length === 0;
const isFiveChars = (val) => val.trim().length === 5;

const Checkout = (props) => {
  const [forminputsValidirt, setFormInputsValidirt] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    console.log(
      `${enteredName} ${enteredStreet} ${enteredPostalCode}, ${enteredCity} `
    );

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredPostalCode);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidirt({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    })

    let formIsValid = false;
    if (
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid
    ) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    })
  };  

  const nameControlClasses = `${classes.control} ${forminputsValidirt.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control} ${forminputsValidirt.street ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${forminputsValidirt.city ? '' : classes.invalid}`
  const postalCodeControlClassses = `${classes.control} ${forminputsValidirt.postalCode ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!forminputsValidirt.name && <p style={{color: 'red'}}>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!forminputsValidirt.street && <p style={{color: 'red'}}>Please enter a valid street!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInputRef} type="text" id="postal" />
        {!forminputsValidirt.postalCode && <p style={{color: 'red'}}>Please enter a valid postal code!</p>}
      </div>
      <div className={postalCodeControlClassses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!forminputsValidirt.city && <p style={{color: 'red'}}>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
