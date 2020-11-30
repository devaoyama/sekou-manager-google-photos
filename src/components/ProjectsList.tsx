import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { AuthContext } from "../contexts/Auth";
import ProjectCard from "./ProjectCard";
import LoadingOverlay from "./LoadingOverlay";
import { db } from "../utils/Firebase";

const ProjectsList = () => {
    const { currentUser } = useContext(AuthContext);

    const [projects, setProjects] = useState(undefined);

    useEffect(() => {
        if (!currentUser) return;

        db.collection('projects').where('user', '==', currentUser.uid).get()
            .then(snapshot => {
                const results = [];
                snapshot.forEach(doc => {
                    results.push({id: doc.id, ...doc.data()});
                });
                setProjects(results);
            })
        ;
    }, [currentUser]);

    if (projects === undefined) {
        return <LoadingOverlay />
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {projects.map(project => {
                    return (
                        <Grid item md={4} sm={6} xs={12} key={project.id}>
                            <ProjectCard project={project} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

export default ProjectsList;
