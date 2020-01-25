import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {
	HashRouter as Router,
	NavLink,
	withRouter
} from "react-router-dom";

import { Show } from "Component/Helpers";

const RouterTabs = withRouter((props) =>
	<Tabs value={ props.location.pathname } { ...props } >{ props.children }</Tabs>
);

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
	secondaryBar: {
		zIndex: 0,
	},
	menuButton: {
		marginLeft: -theme.spacing(1),
	},
	iconButtonAvatar: {
		padding: 4,
	},
	link: {
		textDecoration: 'none',
		color: lightColor,
		'&:hover': {
			color: theme.palette.common.white,
		},
	},
	button: {
		borderColor: lightColor,
	},
});

function Header(props) {
	const { classes, onDrawerToggle } = props;

	return (
		<React.Fragment>
			<AppBar color="primary" position="sticky" elevation={0}>
				<Toolbar>
					<Grid container spacing={1} alignItems="center">
						<Hidden smUp>
							<Grid item>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={onDrawerToggle}
									className={classes.menuButton}
								>
									<MenuIcon />
								</IconButton>
							</Grid>
						</Hidden>
						<Grid item xs />
						<Grid item>
							<Tooltip title="Alerts • No alerts">
								<IconButton color="inherit">
									<NotificationsIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item>
							<IconButton color="inherit" className={classes.iconButtonAvatar}>
								<Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<AppBar
				component="div"
				className={classes.secondaryBar}
				color="primary"
				position="static"
				elevation={0}
			>
				<Toolbar>
					<Grid container alignItems="center" spacing={1}>
						<Grid item xs>
							<Typography color="inherit" variant="h5" component="h1">
								{ props.title || '' }
							</Typography>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>

			<Show If={ props.tabs }>
				{ console.log(props, props.tabs) }
				<Router hashType="noslash">
					<AppBar
						component="div"
						className={classes.secondaryBar}
						color="primary"
						position="static"
						elevation={0}
					>
						<RouterTabs textColor="inherit">
							{ (props.tabs||[]).sort(({order: a }, {order: b})=> a-b ).map(({label, ...rest}) => ({ label,  value: label.replace(/[]/g,''),...rest })).map(({label, value})=>(
								<Tab textColor="inherit" label={ label } value={`/${value}`} component={NavLink} to={`/${value}`} />
							))}
						</RouterTabs>
					</AppBar>
					<Show If={ props.children }>
						{ props.children }
					</Show>
				</Router>
			</Show>
		</React.Fragment>
	);
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
