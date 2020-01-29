import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Identicon from 'react-identicons';
import { withStyles } from '@material-ui/core/styles';
import { Show } from "Component/Helpers";

import TabBar from "Component/TabBar";

import { connect } from "react-redux";
import { logout } from "Include/reducers/identity";
import { bindActionCreators } from 'redux'


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
						<Grid item xs>
							<Typography color="inherit" variant="h5" component="h1">
								{ props.title || '' }
							</Typography>
						</Grid>
						<Grid item>
							<Tooltip title="Alerts • No alerts">
								<IconButton color="inherit">
									<NotificationsIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item>
							<IconButton color="inherit" className={classes.iconButtonAvatar}>
								<Avatar alt={ props.name } >
									<Identicon string={ props.ident_string } size="25"/>
								</Avatar>
							</IconButton>
							<Show If={ props.name }>
								<Typography color="inherit" variant="caption">
									{ props.name }
								</Typography>
							</Show>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<TabBar tabs={props.tabs} >
				{ props.children }
			</TabBar>
		</React.Fragment>
	);
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	onDrawerToggle: PropTypes.func.isRequired,
};

const stateToProps = ({oidc}) => ({
	ident_string: oidc.user.profile.sub,
	name: oidc.user.profile.preferred_name,
});
const dispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(stateToProps, dispatchToProps)(withStyles(styles)(Header));
