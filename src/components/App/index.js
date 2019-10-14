import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "../elements/Header";
import Home from "../Home";
import NotFound from "../elements/NotFound";
import Movie from "../Movie";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/:movieId' component={Movie} />
					<Route component={NotFound} />
				</Switch>
			</Fragment>
		</Router>
	);
};

export default App;
