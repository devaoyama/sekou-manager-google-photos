import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { db } from "../utils/Firebase";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        margin: 'auto',
    },
    media: {
        maxHeight: 300,
    },
});

type TProps = {
    mediaItem: {
        id: string
        baseUrl: string
    }
    projectId: string
};

const WorkloadCard: React.FC<TProps> = ({ mediaItem, projectId }) => {
    const [workload, setWorkload] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        db.collection('projects')
            .doc(projectId)
            .collection('workloads')
            .doc(mediaItem.id)
            .get()
            .then(doc => {
                setWorkload(doc.data());
            })
        ;
    }, []);

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <Link
                    href="/projects/[projectId]/workloads/[workloadId]"
                    as={`/projects/${projectId}/workloads/${mediaItem.id}`}
                >
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            title="施工画像"
                        >
                            <Image src={mediaItem.baseUrl} width={1280} height={960} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {workload ? workload.title : 'タイトルなし'}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </React.Fragment>
    );
};

export default WorkloadCard;
