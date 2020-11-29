import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { AuthContext } from "../contexts/Auth";
import ProjectCard from "./ProjectCard";
import { getRequest } from "../utils/GooglePhotosApi";
import LoadingOverlay from "./LoadingOverlay";

const ProjectsList = () => {
    const { accessToken } = useContext(AuthContext);

    const [albums, setAlbums] = useState(undefined);

    useEffect(() => {
        if (!accessToken) return;

        getRequest('albums', accessToken)
            .then(response => {
                const { albums } = response;
                setAlbums(albums || []);
            })
        ;
    }, [accessToken]);

    if (albums === undefined) {
        return <LoadingOverlay />
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {albums.map(album => {
                    return (
                        <Grid item md={4} sm={6} xs={12} key={album.id}>
                            <ProjectCard album={album} />
                        </Grid>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
};

export default ProjectsList;
