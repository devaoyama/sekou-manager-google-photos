import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Drawer, Fab, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Auth from "../../../components/Auth";
import WorkloadsList from "../../../components/WorkloadsList";
import DeleteProjectListItem from "../../../components/DeleteProjectListItem";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const Index = () => {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const { projectId } = router.query;

    const classes = useStyles();

    const list = () => (
        <div>
            <List>
                <Link href="/projects/[projectId]/workloads/create" as={`/projects/${projectId}/workloads/create`}>
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText>
                            施工内容追加
                        </ListItemText>
                    </ListItem>
                </Link>
                <DeleteProjectListItem projectId={projectId} />
            </List>
        </div>
    );

    return (
        <Auth>
            <Container maxWidth="md">
                <WorkloadsList />
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
