import React, { useEffect, useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { db } from "../utils/Firebase";

const PdfExportButton = ({ workloads, projectId }) => {
    const [project, setProjects] = useState(undefined);

    useEffect(() => {
        db.collection('projects').doc(projectId).get()
            .then(doc => {
                setProjects(doc.data());
            })
        ;
    });

    const handleClick = () => {
        console.log(project);
    };

    return (
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText>
                工事写真帳作成
            </ListItemText>
        </ListItem>
    );
};

export default PdfExportButton;
