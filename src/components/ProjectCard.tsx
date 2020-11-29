import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        margin: 'auto',
    },
    media: {
        maxHeight: 400,
    },
});

type TProps = {
    album: {
        id: string
        title: string
        coverPhotoBaseUrl: string
    }
};

const ProjectCard: React.FC<TProps> = ({ album }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <Link href="/projects/[projectId]" as={`/projects/${album.id}`}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            title="プロジェクト画像"
                        >
                            <Image src={album.coverPhotoBaseUrl} width={1920} height={1024} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {album.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </React.Fragment>
    );
};

export default ProjectCard;
