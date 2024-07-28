import React, {useEffect, useContext} from "react";
import Routing from "./Routing";
import {DataContext} from "./Components/DataProvider/DataProvider";
import {Type} from "./Utility/action.type";
import {auth} from "./Utility/firebase";

function App() {
	const [{user}, dispatch] = useContext(DataContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// console.log("User logged in: ", authUser);
				dispatch({
					type: Type.SET_USER,
					user: authUser,
				});
			} else {
				console.log("User logged out");
				dispatch({
					type: Type.SET_USER,
					user: null,
				});
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [dispatch]);

	// console.log("Current user: ", user);

	return (
		<>
			<Routing />
		</>
	);
}

export default App;
