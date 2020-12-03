import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { db } from "../utils/Firebase";

const PdfExportButton = ({ mediaItems, projectId }) => {
    const handleClick = async () => {
        const doc = await db.collection('projects').doc(projectId).get();
        console.log(doc.data());
    };

    return (
        <ListItem button onClick={handleClick} disabled>
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
