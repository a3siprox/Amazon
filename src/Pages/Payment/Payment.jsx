import React, {useContext, useState} from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import {DataContext} from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import {useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import {axiosInstance} from "../../Api/axios";

function Payment() {
	const [{user, basket}] = useContext(DataContext);

	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);

	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const [cardError, setCardError] = useState(null);

	const stripe = useStripe();
	const elements = useElements();

	const handleChange = (e) => {
		e.error?.message ? setCardError(e?.error?.message) : setCardError("");
	};

	const handlePayment = async (e) => {
		e.preventDefault();

		try {
			const response = await axiosInstance({
				method: "POST",
				url: `/payment/create?total=${total * 100}`,
			});

			console.log(response.data);
			const clientSecret = response.data?.clientSecret;
			const confirmation = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});

			console.log(confirmation);
		} catch (error) {}
	};

	return (
		<LayOut>
			<div className={classes.payment__header}>
				Checkout ({totalItem}) items
			</div>
			<section className={classes.payment}>
				<div className={classes.flex}>
					<h3>Delivery Address</h3>
					<div>
						<div>{user ? user.email : "Guest"}</div>
						<div>123 React Lane</div>
						<div>Chicago, Il</div>
					</div>
				</div>

				<hr />

				<div className={classes.flex}>
					<h3>Review items and delivery</h3>
					<div>
						{basket?.map((item) => (
							<ProductCard key={item.id} product={item} flex={true} />
						))}
					</div>
				</div>

				<hr />

				<div className={classes.flex}>
					<h3>Payment methods</h3>
					<div className={classes.payment__card__container}>
						<div className={classes.payment__details}>
							<form action="" onSubmit={handlePayment}>
								{cardError && <small style={{color: "red"}}>{cardError}</small>}
								<CardElement onChange={handleChange} />
								<div className={classes.payment__price}>
									<div>
										<span style={{display: "flex", gap: "10px"}}>
											<p>Total Order |</p> <CurrencyFormat amount={total} />
										</span>
									</div>
									<button type="submit">Pay Now</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</LayOut>
	);
}

export default Payment;
