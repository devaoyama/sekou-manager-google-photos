import React from "react";
import { Grid } from "@material-ui/core";
import WorkloadCard from "./WorkloadCard";

const WorkloadsList = ({ workloads, projectId }) => {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {workloads.map(workload => {
                    return (
                        <Grid item md={4} sm={6} xs={12} key={workload.id}>
                            <WorkloadCard mediaItem={workload} projectId={projectId} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

export default WorkloadsList;
