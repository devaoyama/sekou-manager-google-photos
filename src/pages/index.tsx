import React, { useState } from "react";
import NextLink from "next/link";
import {
    Breadcrumbs,
    Container,
    Drawer,
    Fab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from "@material-ui/icons/Add";
import Auth from "../components/Auth";
import ProjectsList from "../components/ProjectsList";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    breadCrumbs: {
        marginBottom: theme.spacing(3),
    },
}));

const Index = () => {
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const list = () => (
        <div>
            <List>
                <NextLink href="/projects/create">
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText>
                            プロジェクト追加
                        </ListItemText>
                    </ListItem>
                </NextLink>
            </List>
        </div>
    );

    return (
        <Auth>
            <Container maxWidth="md">
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
                    <Typography color="textPrimary">工事一覧</Typography>
                </Breadcrumbs>
                <ProjectsList />
            </Container>
            <Fab color="primary" className={classes.fab} onClick={() => setOpen(true)}>
                <ExpandLessIcon />
            </Fab>
            <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
                {list()}
            </Drawer>
        </Auth>
    );
};

export default Index;
