import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../../../../components/Auth";
import { db } from "../../../../../utils/Firebase";
import { AuthContext } from "../../../../../contexts/Auth";
import {getRequest} from "../../../../../utils/GooglePhotosApi";
import LoadingOverlay from "../../../../../components/LoadingOverlay";
import DeleteWorkloadButton from "../../../../../components/DeleteWorkloadButton";

const useStyles = makeStyles({
    body: {
        'white-space': 'pre-wrap',
    },
});

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
                <Grid container justify="space-between">
                    <Grid>
                        <Typography variant="h4" component="h3">施工内容</Typography>
                    </Grid>
                    <Grid>
                        <DeleteWorkloadButton projectId={projectId} workloadId={workloadId} setLoading={setLoading} />
                    </Grid>
                    <Card>
                        <CardHeader title={workload && workload.title} />
                        <CardMedia title="施工画像">
                            {image && <Image src={image} width={1920} height={1024} />}
                        </CardMedia>
                        <CardContent>
                            <Typography variant="h5" component="h4" className={classes.body}>
                                コメント
                            </Typography>
                            <Typography variant="body1" className={classes.body}>
                                {workload && workload.comment}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </Auth>
    );
};

export default Index;
