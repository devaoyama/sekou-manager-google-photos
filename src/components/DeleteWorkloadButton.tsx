import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { db } from "../utils/Firebase";
import { postRequest } from "../utils/GooglePhotosApi";
import { AuthContext } from "../contexts/Auth";

const DeleteWorkloadButton = ({ projectId, workloadId, setLoading }) => {
    const { accessToken } = useContext(AuthContext);

    const router = useRouter();

    const handleClick = async () => {
        const confirm = window.confirm('本当に削除しますか？');
        if (!confirm || !accessToken) return;
        setLoading(true);
        const body = {
            mediaItemIds: [
                workloadId
            ]
        };
        await postRequest(`albums/${projectId}:batchRemoveMediaItems`, accessToken, JSON.stringify(body));
        await db.collection('projects')
            .doc(projectId)
            .collection('workloads')
            .doc(workloadId)
            .delete()
        ;
        await router.push('/projects/[projectId]', `/projects/${projectId}`);
    };

    return (
        <Button color="secondary" onClick={handleClick}>
            削除
        </Button>
    );
};

export default DeleteWorkloadButton;
