import React, { useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { db } from "../utils/Firebase";

const PdfExportButton = ({ mediaItems, projectId }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        setLoading(true);
        const doc = await db.collection('projects').doc(projectId).get();
        const project: any = { id: projectId, ...doc.data() };
        const data = [];
        mediaItems.forEach(item => {
            data.push({id: item.id, url: item.baseUrl});
        });
        const requestInit: RequestInit = {
            mode: "no-cors",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data, project })
        };
        const response = await fetch('/api/pdf', requestInit);
        const jsonURL = window.URL.createObjectURL(await response.blob());
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = jsonURL;
        link.setAttribute('download', `${project.title}.pdf`);
        link.click();
        document.body.removeChild(link);
        setLoading(false);
    };

    return (
        <ListItem button onClick={handleClick} disabled={loading}>
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
