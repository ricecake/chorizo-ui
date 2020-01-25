import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Home  = lazy(() => import('Page/home'));
const About = lazy(() => import('Page/about'));
const Users = lazy(() => import('Page/users'));

export const App = () => {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/users">Users</Link>
						</li>
					</ul>
				</nav>

				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/users">
							<Users />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Suspense>
			</div>
		</Router>
	);
};
export default App;