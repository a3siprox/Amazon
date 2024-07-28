import React, {createContext, useReducer} from "react";

export const DataContext = createContext();

export function DataProvider({children, reducer, initialState}) {
	return (
		<DataContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</DataContext.Provider>
	);
}

