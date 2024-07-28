import React from "react";
import {categoryInfos} from "./categoryFullinfox";
import classes from "./category.module.css";
import CategoryCard from "./CategoryCard";

function Category() {
	return (
		<section className={classes.category__container}>
			{categoryInfos.map((infos, index) => (
				<CategoryCard data={infos} key={index} />
			))}
		</section>
	);
}

export default Category;
