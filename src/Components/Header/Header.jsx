import React, {useContext, useReducer} from "react";

import {Link} from "react-router-dom";

import LowerHeader from "./LowerHeader";

import classes from "./header.module.css";

import {SlLocationPin} from "react-icons/sl";
import {BsSearch} from "react-icons/bs";
import {BiCart} from "react-icons/bi";
import {DataContext} from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase";

const Header = () => {
	const [{user, basket}, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);
	return (
		<header className={classes.fixed}>
			<section>
				<div className={classes.header__container}>
					<div className={classes.logo__container}>
						<Link to="/">
							<img
								src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
								alt="amazon logo"
							/>
						</Link>
					</div>
					<div className={classes.delivery}>
						<span>
							<SlLocationPin />
						</span>
						<div>
							<p>Delivere to</p>
							<span>Ethiopia</span>
						</div>
					</div>
					<div className={classes.search}>
						<select name="" id="">
							<option value="">All</option>
						</select>
						<input type="text" name="" id="" placeholder="search" />
						<BsSearch size={38} />
					</div>
					<div className={classes.order__container}>
						<Link to="" className={classes.language}>
							<img
								src="https://pngimg.com/uploads/flags/flags_PNG14592.png"
								alt=""
							/>
							<select>
								<option value="">EN</option>
							</select>
						</Link>
						<Link to={!user && "/auth"}>
							<div>
								{user ? (
									<>
										<p>Hello, {user.email?.split("@")[0]}</p>
										<span onClick={() => auth.signOut()}>SignOut</span>
									</>
								) : (
									<>
										<p>Hello, Sign In</p>
										<span>Account & Lists</span>
									</>
								)}
							</div>
						</Link>
						<Link to="/orders">
							<p>returns</p>
							<span>& Orders</span>
						</Link>
						<Link to={"/cart"} className={classes.cart}>
							<BiCart size={35} />
							<span>{totalItem}</span>
						</Link>
					</div>
				</div>
			</section>
			<LowerHeader />
		</header>
	);
};

export default Header;
