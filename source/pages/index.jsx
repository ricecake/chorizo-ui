import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

import { connect } from "react-redux";
import { startSignin } from "Include/reducers/identity";
import { bindActionCreators } from 'redux'


let theme = createMuiTheme({
	palette: {
		primary: {
			light: '#63ccff',
			main: '#009be5',
			dark: '#006db3',
		},
	},
	typography: {
		h5: {
			fontWeight: 500,
			fontSize: 26,
			letterSpacing: 0.5,
		},
	},
	shape: {
		borderRadius: 8,
	},
	props: {
		MuiTab: {
			disableRipple: true,
		},
	},
	mixins: {
		toolbar: {
			minHeight: 48,
		},
	},
});

theme = {
	...theme,
	overrides: {
		MuiDrawer: {
			paper: {
				backgroundColor: '#18202c',
			},
		},
		MuiButton: {
			label: {
				textTransform: 'none',
			},
			contained: {
				boxShadow: 'none',
				'&:active': {
					boxShadow: 'none',
				},
			},
		},
		MuiTabs: {
			root: {
				marginLeft: theme.spacing(1),
			},
			indicator: {
				height: 3,
				borderTopLeftRadius: 3,
				borderTopRightRadius: 3,
				backgroundColor: theme.palette.common.white,
			},
		},
		MuiTab: {
			root: {
				textTransform: 'none',
				margin: '0 16px',
				minWidth: 0,
				padding: 0,
				[theme.breakpoints.up('md')]: {
					padding: 0,
					minWidth: 0,
				},
			},
		},
		MuiIconButton: {
			root: {
				padding: theme.spacing(1),
			},
		},
		MuiTooltip: {
			tooltip: {
				borderRadius: 4,
			},
		},
		MuiDivider: {
			root: {
				backgroundColor: '#404854',
			},
		},
		MuiListItemText: {
			primary: {
				fontWeight: theme.typography.fontWeightMedium,
			},
		},
		MuiListItemIcon: {
			root: {
				color: 'inherit',
				marginRight: 0,
				'& svg': {
					fontSize: 20,
				},
			},
		},
		MuiAvatar: {
			root: {
				width: 32,
				height: 32,
			},
		},
	},
};

const drawerWidth = 256;

const styles = {
	root: {
		display: 'flex',
		minHeight: '100vh',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
	},
	},
	app: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	main: {
		flex: 1,
		padding: theme.spacing(6, 4),
		background: '#eaeff1',
	},
	footer: {
		padding: theme.spacing(2),
		background: '#eaeff1',
	},
};


import Navigator from "Component/Navigator";

const Home  = lazy(() => import('Page/home'));

const ChoresUpcoming = lazy(() => import('Page/chores/upcoming'));
const ChoresOverdue  = lazy(() => import('Page/chores/overdue'));
const ChoresAll      = lazy(() => import('Page/chores/all'));
const Chores         = lazy(() => import('Page/chores'));

const PeopleFriends = lazy(() => import('Page/people/friends'));
const PeopleProfile = lazy(() => import('Page/people/profile'));
const PeopleShop    = lazy(() => import('Page/people/shop'));
const People        = lazy(() => import('Page/people'));

const TeamsEvaluate = lazy(() => import('Page/teams/evaluate'));
const TeamsManage   = lazy(() => import('Page/teams/manage'));
const Teams         = lazy(() => import('Page/teams'));

export const App = (props) => {
	const { classes } = props;

	if (!(props.user || props.userLoading || props.signedIn || props.signinError)) {
		props.startSignin({ redirect_to: props.location.pathname });
		return null;
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={classes.root}>
				<nav className={classes.drawer}>
					<Hidden smUp implementation="js">
						<Navigator
							PaperProps={{ style: { width: drawerWidth } }}
							variant="temporary"
						/>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Navigator PaperProps={{ style: { width: drawerWidth } }} />
					</Hidden>
				</nav>
				<div className={classes.app}>
					<Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Route path="/chores/upcoming">
								<ChoresUpcoming />
							</Route>
							<Route path="/chores/overdue">
								<ChoresOverdue />
							</Route>
							<Route path="/chores/all">
								<ChoresAll />
							</Route>
							<Route path="/chores/">
								<Chores />
							</Route>

							<Route path="/people/friends">
								<PeopleFriends />
							</Route>
							<Route path="/people/profile">
								<PeopleProfile />
							</Route>
							<Route path="/people/shop">
								<PeopleShop />
							</Route>
							<Route path="/people/">
								<People />
							</Route>

							<Route path="/teams/evaluate">
								<TeamsEvaluate />
							</Route>
							<Route path="/teams/manage">
								<TeamsManage />
							</Route>
							<Route path="/teams">
								<Teams />
							</Route>

							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</Suspense>
				</div>
			</div>
		</ThemeProvider>
	);
};

const stateToProps = ({oidc, identity}) => ({
	user: oidc.user,
	userLoading: oidc.isLoadingUser,
	signedIn: identity.signedIn,
	signinError: identity.error,
});
const dispatchToProps = (dispatch) => bindActionCreators({startSignin}, dispatch);

export default connect(stateToProps, dispatchToProps)(withStyles(styles)(App));
