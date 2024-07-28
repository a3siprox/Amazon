import React, {useState, useEffect} from "react";
import classes from "./Results.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import {useParams} from "react-router-dom";
import axios from "axios";
import {productUrl} from "../../Api/endPoint";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Results() {
	const [isLoading, setIsLoading] = useState();
	const [results, setResults] = useState([]);
	const {categoryName} = useParams();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${productUrl}/products/category/${categoryName}`)
			.then((res) => {
				if (Array.isArray(res.data)) {
					setResults(res.data);
					setIsLoading(false);
				} else {
					setResults([]);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, [categoryName]);

	return (
		<LayOut>
			<h1 style={{padding: "30px"}}>Results</h1>
			<p style={{padding: "30px"}}>Category / {categoryName}</p>
			<hr />
			{isLoading ? (
				<Loader />
			) : (
				<section>
					<div className={classes.products_container}>
						{results?.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								renderAdd={true}
							/>
						))}
					</div>
				</section>
			)}
		</LayOut>
	);
}

export default Results;

{
	/* <section>
				<h1>Results</h1>
				<p>Category / {categoryName}</p>
				<hr />
				<div className={classes.products_container}>
					{results?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section> */
}
