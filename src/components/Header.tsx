import React, { useContext } from "react";
import { AppBar, Box, createStyles, CssBaseline, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { AuthContext } from "../contexts/Auth";
import Logout from "./Logout";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const Header = () => {
    const { currentUser } = useContext(AuthContext);

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        施工管理
                    </Typography>
                    {currentUser && (
                        <Logout />
                    )}
                </Toolbar>
            </AppBar>
            <Box mt={2} />
        </React.Fragment>
    );
};

export default Header;
