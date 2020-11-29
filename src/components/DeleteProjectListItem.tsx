import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "../utils/Firebase";
import { useRouter } from "next/router";

const DeleteProjectListItem = ({ projectId }) => {
    const router = useRouter();

    const handleClick = async () => {
        const confirm = window.confirm('本当に削除しますか？');
        if (!confirm) return;
        await db.collection('projects').doc(projectId).delete();
        await router.push('/');
    };

    return (
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText>
                プロジェクト削除
            </ListItemText>
        </ListItem>
    );
};

export default DeleteProjectListItem;
