import React from "react";
import { Grid } from "@material-ui/core";
import WorkloadCard from "./WorkloadCard";

const WorkloadsList = ({ mediaItems, projectId }) => {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {mediaItems.map(mediaItem => {
                    return (
                        <Grid item md={4} sm={6} xs={12} key={mediaItem.id}>
                            <WorkloadCard mediaItem={mediaItem} projectId={projectId} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

export default WorkloadsList;
