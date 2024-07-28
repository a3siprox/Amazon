import React, {useState, useContext} from "react";
import classes from "./auth.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import {Link, useNavigate} from "react-router-dom";
import AmazonLogo from "../../assets/images/amazonblack.png";
import {auth} from "../../Utility/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import {ClipLoader} from "react-spinners";
import {DataContext} from "../../Components/DataProvider/DataProvider";
import {Type} from "../../Utility/action.type";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState({
		signIn: false,
		signUp: false,
	});

	const [{user}, dispatch] = useContext(DataContext);
	const navigate = useNavigate();

	// console.log(user);

	const authHandler = async (e) => {
		e.preventDefault();

		if (e.target.name == "signin") {
			setLoading({...loading, signIn: true});
			signInWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoading({...loading, signIn: false});
					navigate("/");
				})
				.catch((err) => {
					setError(err.message);
					setLoading({...loading, signIn: false});
				});
		} else {
			setLoading({...loading, signUp: true});
			createUserWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoading({...loading, signUp: false});
					navigate("/");
				})
				.catch((err) => {
					setError(err.message);
					setLoading({...loading, signIn: false});
				});
		}
	};

	// console.log(password, email);

	return (
		<section className={classes.login}>
			<Link to="/">
				<img src={AmazonLogo} alt="amazon logo" />
			</Link>
			<div className={classes.login__container}>
				<h1>Sign In</h1>
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						type="submit"
						onClick={authHandler}
						name="signin"
						className={classes.login__signInButton}
					>
						{loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
					</button>
				</form>

				<p>
					By signing-in you agree to the AMAZON FAKE CLONE Condition of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>

				<button
					type="submit"
					name="signup"
					onClick={authHandler}
					className={classes.login__registerButton}
				>
					{loading.signUp ? (
						<ClipLoader color="#000" size={15} />
					) : (
						"Create your Amazon Account"
					)}
				</button>
				{error && <small>{error}</small>}
			</div>
		</section>
	);
}

export default Auth;
