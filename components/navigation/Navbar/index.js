import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import actions from "../../../store/auth/actions";
import Link from "next/link";
import useStyles from "./styles";
import { isAuthorizedRoute } from "utils/auth_roles";

const Navbar = ({ isLoggedIn, logout, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link href={"/"}>
            <a className={classes.link}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </a>
          </Link>

          <Typography variant="h6" className={classes.title}>
            {isLoggedIn && isAuthorizedRoute("/secret", user.role) && (
              <Link href={"/secret"}>
                <a className={classes.link}>Secret</a>
              </Link>
            )}
            {isLoggedIn && isAuthorizedRoute("/admin", user.role) && (
              <Link href={"/admin"}>
                <a className={classes.link}>Admin</a>
              </Link>
            )}
          </Typography>

          {!isLoggedIn && (
            <Link href={"/login"}>
              <a className={classes.link}>
                <Button color="inherit">Login</Button>
              </a>
            </Link>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
