import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid, Link,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../../../../components/Auth";
import { db } from "../../../../../utils/Firebase";
import { AuthContext } from "../../../../../contexts/Auth";
import {getRequest} from "../../../../../utils/GooglePhotosApi";
import LoadingOverlay from "../../../../../components/LoadingOverlay";
import DeleteWorkloadButton from "../../../../../components/DeleteWorkloadButton";

const useStyles = makeStyles((theme) => ({
    body: {
        'white-space': 'pre-wrap',
    },
    breadCrumbs: {
        marginBottom: theme.spacing(3),
    },
}));

const Index = () => {
    const { accessToken } = useContext(AuthContext);

    const [workload, setWorkload] = useState(null);

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { projectId, workloadId } = router.query;

    const classes = useStyles();

    useEffect(() => {
        if (!accessToken || !projectId || !workloadId) return;
        setLoading(true);
        getRequest('mediaItems/' + workloadId, accessToken)
            .then(response => {
                setImage(response.baseUrl);
            })
        ;
        db.collection('projects')
            .doc(projectId.toString())
            .collection('workloads')
            .doc(workloadId.toString())
            .get()
            .then(doc => {
                setWorkload(doc.data());
            })
        ;
        setLoading(false);
    }, [router.query, accessToken]);

    if (loading || !image) {
        return (
            <LoadingOverlay />
        );
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
                    <NextLink href="/projects/[projectId]" as={`/projects/${projectId}`}>
                        <Link color="inherit" href="">
                            施工一覧
                        </Link>
                    </NextLink>
                    <Typography color="textPrimary">{workload ? workload.title : "タイトルなし"}</Typography>
                </Breadcrumbs>
                <Grid container justify="flex-end">
                    <NextLink
                        href="/projects/[projectId]/workloads/[workloadId]/edit"
                        as={`/projects/${projectId}/workloads/${workloadId}/edit`}
                    >
                        <Button color="primary">
                            編集
                        </Button>
                    </NextLink>
                    <DeleteWorkloadButton projectId={projectId} workloadId={workloadId} setLoading={setLoading} />
                </Grid>
                <Box mb={1} />
                <Card>
                    <CardHeader title={workload ? workload.title : "タイトルなし"} />
                    <CardMedia title="施工画像">
                        {image && <Image src={image} width={1920} height={1024} />}
                    </CardMedia>
                    <CardContent>
                        <Typography variant="h6" component="h4" className={classes.body} gutterBottom>
                            コメント
                        </Typography>
                        <Box ml={2}>
                            <Typography paragraph className={classes.body}>
                                {workload && workload.comment}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Auth>
    );
};

export default Index;
