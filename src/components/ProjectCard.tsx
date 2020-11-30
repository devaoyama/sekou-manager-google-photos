import React from "react";
import Link from "next/link";
import { Card, CardActionArea, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";

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
    project: {
        id: string
        title: string
        type: string
        builder: string
        start: string
    }
};

const ProjectCard: React.FC<TProps> = ({ project }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <Link href="/projects/[projectId]" as={`/projects/${project.id}`}>
                    <CardActionArea>
                        <CardHeader
                            title={project.title}
                            subheader={project.start + ' 〜'}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                工種： {project.type}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                工事施工者： {project.builder}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </React.Fragment>
    );
};

export default ProjectCard;
