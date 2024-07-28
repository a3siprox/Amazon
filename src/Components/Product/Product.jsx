import React, {useState, useEffect} from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";

function Product() {
	const [isLoading, setIsLoading] = useState();
	const [products, setProducts] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		axios
			.get("https://fakestoreapi.com/products")
			.then((res) => {
				setProducts(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<section className={classes.products_container}>
					{products.map((singleProduct) => (
						<ProductCard
							product={singleProduct}
							key={singleProduct.id}
							renderAdd={true}
						/>
					))}
				</section>
			)}
		</>
	);
}

export default Product;
