import React, {useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
    Breadcrumbs,
    Container,
    Drawer,
    Fab, Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import EditIcon from '@material-ui/icons/Edit';
import Auth from "../../../components/Auth";
import WorkloadsList from "../../../components/WorkloadsList";
import DeleteProjectListItem from "../../../components/DeleteProjectListItem";
import {postRequest} from "../../../utils/GooglePhotosApi";
import {AuthContext} from "../../../contexts/Auth";
import LoadingOverlay from "../../../components/LoadingOverlay";

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
    const { accessToken } = useContext(AuthContext);

    const [workloads, setWorkLoads] = useState(undefined);

    const [open, setOpen] = useState(false);

    const router = useRouter();
    const { projectId } = router.query;

    useEffect(() => {
        if (!accessToken || !projectId) return;

        const body = {
            albumId: projectId
        };
        postRequest('mediaItems:search', accessToken, JSON.stringify(body))
            .then(response => {
                const { mediaItems } = response;
                setWorkLoads(mediaItems || []);
            })
        ;
    }, [projectId, accessToken]);

    const classes = useStyles();

    const list = () => (
        <div>
            <List>
                <NextLink href="/projects/[projectId]/workloads/create" as={`/projects/${projectId}/workloads/create`}>
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText>
                            施工内容追加
                        </ListItemText>
                    </ListItem>
                </NextLink>
                <NextLink href="/projects/[projectId]/edit" as={`/projects/${projectId}/edit`}>
                    <ListItem button>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText>
                            プロジェクト編集
                        </ListItemText>
                    </ListItem>
                </NextLink>
                <DeleteProjectListItem projectId={projectId} />
            </List>
        </div>
    );

    if (workloads === undefined) {
        return <LoadingOverlay />
    }

    return (
        <Auth>
            <Container maxWidth="md">
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
                    <NextLink href="/">
                        <Link color="inherit" href="">
                            工事一覧
                        </Link>
                    </NextLink>
                    <Typography color="textPrimary">施工一覧</Typography>
                </Breadcrumbs>
                <WorkloadsList workloads={workloads} projectId={projectId} />
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
