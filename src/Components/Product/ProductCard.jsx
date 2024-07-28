import React, {useContext} from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./product.module.css";
import {Link} from "react-router-dom";
import {DataContext} from "../DataProvider/DataProvider";
import {Type} from "../../Utility/action.type";

function ProductCard({product, flex, renderDesc, renderAdd}) {
	const {image, title, id, rating = {}, price, description} = product;

	const [, dispatch] = useContext(DataContext);

	const addToCart = () => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item: {
				image,
				title,
				id,
				rating,
				price,
				description,
			},
		});
	};

	const {rate = 0, count = 0} = rating;

	return (
		<div
			className={`${classes.card__container} ${
				flex ? classes.product__flexed : ""
			}`}
		>
			<Link to={`/products/${id}`}>
				<img src={image} alt={title} />
			</Link>
			<div>
				<h3>{title}</h3>
				{renderDesc && <div style={{maxWidth: "750px"}}>{description}</div>}
				<div className={classes.rating}>
					{rating ? (
						<>
							<Rating value={rate} precision={0.1} readOnly />
							<small>{count}</small>
						</>
					) : (
						<p>No rating available</p>
					)}
				</div>
				<div>
					<CurrencyFormat amount={price} />
				</div>
				{renderAdd && (
					<button className={classes.button} onClick={addToCart}>
						Add to Cart
					</button>
				)}
			</div>
		</div>
	);
}

export default ProductCard;
