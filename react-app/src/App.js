import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import InventorySheetForm from "./components/InventorySheetForm";
import Dashboard from "./components/Dashboard";
import ItemsPage from "./components/ItemsPage";
import InventoryPage from "./components/InventoryPage";
import SheetDetailsPage from "./components/SheetDetailsPage";


function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route exact path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/login" >
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					
					<Route exact path="/inventory-sheets">
						<InventoryPage />
					</Route>

					<Route path="/inventory-sheets/:sheetId">
						<SheetDetailsPage />
					</Route>

					<Route path="/items">
						<ItemsPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
