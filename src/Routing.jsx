import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(
	"pk_test_51Pg6bp2N6rT5OXVhGH3xlAkLGvvt6iXrDSnpCiU9IhtuZMV9tTmymsExE32dRWRGZP5euKQcX1QChKUKcboUnR9w00gvMROwZe"
);

function Routing() {
	return (
		<Router>
			<Routes>
				<Route path={"/"} element={<Landing />} />
				<Route path={"/auth"} element={<Auth />} />
				<Route
					path={"/payments"}
					element={
						<Elements stripe={stripePromise}>
							<Payment />
						</Elements>
					}
				/>
				<Route path={"/orders"} element={<Orders />} />
				<Route path={"/category/:categoryName"} element={<Results />} />
				<Route path={"/products/:productId"} element={<ProductDetail />} />
				<Route path={"/cart"} element={<Cart />} />
			</Routes>
		</Router>
	);
}

export default Routing;
